import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }): Promise<string | null> {
    const authPayload = { username, password };
    return this.authService.validateUser(authPayload);
  }
}
