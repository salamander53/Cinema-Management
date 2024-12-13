import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'EmployeeSalary' }) // Tên view trong cơ sở dữ liệu
export class EmployeeSalary {
  @ViewColumn()
  emp_id: string;

  @ViewColumn()
  emp_name: string;

  @ViewColumn()
  emp_phone: string;

  @ViewColumn()
  emp_address: string;

  @ViewColumn()
  salary: number;
}
