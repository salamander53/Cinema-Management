import { Inject, Injectable } from '@nestjs/common';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Salary1HourService {
  constructor(
    @Inject('EMPLOYEE_SALARY1HOUR_REPOSITORY')
    private readonly salary1hourRepository: Repository<salary1hour>,
    @Inject('EMPLOYEE_POSITION_REPOSITORY')
    private readonly positionRepository: Repository<employee_position>,
    @Inject('EMPLOYEE_WORKTYPE_REPOSITORY')
    private readonly workTypeRepository: Repository<employee_worktype>,
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

  async updateSalary(salaryData: {
    position_id: number;
    workType_id: number;
    salary1hour: number;
  }): Promise<any> {
    try {
      const result = await this.salary1hourRepository.update(
        {
          position_id: salaryData.position_id,
          workType_id: salaryData.workType_id,
        },
        { salary1hour: salaryData.salary1hour },
      );
      if (result.affected === 0) {
        throw new Error('Salary record not found');
      }
      return result;
    } catch (error) {
      throw new Error('Failed to update salary: ' + error.message);
    }
  }

  async deleteSalary(salaryData: {
    position_id: number;
    workType_id: number;
  }): Promise<any> {
    try {
      const result = await this.salary1hourRepository.update(
        {
          position_id: salaryData.position_id,
          workType_id: salaryData.workType_id,
        },
        { salary1hour: null },
      );
      if (result.affected === 0) {
        throw new Error('Salary record not found');
      }
      return result;
    } catch (error) {
      throw new Error('Failed to delete salary: ' + error.message);
    }
  }

  async findAllPositions(): Promise<employee_position[]> {
    return this.positionRepository.find();
  }
  async findAllWorkTypes(): Promise<employee_worktype[]> {
    return this.workTypeRepository.find();
  }
}
