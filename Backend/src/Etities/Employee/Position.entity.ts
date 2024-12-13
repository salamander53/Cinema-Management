import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { employee_currentposition } from './CurrentPosition.entity';
import { salary1hour } from './Salary1hour.entity';

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

  @OneToMany(() => salary1hour, (salaries) => salaries.position)
  salaries: salary1hour[];
}
