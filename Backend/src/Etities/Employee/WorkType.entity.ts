import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class employee_worktype {
  @PrimaryGeneratedColumn()
  workType_id: number;

  @Column()
  workType_name: string;
}
