import { Inject, Injectable } from '@nestjs/common';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkHourService {
  constructor(
    @Inject('EMPLOYEE_WORKHOUR_REPOSITORY')
    private readonly employeeWorkHourRepository: Repository<employee_workhour>,
  ) {}

  async findAll(): Promise<employee_workhour[]> {
    return this.employeeWorkHourRepository.find(); // Lấy tất cả nhân viên
  }
}
