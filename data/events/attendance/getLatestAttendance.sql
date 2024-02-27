SELECT TOP 1
    [time_in],
    [time_out],
    [terminal_in],
    [terminal_out]
FROM
    PersistentAttendanceLogs
WHERE
    [PersistentAttendanceLogId] = @EmployeeId