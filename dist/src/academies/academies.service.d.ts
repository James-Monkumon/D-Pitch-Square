import { PrismaService } from '../prisma/prisma.service.js';
import { AcademyQueryDto } from './dto/academy-query.dto.js';
import { AddAcademyCoachDto } from './dto/add-academy-coach.dto.js';
import { AddAcademyPlayerDto } from './dto/add-academy-player.dto.js';
import { CreateAcademyDto } from './dto/create-academy.dto.js';
import { UpdateAcademyDto } from './dto/update-academy.dto.js';
export declare class AcademiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    /**
     * Verify that the authenticated user owns
     * the academy and that the academy is active.
     */
    private verifyAcademyOwner;
    /**
     * Find an active academy or throw.
     */
    private getActiveAcademy;
    /**
     * Create an academy profile.
     *
     * If the user previously had an academy profile that was
     * soft-deleted, that profile is restored and reused.
     *
     * POST /api/v1/academies
     */
    createAcademy(userId: string, dto: CreateAcademyDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            updatedAt: Date;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
        };
    }>;
    /**
     * Get a paginated list of academies.
     *
     * GET /api/v1/academies
     */
    getAcademies(query: AcademyQueryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            updatedAt: Date;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    /**
     * Get one academy profile.
     *
     * GET /api/v1/academies/:academyId
     */
    getAcademyById(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            updatedAt: Date;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
        };
    }>;
    /**
     * Update an academy.
     *
     * PATCH /api/v1/academies/:academyId
     */
    updateAcademy(userId: string, academyId: string, dto: UpdateAcademyDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            description: string | null;
            userId: string;
            updatedAt: Date;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
        };
    }>;
    /**
     * Soft-delete an academy.
     *
     * DELETE /api/v1/academies/:academyId
     */
    deleteAcademy(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Get all active players belonging
     * to an academy.
     *
     * GET /api/v1/academies/:academyId/players
     */
    getAcademyPlayers(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            playerId: string;
            player: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                nationality: string | null;
                country: string | null;
                state: string | null;
                city: string | null;
                currentClub: string | null;
                currentAcademyName: string | null;
                height: number | null;
                weight: number | null;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                jerseyNumber: number | null;
            };
            joinedAt: Date;
            leftAt: Date | null;
        }[];
    }>;
    /**
     * Add a player to an academy.
     *
     * If a previous academy membership exists and was
     * soft-removed, reactivate the same row.
     *
     * POST /api/v1/academies/:academyId/players
     */
    addAcademyPlayer(userId: string, academyId: string, dto: AddAcademyPlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            playerId: string;
            player: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            };
            academyId: string;
            joinedAt: Date;
            leftAt: Date | null;
        };
    }>;
    /**
     * Remove a player from an academy.
     *
     * The academy membership and any currently active team
     * assignments inside this academy are soft-removed.
     *
     * DELETE /api/v1/academies/:academyId/players/:playerId
     */
    removeAcademyPlayer(userId: string, academyId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Get academy statistics.
     *
     * GET /api/v1/academies/:academyId/statistics
     */
    getAcademyStatistics(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            totalPlayers: number;
            totalCoaches: number;
            totalTeams: number;
            totalFollowers: number;
        };
    }>;
    /**
     * Request academy verification.
     *
     * POST /api/v1/academies/:academyId/verification/request
     */
    requestVerification(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    /**
     * Get all active coaches belonging
     * to an academy.
     *
     * GET /api/v1/academies/:academyId/coaches
     */
    getAcademyCoaches(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            role: string | null;
            coach: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                country: string | null;
                state: string | null;
                city: string | null;
                currentAcademyClub: string | null;
                coachingRole: string | null;
                coachingLicense: string | null;
                coachingCertification: string | null;
                yearsOfExperience: number | null;
            };
            coachId: string;
            joinedAt: Date;
            leftAt: Date | null;
        }[];
    }>;
    /**
     * Add a coach to an academy.
     *
     * If a previous academy membership exists and was
     * soft-removed, reactivate the same row.
     *
     * POST /api/v1/academies/:academyId/coaches
     */
    addAcademyCoach(userId: string, academyId: string, dto: AddAcademyCoachDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            role: string | null;
            coach: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                coachingRole: string | null;
                yearsOfExperience: number | null;
            };
            coachId: string;
            academyId: string;
            joinedAt: Date;
            leftAt: Date | null;
        };
    }>;
    /**
     * Remove a coach from an academy.
     *
     * The academy membership and any active team assignments
     * in this academy are soft-removed.
     *
     * DELETE /api/v1/academies/:academyId/coaches/:coachId
     */
    removeAcademyCoach(userId: string, academyId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow an academy.
     *
     * POST /api/v1/academies/:academyId/follow
     */
    followAcademy(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow an academy.
     *
     * DELETE /api/v1/academies/:academyId/follow
     */
    unfollowAcademy(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check whether a user follows an academy.
     *
     * GET /api/v1/academies/:academyId/is-following
     */
    isFollowingAcademy(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Get academy follower count.
     *
     * GET /api/v1/academies/:academyId/followers/count
     */
    getAcademyFollowerCount(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            followers: number;
        };
    }>;
    /**
     * Like an academy.
     *
     * POST /api/v1/academies/:academyId/like
     */
    likeAcademy(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Unlike an academy.
     *
     * DELETE /api/v1/academies/:academyId/like
     */
    unlikeAcademy(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Check whether the authenticated user
     * likes an academy.
     *
     * GET /api/v1/academies/:academyId/is-liked
     */
    isAcademyLiked(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get total number of likes for an academy.
     *
     * GET /api/v1/academies/:academyId/likes/count
     */
    getAcademyLikesCount(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            count: number;
        };
    }>;
}
