-- Tạo bảng Cinema
CREATE TABLE Cinema
(
    cinema_id VARCHAR(100) PRIMARY KEY,
    cinema_name NVARCHAR(100),
    cinema_address NVARCHAR(255)
);

-- Tạo bảng Employee
CREATE TABLE Employee
(
    emp_id VARCHAR(10) PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    emp_birth_date DATE NOT NULL,
    emp_cccd INT UNIQUE NOT NULL,
    emp_address VARCHAR(255) NOT NULL,
    emp_phone VARCHAR(15) NOT NULL,
    cinema_id VARCHAR(100),
    FOREIGN KEY (cinema_id) REFERENCES Cinema(cinema_id)
);

-- Tạo bảng Employee_Position
CREATE TABLE Employee_Position
(
    position_id INT IDENTITY(1,1) PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL
);

-- Tạo bảng Employee_WorkType
CREATE TABLE Employee_WorkType
(
    workType_id INT IDENTITY(1,1) PRIMARY KEY,
    workType_name VARCHAR(100) NOT NULL
);

-- Tạo bảng Salary1hour
CREATE TABLE Salary1hour
(
    workType_id INT NOT NULL,
    position_id INT NOT NULL,
    salary1hour DECIMAL(10, 2),
    FOREIGN KEY (workType_id) REFERENCES Employee_WorkType(workType_id),
    FOREIGN KEY (position_id) REFERENCES Employee_Position(position_id)
);

-- Tạo bảng Employee_WorkHour
CREATE TABLE Employee_WorkHour
(
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    emp_id VARCHAR(10) NOT NULL,
    cinema_id VARCHAR(100) NOT NULL,
    workhour INT NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
    FOREIGN KEY (cinema_id) REFERENCES Cinema(cinema_id)
);

-- Tạo bảng Employee_CurrentPosition
CREATE TABLE Employee_CurrentPosition
(
    emp_id VARCHAR(10) NOT NULL,
    position_id INT NOT NULL,
    workType_id INT NOT NULL,
    PRIMARY KEY (emp_id, position_id, workType_id),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
    FOREIGN KEY (workType_id) REFERENCES Employee_WorkType(workType_id),
    FOREIGN KEY (position_id) REFERENCES Employee_Position(position_id)
);

-- Tạo bảng Sequence
CREATE TABLE Sequence
(
    seq_name VARCHAR(50) PRIMARY KEY,
    seq_value INT NOT NULL
);


-- Tạo bảng User
-- CREATE TABLE [user]
-- (
--     id INT IDENTITY(1,1) PRIMARY KEY,
--     username VARCHAR(15) NOT NULL UNIQUE,
--     password VARCHAR(15) NOT NULL
-- );
GO

-- Tạo stored procedure CalculateSalary
CREATE PROCEDURE CalculateSalary
    @emp_id VARCHAR(10)
AS
BEGIN
    DECLARE @workhour INT;
    DECLARE @salary1hour DECIMAL(10, 2);
    DECLARE @salary DECIMAL(10, 2);

    -- Lấy tổng số giờ làm việc
    SELECT @workhour = SUM(workhour)
    FROM Employee_WorkHour
    WHERE emp_id = @emp_id;

    -- Lấy lương mỗi giờ
    SELECT @salary1hour = s.salary1hour
    FROM Employee_CurrentPosition ecp
        JOIN Salary1hour s ON ecp.workType_id = s.workType_id AND ecp.position_id = s.position_id
    WHERE ecp.emp_id = @emp_id;

    -- Tính tổng lương
    SET @salary = @workhour * @salary1hour;

    -- Trả về kết quả
    SELECT @salary AS TotalSalary;
END;
GO

-- Tạo stored procedure GetEmployeesWithoutPositionOrWorkType
CREATE PROCEDURE GetEmployeesWithoutPositionOrWorkType
AS
BEGIN
    SELECT e.emp_id, e.emp_name, e.emp_birth_date, e.emp_cccd, e.emp_address, e.emp_phone
    FROM Employee e
    WHERE NOT EXISTS (
        SELECT 1
    FROM Employee_CurrentPosition ec
    WHERE e.emp_id = ec.emp_id
    );
