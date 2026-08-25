import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly users: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(
    @Req()
    req: Request & {
      user: {
        sub: string;
      };
    },
  ) {
    return this.users.getMe(req.user.sub);
  }
}