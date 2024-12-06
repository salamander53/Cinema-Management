import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql', // Hoặc 'mysql' nếu bạn dùng MySQL
        host: 'khoaserver.database.windows.net', // Địa chỉ của Azure SQL Server
        port: 1433, // Cổng mặc định cho SQL Server
        username: 'khoa123', // Tên đăng nhập Azure SQL
        password: 'khoa@123', // Mật khẩu đăng nhập Azure SQL
        database: 'Cinema', // Tên cơ sở dữ liệu
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Đường dẫn đến các Entity
        synchronize: true, // Cảnh báo: Không nên dùng trong môi trường sản xuất
        options: {
          encrypt: true, // Azure yêu cầu mã hóa kết nối
          trustServerCertificate: true, // Bỏ qua chứng chỉ SSL nếu cần thiết
        },
      });

      return dataSource.initialize(); // Khởi tạo kết nối
    },
  },
];
