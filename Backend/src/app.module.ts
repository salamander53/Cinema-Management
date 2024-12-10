import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/Modules/employee.module';
import { CurrentPositionModule } from './employee/Modules/CurrentPostition.module';
import { WorkHourModule } from './employee/Modules/WorkHour.module';
import { CinemaModule } from './Cinema/Modules/cinema.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    CurrentPositionModule,
    WorkHourModule,

    CinemaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
