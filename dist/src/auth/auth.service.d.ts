import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { ResendVerificationDto } from './dto/resend-verification.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    /**
     * Public self-registration is deliberately limited
     * to ordinary platform roles.
     *
     * ADMIN and SUPER_ADMIN must never be created through
     * the public auth registration flow.
     */
    private readonly publicRegistrationRoles;
    /**
     * Hash sensitive tokens before storing them.
     */
    private hashToken;
    /**
     * Generate a new access token and refresh token.
     */
    private issueTokens;
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
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: string;
                email: string;
                status: import("@prisma/client").$Enums.UserStatus;
                roles: import("@prisma/client").$Enums.RoleName[];
            };
            verificationToken: string;
        };
    }>;
    /**
     * Login an existing user.
     */
    login(dto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: string;
                email: string;
                status: "ACTIVE" | "PENDING";
                roles: import("@prisma/client").$Enums.RoleName[];
            };
        };
    }>;
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
    refresh(dto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    /**
     * Verify a user's email address.
     */
    verifyEmail(dto: VerifyEmailDto): Promise<{
        success: boolean;
        message: string;
        data: {
            emailVerifiedAt: Date;
            email?: undefined;
            status?: undefined;
        };
    } | {
        success: boolean;
        message: string;
        data: {
            email: string;
            emailVerifiedAt: Date;
            status: "ACTIVE";
        };
    }>;
    /**
     * Generate a new email verification token.
     */
    resendVerification(dto: ResendVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    } | {
        success: boolean;
        message: string;
        data: {
            /**
             * Development only.
             * Remove once real email delivery exists.
             */
            verificationToken: string;
        };
    }>;
    /**
     * Request a password reset.
     *
     * The response deliberately does not reveal
     * whether the account exists.
     */
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    } | {
        success: boolean;
        message: string;
        data: {
            /**
             * Development only.
             */
            resetToken: string;
        };
    }>;
    /**
     * Reset a user's password using a valid reset token.
     */
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Revoke every currently active refresh token
     * belonging to this user.
     */
    logout(userId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