END;
GO

-- Tạo trigger trg_InsertEmployee
CREATE TRIGGER trg_InsertEmployee
ON Employee
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextValue INT;
    DECLARE @Prefix NVARCHAR(3) = 'EMP';

    -- Lấy giá trị tăng dần hiện tại
    SELECT @NextValue = seq_value
    FROM Sequence
    WHERE seq_name = 'Employee';

    -- Cập nhật Sequence
    UPDATE Sequence
    SET seq_value = seq_value + (SELECT COUNT(*)
    FROM inserted)
    WHERE seq_name = 'Employee';

    -- Chèn dữ liệu
    WITH
        NumberedRows
        AS
        (
            SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1 AS RowNum, *
            FROM inserted
        )
    INSERT INTO Employee
        (emp_id, emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone)
    SELECT
        @Prefix + RIGHT('0000' + CAST(@NextValue + RowNum AS VARCHAR), 4),
        emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone
    FROM NumberedRows;
END;
GO

-- Tạo trigger trg_InsertCinema
CREATE TRIGGER trg_InsertCinema
ON Cinema
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextValue INT;
    DECLARE @Prefix NVARCHAR(3) = 'CIN';

    -- Lấy giá trị tăng dần hiện tại
    SELECT @NextValue = seq_value
    FROM Sequence
    WHERE seq_name = 'Cinema';

    -- Cập nhật Sequence
    UPDATE Sequence
    SET seq_value = seq_value + (SELECT COUNT(*)
    FROM inserted)
    WHERE seq_name = 'Cinema';

    -- Chèn dữ liệu
    WITH
        NumberedRows
        AS
        (
            SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1 AS RowNum, *
            FROM inserted
        )
    INSERT INTO Cinema
        (cinema_id, cinema_name, cinema_address)
    SELECT
        @Prefix + RIGHT('0' + CAST(@NextValue + RowNum AS VARCHAR), 4),
        cinema_name, cinema_address
    FROM NumberedRows;
END;
GO

-- Tạo trigger trg_InsertSalaryFromWorkType
CREATE TRIGGER trg_InsertSalaryFromWorkType
ON Employee_WorkType
AFTER INSERT
AS
BEGIN
    INSERT INTO Salary1hour
        (workType_id, position_id, salary1hour)
    SELECT i.workType_id, p.position_id, NULL
    FROM inserted i
    CROSS JOIN Employee_Position p
    WHERE NOT EXISTS (
        SELECT 1
    FROM Salary1hour es
    WHERE es.workType_id = i.workType_id AND es.position_id = p.position_id
    );
END;
GO

-- Tạo trigger trg_InsertSalaryFromPosition
CREATE TRIGGER trg_InsertSalaryFromPosition
ON Employee_Position
AFTER INSERT
AS
BEGIN
    INSERT INTO Salary1hour
        (workType_id, position_id, salary1hour)
    SELECT w.workType_id, i.position_id, NULL
    FROM inserted i
    CROSS JOIN Employee_WorkType w
    WHERE NOT EXISTS (
        SELECT 1
    FROM Salary1hour es
    WHERE es.workType_id = w.workType_id AND es.position_id = i.position_id
    );
END;
GO
----------------------

-- Insert data into Sequence table
INSERT INTO Sequence
    (seq_name, seq_value)
VALUES
    ('Employee', 1),
    ('Cinema', 1);

-- Insert data into Cinema table
INSERT INTO Cinema
    ( cinema_name, cinema_address)
VALUES
    ( 'Galaxy Cinema', '123 Main Street, District 1'),
    ( 'CGV Cinema', '456 Maple Avenue, District 2'),
    ('Lotte Cinema', '789 Oak Street, District 3'),
    ( 'BHD Star Cinema', '321 Pine Avenue, District 4');

