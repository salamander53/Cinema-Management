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

