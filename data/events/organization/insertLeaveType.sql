INSERT INTO LeaveTypes
    (LeaveTypeText,
     LeaveDefaultCount,
     LeaveMaxCount,
     CreateDateTime,
     UpdateDateTime)
VALUES
    (@LeaveType,
     @DefaultCount,
     @MaxCount,
     GETDATE(),
     GETDATE())