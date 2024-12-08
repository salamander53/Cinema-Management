import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Employee } from './Employee.entity';
import { employee_position } from './Position.entity';
import { employee_worktype } from './WorkType.entity';

@Entity('Employee_CurrentPosition')
export class employee_currentposition {
  @PrimaryColumn()
  emp_id: string;

  @PrimaryColumn()
  position_id: number;

  @PrimaryColumn()
  workType_id: number;

  @ManyToOne(() => Employee, (employee) => employee.currentPositions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;

  @ManyToOne(() => employee_position, (position) => position.currentPositions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'position_id' })
  position: employee_position;

  @ManyToOne(() => employee_worktype, (workType) => workType.currentPositions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workType_id' })
  workType: employee_worktype;
}
