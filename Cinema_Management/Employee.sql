-- Bảng liên quan đến Employee
CREATE TABLE Employee
(
  emp_id VARCHAR(10) PRIMARY KEY,
  emp_name VARCHAR(100) NOT NULL,
  emp_birth_date DATE NOT NULL,
  emp_cccd INT UNIQUE NOT NULL,
  emp_address VARCHAR(255) NOT NULL,
  emp_phone VARCHAR(15) NOT NULL UNIQUE,
);

CREATE TABLE Employee_Position
(
  position_id INT PRIMARY KEY,
  position_name VARCHAR(100) NOT NULL
);

CREATE TABLE Employee_WorkType
(
  workType_id INT PRIMARY KEY,
  workType_name VARCHAR(100) NOT NULL
);

CREATE TABLE Salary1hour
(
  workType_id INT NOT NULL,
  position_id INT NOT NULL,
  FOREIGN KEY (workType_id) REFERENCES Employee_WorkType(workType_id),
  FOREIGN KEY (position_id) REFERENCES Employee_Position(position_id),
  salary1hour INT NOT NULL
);

CREATE TABLE Employee_WorkHour
(
  emp_id VARCHAR(10) NOT NULL,
  cinema_id VARCHAR(100) NOT NULL,
  workhour INT NOT NULL,
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
  FOREIGN KEY (cinema_id) REFERENCES Cinema(cinema_id)
);

CREATE TABLE Employee_CurrentPosition
(
  emp_id VARCHAR(10) NOT NULL,
  position_id INT NOT NULL,
  workType_id INT NOT NULL,
  FOREIGN KEY (emp_id) REFERENCES Employee(emp_id),
  FOREIGN KEY (workType_id) REFERENCES Employee_WorkType(workType_id),
  FOREIGN KEY (position_id) REFERENCES Employee_Position(position_id)
)

-- -- Chèn dữ liệu vào bảng Employee
-- INSERT INTO Employee
--   (emp_id, emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone)
-- VALUES
--   ('EMP001', 'Nguyễn Văn A', '1990-01-15', 123456789, '123 Đường A, Quận 1', '0123456789'),
--   ('EMP002', 'Trần Thị B', '1985-03-22', 987654321, '456 Đường B, Quận 2', '0987654321'),
--   ('EMP003', 'Lê Văn C', '1992-06-10', 456123789, '789 Đường C, Quận 3', '0912345678'),
--   ('EMP004', 'Phạm Thị D', '1993-04-18', 321654987, '111 Đường D, Quận 4', '0901234567'),
--   ('EMP005', 'Đỗ Văn E', '1988-09-30', 654987321, '222 Đường E, Quận 5', '0987123456'),
--   ('EMP006', 'Nguyễn Thị F', '1975-12-15', 789456123, '333 Đường F, Quận 6', '0918123456'),
--   ('EMP007', 'Lê Thị G', '1991-03-08', 963852741, '444 Đường G, Quận 7', '0909988776'),
--   ('EMP008', 'Trần Văn H', '1986-07-25', 852741963, '555 Đường H, Quận 8', '0917788990');

-- -- Chèn dữ liệu vào bảng Employee_Position
-- INSERT INTO Employee_Position
--   (position_id, position_name)
-- VALUES
--   (1, 'Manager'),
--   (2, 'Cashier'),
--   (3, 'Cleaner');

-- -- Chèn dữ liệu vào bảng Employee_WorkType
-- INSERT INTO Employee_WorkType
--   (workType_id, workType_name)
-- VALUES
--   (1, 'Full-time'),
--   (2, 'Part-time');

-- -- Chèn dữ liệu vào bảng Salary1hour
-- INSERT INTO Salary1hour
--   (workType_id, position_id, salary1hour)
-- VALUES
--   (1, 1, 40000),
--   (2, 1, 20000),
--   (1, 2, 30000),
--   (2, 2, 15000),
--   (1, 3, 25000),
--   (2, 3, 10000);

-- -- Chèn dữ liệu vào bảng Employee_WorkHour
-- INSERT INTO Employee_WorkHour
--   (emp_id, cinema_id, workhour)
-- VALUES
--   ('EMP001', 'CIN001', 40),
--   ('EMP002', 'CIN002', 35),
--   ('EMP003', 'CIN001', 30),
--   ('EMP004', 'CIN002', 25),
--   ('EMP005', 'CIN001', 45),
--   ('EMP006', 'CIN002', 50),
--   ('EMP007', 'CIN001', 20),
--   ('EMP008', 'CIN002', 38);

-- -- Chèn dữ liệu vào bảng Employee_CurrentPosition
-- INSERT INTO Employee_CurrentPosition
--   (emp_id, position_id, workType_id)
-- VALUES
--   ('EMP001', 1, 1),
--   ('EMP002', 2, 2),
--   ('EMP003', 3, 1),
--   ('EMP004', 2, 2),
--   ('EMP005', 1, 1),
--   ('EMP006', 3, 2),
--   ('EMP007', 2, 1),
--   ('EMP008', 1, 2);
