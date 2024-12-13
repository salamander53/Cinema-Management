import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { Salary1HourService } from '../Services/Salary1Hour.service';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';

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

  @Patch() async updateSalary(
    @Body()
    salaryData: {
      position_id: number;
      workType_id: number;
      salary1hour: number;
    },
  ): Promise<{ message: string }> {
    try {
      await this.salary1hourService.updateSalary(salaryData);
      return { message: 'Cập nhật lương thành công!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete() async deleteSalary(
    @Body() salaryData: { position_id: number; workType_id: number },
  ): Promise<{ message: string }> {
    try {
      await this.salary1hourService.deleteSalary(salaryData);
      return { message: 'Xóa giá trị lương theo giờ thành công!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/worktypes') async findAllWorkTypes(): Promise<employee_worktype[]> {
    return this.salary1hourService.findAllWorkTypes();
  }
  @Get('/positions') async findAllPositions(): Promise<employee_position[]> {
    return this.salary1hourService.findAllPositions();
  }
  @Post('/positions') async addPosition(
    @Body() positionData: { position_name: string },
  ): Promise<{ message: string; position: employee_position }> {
    try {
      const position = await this.salary1hourService.addPosition(positionData);
      return { message: 'Thêm vị trí công việc thành công!', position };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
