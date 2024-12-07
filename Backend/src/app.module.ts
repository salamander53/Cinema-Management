import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/Modules/employee.module';

@Module({
  imports: [DatabaseModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
