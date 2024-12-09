import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Salary1HourService } from '../Services/Salary1Hour.service';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';

@Controller('salary1hour')
export class Salary1HourController {
  constructor(private readonly salary1hourService: Salary1HourService) {}
  @Get() async getAllSalaries(): Promise<{
    message: string;
    salaries: salary1hour[];
  }> {
    try {
      const salaries = await this.salary1hourService.getAllSalaries();
      return { message: 'Lấy thông tin lương thành công!', salaries };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
