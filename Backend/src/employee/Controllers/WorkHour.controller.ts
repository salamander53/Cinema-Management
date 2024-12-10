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

  @Get() async getAllWorkHours(): Promise<{
    message: string;
    workHours: employee_workhour[];
  }> {
    try {
      const workHours = await this.employeeWorkHourService.getAllWorkHours();
      return { message: 'Lấy dữ liệu giờ làm việc thành công!', workHours };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

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
      if (!workHour)
        throw new HttpException(
          'Không tồn tại nhân viên hoặc rạp phim!',
          HttpStatus.BAD_REQUEST,
        );
      return { message: 'Thêm giờ làm việc thành công!', workHour };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  async getWorkHour() {}

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
