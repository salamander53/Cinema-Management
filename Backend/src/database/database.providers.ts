import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Employee } from 'src/Etities/Employee/Employee.entity';

const logger = new Logger('DatabaseConnection');

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'khoaserver.database.windows.net',
        port: 1433,
        username: 'khoa123',
        password: 'khoa@123',
        database: 'Cinema',
        entities: [Employee],
        synchronize: false,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      });

      try {
        await dataSource.initialize();
        logger.log('Database connection established successfully');
        return dataSource;
      } catch (error) {
        logger.error('Error during database connection:', error);
        throw error;
      }
    },
  },
];
