import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { employee_currentposition } from './CurrentPosition.entity';

@Entity()
export class employee_position {
  @PrimaryGeneratedColumn()
  position_id: number;

  @Column()
  position_name: string;

  @OneToMany(
    () => employee_currentposition,
    (currentPosition) => currentPosition.position,
  )
  currentPositions: employee_currentposition[];
}
