import type { Request } from 'express';
import { AdminService } from './admin.service.js';
import { UpdateVerificationDto } from './dto/update-verification.dto.js';
import { UpdateAchievementVerificationDto } from './dto/update-achievement-verification.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        id: string;
    };
};
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    /**
     * GET /api/v1/admin/verifications/profiles
     */
    getPendingProfileVerifications(): Promise<{
        success: boolean;
        message: string;
        data: {
            players: {
                id: string;
                createdAt: Date;
                userId: string;
                updatedAt: Date;
                fullName: string;
                country: string | null;
                state: string | null;
                city: string | null;
                verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            }[];
            academies: {
                id: string;
                createdAt: Date;
                userId: string;
                updatedAt: Date;
                country: string | null;
                state: string | null;
                city: string | null;
                verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
                academyName: string;
            }[];
            scouts: {
                id: string;
                createdAt: Date;
                userId: string;
                updatedAt: Date;
                fullName: string;
                country: string | null;
                state: string | null;
                city: string | null;
                verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
                organization: string | null;
            }[];
            coaches: {
                id: string;
                createdAt: Date;
                userId: string;
                updatedAt: Date;
                fullName: string;
                country: string | null;
                state: string | null;
                city: string | null;
                verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
                currentAcademyClub: string | null;
                coachingRole: string | null;
            }[];
            total: number;
        };
    }>;
    /**
     * GET /api/v1/admin/verifications/achievements
     */
    getPendingAchievementVerifications(): Promise<{
        success: boolean;
        message: string;
        data: ({
            player: {
                id: string;
                fullName: string;
            } | null;
            coach: {
                id: string;
                fullName: string;
            } | null;
            scout: {
                id: string;
                fullName: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            role: string | null;
            description: string | null;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
            ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
            playerId: string | null;
            title: string;
            achievementType: import("@prisma/client").$Enums.AchievementType;
            achievementDate: Date | null;
            organization: string | null;
            level: string | null;
            evidenceUrl: string | null;
            coachId: string | null;
            scoutId: string | null;
        })[];
    }>;
    /**
     * PATCH /api/v1/admin/players/:playerId/verification
     */
    verifyPlayer(req: AuthenticatedRequest, playerId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    /**
     * PATCH /api/v1/admin/academies/:academyId/verification
     */
    verifyAcademy(req: AuthenticatedRequest, academyId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            academyName: string;
        };
    }>;
    /**
     * PATCH /api/v1/admin/scouts/:scoutId/verification
     */
    verifyScout(req: AuthenticatedRequest, scoutId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    /**
     * PATCH /api/v1/admin/coaches/:coachId/verification
     */
    verifyCoach(req: AuthenticatedRequest, coachId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    /**
     * PATCH
     * /api/v1/admin/achievements/:achievementId/verification
     */
    verifyAchievement(req: AuthenticatedRequest, achievementId: string, dto: UpdateAchievementVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            role: string | null;
            description: string | null;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
            ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
            playerId: string | null;
            title: string;
            achievementType: import("@prisma/client").$Enums.AchievementType;
            achievementDate: Date | null;
            organization: string | null;
            level: string | null;
            evidenceUrl: string | null;
            coachId: string | null;
            scoutId: string | null;
        };
    }>;
}
export {};
