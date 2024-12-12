import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders], // Xuất các provider để có thể sử dụng ở module khác
})
export class DatabaseModule {}
