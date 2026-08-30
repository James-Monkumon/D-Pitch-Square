import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePlayerDto } from './dto/create-player.dto.js';
import { UpdatePlayerDto } from './dto/update-player.dto.js';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto.js';
import { CreateAchievementDto } from './dto/create-achievement.dto.js';
import { UpdateAchievementDto } from './dto/update-achievement.dto.js';
export declare class PlayersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    /**
     * Find an active player profile.
     */
    private findActivePlayer;
    /**
     * Verify that the authenticated user owns
     * an active player profile.
     */
    private verifyPlayerOwner;
    /**
     * Achievement types allowed for player profiles.
     */
    private readonly allowedPlayerAchievementTypes;
    /**
     * Validate that an achievement type
     * is allowed for player profiles.
     */
    private validatePlayerAchievementType;
    /**
     * Create or restore player profile.
     *
     * If a soft-deleted profile already exists,
     * restore the same profile row and ID.
     */
    createProfile(userId: string, dto: CreatePlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            coverPhoto: string | null;
            fullName: string;
            dateOfBirth: Date | null;
            nationality: string | null;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            currentClub: string | null;
            currentAcademyName: string | null;
            height: number | null;
            weight: number | null;
            preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
            primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            jerseyNumber: number | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Get my player profile.
     */
    getMyProfile(userId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            statistics: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                playerId: string;
                matchesPlayed: number;
                matchesStarted: number;
                minutesPlayed: number;
                goals: number;
                assists: number;
                yellowCards: number;
                redCards: number;
                cleanSheets: number;
                saves: number;
            } | null;
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
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            coverPhoto: string | null;
            fullName: string;
            dateOfBirth: Date | null;
            nationality: string | null;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            currentClub: string | null;
            currentAcademyName: string | null;
            height: number | null;
            weight: number | null;
            preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
            primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            jerseyNumber: number | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Update my player profile.
     */
    updateProfile(userId: string, dto: UpdatePlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            coverPhoto: string | null;
            fullName: string;
            dateOfBirth: Date | null;
            nationality: string | null;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            currentClub: string | null;
            currentAcademyName: string | null;
            height: number | null;
            weight: number | null;
            preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
            primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            jerseyNumber: number | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Soft-delete my player profile.
     */
    deleteProfile(userId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Submit player profile for admin verification.
     *
     * Allowed:
     * NOT_REQUESTED -> PENDING
     * REJECTED      -> PENDING
     */
    submitProfileForVerification(userId: string): Promise<{
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
     * Create/update player statistics.
     */
    updateStatistics(userId: string, dto: UpdatePlayerStatisticsDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            matchesPlayed: number;
            matchesStarted: number;
            minutesPlayed: number;
            goals: number;
            assists: number;
            yellowCards: number;
            redCards: number;
            cleanSheets: number;
            saves: number;
        };
    }>;
    /**
     * Create player achievement.
     */
    createAchievement(userId: string, dto: CreateAchievementDto): Promise<{
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
    /**
     * Get all my player achievements.
     */
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
    /**
     * Update one of my player achievements.
     */
    updateAchievement(userId: string, achievementId: string, dto: UpdateAchievementDto): Promise<{
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
    /**
     * Delete one of my player achievements.
     */
    deleteAchievement(userId: string, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Submit one of my achievements for verification.
     *
     * Allowed:
     * UNVERIFIED -> PENDING
     * REJECTED   -> PENDING
     */
    submitAchievementForVerification(userId: string, achievementId: string): Promise<{
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
    /**
     * Follow a player.
     */
    followPlayer(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow a player.
     */
    unfollowPlayer(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check follow status.
     */
    isFollowingPlayer(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Get player follower count.
     */
    getPlayerFollowerCount(playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            followers: number;
        };
    }>;
    /**
     * Like a player.
     */
    likePlayer(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Unlike a player.
     */
    unlikePlayer(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Check player like status.
     */
    isPlayerLiked(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get total player likes.
     */
    getPlayerLikesCount(playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            count: number;
        };
    }>;
    /**
     * Get public player profile.
     */
    getPlayerById(playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            followers: number;
            likes: number;
            statistics: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                playerId: string;
                matchesPlayed: number;
                matchesStarted: number;
                minutesPlayed: number;
                goals: number;
                assists: number;
                yellowCards: number;
                redCards: number;
                cleanSheets: number;
                saves: number;
            } | null;
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
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            profilePicture: string | null;
            coverPhoto: string | null;
            fullName: string;
            dateOfBirth: Date | null;
            nationality: string | null;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            currentClub: string | null;
            currentAcademyName: string | null;
            height: number | null;
            weight: number | null;
            preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
            primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            jerseyNumber: number | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
        };
    }>;
}
