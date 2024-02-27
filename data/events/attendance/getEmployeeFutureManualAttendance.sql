SELECT [from_date],
       [to_date],
       [employee_code],
       [remarks]
FROM FutureManualAttendances
WHERE employee_code = @EmployeeCode