import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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

  // @Get('/worktypes') async findAllWorkTypes(): Promise<employee_worktype[]> {
  //   return this.employeeService.findAllWorkTypes();
  // }
  // @Get('/positions') async findAllPositions(): Promise<employee_position[]> {
  //   return this.employeeService.findAllPositions();
  // }
  // @Get('/currentposition') async findAllEmployeeCurrentPosition(): Promise<
  //   employee_currentposition[]
  // > {
  //   return this.employeeService.findAllEmployeeCurrentPosition();
  // }
  // @Get('/workhour') async findAllEmployeeWorkHour(): Promise<
  //   employee_workhour[]
  // > {
  //   return this.employeeService.findAllEmployeeWorkHour();
  // }
  // @Get('/salary1hour') async findAllSalary1Hour(): Promise<salary1hour[]> {
  //   return this.employeeService.findAllSalary1Hour();
  // }

  @Post() async createEmployee(
    @Body() employeeData: Partial<Employee>,
  ): Promise<{ message: string; employee: Employee }> {
    try {
      const employee = await this.employeeService.createEmployee(employeeData);
      return { message: 'Thêm nhân viên thành công!', employee };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':emp_id') async deleteEmployee(
    @Param('emp_id') empId: string,
  ): Promise<{ message: string }> {
    try {
      await this.employeeService.deleteEmployee(empId);
      return { message: 'Xóa nhân viên thành công' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('/cinema') async updateCinemaForEmployee(
  //   // @Param('id') empId: string,
  //   @Body() employeeData: { cinema_id: string; emp_id: string },
  // ): Promise<{ message: string; employee: Employee }> {
  //   try {
  //     const employee =
  //       await this.employeeService.updateCinemaForEmployee(employeeData);
  //     return { message: 'Cập nhật thành công!', employee };
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Patch(':emp_id')
  async updateEmployeeToCinema(
    @Body('cinema_id') cinemaId: string,
    @Param('emp_id') empId: string,
  ): Promise<{ message: string }> {
    try {
      const result = await this.employeeService.updateEmployeeToCinema(
        cinemaId,
        empId,
      );
      if (!result.affected) {
        throw new HttpException(
          `Employee with emp_id ${empId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return { message: 'Cập nhật thành công!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
