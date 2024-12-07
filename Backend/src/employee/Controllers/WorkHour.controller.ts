import { Controller, Get } from '@nestjs/common';
import { WorkHourService } from '../Services/WorkHour.service';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';

@Controller('workhour')
export class WorkHourController {
  constructor(private readonly employeeWorkHourService: WorkHourService) {}

  @Get()
  async getAllEmployees(): Promise<employee_workhour[]> {
    return this.employeeWorkHourService.findAll();
  }
}
