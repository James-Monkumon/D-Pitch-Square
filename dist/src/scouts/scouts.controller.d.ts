import type { Request } from 'express';
import { ScoutsService } from './scouts.service.js';
import { CreateScoutDto } from './dto/create-scout.dto.js';
import { UpdateScoutDto } from './dto/update-scout.dto.js';
import { CreateScoutAchievementDto } from './dto/create-scout-achievement.dto.js';
import { UpdateScoutAchievementDto } from './dto/update-scout-achievement.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        id: string;
        email: string;
        roles: string[];
    };
};
export declare class ScoutsController {
    private readonly scoutsService;
    constructor(scoutsService: ScoutsService);
    createProfile(req: AuthenticatedRequest, dto: CreateScoutDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            role: string | null;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            fullName: string;
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            organization: string | null;
            contactEmail: string | null;
            contactPhone: string | null;
        };
    }>;
    getMyProfile(req: AuthenticatedRequest): Promise<{
        success: boolean;
        message: string;
        data: ({
            achievements: {
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
            }[];
        } & {
            id: string;
            createdAt: Date;
            role: string | null;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            fullName: string;
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            organization: string | null;
            contactEmail: string | null;
            contactPhone: string | null;
        }) | null;
    }>;
    updateProfile(req: AuthenticatedRequest, dto: UpdateScoutDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            role: string | null;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            fullName: string;
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            organization: string | null;
            contactEmail: string | null;
            contactPhone: string | null;
        };
    }>;
    deleteProfile(req: AuthenticatedRequest): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    createAchievement(req: AuthenticatedRequest, dto: CreateScoutAchievementDto): Promise<{
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
    getMyAchievements(req: AuthenticatedRequest): Promise<{
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
        }[];
    }>;
    updateAchievement(req: AuthenticatedRequest, achievementId: string, dto: UpdateScoutAchievementDto): Promise<{
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
    deleteAchievement(req: AuthenticatedRequest, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    followScout(req: AuthenticatedRequest, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    unfollowScout(req: AuthenticatedRequest, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    isFollowingScout(req: AuthenticatedRequest, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    getScoutFollowerCount(scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            followers: number;
        };
    }>;
    likeScout(req: AuthenticatedRequest, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    unlikeScout(req: AuthenticatedRequest, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    isScoutLiked(req: AuthenticatedRequest, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    getScoutLikesCount(scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            count: number;
        };
    }>;
    getProfileById(scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            achievements: {
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
            }[];
        } & {
            id: string;
            createdAt: Date;
            role: string | null;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            fullName: string;
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            organization: string | null;
            contactEmail: string | null;
            contactPhone: string | null;
        };
    }>;
}
export {};
