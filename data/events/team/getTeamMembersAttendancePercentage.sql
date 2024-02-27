WITH EmployeeAttendance AS (
    SELECT
        [employee_EmployeeId],
        [date],
        [final_remarks]
    FROM
        ConsolidatedAttendances
    WHERE
        [employee_EmployeeId] IN (
            SELECT [EmployeeId]
            FROM Employees
            WHERE [Group_GroupId] = (SELECT [Group_GroupId] FROM Employees WHERE [EmployeeId] = @EmployeeId)
        )
        AND [date] BETWEEN DATEADD(DAY, 1, EOMONTH(GETDATE(), -1)) AND EOMONTH(GETDATE())
)
SELECT
    (SELECT [Group_GroupId] FROM Employees WHERE [EmployeeId] = @EmployeeId) AS GroupId,
    FORMAT(
        (SUM(CASE
            WHEN CHARINDEX('P', UPPER([final_remarks])) > 0 THEN 1
            ELSE 0
        END) * 100.0) / NULLIF(SUM(CASE
            WHEN [final_remarks] <> 'OFF' THEN 1
            ELSE 0
        END), 0), 'N2'
    ) AS CollectivePresentPercentage,
    FORMAT(
        (SUM(CASE
            WHEN UPPER([final_remarks]) = 'AB' THEN 1
            ELSE 0
        END) * 100.0) / NULLIF(SUM(CASE
            WHEN [final_remarks] <> 'OFF' THEN 1
            ELSE 0
        END), 0), 'N2'
    ) AS CollectiveAbsentPercentage,
    FORMAT(
        (SUM(CASE
            WHEN CHARINDEX('E', UPPER([final_remarks])) > 0 THEN 1
            ELSE 0
        END) * 100.0) / NULLIF(SUM(CASE
            WHEN [final_remarks] <> 'OFF' THEN 1
            ELSE 0
        END), 0), 'N2'
    ) AS CollectiveEarlyOutPercentage,
    FORMAT(
        (SUM(CASE
            WHEN CHARINDEX('L', UPPER([final_remarks])) > 0 THEN 1
            ELSE 0
        END) * 100.0) / NULLIF(SUM(CASE
            WHEN [final_remarks] <> 'OFF' THEN 1
            ELSE 0
        END), 0), 'N2'
    ) AS CollectiveLatePercentage
FROM
    EmployeeAttendance