-- Insert data into Employee table
INSERT INTO Employee
    ( emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone, cinema_id)
VALUES
    ( 'John Doe', '1990-01-15', 123456789, '123 Main Street, District 1', '0123456789', 'CIN001'),
    ( 'Jane Smith', '1985-03-22', 987654321, '456 Maple Avenue, District 2', '0987654321', 'CIN002'),
    ( 'Michael Brown', '1992-06-10', 456123789, '789 Oak Street, District 3', '0912345678', 'CIN003'),
    ( 'Emily Davis', '1993-04-18', 321654987, '321 Pine Avenue, District 4', '0901234567', 'CIN004');

--
UPDATE Employee
SET cinema_id = 
    CASE 
        WHEN emp_id = 'EMP0001' THEN 'CIN01' 
        WHEN emp_id = 'EMP0002' THEN 'CIN02' 
        WHEN emp_id = 'EMP0003' THEN 'CIN03' 
        WHEN emp_id = 'EMP0004' THEN 'CIN04' 
        ELSE NULL
    END;

-- Insert data into Employee_Position table
INSERT INTO Employee_Position
    (position_name)
VALUES
    ('Manager'),
    ('Cashier'),
    ('Cleaner'),
    ('Technician');

-- Insert data into Employee_WorkType table
INSERT INTO Employee_WorkType
    (workType_name)
VALUES
    ('Full-time'),
    ('Part-time'),
    ('Contract'),
    ('Intern');

-- Insert data into Salary1hour table
INSERT INTO Salary1hour
    (workType_id, position_id, salary1hour)
VALUES
    (1, 1, 50000),
    (2, 1, 25000),
    (1, 2, 35000),
    (2, 2, 20000),
    (1, 3, 30000),
    (2, 3, 15000),
    (1, 4, 40000),
    (2, 4, 20000);

DELETE FROM Salary1hour

INSERT INTO Salary1hour
    (workType_id, position_id, salary1hour)
VALUES
    (1, 1, 50000),
    (2, 1, 25000),
    (1, 2, 35000),
    (2, 2, 20000),
    (1, 3, 30000),
    (2, 3, 15000),
    (1, 4, 40000),
    (2, 4, 20000);

-- Insert data into Employee_WorkHour table
INSERT INTO Employee_WorkHour
    (emp_id, cinema_id, workhour)
VALUES
    ('EMP0001', 'CIN01', 40),
    ('EMP0002', 'CIN02', 35),
    ('EMP0003', 'CIN03', 38),
    ('EMP0004', 'CIN04', 42);

-- Insert data into Employee_CurrentPosition table
INSERT INTO Employee_CurrentPosition
    (emp_id, position_id, workType_id)
VALUES
    ('EMP0001', 1, 1),
    ('EMP0002', 2, 2),
    ('EMP0003', 3, 1),
    ('EMP0004', 4, 2);


--------------------- Xóa bảng từ lớp con đến lớp cha

-- Xóa các triggers
DROP TRIGGER IF EXISTS trg_InsertEmployee;
DROP TRIGGER IF EXISTS trg_InsertCinema;
DROP TRIGGER IF EXISTS trg_InsertSalaryFromWorkType;
DROP TRIGGER IF EXISTS trg_InsertSalaryFromPosition;

-- Xóa các stored procedures
DROP PROCEDURE IF EXISTS CalculateSalary;
DROP PROCEDURE IF EXISTS GetEmployeesWithoutPositionOrWorkType;

-- Xóa bảng con trước
DROP TABLE IF EXISTS Employee_WorkHour;
DROP TABLE IF EXISTS Employee_CurrentPosition;
DROP TABLE IF EXISTS Salary1hour;
DROP TABLE IF EXISTS Employee_WorkType;
DROP TABLE IF EXISTS Employee_Position;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Cinema;
DROP TABLE IF EXISTS Sequence;