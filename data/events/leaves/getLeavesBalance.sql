SELECT 
    LS.[EmployeeId],
    LS.[YearId],
    SUM(CASE WHEN LS2.[LeaveStatusText] = 'Approved' AND LA.[LeaveTypeId] = 1 THEN LA.[DaysCount] ELSE 0 END) AS UsedMedicalLeaves,
    SUM(CASE WHEN LS2.[LeaveStatusText] = 'Approved' AND LA.[LeaveTypeId] = 2 THEN LA.[DaysCount] ELSE 0 END) AS UsedCasualLeaves,
    SUM(CASE WHEN LS2.[LeaveStatusText] = 'Approved' AND LA.[LeaveTypeId] = 3 THEN LA.[DaysCount] ELSE 0 END) AS UsedEarnedLeaves,
    SUM(CASE WHEN LS2.[LeaveStatusText] = 'Approved' AND LA.[LeaveTypeId] = 4 THEN LA.[DaysCount] ELSE 0 END) AS UsedExPakLeaves,
    LS.[SickLeaves] AS TotalMedicalLeaves,
    LS.[CasualLeaves] AS TotalCasualLeaves,
    LS.[AnnualLeaves] AS TotalEarnedLeaves,
    LS.[OtherLeaves] AS TotalExPakLeaves
FROM [LeaveSessions] LS
LEFT JOIN [LeaveApplications] LA ON LS.[EmployeeId] = LA.[EmployeeId] AND LS.[YearId] = YEAR(LA.[CreateDateTime])
LEFT JOIN [LeaveStatus] LS2 ON LA.[LeaveStatusId] = LS2.[Id]
WHERE LS.[EmployeeId] = @EmployeeId AND LS.[YearId] = @YearId
GROUP BY LS.[EmployeeId], LS.[YearId], LS.[SickLeaves], LS.[CasualLeaves], LS.[AnnualLeaves], LS.[OtherLeaves]