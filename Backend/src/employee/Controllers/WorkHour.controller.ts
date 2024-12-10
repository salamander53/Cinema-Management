import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { WorkHourService } from '../Services/WorkHour.service';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';

@Controller('workhour')
export class WorkHourController {
  constructor(private readonly employeeWorkHourService: WorkHourService) {}

  @Post() async addWorkHour(
    @Body()
    workHourData: {
      emp_id: string;
      cinema_id: string;
      workhour: number;
    },
  ): Promise<{ message: string; workHour: employee_workhour }> {
    try {
      const workHour =
        await this.employeeWorkHourService.addWorkHour(workHourData);
      return { message: 'Thêm giờ làm việc thành công!', workHour };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/aggregated') async getAggregatedWorkHours(): Promise<{
    message: string;
    data: { emp_id: string; cinema_id: string; total_workhour: number }[];
  }> {
    try {
      const data = await this.employeeWorkHourService.getAggregatedWorkHours();
      return { message: 'Lấy dữ liệu tổng hợp thành công!', data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
