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
     * POST /api/v1/players/profile
     */
    createProfile(req: any, dto: CreatePlayerDto): Promise<{
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
     *
     * GET /api/v1/players/profile
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
     * Explicit /me alias.
     *
     * GET /api/v1/players/profile/me
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
     *
     * PATCH /api/v1/players/profile
     */
    updateProfile(req: any, dto: UpdatePlayerDto): Promise<{
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
     *
     * DELETE /api/v1/players/profile
     */
    deleteProfile(req: any): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Submit my player profile for admin verification.
     *
     * POST /api/v1/players/profile/verification
     */
    submitProfileForVerification(req: any): Promise<{
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
     *
     * PATCH /api/v1/players/statistics
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
     * POST /api/v1/players/achievements
     */
    createAchievement(req: any, dto: CreateAchievementDto): Promise<{
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
     * Get all my achievements.
     *
     * GET /api/v1/players/achievements
     */
    getMyAchievements(req: any): Promise<{
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
     * Update one of my achievements.
     *
     * PATCH
     * /api/v1/players/achievements/:achievementId
     */
    updateAchievement(req: any, achievementId: string, dto: UpdateAchievementDto): Promise<{
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
     * Delete one of my achievements.
     *
     * DELETE
     * /api/v1/players/achievements/:achievementId
     */
    deleteAchievement(req: any, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Submit one of my achievements
     * for admin verification.
     *
     * POST
     * /api/v1/players/achievements/:achievementId/verification
     */
    submitAchievementForVerification(req: any, achievementId: string): Promise<{
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
     * Follow player.
     *
     * POST /api/v1/players/:playerId/follow
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
     * DELETE /api/v1/players/:playerId/follow
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
     * GET /api/v1/players/:playerId/follow
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
     * GET
     * /api/v1/players/:playerId/followers/count
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
     * POST /api/v1/players/:playerId/like
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
     * DELETE /api/v1/players/:playerId/like
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
     * GET /api/v1/players/:playerId/like
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
     * GET
     * /api/v1/players/:playerId/likes/count
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
     * Keep this generic route at the bottom.
     *
     * GET /api/v1/players/:playerId
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
