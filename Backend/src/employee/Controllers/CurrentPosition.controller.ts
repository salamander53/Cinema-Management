import { Controller, Get } from '@nestjs/common';
import { CurrentPositionService } from '../Services/CurrentPosition.service';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';

@Controller('currentpostion')
export class CurrentPositionController {
  constructor(
    private readonly employeeCurrentPositionService: CurrentPositionService,
  ) {}

  @Get()
  async getAllEmployees(): Promise<employee_currentposition[]> {
    return this.employeeCurrentPositionService.findAll(); // Lấy danh sách tất cả nhân viên
  }
}
