import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CinemaService } from '../Services/Cinema.service';
import { Cinema } from 'src/Etities/Cinema/Cinema.entity';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { ViewEmployee } from 'src/Etities/View/ViewEmployee.entity';
import { EmployeeSalary } from 'src/Etities/View/EmployeeSalary.entity';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get()
  async findAll(): Promise<Cinema[]> {
    return this.cinemaService.findAll();
  }
  // @Get(':id/employees') async getEmployeesOfCinema(
  //   @Param('id') id: string,
  // ): Promise<Employee[]> {
  //   const employees = await this.cinemaService.getEmployeesOfCinema(id);
  //   if (!employees.length) {
  //     throw new HttpException(
  //       'No employees found for this cinema',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return employees;
  // }

  // @Get(':id/employees/currentposition') async getEmployeeCurrentPositions(
  //   @Param('id') id: string,
  // ): Promise<any[]> {
  //   const currentPositions =
  //     await this.cinemaService.getEmployeeCurrentPositions(id);
  //   if (!currentPositions.length) {
  //     throw new HttpException(
  //       'No positions found for employees at this cinema',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return currentPositions;
  // }
  @Get(':id/employees') async getPositionOfEmployeeOfCinema(
    @Param('id') id: string,
  ): Promise<ViewEmployee[]> {
    const employees =
      await this.cinemaService.getPositionOfEmployeeOfCinema(id);
    if (!employees.length) {
      throw new HttpException(
        'No employees found for this cinema',
        HttpStatus.NOT_FOUND,
      );
    }
    return employees;
  }
  @Get(':id/employees/salary') async getEmployeeSalaries(): Promise<
    EmployeeSalary[]
  > {
    return this.cinemaService.getEmployeeSalaries();
  }
}
