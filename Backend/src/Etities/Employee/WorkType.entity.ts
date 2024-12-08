import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { employee_currentposition } from './CurrentPosition.entity';
import { salary1hour } from './Salary1hour.entity';

@Entity()
export class employee_worktype {
  @PrimaryGeneratedColumn()
  workType_id: number;

  @Column()
  workType_name: string;

  @OneToMany(
    () => employee_currentposition,
    (currentPosition) => currentPosition.position,
  )
  currentPositions: employee_currentposition[];

  @OneToMany(() => salary1hour, (salaries) => salaries.workType)
  salaries: salary1hour[];
}
