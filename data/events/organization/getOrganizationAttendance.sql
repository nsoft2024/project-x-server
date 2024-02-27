WITH EmployeeAttendance AS (
    SELECT
        e.EmployeeId,
        COUNT(CASE WHEN ca.final_remarks LIKE '%P%' OR ca.final_remarks IN ('LV', 'OT', 'OM', 'OV') AND ca.final_remarks NOT LIKE 'OFF' THEN 1 END) AS PresentCount,
        COUNT(CASE WHEN ca.final_remarks = 'AB' THEN 1 END) AS AbsentCount,
        COUNT(CASE WHEN ca.final_remarks IN ('OT', 'OV', 'OM', 'LV') THEN 1 END) AS LeaveCount,
        COUNT(CASE WHEN ca.status_in = 'On Time' THEN 1 END) AS OnTimeCount,
        COUNT(CASE WHEN ca.status_in = 'Late' THEN 1 END) AS LateCount,
        COUNT(CASE WHEN ca.status_out = 'Early Out' THEN 1 END) AS EarlyOutCount,
        COUNT(CASE WHEN ca.status_out = 'On Time' THEN 1 END) AS ExitCount,  -- New Count for Exit
        COUNT(DISTINCT ca.date) AS TotalDays
    FROM
        Employees e
    LEFT JOIN
        ConsolidatedAttendances ca ON e.EmployeeId = ca.employee_EmployeeId
    WHERE
        e.EmployeeId <> 1
        AND ca.date BETWEEN @FromDate AND @ToDate
    GROUP BY
        e.EmployeeId
)

SELECT
    e.employee_code AS EmployeeCode,
    CONCAT(e.first_name, ' ', e.last_name) AS FullName,
    ROUND(COALESCE((CAST(ea.PresentCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS PresentPercentage,
    ROUND(COALESCE((CAST(ea.AbsentCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS AbsentPercentage,
    ROUND(COALESCE((CAST(ea.LeaveCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS LeavePercentage,
    ROUND(COALESCE((CAST(ea.OnTimeCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS OnTimePercentage,
    ROUND(COALESCE((CAST(ea.LateCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS LatePercentage,
    ROUND(COALESCE((CAST(ea.EarlyOutCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS EarlyOutPercentage,
    ROUND(COALESCE((CAST(ea.ExitCount AS DECIMAL) / ea.TotalDays) * 100, 0), 2) AS ExitPercentage,  -- New Exit Percentage
    ROUND(COALESCE((CAST(SUM(ea.PresentCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallPresentPercentage,
    ROUND(COALESCE((CAST(SUM(ea.AbsentCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallAbsentPercentage,
    ROUND(COALESCE((CAST(SUM(ea.LeaveCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallLeavePercentage,
    ROUND(COALESCE((CAST(SUM(ea.OnTimeCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallOnTimePercentage,
    ROUND(COALESCE((CAST(SUM(ea.LateCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallLatePercentage,
    ROUND(COALESCE((CAST(SUM(ea.EarlyOutCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallEarlyOutPercentage,
    ROUND(COALESCE((CAST(SUM(ea.ExitCount) OVER () AS DECIMAL) / SUM(ea.TotalDays) OVER ()) * 100, 0), 2) AS OverallExitPercentage
FROM
    Employees e
LEFT JOIN
    EmployeeAttendance ea ON e.EmployeeId = ea.EmployeeId
WHERE
    e.EmployeeId <> 1
ORDER BY
    e.employee_code;
