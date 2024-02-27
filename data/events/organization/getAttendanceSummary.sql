WITH AttendanceCounts AS (
    SELECT
        e.EmployeeId,
        COUNT(CASE WHEN ca.final_remarks LIKE '%P%' AND ca.final_remarks NOT LIKE 'OFF' THEN 1 END) AS PresentCount,
        COUNT(CASE WHEN ca.final_remarks IN ('LV', 'OT', 'OM', 'OV') THEN 1 END) AS PresentCountWithLeave,
        COUNT(CASE WHEN ca.final_remarks = 'AB' THEN 1 END) AS AbsentCount,
        COUNT(CASE WHEN ca.final_remarks IN ('OT', 'OV', 'OM', 'LV') THEN 1 END) AS LeaveCount,
        COUNT(CASE WHEN ca.status_in = 'On Time' THEN 1 END) AS OnTimeCount,
        COUNT(CASE WHEN ca.status_in = 'Late' THEN 1 END) AS LateCount,
        COUNT(CASE WHEN ca.status_out = 'Early Out' THEN 1 END) AS EarlyOutCount
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
    d.name AS Department,
    des.name AS Designation,
    oc.CampusCode AS Institute,
    ac.PresentCount,
    ac.PresentCountWithLeave,
    ac.AbsentCount,
    ac.LeaveCount,
    ac.OnTimeCount,
    ac.LateCount,
    ac.EarlyOutCount
FROM
    Employees e
JOIN
    Departments d ON e.department_DepartmentId = d.DepartmentId
JOIN
    Designations des ON e.designation_DesignationId = des.DesignationId
JOIN
    OrganizationCampus oc ON e.campus_id = oc.Id
LEFT JOIN
    AttendanceCounts ac ON e.EmployeeId = ac.EmployeeId
WHERE
    e.EmployeeId <> 1
ORDER BY
    e.employee_code