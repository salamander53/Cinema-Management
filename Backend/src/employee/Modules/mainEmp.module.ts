import { Module } from '@nestjs/common';
import { mainEmpProviders } from '../Providers/mainEmp.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...mainEmpProviders],
})
export class mainEmpModule {}
