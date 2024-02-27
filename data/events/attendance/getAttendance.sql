SELECT *
FROM [dbo].[ConsolidatedAttendances]
WHERE [employee_EmployeeId]=@EmployeeId AND YEAR([date]) = @selectedYear AND MONTH([date]) = @selectedMonth