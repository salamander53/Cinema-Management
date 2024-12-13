import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { employee_worktype } from './WorkType.entity';
import { employee_position } from './Position.entity';

@Entity()
export class salary1hour {
  @PrimaryColumn()
  workType_id: number;

  @PrimaryColumn()
  position_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salary1hour: number;

  @ManyToOne(() => employee_worktype, (workType) => workType.salaries)
  @JoinColumn({ name: 'workType_id' })
  workType: employee_worktype;

  @ManyToOne(() => employee_position, (position) => position.salaries)
  @JoinColumn({ name: 'position_id' })
  position: employee_position;
}
