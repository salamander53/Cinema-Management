import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

const logger = new Logger('DatabaseConnection');

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'khoa.database.windows.net',
        port: 1433,
        username: 'khoa123',
        password: 'khoa@123',
        database: 'Cinema',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
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
