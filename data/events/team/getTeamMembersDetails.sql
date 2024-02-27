SELECT
    E.EmployeeId,
    E.first_name,
    E.last_name,
    E.employee_code,
    D.name AS department_name,
    F.name AS function_name,
    L.name AS location_name
FROM
    Employees E
JOIN
    Functions F ON E.function_FunctionId = F.FunctionId
JOIN
    Locations L ON E.location_LocationId = L.LocationId
JOIN
    Departments D ON E.department_DepartmentId = D.DepartmentId
WHERE
    E.Group_GroupId = (SELECT Group_GroupId FROM Employees WHERE EmployeeId = @EmployeeId)
    AND E.EmployeeId <> @EmployeeId