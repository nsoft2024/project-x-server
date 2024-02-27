SELECT fma.[from_date], 
       fma.[to_date], 
       fma.[employee_code], 
       fma.[remarks]
FROM FutureManualAttendances fma
JOIN Employees e ON fma.employee_code = e.employee_code
WHERE e.Group_GroupId = (SELECT Group_GroupId FROM Employees WHERE employee_code = @EmployeeCode)