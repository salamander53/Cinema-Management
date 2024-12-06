-- CREATE VIEW Salary(
-- SELECT e.emp_name, e.position_id, e.workType_id
-- FROM Employee e
-- );

-- -- JOIN Employee_WorkHour ew ON e.emp_id = ew.emp_id
-- -- JOIN Salary1hour s ON e.workType_id = s.workType_id AND e.position_id = s.position_id;

-- SELECT *
-- FROM Salary


CREATE VIEW ViewEmployee
AS
    SELECT e.emp_id, e.emp_name, e.emp_phone, e.emp_address, p.position_name, wt.workType_name
    FROM Employee e
        JOIN Employee_CurrentPosition cp ON e.emp_id = cp.emp_id
        JOIN Employee_Position p ON p.position_id = cp.position_id
        JOIN Employee_WorkType wt ON cp.workType_id = wt.workType_id

GO

CREATE VIEW EmployeeSalary
AS
    SELECT
        e.emp_id,
        e.emp_name,
        e.emp_phone,
        e.emp_address,
        SUM(wh.workhour * s.salary1hour) AS salary
    FROM Employee e
        JOIN Employee_CurrentPosition cp ON e.emp_id = cp.emp_id
        JOIN Employee_WorkHour wh ON wh.emp_id = e.emp_id
        JOIN Salary1hour s ON s.position_id = cp.position_id AND s.workType_id = cp.workType_id
    GROUP BY 
    e.emp_id, 
    e.emp_name, 
    e.emp_phone, 
    e.emp_address;
