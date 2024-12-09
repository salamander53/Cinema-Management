import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CurrentPositionService } from '../Services/CurrentPosition.service';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';

@Controller('currentpostion')
export class CurrentPositionController {
  constructor(
    private readonly employeeCurrentPositionService: CurrentPositionService,
  ) {}

  @Get()
  async getAllEmployees() {
    try {
      const employees =
        await this.employeeCurrentPositionService.getAllEmployees();
      return employees.map((employee) => ({
        emp_id: employee.emp_id,
        emp_name: employee.emp_name,
        emp_phone: employee.emp_phone,
        emp_address: employee.emp_address,
        current_positions: employee.currentPositions.map((position) => ({
          position_name: position.position?.position_name,
          workType_name: position.workType?.workType_name,
        })),
      }));
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while fetching employees',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':emp_id')
  async getEmployeeDetails(@Param('emp_id') empId: string) {
    try {
      const data =
        await this.employeeCurrentPositionService.getEmployeeCurrentPosition(
          empId,
        );
      if (!data) {
        throw new HttpException(
          `No current position found for Employee with id ${empId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return data.map((item) => ({
        emp_id: item.emp_id,
        emp_name: item.employee?.emp_name,
        emp_phone: item.employee?.emp_phone,
        emp_address: item.employee?.emp_address,
        position_name: item.position?.position_name,
        workType_name: item.workType?.workType_name,
      }));
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post() async addCurrentPosition(
    @Body()
    positionData: {
      emp_id: string;
      workType_id: number;
      position_id: number;
    },
  ): Promise<{ message: string; position: employee_currentposition }> {
    try {
      const position =
        await this.employeeCurrentPositionService.addCurrentPosition(
          positionData,
        );
      return { message: 'Thêm công việc thành công!', position };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
