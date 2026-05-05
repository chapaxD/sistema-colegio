import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Req() req) {
    return this.usersService.findAll(req.user.schoolId);
  }

  @Post()
  create(@Body() dto: any, @Req() req) {
    return this.usersService.create(dto, req.user.schoolId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.usersService.remove(id, req.user.schoolId);
  }
}
