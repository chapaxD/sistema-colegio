import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('stats')
  @UseGuards(AuthGuard('jwt'))
  async getStats(@Req() req) {
    return this.appService.getStats(req.user.schoolId);
  }
}
