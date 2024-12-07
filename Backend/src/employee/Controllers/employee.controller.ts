import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from 'src/Etities/Employee/Employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll(); // Lấy danh sách tất cả nhân viên
  }
}
