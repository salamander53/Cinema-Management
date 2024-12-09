import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CinemaService } from '../Services/Cinema.service';
import { Cinema } from 'src/Etities/Cinema/Cinema.entity';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { ViewEmployee } from 'src/Etities/View/ViewEmployee.entity';
import { EmployeeSalary } from 'src/Etities/View/EmployeeSalary.entity';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';

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
  @Get(':id/employee') async getPositionOfEmployeeOfCinema(
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
  @Get(':id/employee/salary') async getEmployeeSalaries(): Promise<
    EmployeeSalary[]
  > {
    return this.cinemaService.getEmployeeSalaries();
  }
  //////////DELETE////////
  @Delete(':cinema_id') async deleteCinema(
    @Param('cinema_id') cinemaId: string,
  ): Promise<{ message: string }> {
    try {
      await this.cinemaService.deleteCinema(cinemaId);
      return { message: 'Xóa rạp phim thành công!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  ////CREATE///
  @Post() async createCinema(
    @Body() cinemaData: Partial<Cinema>,
  ): Promise<{ message: string; cinema: Cinema }> {
    try {
      const cinema = await this.cinemaService.createCinema(cinemaData);
      return { message: 'Thêm rạp phim thành công!', cinema };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /////ADD EMPLOYEE TO CINEMA///
  @Post('employee') async addEmployeeToCinema(
    @Body() workHourData: { cinema_id: string; emp_id: string },
  ): Promise<any> {
    try {
      const workHour =
        await this.cinemaService.addEmployeeToCinema(workHourData);
      return { message: 'Thêm thành công!', workHour };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
