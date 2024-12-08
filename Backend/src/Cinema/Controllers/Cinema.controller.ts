import { Controller, Get } from '@nestjs/common';
import { CinemaService } from '../Services/Cinema.service';
import { Cinema } from 'src/Etities/Cinema/Cinema.entity';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get()
  async findAll(): Promise<Cinema[]> {
    return this.cinemaService.findAll();
  }
}
