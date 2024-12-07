import { Provider } from '@nestjs/common';
import { Employee } from 'src/Etities/Employee/Employee.entity';
import { employee_position } from 'src/Etities/Employee/Position.entity';
import { employee_worktype } from 'src/Etities/Employee/WorkType.entity';

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
];
