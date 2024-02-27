SELECT
    e.EmployeeId,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    e.employee_code,
    SUBSTRING(ag.name, 9, LEN(ag.name)) AS AccessGroup
FROM
    Employees e
JOIN
    AccessGroups ag ON e.access_group_AccessGroupId = ag.AccessGroupId