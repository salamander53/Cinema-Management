CREATE TABLE [dbo].[Cinema]
(
  Cinema_ID INT IDENTITY(1,1) PRIMARY KEY,
  -- Mã rạp tự tăng
  Name NVARCHAR(100) NOT NULL,
  -- Tên rạp chiếu
  Address NVARCHAR(255) NOT NULL,
  -- Địa chỉ
)