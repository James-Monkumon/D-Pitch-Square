import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service.js';

import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { ResendVerificationDto } from './dto/resend-verification.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() dto: RegisterDto,
  ) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginDto,
  ) {
    return this.auth.login(dto);
  }

  @Post('refresh')
  refresh(
    @Body() dto: RefreshTokenDto,
  ) {
    return this.auth.refresh(dto);
  }

  @Post('verify-email')
  verifyEmail(
    @Body() dto: VerifyEmailDto,
  ) {
    return this.auth.verifyEmail(dto);
  }

  @Post('resend-verification')
  resendVerification(
    @Body() dto: ResendVerificationDto,
  ) {
    return this.auth.resendVerification(dto);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body() dto: ForgotPasswordDto,
  ) {
    return this.auth.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(
    @Body() dto: ResetPasswordDto,
  ) {
    return this.auth.resetPassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(
    @Req()
    req: Request & {
      user: {
        sub: string;
      };
    },
  ) {
    return this.auth.logout(
      req.user.sub,
    );
  }
}