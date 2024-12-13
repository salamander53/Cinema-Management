import { Provider } from '@nestjs/common';
import { employee_currentposition } from 'src/Etities/Employee/CurrentPosition.entity';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { salary1hour } from 'src/Etities/Employee/Salary1hour.entity';
import { employee_workhour } from 'src/Etities/Employee/WorkHour.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';
import { EmployeeSalary } from 'src/Etities/View/EmployeeSalary.entity';
import { ViewEmployee } from 'src/Etities/View/ViewEmployee.entity';

import { DataSource } from 'typeorm';

export const mainEmpProviders: Provider[] = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Employee),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_POSITION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(employee_position),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_WORKTYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(employee_worktype),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_WORKHOUR_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(employee_workhour),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_CURRENTPOSITON_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(employee_currentposition),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_SALARY1HOUR_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(salary1hour),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'VIEW_EMPLOYEE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ViewEmployee),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'EMPLOYEE_SALARY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmployeeSalary),
    inject: ['DATA_SOURCE'],
  },
];
