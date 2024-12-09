import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { employee_workhour } from '../Employee/WorkHour.entity';
import { Employee } from '../Employee/Employee.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  cinema_id: string;

  @Column()
  cinema_name: string;

  @Column()
  cinema_address: string;

  @OneToMany(() => employee_workhour, (workHour) => workHour.cinema)
  workHour: employee_workhour[];
}
