import { Controller, Post, Body, Get, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('seed')
  async seed() {
    await this.authService.seedAdmin();
    return { message: 'Seed executed' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Body('password') password: string, @Req() req) {
    return this.authService.changePassword(req.user.userId, password);
  }
}
