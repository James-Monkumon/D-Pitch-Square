import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  RoleName,
  UserStatus,
} from '@prisma/client';

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
   * Public self-registration is deliberately limited
   * to ordinary platform roles.
   *
   * ADMIN and SUPER_ADMIN must never be created through
   * the public auth registration flow.
   */
  private readonly publicRegistrationRoles: RoleName[] = [
    RoleName.PLAYER,
    RoleName.ACADEMY,
    RoleName.SCOUT,
    RoleName.COACH,
  ];

  /**
   * Hash sensitive tokens before storing them.
   */
  private hashToken(token: string): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }

  /**
   * Generate a new access token and refresh token.
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
          Date.now() +
            30 * 24 * 60 * 60 * 1000,
        ),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Register a public account.
   *
   * Allowed:
   * - PLAYER
   * - ACADEMY
   * - SCOUT
   * - COACH
   *
   * ADMIN and SUPER_ADMIN are privileged roles
   * and must not be created here.
   */
  async register(dto: RegisterDto) {
    const email =
      dto.email.trim().toLowerCase();

    /**
     * Defense in depth.
     *
     * RegisterDto already restricts the HTTP request,
     * but the service independently enforces the same
     * authorization rule.
     */
    const requestedRole =
      dto.role as RoleName;

    if (
      !this.publicRegistrationRoles.includes(
        requestedRole,
      )
    ) {
      throw new ConflictException(
        'Invalid registration role',
      );
    }

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
          name: requestedRole,
        },
      });

    if (
      !role ||
      !this.publicRegistrationRoles.includes(
        role.name,
      )
    ) {
      throw new ConflictException(
        'Invalid registration role',
      );
    }

    const passwordHash =
      await argon2.hash(
        dto.password,
      );

    const user =
      await this.prisma.user.create({
        data: {
          email,
          passwordHash,

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
     * Development:
     * raw token is returned in the response.
     *
     * Production:
     * raw token should be delivered by email only.
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
          Date.now() +
            24 * 60 * 60 * 1000,
        ),
      },
    });

    const roles =
      user.roles.map(
        (userRole) =>
          userRole.role.name,
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
      dto.email.trim().toLowerCase();

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

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    /**
     * argon2.verify() can throw when the stored
     * password hash is malformed or corrupted.
     *
     * That must behave like invalid credentials,
     * not produce an internal-server error.
     */
    let passwordMatches = false;

    try {
      passwordMatches =
        await argon2.verify(
          user.passwordHash,
          dto.password,
        );
    } catch {
      passwordMatches = false;
    }

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    /**
     * Preserve the current account policy:
     *
     * PENDING users may authenticate.
     * SUSPENDED users may not.
     */
    if (
      user.status ===
      UserStatus.SUSPENDED
    ) {
      throw new UnauthorizedException(
        'Account is suspended',
      );
    }

    const roles =
      user.roles.map(
        (userRole) =>
          userRole.role.name,
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
        'Login successful',

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
   * Rotate a refresh token.
   *
   * Security flow:
   *
   * 1. Hash the incoming raw token.
   * 2. Locate the stored token.
   * 3. Reject revoked tokens.
   * 4. Reject expired tokens.
   * 5. Reload CURRENT user state from the database.
   * 6. Reload CURRENT roles from the database.
   * 7. Reject suspended/missing accounts.
   * 8. Atomically claim/revoke the old refresh token.
   * 9. Issue replacement tokens using current roles.
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

        select: {
          id: true,
          userId: true,
          expiresAt: true,
          revokedAt: true,
        },
      });

    if (
      !storedToken ||
      storedToken.revokedAt
    ) {
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

    /**
     * Explicitly reload the current account and
     * current roles.
     *
     * We do not trust authorization state from an
     * old access token or old session.
     */
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: storedToken.userId,
        },

        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    if (
      user.status ===
      UserStatus.SUSPENDED
    ) {
      throw new UnauthorizedException(
        'Account is suspended',
      );
    }

    const roles =
      user.roles.map(
        (userRole) =>
          userRole.role.name,
      );

    /**
     * Claim/revoke the old token only if it is still
     * active.
     *
     * This prevents two simultaneous refresh requests
     * from successfully rotating the same token.
     */
    const revokeResult =
      await this.prisma.refreshToken.updateMany({
        where: {
          id: storedToken.id,
          revokedAt: null,
        },

        data: {
          revokedAt: new Date(),
        },
      });

    if (
      revokeResult.count !== 1
    ) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

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
      this.hashToken(
        dto.token,
      );

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

    if (
      user.emailVerifiedAt
    ) {
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

          status:
            UserStatus.ACTIVE,
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
        status:
          UserStatus.ACTIVE,
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
      dto.email.trim().toLowerCase();

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

    if (
      user.emailVerifiedAt
    ) {
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
          Date.now() +
            24 * 60 * 60 * 1000,
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
         * Remove once real email delivery exists.
         */
        verificationToken,
      },
    };
  }

  /**
   * Request a password reset.
   *
   * The response deliberately does not reveal
   * whether the account exists.
   */
  async forgotPassword(
    dto: ForgotPasswordDto,
  ) {
    const email =
      dto.email.trim().toLowerCase();

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
          this.hashToken(
            resetToken,
          ),

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
        /**
         * Development only.
         */
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
      this.hashToken(
        dto.token,
      );

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

    if (
      passwordReset.usedAt
    ) {
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

    const now =
      new Date();

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

      message:
        'Password reset successfully',

      data: null,
    };
  }

  /**
   * Revoke every currently active refresh token
   * belonging to this user.
   */
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
      message:
        'Logout successful',
      data: null,
    };
  }
}