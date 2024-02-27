WITH ActiveEmployees AS (
    SELECT COUNT(*) AS TotalActiveUsers
    FROM Employees
    WHERE active = 1
),
PresentEmployees AS (
    SELECT COUNT(*) AS TotalPresentUsers
    FROM PersistentAttendanceLogs
    WHERE (time_in IS NOT NULL OR time_out IS NOT NULL)
        AND CAST(time_in AS DATE) = CAST(GETDATE() AS DATE)
),
LateEmployees AS (
    SELECT COUNT(*) AS TotalLateUsers
    FROM PersistentAttendanceLogs
    WHERE time_in > late_time
        AND CAST(time_in AS DATE) = CAST(GETDATE() AS DATE)
),
OnLeaveEmployees AS (
    SELECT COUNT(*) AS TotalOnLeaveUsers
    FROM LeaveApplications
    WHERE isActive = 1
        AND LeaveStatusId = 2
        AND GETDATE() BETWEEN FromDate AND ToDate
),
TotalRegisteredUsers AS (
    SELECT COUNT(*) AS TotalRegisteredUsers
    FROM Employees
)

SELECT
    (SELECT TotalRegisteredUsers FROM TotalRegisteredUsers) AS TotalRegisteredUsers,
    (SELECT TotalActiveUsers FROM ActiveEmployees) AS TotalActiveUsers,
    (SELECT TotalPresentUsers FROM PresentEmployees) AS TotalPresentUsers,
    ((SELECT TotalActiveUsers FROM ActiveEmployees) - (SELECT TotalPresentUsers FROM PresentEmployees)) AS TotalAbsentUsers,
    (SELECT TotalLateUsers FROM LateEmployees) AS TotalLateUsers,
    ((SELECT TotalActiveUsers FROM ActiveEmployees) - (SELECT TotalLateUsers FROM LateEmployees)) AS TotalOnTimeUsers,
    (SELECT TotalOnLeaveUsers FROM OnLeaveEmployees) AS TotalOnLeaveUsers