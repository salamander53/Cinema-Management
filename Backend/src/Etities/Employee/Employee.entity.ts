import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}
