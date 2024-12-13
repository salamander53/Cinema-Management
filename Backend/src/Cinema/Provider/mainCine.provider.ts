import { Provider } from '@nestjs/common';
import { Cinema } from 'src/Etities/Cinema/Cinema.entity';

import { DataSource } from 'typeorm';

export const mainCineProviders: Provider[] = [
  {
    provide: 'CINEMA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cinema),
    inject: ['DATA_SOURCE'],
  },
];
