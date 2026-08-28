import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCoachDto } from './dto/create-coach.dto.js';
import { UpdateCoachDto } from './dto/update-coach.dto.js';
import { CreateCoachAchievementDto } from './dto/create-coach-achievement.dto.js';
import { UpdateCoachAchievementDto } from './dto/update-coach-achievement.dto.js';
export declare class CoachesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    /**
     * Verify that the authenticated user has
     * the COACH role.
     */
    private verifyCoachRole;
    /**
     * Get the authenticated user's
     * active coach profile.
     */
    private verifyCoachOwner;
    /**
     * Find an active coach profile
     * by profile ID.
     */
    private findActiveCoach;
    /**
     * Ensure that the supplied AchievementType
     * is valid for Coach profiles.
     */
    private validateCoachAchievementType;
    /**
     * Create the authenticated user's
     * coach profile.
     *
     * POST /api/v1/coaches
     */
    createProfile(userId: string, dto: CreateCoachDto): Promise<{
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
     * Get authenticated user's
     * coach profile.
     *
     * Includes shared Coach achievements.
     *
     * GET /api/v1/coaches/me
     */
    getMyProfile(userId: string): Promise<{
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
     * Update authenticated user's
     * coach profile.
     *
     * PATCH /api/v1/coaches/me
     */
    updateProfile(userId: string, dto: UpdateCoachDto): Promise<{
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
     * Get a public coach profile.
     *
     * Includes Coach achievements.
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
    /**
     * Soft-delete authenticated user's
     * coach profile.
     *
     * DELETE /api/v1/coaches/me
     */
    deleteProfile(userId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Create an achievement for
     * the authenticated Coach.
     *
     * POST /api/v1/coaches/achievements
     */
    createAchievement(userId: string, dto: CreateCoachAchievementDto): Promise<{
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
     * Get all achievements belonging
     * to the authenticated Coach.
     *
     * GET /api/v1/coaches/achievements
     */
    getMyAchievements(userId: string): Promise<{
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
     * Update one of the authenticated
     * Coach's achievements.
     *
     * PATCH /api/v1/coaches/achievements/:achievementId
     */
    updateAchievement(userId: string, achievementId: string, dto: UpdateCoachAchievementDto): Promise<{
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
     * Delete one of the authenticated
     * Coach's achievements.
     *
     * DELETE /api/v1/coaches/achievements/:achievementId
     */
    deleteAchievement(userId: string, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow a Coach.
     *
     * POST /api/v1/coaches/:coachId/follow
     */
    followCoach(userId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow a Coach.
     *
     * DELETE /api/v1/coaches/:coachId/follow
     */
    unfollowCoach(userId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check whether the authenticated
     * user follows a Coach.
     *
     * GET /api/v1/coaches/:coachId/follow
     */
    isFollowingCoach(userId: string, coachId: string): Promise<{
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
     * Like a Coach.
     *
     * POST /api/v1/coaches/:coachId/like
     */
    likeCoach(userId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Unlike a Coach.
     *
     * DELETE /api/v1/coaches/:coachId/like
     */
    unlikeCoach(userId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Check whether authenticated
     * user likes a Coach.
     *
     * GET /api/v1/coaches/:coachId/like
     */
    isCoachLiked(userId: string, coachId: string): Promise<{
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
}
