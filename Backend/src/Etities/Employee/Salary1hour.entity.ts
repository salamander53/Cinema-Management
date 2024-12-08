import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { employee_worktype } from './WorkType.entity';
import { employee_position } from './Position.entity';

@Entity('Salary1hour')
export class salary1hour {
  @PrimaryColumn()
  workType_id: number;

  @PrimaryColumn()
  position_id: number;

  @Column()
  salary1hour: number;

  @ManyToOne(() => employee_worktype, (workType) => workType.salaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workType_id' })
  workType: employee_worktype;

  @ManyToOne(() => employee_position, (position) => position.salaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'position_id' })
  position: employee_position;
}
