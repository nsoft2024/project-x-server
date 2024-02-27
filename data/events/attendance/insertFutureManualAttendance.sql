INSERT INTO FutureManualAttendances
    (from_date,
     to_date,
     employee_code,
     remarks)
VALUES
    (@FromDate, 
     @ToDate, 
     @EmployeeCode,
     @Remarks)