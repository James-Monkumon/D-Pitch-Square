import { PrismaService } from '../prisma/prisma.service.js';
import { AdminVerificationDecision } from './dto/update-verification.dto.js';
import { AdminAchievementVerificationDecision } from './dto/update-achievement-verification.dto.js';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    verifyPlayer(actorUserId: string, playerId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    verifyAcademy(actorUserId: string, academyId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            academyName: string;
        };
    }>;
    verifyScout(actorUserId: string, scoutId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    verifyCoach(actorUserId: string, coachId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            updatedAt: Date;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
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
    verifyAchievement(actorUserId: string, achievementId: string, status: AdminAchievementVerificationDecision): Promise<{
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
