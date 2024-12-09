import { Inject, Injectable } from '@nestjs/common';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrentPositionService {
  constructor(
    @Inject('EMPLOYEE_POSITION_REPOSITORY')
    private readonly positionRepository: Repository<employee_position>,
    @Inject('EMPLOYEE_WORKTYPE_REPOSITORY')
    private readonly workTypeRepository: Repository<employee_worktype>,
    @Inject('EMPLOYEE_CURRENTPOSITON_REPOSITORY')
    private readonly employeeCurrentPositonRepository: Repository<employee_currentposition>,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getAllEmployees() {
    return await this.employeeRepository.find({
      relations: [
        'currentPositions',
        'currentPositions.position',
        'currentPositions.workType',
      ],
    });
  }

  async getEmployeeCurrentPosition(empId: string) {
    return await this.employeeCurrentPositonRepository.find({
      where: { emp_id: empId },
      relations: ['employee', 'position', 'workType'], // Kết nối bảng liên quan
      select: ['emp_id', 'position_id', 'workType_id'], // Chỉ định các cột cần thiết
    });
  }

  async addCurrentPosition(positionData: {
    emp_id: string;
    workType_id: number;
    position_id: number;
  }): Promise<employee_currentposition> {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { emp_id: positionData.emp_id },
      });
      if (!employee) {
        throw new Error(`Employee with ID ${positionData.emp_id} not found`);
      }
      const workType = await this.workTypeRepository.findOne({
        where: { workType_id: positionData.workType_id },
      });
      if (!workType) {
        throw new Error(
          `Work type with ID ${positionData.workType_id} not found`,
        );
      }
      const position = await this.positionRepository.findOne({
        where: { position_id: positionData.position_id },
      });
      if (!position) {
        throw new Error(
          `Position with ID ${positionData.position_id} not found`,
        );
      }
      const newPosition = this.employeeCurrentPositonRepository.create({
        employee: employee,
        workType: workType,
        position: position,
      });
      return await this.employeeCurrentPositonRepository.save(newPosition);
    } catch (error) {
      throw new Error('Failed to add current position');
    }
  }
}
