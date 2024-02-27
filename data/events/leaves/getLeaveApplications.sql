SELECT
    la.Id,
    la.EmployeeId,
    la.FromDate,
    la.ToDate,
    CASE
        WHEN ls.LeaveStatusText IS NOT NULL THEN ls.LeaveStatusText
        ELSE 'Pending'
    END AS LeaveStatus,
    la.ApproverId,
    lt.LeaveTypeText AS LeaveType,
    lr.LeaveReasonText AS LeaveReason,
    la.DaysCount
FROM
    LeaveApplications la
LEFT JOIN
    LeaveStatus ls ON la.LeaveStatusId = ls.Id
LEFT JOIN
    LeaveTypes lt ON la.LeaveTypeId = lt.Id
LEFT JOIN
    LeaveReasons lr ON la.LeaveReasonId = lr.Id
WHERE
    la.ApproverId = @EmployeeId
ORDER BY
    la.CreateDateTime DESC