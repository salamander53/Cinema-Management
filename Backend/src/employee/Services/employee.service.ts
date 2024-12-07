import { Inject, Injectable } from '@nestjs/common';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';

import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: Repository<Employee>,
    @Inject('EMPLOYEE_POSITION_REPOSITORY')
    private readonly positionRepository: Repository<employee_position>,
    @Inject('EMPLOYEE_WORKTYPE_REPOSITORY')
    private readonly workTypeRepository: Repository<employee_worktype>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find(); // Lấy tất cả nhân viên
  }
  async findAllPositions(): Promise<employee_position[]> {
    return this.positionRepository.find();
  }
  async findAllWorkTypes(): Promise<employee_worktype[]> {
    return this.workTypeRepository.find();
  }
}
