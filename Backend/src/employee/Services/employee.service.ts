import { Inject, Injectable } from '@nestjs/common';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';
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
    @Inject('EMPLOYEE_CURRENTPOSITON_REPOSITORY')
    private readonly employeeCurrentPositonRepository: Repository<employee_currentposition>,
    @Inject('EMPLOYEE_WORKHOUR_REPOSITORY')
    private readonly employeeWorkHourRepository: Repository<employee_workhour>,
    @Inject('EMPLOYEE_SALARY1HOUR_REPOSITORY')
    private readonly employeeSalary1HourRepository: Repository<salary1hour>,
  ) {}

  async findAllEmployee(): Promise<Employee[]> {
    return this.employeeRepository.find(); // Lấy tất cả nhân viên
  }
  async findAllPositions(): Promise<employee_position[]> {
    return this.positionRepository.find();
  }
  async findAllWorkTypes(): Promise<employee_worktype[]> {
    return this.workTypeRepository.find();
  }
  async findAllEmployeeCurrentPosition(): Promise<employee_currentposition[]> {
    return this.employeeCurrentPositonRepository.find();
  }
  async findAllEmployeeWorkHour(): Promise<employee_workhour[]> {
    return this.employeeWorkHourRepository.find();
  }
  async findAllSalary1Hour(): Promise<salary1hour[]> {
    return this.employeeSalary1HourRepository.find();
  }

  async createEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employeeData);
    return await this.employeeRepository.save(newEmployee);
  }
  async deleteEmployee(empId: string): Promise<void> {
    const employeeToDelete = await this.employeeRepository.findOne({
      where: { emp_id: empId },
    });
    if (!employeeToDelete) {
      throw new Error(`Employee with ID ${empId} not found`);
    }
    await this.employeeRepository.delete(empId);
  }
}
