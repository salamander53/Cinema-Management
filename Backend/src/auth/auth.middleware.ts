import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const secretKey = 'khoa123';
    const bypassRoutes = ['/auth/login', '/auth/register']; // Các endpoint không cần kiểm tra token

    if (bypassRoutes.includes(req.path)) {
      return next();
    }

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    // Bỏ 'Bearer ' khỏi token
    const jwtToken = token.split(' ')[1];

    try {
      // Thực hiện xác thực token tại đây (nếu cần)
      // Ví dụ: jwt.verify(jwtToken, secretKey);
      jwt.verify(jwtToken, secretKey, (err, decoded) => {
        if (err) {
          throw new UnauthorizedException('Token verification failed');
        } else {
          req.tokenPayload = decoded;
          next();
        }
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
