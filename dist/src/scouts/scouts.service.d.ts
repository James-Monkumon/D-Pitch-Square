import { PrismaService } from '../prisma/prisma.service.js';
import { CreateScoutDto } from './dto/create-scout.dto.js';
import { UpdateScoutDto } from './dto/update-scout.dto.js';
import { CreateScoutAchievementDto } from './dto/create-scout-achievement.dto.js';
import { UpdateScoutAchievementDto } from './dto/update-scout-achievement.dto.js';
export declare class ScoutsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private verifyScoutRole;
    private verifyScoutOwner;
    private findActiveScout;
    private readonly allowedScoutAchievementTypes;
    private validateScoutAchievementType;
    createProfile(userId: string, dto: CreateScoutDto): Promise<{
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
    getMyProfile(userId: string): Promise<{
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
    updateProfile(userId: string, dto: UpdateScoutDto): Promise<{
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
    deleteProfile(userId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    createAchievement(userId: string, dto: CreateScoutAchievementDto): Promise<{
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
    getMyAchievements(userId: string): Promise<{
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
    updateAchievement(userId: string, achievementId: string, dto: UpdateScoutAchievementDto): Promise<{
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
    deleteAchievement(userId: string, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    followScout(userId: string, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    unfollowScout(userId: string, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    isFollowingScout(userId: string, scoutId: string): Promise<{
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
    likeScout(userId: string, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    unlikeScout(userId: string, scoutId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    isScoutLiked(userId: string, scoutId: string): Promise<{
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
}
