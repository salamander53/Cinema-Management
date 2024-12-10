import { Inject, Injectable } from '@nestjs/common';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkHourService {
  constructor(
    @Inject('EMPLOYEE_WORKHOUR_REPOSITORY')
    private readonly employeeWorkHourRepository: Repository<employee_workhour>,
  ) {}

  async addWorkHour(workHourData: {
    emp_id: string;
    cinema_id: string;
    workhour: number;
  }): Promise<employee_workhour> {
    try {
      const newWorkHour = this.employeeWorkHourRepository.create({
        emp_id: workHourData.emp_id,
        cinema_id: workHourData.cinema_id,
        workhour: workHourData.workhour,
      });
      return await this.employeeWorkHourRepository.save(newWorkHour);
    } catch (error) {
      throw new Error('Failed to add work hour: ' + error.message);
    }
  }
  async getAggregatedWorkHours(): Promise<
    { emp_id: string; cinema_id: string; total_workhour: number }[]
  > {
    try {
      const result = await this.employeeWorkHourRepository
        .createQueryBuilder('ewh')
        .select('ewh.emp_id', 'emp_id')
        .addSelect('ewh.cinema_id', 'cinema_id')
        .addSelect('SUM(ewh.workhour)', 'total_workhour')
        .groupBy('ewh.emp_id')
        .addGroupBy('ewh.cinema_id')
        .getRawMany();
      return result;
    } catch (error) {
      throw new Error('Failed to get aggregated work hours: ' + error.message);
    }
  }
}
