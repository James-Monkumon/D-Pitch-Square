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
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
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
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
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
     * Get one public academy profile.
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
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
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
            deletedAt: Date | null;
            logoUrl: string | null;
            coverImageUrl: string | null;
            academyName: string;
            foundedYear: number | null;
            contactEmail: string | null;
            contactPhone: string | null;
            websiteUrl: string | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
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
                fullName: string;
                profilePicture: string | null;
                nationality: string | null;
                country: string | null;
                state: string | null;
                city: string | null;
                height: number | null;
                weight: number | null;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                jerseyNumber: number | null;
                currentClub: string | null;
                currentAcademyName: string | null;
            };
            joinedAt: Date;
            leftAt: Date | null;
        }[];
    }>;
    /**
     * Add a player to an academy.
     */
    addAcademyPlayer(userId: string, academyId: string, dto: AddAcademyPlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            playerId: string;
            player: {
                id: string;
                fullName: string;
                profilePicture: string | null;
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
     */
    removeAcademyPlayer(userId: string, academyId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Get all active coaches belonging
     * to an academy.
     */
    getAcademyCoaches(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            role: string | null;
            joinedAt: Date;
            leftAt: Date | null;
            coachId: string;
            coach: {
                id: string;
                fullName: string;
                profilePicture: string | null;
                country: string | null;
                state: string | null;
                city: string | null;
                currentAcademyClub: string | null;
                coachingRole: string | null;
                coachingLicense: string | null;
                coachingCertification: string | null;
                yearsOfExperience: number | null;
            };
        }[];
    }>;
    /**
     * Add a coach to an academy.
     */
    addAcademyCoach(userId: string, academyId: string, dto: AddAcademyCoachDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            role: string | null;
            academyId: string;
            joinedAt: Date;
            leftAt: Date | null;
            coachId: string;
            coach: {
                id: string;
                fullName: string;
                profilePicture: string | null;
                coachingRole: string | null;
                yearsOfExperience: number | null;
            };
        };
    }>;
    /**
     * Remove a coach from an academy.
     */
    removeAcademyCoach(userId: string, academyId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow an academy.
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
     * Get total number of likes
     * for an academy.
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
