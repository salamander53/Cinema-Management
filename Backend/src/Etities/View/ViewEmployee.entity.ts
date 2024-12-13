import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'ViewEmployee' }) // Tên view trong cơ sở dữ liệu
export class ViewEmployee {
  @ViewColumn()
  emp_id: string;

  @ViewColumn()
  emp_name: string;

  @ViewColumn()
  emp_phone: string;

  @ViewColumn()
  emp_address: string;

  @ViewColumn()
  position_name: string;

  @ViewColumn()
  workType_name: string;

  @ViewColumn()
  workhour: number;
}
