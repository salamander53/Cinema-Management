-- CREATE VIEW Salary(
-- SELECT e.emp_name, e.position_id, e.workType_id
-- FROM Employee e
-- );

-- -- JOIN Employee_WorkHour ew ON e.emp_id = ew.emp_id
-- -- JOIN Salary1hour s ON e.workType_id = s.workType_id AND e.position_id = s.position_id;

-- SELECT *
-- FROM Salary

DROP VIEW ViewEmployee


CREATE VIEW ViewEmployee
AS
    SELECT e.emp_id, e.emp_name, e.emp_birth_date, e.emp_cccd, e.emp_address, e.emp_phone
    FROM Employee e
        JOIN Employee_WorkHour ew ON ew.workhour
    WHERE

SELECT *
FROM ViewEmployee