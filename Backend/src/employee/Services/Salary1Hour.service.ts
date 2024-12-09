import { Inject, Injectable } from '@nestjs/common';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Salary1HourService {
  constructor(
    @Inject('EMPLOYEE_SALARY1HOUR_REPOSITORY')
    private readonly salary1hourRepository: Repository<salary1hour>,
  ) {}

  async getAllSalaries(): Promise<salary1hour[]> {
    try {
      return await this.salary1hourRepository.find({
        relations: ['workType', 'position'],
      });
    } catch (error) {
      throw new Error('Failed to get salaries');
    }
  }
}
