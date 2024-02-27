SELECT
  CASE
    WHEN e.EmployeeId = 1 THEN 'Super HR'
    ELSE oc.CampusCode
  END AS CampusCode
FROM Employees e
LEFT JOIN OrganizationCampus oc ON e.campus_id = oc.Id
WHERE e.EmployeeId = @EmployeeId