import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll(); // Lấy danh sách tất cả nhân viên
  }

  @Get('/worktypes') async findAllWorkTypes(): Promise<employee_worktype[]> {
    return this.employeeService.findAllWorkTypes();
  }
  @Get('/positions') async findAllPositions(): Promise<employee_position[]> {
    return this.employeeService.findAllPositions();
  }
}
