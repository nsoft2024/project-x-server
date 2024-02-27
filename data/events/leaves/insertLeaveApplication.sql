INSERT INTO LeaveApplications 
    (EmployeeId, 
    LeaveTypeId, 
    FromDate, 
    ToDate, 
    DaysCount, 
    LeaveReasonId, 
    ReasonDetail, 
    ApproverId, 
    ApproverDetail,
    LeaveStatusId, 
    LeaveStatusHODId, 
    LeaveStatusPRNId,
    LeaveStatusHRId, 
    LeaveStatusVCId, 
    LeaveValidityId, 
    LeaveValidityRemarks, 
    AttachmentFilePath, 
    IsActive,
    CreateDateTime) 
VALUES 
    (@EmployeeId, 
    @LeaveTypeId, 
    @FromDate, 
    @ToDate, 
    DATEDIFF(day, @FromDate, @ToDate) + 1,
    @LeaveReasonId, 
    @ReasonDetail, 
    CASE
        WHEN (SELECT TOP 1 supervisor_id FROM Groups WHERE GroupId = (SELECT Group_GroupId FROM Employees WHERE EmployeeId = @EmployeeId)) = @EmployeeId THEN '1'
        WHEN (SELECT Group_GroupId FROM Employees WHERE EmployeeId = @EmployeeId) IS NULL THEN '1'
        ELSE (SELECT TOP 1 supervisor_id FROM Groups WHERE GroupId = (SELECT Group_GroupId FROM Employees WHERE EmployeeId = @EmployeeId))
    END, 
    NULL, 
    1, 
    1, 
    1, 
    1, 
    1, 
    1, 
    '--',
    @Attachment, 
    1,
    GETDATE())