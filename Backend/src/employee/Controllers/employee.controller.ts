import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.findAllEmployee(); // Lấy danh sách tất cả nhân viên
  }

  @Get('/worktypes') async findAllWorkTypes(): Promise<employee_worktype[]> {
    return this.employeeService.findAllWorkTypes();
  }
  @Get('/positions') async findAllPositions(): Promise<employee_position[]> {
    return this.employeeService.findAllPositions();
  }
  @Get('/currentposition') async findAllEmployeeCurrentPosition(): Promise<
    employee_currentposition[]
  > {
    return this.employeeService.findAllEmployeeCurrentPosition();
  }
  @Get('/workhour') async findAllEmployeeWorkHour(): Promise<
    employee_workhour[]
  > {
    return this.employeeService.findAllEmployeeWorkHour();
  }
  @Get('/salary1hour') async findAllSalary1Hour(): Promise<salary1hour[]> {
    return this.employeeService.findAllSalary1Hour();
  }

  @Post() async createEmployee(
    @Body() employeeData: Partial<Employee>,
  ): Promise<Employee> {
    try {
      return await this.employeeService.createEmployee(employeeData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
