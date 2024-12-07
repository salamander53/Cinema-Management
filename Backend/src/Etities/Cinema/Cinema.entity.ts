import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  cinema_id: string;

  @Column()
  cinema_name: string;

  @Column()
  cinema_address: string;
}
