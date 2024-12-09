import { Module } from '@nestjs/common';
import { mainEmpProviders } from '../Providers/mainEmp.provider';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeService } from '../Services/employee.service';
import { EmployeeController } from '../Controllers/employee.controller';
import { mainCineProviders } from 'src/Cinema/Provider/mainCine.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...mainEmpProviders, ...mainCineProviders, EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
