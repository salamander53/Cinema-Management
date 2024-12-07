import { Module } from '@nestjs/common';
import { mainEmpProviders } from '../Providers/mainEmp.provider';
import { DatabaseModule } from 'src/database/database.module';
import { CurrentPositionService } from '../Services/CurrentPosition.service';
import { CurrentPositionController } from '../Controllers/CurrentPosition.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...mainEmpProviders, CurrentPositionService],
  controllers: [CurrentPositionController],
})
export class CurrentPositionModule {}
