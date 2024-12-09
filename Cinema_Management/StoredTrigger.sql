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