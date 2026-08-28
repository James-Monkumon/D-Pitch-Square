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
     * Create or restore my player profile.
     *
     * POST /players/profile
     */
    createProfile(req: any, dto: CreatePlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Get my player profile.
     *
     * GET /players/profile
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
                verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
                createdAt: Date;
                updatedAt: Date;
                ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
                playerId: string | null;
                coachId: string | null;
                scoutId: string | null;
                title: string;
                description: string | null;
                achievementType: import("@prisma/client").$Enums.AchievementType;
                achievementDate: Date | null;
                organization: string | null;
                level: string | null;
                role: string | null;
                evidenceUrl: string | null;
            }[];
        } & {
            id: string;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Explicit /me alias.
     *
     * GET /players/profile/me
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
                verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
                createdAt: Date;
                updatedAt: Date;
                ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
                playerId: string | null;
                coachId: string | null;
                scoutId: string | null;
                title: string;
                description: string | null;
                achievementType: import("@prisma/client").$Enums.AchievementType;
                achievementDate: Date | null;
                organization: string | null;
                level: string | null;
                role: string | null;
                evidenceUrl: string | null;
            }[];
        } & {
            id: string;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Update my player profile.
     *
     * PATCH /players/profile
     */
    updateProfile(req: any, dto: UpdatePlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Soft-delete my player profile.
     *
     * DELETE /players/profile
     */
    deleteProfile(req: any): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Create/update player statistics.
     *
     * PATCH /players/statistics
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
     * Create player achievement.
     *
     * POST /players/achievements
     */
    createAchievement(req: any, dto: CreateAchievementDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
            playerId: string | null;
            coachId: string | null;
            scoutId: string | null;
            title: string;
            description: string | null;
            achievementType: import("@prisma/client").$Enums.AchievementType;
            achievementDate: Date | null;
            organization: string | null;
            level: string | null;
            role: string | null;
            evidenceUrl: string | null;
        };
    }>;
    /**
     * Get all my achievements.
     *
     * GET /players/achievements
     */
    getMyAchievements(req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
            playerId: string | null;
            coachId: string | null;
            scoutId: string | null;
            title: string;
            description: string | null;
            achievementType: import("@prisma/client").$Enums.AchievementType;
            achievementDate: Date | null;
            organization: string | null;
            level: string | null;
            role: string | null;
            evidenceUrl: string | null;
        }[];
    }>;
    /**
     * Update one of my achievements.
     *
     * PATCH /players/achievements/:achievementId
     */
    updateAchievement(req: any, achievementId: string, dto: UpdateAchievementDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
            playerId: string | null;
            coachId: string | null;
            scoutId: string | null;
            title: string;
            description: string | null;
            achievementType: import("@prisma/client").$Enums.AchievementType;
            achievementDate: Date | null;
            organization: string | null;
            level: string | null;
            role: string | null;
            evidenceUrl: string | null;
        };
    }>;
    /**
     * Delete one of my achievements.
     *
     * DELETE /players/achievements/:achievementId
     */
    deleteAchievement(req: any, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow player.
     *
     * POST /players/:playerId/follow
     */
    followPlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow player.
     *
     * DELETE /players/:playerId/follow
     */
    unfollowPlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check follow status.
     *
     * GET /players/:playerId/follow
     */
    isFollowingPlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Get follower count.
     *
     * GET /players/:playerId/followers/count
     */
    getPlayerFollowerCount(playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            followers: number;
        };
    }>;
    /**
     * Like player.
     *
     * POST /players/:playerId/like
     */
    likePlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Unlike player.
     *
     * DELETE /players/:playerId/like
     */
    unlikePlayer(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Check like status.
     *
     * GET /players/:playerId/like
     */
    isPlayerLiked(req: any, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get total player likes.
     *
     * GET /players/:playerId/likes/count
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
     * Keep this generic parameter route
     * at the bottom of the controller.
     *
     * GET /players/:playerId
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
                verificationStatus: import("@prisma/client").$Enums.AchievementVerificationStatus;
                createdAt: Date;
                updatedAt: Date;
                ownerType: import("@prisma/client").$Enums.AchievementOwnerType;
                playerId: string | null;
                coachId: string | null;
                scoutId: string | null;
                title: string;
                description: string | null;
                achievementType: import("@prisma/client").$Enums.AchievementType;
                achievementDate: Date | null;
                organization: string | null;
                level: string | null;
                role: string | null;
                evidenceUrl: string | null;
            }[];
            id: string;
            userId: string;
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
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
}
