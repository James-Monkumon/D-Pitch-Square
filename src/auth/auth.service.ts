import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

import {
  createHash,
  randomBytes,
} from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service.js';

import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { ResendVerificationDto } from './dto/resend-verification.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Hash sensitive tokens before storing them in the database.
   */
  private hashToken(token: string): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }

  /**
   * Generate access token and refresh token.
   */
  private async issueTokens(
    userId: string,
    email: string,
    roles: string[],
  ) {
    const accessToken =
      await this.jwt.signAsync(
        {
          sub: userId,
          email,
          roles,
        },
        {
          secret:
            this.config.getOrThrow<string>(
              'JWT_ACCESS_SECRET',
            ),

          expiresIn:
            this.config.getOrThrow<string>(
              'JWT_ACCESS_EXPIRES_IN',
            ) as StringValue,
        },
      );

    const refreshToken =
      randomBytes(48).toString(
        'base64url',
      );

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash:
          this.hashToken(refreshToken),

        expiresAt: new Date(
          Date.now() + 30 * 86400000,
        ),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Register a new Player, Academy, Scout, or Coach.
   *
   * ADMIN accounts cannot be created through
   * public registration.
   */
  async register(dto: RegisterDto) {
    const email =
      dto.email.toLowerCase();

    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      throw new ConflictException(
        'Email is already registered',
      );
    }

    const role =
      await this.prisma.role.findUnique({
        where: {
          name: dto.role,
        },
      });

    if (
      !role ||
      role.name === 'ADMIN'
    ) {
      throw new ConflictException(
        'Invalid registration role',
      );
    }

    const user =
      await this.prisma.user.create({
        data: {
          email,

          passwordHash:
            await argon2.hash(
              dto.password,
            ),

          roles: {
            create: {
              roleId: role.id,
            },
          },
        },

        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

    /**
     * Create email verification token.
     *
     * For development we return this token
     * in the response.
     * In production it will be sent by email.
     */
    const verificationToken =
      randomBytes(32).toString(
        'base64url',
      );

    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,

        tokenHash:
          this.hashToken(
            verificationToken,
          ),

        expiresAt: new Date(
          Date.now() + 86400000,
        ),
      },
    });

    const roles =
      user.roles.map(
        (r: {
          role: {
            name: string;
          };
        }) => r.role.name,
      );

    const tokens =
      await this.issueTokens(
        user.id,
        user.email,
        roles,
      );

    return {
      success: true,

      message:
        'Account created successfully',

      data: {
        accessToken:
          tokens.accessToken,

        refreshToken:
          tokens.refreshToken,

        user: {
          id: user.id,
          email: user.email,
          status: user.status,
          roles,
        },

        verificationToken,
      },
    };
  }

  /**
   * Login an existing user.
   */
  async login(dto: LoginDto) {
    const email =
      dto.email.toLowerCase();

    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },

        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

    if (
      !user ||
      !(await argon2.verify(
        user.passwordHash,
        dto.password,
      ))
    ) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    if (
      user.status === 'SUSPENDED'
    ) {
      throw new UnauthorizedException(
        'Account is suspended',
      );
    }

    const roles =
      user.roles.map(
        (r: {
          role: {
            name: string;
          };
        }) => r.role.name,
      );

    const tokens =
      await this.issueTokens(
        user.id,
        user.email,
        roles,
      );

    return {
      success: true,
      message: 'Login successful',

      data: {
        accessToken:
          tokens.accessToken,

        refreshToken:
          tokens.refreshToken,

        user: {
          id: user.id,
          email: user.email,
          status: user.status,
          roles,
        },
      },
    };
  }

  /**
   * Refresh access token.
   *
   * Refresh-token rotation:
   *
   * 1. Hash incoming refresh token.
   * 2. Find matching database token.
   * 3. Verify it is not expired.
   * 4. Verify it has not been revoked.
   * 5. Revoke the old token.
   * 6. Generate a new access token.
   * 7. Generate a new refresh token.
   */
  async refresh(
    dto: RefreshTokenDto,
  ) {
    const tokenHash =
      this.hashToken(
        dto.refreshToken,
      );

    const storedToken =
      await this.prisma.refreshToken.findFirst({
        where: {
          tokenHash,
        },

        include: {
          user: {
            include: {
              roles: {
                include: {
                  role: true,
                },
              },
            },
          },
        },
      });

    if (!storedToken) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    if (storedToken.revokedAt) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    if (
      storedToken.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new UnauthorizedException(
        'Refresh token has expired',
      );
    }

    const user =
      storedToken.user;

    if (
      user.status === 'SUSPENDED'
    ) {
      throw new UnauthorizedException(
        'Account is suspended',
      );
    }

    const roles =
      user.roles.map(
        (r: {
          role: {
            name: string;
          };
        }) => r.role.name,
      );

    /**
     * Revoke the old refresh token BEFORE
     * issuing a replacement.
     */
    await this.prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },

      data: {
        revokedAt: new Date(),
      },
    });

    const tokens =
      await this.issueTokens(
        user.id,
        user.email,
        roles,
      );

    return {
      success: true,

      message:
        'Token refreshed successfully',

      data: {
        accessToken:
          tokens.accessToken,

        refreshToken:
          tokens.refreshToken,
      },
    };
  }

  /**
   * Verify a user's email address.
   */
  async verifyEmail(
    dto: VerifyEmailDto,
  ) {
    const tokenHash =
      this.hashToken(dto.token);

    const verification =
      await this.prisma.emailVerification.findFirst({
        where: {
          tokenHash,
        },
      });

    if (!verification) {
      throw new UnauthorizedException(
        'Invalid verification token',
      );
    }

    if (
      verification.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new UnauthorizedException(
        'Verification token has expired',
      );
    }

    if (verification.usedAt) {
      throw new UnauthorizedException(
        'Verification token has already been used',
      );
    }

    const user =
      await this.prisma.user.findUnique({
        where: {
          id: verification.userId,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid verification token',
      );
    }

    if (user.emailVerifiedAt) {
      return {
        success: true,

        message:
          'Email is already verified',

        data: {
          emailVerifiedAt:
            user.emailVerifiedAt,
        },
      };
    }

    const now = new Date();

    await this.prisma.$transaction([
      this.prisma.emailVerification.update({
        where: {
          id: verification.id,
        },

        data: {
          usedAt: now,
        },
      }),

      this.prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          emailVerifiedAt: now,
          status: 'ACTIVE',
        },
      }),
    ]);

    return {
      success: true,

      message:
        'Email verified successfully',

      data: {
        email: user.email,
        emailVerifiedAt: now,
        status: 'ACTIVE',
      },
    };
  }

  /**
   * Generate a new email verification token.
   */
  async resendVerification(
    dto: ResendVerificationDto,
  ) {
    const email =
      dto.email.toLowerCase();

    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return {
        success: true,

        message:
          'If the account exists, a verification email has been sent',

        data: null,
      };
    }

    if (user.emailVerifiedAt) {
      return {
        success: true,

        message:
          'Email is already verified',

        data: null,
      };
    }

    await this.prisma.emailVerification.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
      },

      data: {
        usedAt: new Date(),
      },
    });

    const verificationToken =
      randomBytes(32).toString(
        'base64url',
      );

    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,

        tokenHash:
          this.hashToken(
            verificationToken,
          ),

        expiresAt: new Date(
          Date.now() + 86400000,
        ),
      },
    });

    return {
      success: true,

      message:
        'Verification email sent successfully',

      data: {
        /**
         * Development only.
         * Remove this field when real email
         * delivery is implemented.
         */
        verificationToken,
      },
    };
  }

  /**
   * Request a password reset.
   *
   * We intentionally return the same response whether
   * or not the email exists to prevent account enumeration.
   *
   * For development, the reset token is returned.
   * In production it will be sent by email.
   */
  async forgotPassword(
    dto: ForgotPasswordDto,
  ) {
    const email =
      dto.email.toLowerCase();

    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return {
        success: true,

        message:
          'If the account exists, a password reset email has been sent',

        data: null,
      };
    }

    await this.prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
      },

      data: {
        usedAt: new Date(),
      },
    });

    const resetToken =
      randomBytes(32).toString(
        'base64url',
      );

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,

        tokenHash:
          this.hashToken(resetToken),

        expiresAt: new Date(
          Date.now() +
            60 * 60 * 1000,
        ),
      },
    });

    return {
      success: true,

      message:
        'Password reset instructions generated successfully',

      data: {
        // Development only.
        resetToken,
      },
    };
  }

  /**
   * Reset a user's password using a valid reset token.
   */
  async resetPassword(
    dto: ResetPasswordDto,
  ) {
    const tokenHash =
      this.hashToken(dto.token);

    const passwordReset =
      await this.prisma.passwordResetToken.findFirst({
        where: {
          tokenHash,
        },
      });

    if (!passwordReset) {
      throw new UnauthorizedException(
        'Invalid password reset token',
      );
    }

    if (passwordReset.usedAt) {
      throw new UnauthorizedException(
        'Password reset token has already been used',
      );
    }

    if (
      passwordReset.expiresAt.getTime() <=
      Date.now()
    ) {
      throw new UnauthorizedException(
        'Password reset token has expired',
      );
    }

    const user =
      await this.prisma.user.findUnique({
        where: {
          id: passwordReset.userId,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid password reset token',
      );
    }

    const passwordHash =
      await argon2.hash(
        dto.password,
      );

    const now = new Date();

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          passwordHash,
        },
      }),

      this.prisma.passwordResetToken.update({
        where: {
          id: passwordReset.id,
        },

        data: {
          usedAt: now,
        },
      }),

      this.prisma.refreshToken.updateMany({
        where: {
          userId: user.id,
          revokedAt: null,
        },

        data: {
          revokedAt: now,
        },
      }),
    ]);

    return {
      success: true,
      message: 'Password reset successfully',
      data: null,
    };
  }

  async logout(
    userId: string,
  ) {
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },

      data: {
        revokedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Logout successful',
      data: null,
    };
  }
}