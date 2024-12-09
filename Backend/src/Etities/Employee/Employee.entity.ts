import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { employee_currentposition } from './CurrentPosition.entity';
import { employee_workhour } from './WorkHour.entity';
import { Cinema } from '../Cinema/Cinema.entity';

@Entity()
export class Employee {
  @PrimaryColumn()
  emp_id: string;

  @Column()
  emp_name: string;

  @Column('date')
  emp_birth_date: Date;

  @Column({ unique: true })
  emp_cccd: number;

  @Column()
  emp_address: string;

  @Column({ unique: true })
  emp_phone: string;

  @Column() // Thêm cột cinema_id
  cinema_id: string;

  @OneToMany(
    () => employee_currentposition,
    (currentPosition) => currentPosition.employee,
  )
  currentPositions: employee_currentposition[];

  @OneToMany(() => employee_workhour, (workHour) => workHour.employee)
  workHours: employee_workhour[];
}
