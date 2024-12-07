import { Provider } from '@nestjs/common';
import { Employee } from 'src/Etities/Employee/Employee.entity';

import { DataSource } from 'typeorm';

export const mainEmpProviders: Provider[] = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Employee),
    inject: ['DATA_SOURCE'],
  },
];
