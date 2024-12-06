-- Write your own SQL object definition here, and it'll be included in your package.
CREATE TRIGGER [dbo].[Employee_ID_AutoIncrement]
ON Employee
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @prefix VARCHAR(10) = 'EMP';
    DECLARE @max_id INT;
    DECLARE @new_id VARCHAR(10);

    -- Lấy giá trị số lớn nhất từ emp_id hiện tại
    SELECT @max_id = ISNULL(MAX(CAST(SUBSTRING(emp_id, 4, LEN(emp_id) - 3) AS INT)), 0)
    FROM Employee;

    -- Tăng giá trị lớn nhất lên 1
    SET @max_id = @max_id + 1;

    -- Tạo ID mới theo định dạng PREFIX + số thứ tự 3 ký số
    SET @new_id = @prefix + RIGHT('000' + CAST(@max_id AS VARCHAR), 3);

    -- Thêm bản ghi mới vào bảng Employee
    INSERT INTO Employee
        (emp_id, emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone)
    SELECT @new_id, emp_name, emp_birth_date, emp_cccd, emp_address, emp_phone
    FROM inserted;
END;

DROP TRIGGER Employee_ID_AutoIncrement