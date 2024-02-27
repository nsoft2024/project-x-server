WITH Months AS (
    SELECT 1 AS [Month]
    UNION SELECT 2
    UNION SELECT 3
    UNION SELECT 4
    UNION SELECT 5
    UNION SELECT 6
    UNION SELECT 7
    UNION SELECT 8
    UNION SELECT 9
    UNION SELECT 10
    UNION SELECT 11
    UNION SELECT 12
)

SELECT
    M.[Month],
    ISNULL([LeavesApplied], 0) AS [LeavesApplied],
    ISNULL([LeavesAccepted], 0) AS [LeavesAccepted]
FROM Months M
LEFT JOIN (
    SELECT
        MONTH(FromDate) AS [Month],
        SUM(DaysCount) AS [LeavesApplied],
        SUM(CASE WHEN LeaveStatusId = 2 THEN 1 ELSE 0 END) AS [LeavesAccepted]
    FROM LeaveApplications
    WHERE EmployeeId = @EmployeeId
        AND YEAR(FromDate) = YEAR(GETDATE())
    GROUP BY MONTH(FromDate)
) AS [LeaveData] ON M.[Month] = [LeaveData].[Month]
ORDER BY M.[Month]