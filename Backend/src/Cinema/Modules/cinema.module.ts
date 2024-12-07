import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { mainCineProviders } from '../Provider/mainCine.provider';
import { CinemaService } from '../Services/Cinema.service';
import { CinemaController } from '../Controllers/Cinema.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...mainCineProviders, CinemaService],
  controllers: [CinemaController],
})
export class CinemaModule {}
