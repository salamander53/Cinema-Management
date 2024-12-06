-- CREATE PROCEDURE [dbo].[StoredProcedure]
--   @param1 int = 0,
--   @param2 int
-- AS
--   SELECT @param1, @param2
-- RETURN 0

CREATE PROCEDURE CalculateSalary
  @emp_id VARCHAR(10)
AS
BEGIN
  DECLARE @workhour INT;
  DECLARE @salary1hour INT;
  DECLARE @salary INT;

  -- Lấy tổng số giờ làm việc của nhân viên từ bảng Employee_WorkHour
  SELECT @workhour = SUM(workhour)
  FROM Employee_WorkHour
  WHERE emp_id = @emp_id;

  -- Lấy lương mỗi giờ dựa trên workType_id và position_id từ bảng Salary1hour
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

EXEC GetEmployeesWithoutPositionOrWorkType;

