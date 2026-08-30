import type { Request } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { ResendVerificationDto } from './dto/resend-verification.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
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
    refresh(dto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
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
    resendVerification(dto: ResendVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    } | {
        success: boolean;
        message: string;
        data: {
            verificationToken: string;
        };
    }>;
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
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    logout(req: Request & {
        user: {
            id: string;
        };
    }): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
