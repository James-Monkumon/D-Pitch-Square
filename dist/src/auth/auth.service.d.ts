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
     * Hash sensitive tokens before storing them in the database.
     */
    private hashToken;
    /**
     * Generate access token and refresh token.
     */
    private issueTokens;
    /**
     * Register a new Player, Academy, Scout, or Coach.
     *
     * ADMIN accounts cannot be created through
     * public registration.
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
                roles: string[];
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
                roles: string[];
            };
        };
    }>;
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
            status: string;
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
             * Remove this field when real email
             * delivery is implemented.
             */
            verificationToken: string;
        };
    }>;
    /**
     * Request a password reset.
     *
     * We intentionally return the same response whether
     * or not the email exists to prevent account enumeration.
     *
     * For development, the reset token is returned.
     * In production it will be sent by email.
     */
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    } | {
        success: boolean;
        message: string;
        data: {
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
    logout(userId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
