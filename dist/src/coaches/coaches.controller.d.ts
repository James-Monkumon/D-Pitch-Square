import type { Request } from 'express';
import { CoachesService } from './coaches.service.js';
import { CreateCoachDto } from './dto/create-coach.dto.js';
import { UpdateCoachDto } from './dto/update-coach.dto.js';
import { CreateCoachAchievementDto } from './dto/create-coach-achievement.dto.js';
import { UpdateCoachAchievementDto } from './dto/update-coach-achievement.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        id: string;
        email?: string;
        roles?: string[];
    };
};
export declare class CoachesController {
    private readonly coachesService;
    constructor(coachesService: CoachesService);
    /**
     * Create my Coach profile.
     *
     * POST /api/v1/coaches
     */
    createProfile(req: AuthenticatedRequest, dto: CreateCoachDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            userId: string;
            profilePicture: string | null;
            coverPhoto: string | null;
            fullName: string;
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            currentAcademyClub: string | null;
            coachingRole: string | null;
            coachingLicense: string | null;
            coachingCertification: string | null;
            yearsOfExperience: number | null;
        };
    }>;
    /**
     * Get my Coach profile.
     *
     * GET /api/v1/coaches/me
     */
    getMyProfile(req: AuthenticatedRequest): Promise<{
        success: boolean;
        message: string;
        data: ({
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
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            currentAcademyClub: string | null;
            coachingRole: string | null;
            coachingLicense: string | null;
            coachingCertification: string | null;
            yearsOfExperience: number | null;
        }) | null;
    }>;
    /**
     * Update my Coach profile.
     *
     * PATCH /api/v1/coaches/me
     */
    updateProfile(req: AuthenticatedRequest, dto: UpdateCoachDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            userId: string;
            profilePicture: string | null;
            coverPhoto: string | null;
            fullName: string;
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            currentAcademyClub: string | null;
            coachingRole: string | null;
            coachingLicense: string | null;
            coachingCertification: string | null;
            yearsOfExperience: number | null;
        };
    }>;
    /**
     * Soft-delete my Coach profile.
     *
     * DELETE /api/v1/coaches/me
     */
    deleteProfile(req: AuthenticatedRequest): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Create a Coach achievement.
     *
     * POST /api/v1/coaches/achievements
     */
    createAchievement(req: AuthenticatedRequest, dto: CreateCoachAchievementDto): Promise<{
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
     * Get my Coach achievements.
     *
     * GET /api/v1/coaches/achievements
     */
    getMyAchievements(req: AuthenticatedRequest): Promise<{
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
     * Update one of my Coach achievements.
     *
     * PATCH /api/v1/coaches/achievements/:achievementId
     */
    updateAchievement(req: AuthenticatedRequest, achievementId: string, dto: UpdateCoachAchievementDto): Promise<{
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
     * Delete one of my Coach achievements.
     *
     * DELETE /api/v1/coaches/achievements/:achievementId
     */
    deleteAchievement(req: AuthenticatedRequest, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow Coach.
     *
     * POST /api/v1/coaches/:coachId/follow
     */
    followCoach(req: AuthenticatedRequest, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow Coach.
     *
     * DELETE /api/v1/coaches/:coachId/follow
     */
    unfollowCoach(req: AuthenticatedRequest, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check follow status.
     *
     * GET /api/v1/coaches/:coachId/follow
     */
    isFollowingCoach(req: AuthenticatedRequest, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Get Coach follower count.
     *
     * GET /api/v1/coaches/:coachId/followers/count
     */
    getCoachFollowerCount(coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            followers: number;
        };
    }>;
    /**
     * Like Coach.
     *
     * POST /api/v1/coaches/:coachId/like
     */
    likeCoach(req: AuthenticatedRequest, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Unlike Coach.
     *
     * DELETE /api/v1/coaches/:coachId/like
     */
    unlikeCoach(req: AuthenticatedRequest, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Check like status.
     *
     * GET /api/v1/coaches/:coachId/like
     */
    isCoachLiked(req: AuthenticatedRequest, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get Coach like count.
     *
     * GET /api/v1/coaches/:coachId/likes/count
     */
    getCoachLikesCount(coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            count: number;
        };
    }>;
    /**
     * Get public Coach profile.
     *
     * GET /api/v1/coaches/:coachId
     */
    getProfileById(coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
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
            country: string | null;
            state: string | null;
            city: string | null;
            biography: string | null;
            contactInformation: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            currentAcademyClub: string | null;
            coachingRole: string | null;
            coachingLicense: string | null;
            coachingCertification: string | null;
            yearsOfExperience: number | null;
        };
    }>;
}
export {};
