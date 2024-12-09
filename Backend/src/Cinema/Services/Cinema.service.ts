import { Inject, Injectable } from '@nestjs/common';
import { Cinema } from 'src/Etities/Cinema/Cinema.entity';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';
import { EmployeeSalary } from 'src/Etities/View/EmployeeSalary.entity';
import { ViewEmployee } from 'src/Etities/View/ViewEmployee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CinemaService {
  constructor(
    @Inject('CINEMA_REPOSITORY')
    private readonly cinemaRepository: Repository<Cinema>,
    @Inject('EMPLOYEE_WORKHOUR_REPOSITORY')
    private readonly workHourRepository: Repository<employee_workhour>,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: Repository<Employee>,
    @Inject('EMPLOYEE_CURRENTPOSITON_REPOSITORY')
    private readonly currentPositionRepository: Repository<employee_currentposition>,
    @Inject('VIEW_EMPLOYEE_REPOSITORY')
    private readonly viewEmployeeRepository: Repository<ViewEmployee>,
    @Inject('EMPLOYEE_SALARY_REPOSITORY')
    private readonly employeeSalaryRepository: Repository<EmployeeSalary>,
  ) {}
  async findAll(): Promise<Cinema[]> {
    return this.cinemaRepository.find();
  }
  // async getEmployeesOfCinema(cinema_id: string): Promise<Employee[]> {
  //   const workHours = await this.workHourRepository.find({
  //     where: { cinema_id },
  //   });
  //   const employeeIds = workHours.map((workHour) => workHour.emp_id);
  //   return this.employeeRepository.find({ where: { emp_id: In(employeeIds) } });
  // }

  // async getEmployeeCurrentPositions(cinema_id: string): Promise<any[]> {
  //   return this.employeeRepository
  //     .createQueryBuilder('employee')
  //     .leftJoin('employee.currentPositions', 'currentPosition')
  //     .leftJoin('currentPosition.position', 'position')
  //     .leftJoin('currentPosition.workType', 'workType')
  //     .innerJoin('employee.workHours', 'workHours')
  //     .where('workHours.cinema_id = :cinema_id', { cinema_id })
  //     .select([
  //       'employee.emp_id',
  //       'employee.emp_name',
  //       'employee.emp_phone',
  //       'employee.emp_address',
  //     ])
  //     .addSelect('position.position_name', 'position_name')
  //     .addSelect('workType.workType_name', 'workType_name')
  //     .getMany();
  // }
  async getViewEmployees(): Promise<ViewEmployee[]> {
    return this.viewEmployeeRepository.find();
  }
  async getPositionOfEmployeeOfCinema(
    cinema_id: string,
  ): Promise<ViewEmployee[]> {
    return this.viewEmployeeRepository
      .createQueryBuilder('viewEmployee')
      .innerJoin(
        'employee_workhour',
        'workhour',
        'viewEmployee.emp_id = workhour.emp_id',
      )
      .where('workhour.cinema_id = :cinema_id', { cinema_id })
      .select([
        'viewEmployee.emp_id',
        'viewEmployee.emp_name',
        'viewEmployee.emp_phone',
        'viewEmployee.emp_address',
        'viewEmployee.position_name',
        'viewEmployee.workType_name',
        'viewEmployee.workhour',
      ])
      .getMany();
  }
  async getEmployeeSalaries(): Promise<EmployeeSalary[]> {
    return this.employeeSalaryRepository.find();
  }
  /////////DELETE//////////
  async deleteCinema(cinemaId: string): Promise<void> {
    const cinemaToDelete = await this.cinemaRepository.findOne({
      where: { cinema_id: cinemaId },
    });
    if (!cinemaToDelete) {
      throw new Error(`Cinema with ID ${cinemaId} not found`);
    }
    await this.cinemaRepository.delete(cinemaId);
  }
  /////Create///
  async createCinema(cinemaData: Partial<Cinema>): Promise<Cinema> {
    const newCinema = this.cinemaRepository.create(cinemaData);
    return await this.cinemaRepository.save(newCinema);
  }

  /////ADD EMPLOYEE TO CINEMA///
  async addEmployeeToCinema(workHourData: {
    cinema_id: string;
    emp_id: string;
  }): Promise<any> {
    try {
      await this.workHourRepository.insert({
        emp_id: workHourData.emp_id,
        cinema_id: workHourData.cinema_id,
      });
      // const newWorkHour = await this.workHourRepository.findOne({
      //   where: {
      //     emp_id: workHourData.emp_id,
      //     cinema_id: workHourData.cinema_id,
      //   },
      // });
      // return newWorkHour!;
    } catch (error) {
      throw new Error(workHourData.cinema_id);
    }
  }
}
