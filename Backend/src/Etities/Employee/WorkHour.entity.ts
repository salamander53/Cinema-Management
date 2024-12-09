import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './Employee.entity';
import { Cinema } from '../Cinema/Cinema.entity';

@Entity()
export class employee_workhour {
  @PrimaryColumn()
  emp_id: string;

  @PrimaryColumn()
  cinema_id: string;

  @Column()
  workhour: number;

  @ManyToOne(() => Employee, (employee) => employee.workHours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;

  @ManyToOne(() => Cinema, (cinema) => cinema.workHour, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cinema_id' })
  cinema: Cinema;
}
