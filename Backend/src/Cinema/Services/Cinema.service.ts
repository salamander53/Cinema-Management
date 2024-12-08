import { Inject, Injectable } from '@nestjs/common';
import { Cinema } from 'src/Etities/Cinema/Cinema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CinemaService {
  constructor(
    @Inject('CINEMA_REPOSITORY')
    private readonly cinemaRepository: Repository<Cinema>,
  ) {}
  async findAll(): Promise<Cinema[]> {
    return this.cinemaRepository.find();
  }
}
