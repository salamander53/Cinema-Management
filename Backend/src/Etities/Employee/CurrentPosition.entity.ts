import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './Employee.entity';
import { employee_position } from './Position.entity';
import { employee_worktype } from './WorkType.entity';

@Entity()
export class employee_currentposition {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.currentPositions)
  employee: Employee;

  @ManyToOne(() => employee_position, (position) => position.currentPositions)
  position: employee_position;

  @ManyToOne(() => employee_worktype, (workType) => workType.currentPositions)
  workType: employee_worktype;
}
