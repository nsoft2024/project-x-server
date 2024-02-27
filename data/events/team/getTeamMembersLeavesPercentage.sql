WITH LeaveData AS (
    SELECT
        e.EmployeeId,
        e.Group_GroupId AS GroupId,
        SUM(e.sick_leaves + e.casual_leaves + e.annual_leaves + e.other_leaves) AS total_leaves,
        COALESCE(SUM(
            CASE
                WHEN la.LeaveStatusId = 2 THEN 1
                ELSE 0
            END
        ), 0) AS accepted_leaves
    FROM
        Employees e
    LEFT JOIN
        LeaveApplications la ON e.EmployeeId = la.EmployeeId
        AND (
            (MONTH(la.CreateDateTime) = MONTH(GETDATE()) AND YEAR(la.CreateDateTime) = YEAR(GETDATE()))
            OR la.CreateDateTime IS NULL
        )
    WHERE
        e.Group_GroupId = (SELECT Group_GroupId FROM Employees WHERE EmployeeId = @EmployeeId)
    GROUP BY
        e.EmployeeId, e.Group_GroupId
)

SELECT
    GroupId,
    FORMAT(
        CASE
            WHEN SUM(total_leaves) = 0 THEN 0
            ELSE (SUM(accepted_leaves) * 100.0) / SUM(total_leaves)
        END, 'N2'
    ) AS CollectiveLeavesPercentage
FROM
    LeaveData
GROUP BY
    GroupId