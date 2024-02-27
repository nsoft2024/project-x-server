INSERT INTO [dbo].[Employees] (
    [first_name],
    [last_name],
    [email],
    [mobile_no],
    [active]
)
VALUES 
(
    @first_name,
    @last_name,
    @email,
    @mobile_no,
    @active
);

SELECT SCOPE_IDENTITY() AS EmployeeId;