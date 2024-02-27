SELECT
    CASE
        WHEN total_leaves = 0 THEN 0
        ELSE (accepted_leaves * 100.0) / total_leaves
    END AS [LeavesPercentage]
FROM (
    SELECT
        e.EmployeeId,
        SUM(e.sick_leaves + e.casual_leaves + e.annual_leaves + e.other_leaves) AS [total_leaves],
        COALESCE(SUM(
            CASE
                WHEN la.LeaveStatusId = 2 THEN 1
                ELSE 0
            END
        ), 0) AS [accepted_leaves]
    FROM
        Employees e
    LEFT JOIN
        LeaveApplications la ON e.EmployeeId = la.EmployeeId
        AND (
            (MONTH(la.CreateDateTime) = MONTH(GETDATE()) AND YEAR(la.CreateDateTime) = YEAR(GETDATE()))
            OR la.CreateDateTime IS NULL
        )
    WHERE
        e.EmployeeId = @EmployeeId
    GROUP BY
        e.EmployeeId
) AS [LeaveData]