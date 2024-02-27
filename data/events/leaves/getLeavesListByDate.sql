SELECT
    LA.EmployeeId,
    LT.LeaveTypeText AS LeaveType,
    LA.FromDate,
    LA.DaysCount,
    LS.LeaveStatusText AS LeaveStatus,
    LA.CreateDateTime
FROM [LeaveApplications] AS LA
INNER JOIN [LeaveTypes] AS LT ON LA.LeaveTypeId = LT.Id
INNER JOIN [LeaveStatus] AS LS ON LA.LeaveStatusId = LS.Id
WHERE LA.EmployeeId = @EmployeeId AND YEAR(LA.CreateDateTime) = @Year
