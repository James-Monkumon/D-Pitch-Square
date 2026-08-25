import type { Request } from 'express';
import { AcademiesService } from './academies.service.js';
import { AcademyQueryDto } from './dto/academy-query.dto.js';
import { AddAcademyCoachDto } from './dto/add-academy-coach.dto.js';
import { AddAcademyPlayerDto } from './dto/add-academy-player.dto.js';
import { CreateAcademyDto } from './dto/create-academy.dto.js';
import { UpdateAcademyDto } from './dto/update-academy.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        sub: string;
    };
};
export declare class AcademiesController {
    private readonly academies;
    constructor(academies: AcademiesService);
    /**
     * Create academy profile.
     *
     * POST /api/v1/academies
     */
    createAcademy(req: AuthenticatedRequest, dto: CreateAcademyDto): Promise<{
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
     * Get academies.
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
     * Get one academy.
     *
     * GET /api/v1/academies/:academyId
     */
    getAcademy(academyId: string): Promise<{
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
     * Update academy.
     *
     * PATCH /api/v1/academies/:academyId
     */
    updateAcademy(req: AuthenticatedRequest, academyId: string, dto: UpdateAcademyDto): Promise<{
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
     * Soft-delete academy.
     *
     * DELETE /api/v1/academies/:academyId
     */
    deleteAcademy(req: AuthenticatedRequest, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Get academy players.
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
     * Add player to academy.
     *
     * POST /api/v1/academies/:academyId/players
     */
    addAcademyPlayer(req: AuthenticatedRequest, academyId: string, dto: AddAcademyPlayerDto): Promise<{
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
     * Remove player from academy.
     *
     * DELETE /api/v1/academies/:academyId/players/:playerId
     */
    removeAcademyPlayer(req: AuthenticatedRequest, academyId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Get academy coaches.
     *
     * GET /api/v1/academies/:academyId/coaches
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
     * Add coach to academy.
     *
     * POST /api/v1/academies/:academyId/coaches
     */
    addAcademyCoach(req: AuthenticatedRequest, academyId: string, dto: AddAcademyCoachDto): Promise<{
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
     * Remove coach from academy.
     *
     * DELETE /api/v1/academies/:academyId/coaches/:coachId
     */
    removeAcademyCoach(req: AuthenticatedRequest, academyId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Follow academy.
     *
     * POST /api/v1/academies/:academyId/follow
     */
    followAcademy(req: AuthenticatedRequest, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Unfollow academy.
     *
     * DELETE /api/v1/academies/:academyId/follow
     */
    unfollowAcademy(req: AuthenticatedRequest, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            following: boolean;
        };
    }>;
    /**
     * Check whether current user follows academy.
     *
     * GET /api/v1/academies/:academyId/is-following
     */
    isFollowingAcademy(req: AuthenticatedRequest, academyId: string): Promise<{
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
    likeAcademy(req: AuthenticatedRequest, academyId: string): Promise<{
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
    unlikeAcademy(req: AuthenticatedRequest, academyId: string): Promise<{
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
    isAcademyLiked(req: AuthenticatedRequest, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            liked: boolean;
        };
    }>;
    /**
     * Get academy like count.
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
export {};
