import { Inject, Injectable } from '@nestjs/common';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrentPositionService {
  constructor(
    @Inject('EMPLOYEE_CURRENTPOSITON_REPOSITORY')
    private readonly employeeCurrentPositonRepository: Repository<employee_currentposition>,
  ) {}

  async findAll(): Promise<employee_currentposition[]> {
    return this.employeeCurrentPositonRepository.find();
  }
}
