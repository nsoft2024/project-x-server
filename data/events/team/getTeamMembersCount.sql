WITH EmployeeGroup AS (
    SELECT Group_GroupId
    FROM Employees
    WHERE EmployeeId = @EmployeeId
)

SELECT EG.Group_GroupId,
       COALESCE(COUNT(PAL_present.PersistentAttendanceLogId), 0) AS Present,
       COALESCE(COUNT(CASE WHEN LA.EmployeeId IS NULL THEN PAL_absent.PersistentAttendanceLogId END), 0) AS Absent,
       COALESCE(COUNT(DISTINCT LA.EmployeeId), 0) AS Leaves
FROM EmployeeGroup EG
LEFT JOIN Employees E ON EG.Group_GroupId = E.Group_GroupId
LEFT JOIN PersistentAttendanceLogs PAL_present ON E.EmployeeId = PAL_present.PersistentAttendanceLogId AND (PAL_present.time_in IS NOT NULL OR PAL_present.time_out IS NOT NULL)
LEFT JOIN PersistentAttendanceLogs PAL_absent ON E.EmployeeId = PAL_absent.PersistentAttendanceLogId AND (PAL_absent.time_in IS NULL AND PAL_absent.time_out IS NULL)
LEFT JOIN LeaveApplications LA ON E.EmployeeId = LA.EmployeeId AND GETDATE() BETWEEN LA.FromDate AND LA.ToDate AND LA.LeaveStatusId = 2
GROUP BY EG.Group_GroupId