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
     * Create player profile.
     *
     * Only users with PLAYER role may create one.
     */
    createProfile(userId: string, dto: CreatePlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
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
                updatedAt: Date;
                playerId: string;
                title: string;
                description: string | null;
                year: number | null;
                organization: string | null;
                imageUrl: string | null;
            }[];
        } & {
            id: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
        };
    }>;
    /**
     * Update player statistics.
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
     * Create achievement.
     */
    createAchievement(userId: string, dto: CreateAchievementDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            title: string;
            description: string | null;
            year: number | null;
            organization: string | null;
            imageUrl: string | null;
        };
    }>;
    /**
     * Update achievement.
     */
    updateAchievement(userId: string, achievementId: string, dto: UpdateAchievementDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            title: string;
            description: string | null;
            year: number | null;
            organization: string | null;
            imageUrl: string | null;
        };
    }>;
    /**
     * Delete achievement.
     */
    deleteAchievement(userId: string, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
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
     * Check whether current user follows
     * a player.
     */
    isFollowingPlayer(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Get total follower count.
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
     * Check whether authenticated user likes a player.
     */
    isPlayerLiked(userId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get total likes for a player.
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
     *
     * Includes achievements, statistics,
     * follower total and like total.
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
                updatedAt: Date;
                playerId: string;
                title: string;
                description: string | null;
                year: number | null;
                organization: string | null;
                imageUrl: string | null;
            }[];
            id: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
        };
    }>;
}
