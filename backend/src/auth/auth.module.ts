import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { UsersService } from './users.service.js';
import { AuthController } from './auth.controller.js';
import { UsersController } from './users.controller.js';
import { JwtStrategy } from './jwt.strategy.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key-bolivia',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private authService: AuthService) {}
  async onModuleInit() {
    await this.authService.seedAdmin();
  }
}
