import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authProvider } from './auth.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'khoa123',
      signOptions: { expiresIn: '3h' },
    }),
    DatabaseModule,
  ],
  providers: [...authProvider, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
