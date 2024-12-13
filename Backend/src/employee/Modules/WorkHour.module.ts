import { Module } from '@nestjs/common';
import { mainEmpProviders } from '../Providers/mainEmp.provider';
import { DatabaseModule } from 'src/database/database.module';
import { WorkHourService } from '../Services/WorkHour.service';
import { WorkHourController } from '../Controllers/WorkHour.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...mainEmpProviders, WorkHourService],
  controllers: [WorkHourController],
})
export class WorkHourModule {}
