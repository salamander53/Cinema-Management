import { Request } from 'express';

declare module 'express' {
  export interface Request {
    tokenPayload?: any; // Thay đổi 'any' thành kiểu dữ liệu phù hợp nếu bạn có một kiểu cụ thể cho token payload
  }
}
