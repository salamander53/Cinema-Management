import { Inject, Injectable } from '@nestjs/common';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find(); // Lấy tất cả nhân viên
  }
}
