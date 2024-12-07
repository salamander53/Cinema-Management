import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class employee_position {
  @PrimaryGeneratedColumn()
  position_id: number;

  @Column()
  position_name: string;
}
