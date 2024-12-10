CREATE TRIGGER trg_InsertEmployee
ON Employee
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextValue INT;
    DECLARE @Prefix NVARCHAR(3) = 'EMP';

    -- Lấy giá trị tăng dần hiện tại từ bảng Sequence
    SELECT @NextValue = seq_value
    FROM Sequence
    WHERE seq_name = 'Employee';

    -- Cập nhật Sequence với số lượng bản ghi được chèn
    UPDATE Sequence
    SET seq_value = seq_value + (SELECT COUNT(*)
    FROM inserted)
    WHERE seq_name = 'Employee';

    -- Tạo và chèn các emp_id dựa trên giá trị tăng dần
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
        emp_name,
        emp_birth_date,
        emp_cccd,
        emp_address,
        emp_phone
    FROM NumberedRows;
END;

drop TRIGGER trg_InsertCinema
GO
CREATE TRIGGER trg_InsertCinema
ON Cinema
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextValue INT;
    DECLARE @Prefix NVARCHAR(3) = 'CIN';

    -- Lấy giá trị tăng dần hiện tại từ bảng Sequence
    SELECT @NextValue = seq_value
    FROM Sequence
    WHERE seq_name = 'Cinema';

    -- Cập nhật Sequence với số lượng bản ghi được chèn
    UPDATE Sequence
    SET seq_value = seq_value + (SELECT COUNT(*)
    FROM inserted)
    WHERE seq_name = 'Cinema';

    -- Tạo và chèn các cinema_id dựa trên giá trị tăng dần
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
DROP TRIGGER trg_InsertSalaryFromPosition