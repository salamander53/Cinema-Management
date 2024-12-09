import { Module } from '@nestjs/common';
import { mainEmpProviders } from '../Providers/mainEmp.provider';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeService } from '../Services/employee.service';
import { EmployeeController } from '../Controllers/employee.controller';
import { mainCineProviders } from 'src/Cinema/Provider/mainCine.provider';
import { Salary1HourService } from '../Services/Salary1Hour.service';
import { Salary1HourController } from '../Controllers/Salary1Hour.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...mainEmpProviders,
    ...mainCineProviders,
    EmployeeService,
    Salary1HourService,
  ],
  controllers: [EmployeeController, Salary1HourController],
})
export class EmployeeModule {}
