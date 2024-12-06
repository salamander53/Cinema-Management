CREATE TABLE Employee
(
  emp_id VARCHAR(10) PRIMARY KEY,
  -- Khoá chính dạng [PREFIX][số tăng dần]
  emp_name VARCHAR(100) NOT NULL,
  -- Tên nhân viên
  emp_birth_date DATE NOT NULL,
  -- Ngày sinh
  -- salary DECIMAL(10, 2) CHECK (salary > 0), -- Lương, phải lớn hơn 0
  emp_cccd INT UNIQUE NOT NULL,
  emp_address VARCHAR(255) NOT NULL UNIQUE,
  emp_phone VARCHAR(15) NOT NULL UNIQUE,
  position_id INT NOT NULL,
  workType_id INT NOT NULL,
  FOREIGN KEY (workType_id) REFERENCES WorkType(workType_id),
  FOREIGN KEY (position_id) REFERENCES Position(position_id),
);

CREATE TABLE Position
(
  position_id INT PRIMARY KEY,
  position_name VARCHAR(100) NOT NULL
)

CREATE TABLE WorkType
(
  workType_id INT PRIMARY KEY,
  workType_name VARCHAR(100) NOT NULL
)

CREATE TABLE Salary1hour
(
  Salary1hour_id INT IDENTITY(1,1) PRIMARY KEY,
  workType_id INT NOT NULL,
  FOREIGN KEY (workType_id) REFERENCES WorkType(workType_id),
  position_id INT NOT NULL,
  FOREIGN KEY (position_id) REFERENCES Position(position_id),
  salary1hour INT NOT NULL
)

CREATE TABLE Employee_WorkHour
(
  emp_id VARCHAR(10) NOT NULL,
  --  Khoá ngoại tham chiếu đến nhân viên
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
  cinema_id VARCHAR(100) NOT NULL,
  -- Khoá ngoại tham chiếu đến rạp phim
  FOREIGN KEY (cinema_id) REFERENCES Cinema(cinema_id),
  workhour INT NOT NULL
)
SELECT *
FROM Salary1hour
INSERT INTO Employee
  (emp_id, emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone, workType_id, position_id)
VALUES
  ('EMP001', 'Nguyễn Văn A', '1990-01-15', 123456789, '123 Đường A, Quận 1', '0123456789', 1, 1),
  ('EMP002', 'Trần Thị B', '1985-03-22', 987654321, '456 Đường B, Quận 2', '0987654321', 2, 2),
  ('EMP003', 'Lê Văn C', '1992-06-10', 456123789, '789 Đường C, Quận 3', '0912345678', 2, 1);

INSERT INTO Position
  (position_id, position_name)
VALUES
  (1, 'Manager'),
  (2, 'Cashier'),
  (3, 'Cleaner');

INSERT INTO WorkType
  (workType_id, workType_name)
VALUES
  (1, 'Full-time'),
  (2, 'Part-time');

INSERT INTO Salary1hour
  (workType_id, position_id, salary1hour)
VALUES
  (1, 1, 20000),
  (2, 2, 15000),
  (2, 1, 40000);

INSERT INTO Employee_WorkHour
  (emp_id, cinema_id, workhour)
VALUES
  ('EMP001', 'CIN001', 40),
  ('EMP002', 'CIN002', 35),
  ('EMP003', 'CIN003', 30);

DELETE FROM Employee;
DELETE FROM Employee_WorkHour;


DROP TABLE Employee_WorkHour
DROP TABLE Employee_Salary
DROP View ViewEmployee
SELECT *
FROM Employee
