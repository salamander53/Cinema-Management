import { Provider } from '@nestjs/common';
import { User } from 'src/Etities/User/user.entity';
import { DataSource } from 'typeorm';

export const authProvider: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
