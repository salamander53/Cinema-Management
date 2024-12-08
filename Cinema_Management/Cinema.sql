CREATE TABLE [dbo].[Cinema]
(
  id INT IDENTITY(1,1) PRIMARY KEY,
  -- Mã rạp tự tăng
  Name NVARCHAR(100) NOT NULL,
  -- Tên rạp chiếu
  Address NVARCHAR(255) NOT NULL,
  -- Địa chỉ
);

-- SELECT * FROM Cinema;

INSERT INTO Cinema
  (cinema_id, cinema_name, cinema_address)
VALUES
  ('CIN01', 'CGV', 'District 7 Ward 10 HCM'),
  ('CIN02', 'Galaxy', 'District 10 Ward 7 HCM');
  