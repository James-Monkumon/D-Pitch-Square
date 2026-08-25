import { PlayersService } from './players.service.js';
import { CreatePlayerDto } from './dto/create-player.dto.js';
import { UpdatePlayerDto } from './dto/update-player.dto.js';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto.js';
import { CreateAchievementDto } from './dto/create-achievement.dto.js';
import { UpdateAchievementDto } from './dto/update-achievement.dto.js';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    /**
     * Create my player profile.
     *
     * POST /players/profile
     *
     * Requires authentication.
     */
    createProfile(req: any, dto: CreatePlayerDto): Promise<{
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
     *
     * GET /players/profile
     *
     * Requires authentication.
     */
    getMyProfile(req: any): Promise<{
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
     * Get my player profile.
     *
     * GET /players/profile/me
     *
     * Requires authentication.
     *
     * This is an explicit /me alias for
     * GET /players/profile.
     */
    getMyProfileMe(req: any): Promise<{
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
     *
     * PATCH /players/profile
     *
     * Requires authentication.
     */
    updateProfile(req: any, dto: UpdatePlayerDto): Promise<{
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
     * Update my player statistics.
     *
     * Creates statistics if they don't already exist.
     *
     * PATCH /players/statistics
     *
     * Requires authentication.
     */
    updateStatistics(req: any, dto: UpdatePlayerStatisticsDto): Promise<{
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
     * Create an achievement for my profile.
     *
     * POST /players/achievements
     *
     * Requires authentication.
     */
    createAchievement(req: any, dto: CreateAchievementDto): Promise<{
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
     * Update one of my achievements.
     *
     * PATCH /players/achievements/:achievementId
     *
     * Requires authentication.
     */
    updateAchievement(req: any, achievementId: string, dto: UpdateAchievementDto): Promise<{
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
     * Delete one of my achievements.
     *
     * DELETE /players/achievements/:achievementId
     *
     * Requires authentication.
     */
    deleteAchievement(req: any, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow a player.
     *
     * POST /players/:playerId/follow
     *
     * Requires authentication.
     */
    followPlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow a player.
     *
     * DELETE /players/:playerId/follow
     *
     * Requires authentication.
     */
    unfollowPlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check whether the authenticated user
     * follows a player.
     *
     * GET /players/:playerId/follow
     *
     * Requires authentication.
     */
    isFollowingPlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Get follower count for a player.
     *
     * GET /players/:playerId/followers/count
     *
     * Public endpoint.
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
     *
     * POST /players/:playerId/like
     *
     * Requires authentication.
     */
    likePlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Unlike a player.
     *
     * DELETE /players/:playerId/like
     *
     * Requires authentication.
     */
    unlikePlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Check whether the authenticated user
     * likes a player.
     *
     * GET /players/:playerId/like
     *
     * Requires authentication.
     */
    isPlayerLiked(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get total likes for a player.
     *
     * GET /players/:playerId/likes/count
     *
     * Public endpoint.
     */
    getPlayerLikesCount(playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            count: number;
        };
    }>;
    /**
     * Get a public player profile.
     *
     * GET /players/:playerId
     *
     * Does not require authentication.
     *
     * Example:
     * GET /players/dc210453-08fd-43e5-a644-a75f8ae07c15
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
