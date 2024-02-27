UPDATE [dbo].[Employees]
SET [first_name]=@first_name,
    [last_name]=@last_name,
    [email]=@mobile_no,
    [active]=@active
WHERE [EmployeeId]=@EmployeeId

SELECT [EmployeeId]
      ,[first_name]
      ,[last_name]
      ,[email]
      ,[active]
  FROM [dbo].[Employees]
  WHERE [EmployeeId]=@EmployeeId