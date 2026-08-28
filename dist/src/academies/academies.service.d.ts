import { PrismaService } from '../prisma/prisma.service.js';
import { AcademyQueryDto } from './dto/academy-query.dto.js';
import { AddAcademyCoachDto } from './dto/add-academy-coach.dto.js';
import { AddAcademyPlayerDto } from './dto/add-academy-player.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
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
            userId: string;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            description: string | null;
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
            userId: string;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            description: string | null;
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
     * Get one public academy profile.
     *
     * GET /api/v1/academies/:academyId
     */
    getAcademyById(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            userId: string;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            description: string | null;
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
            userId: string;
            country: string | null;
            state: string | null;
            city: string | null;
            address: string | null;
            socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            description: string | null;
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
    requestVerification(userId: string, academyId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
        };
    }>;
    /**
     * Add a player to a team.
     *
     * POST /api/v1/academies/teams/:teamId/players
     */
    addTeamPlayer(userId: string, teamId: string, dto: AddTeamPlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            jerseyNumber: number | null;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            player: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            };
            joinedAt: Date;
            leftAt: Date | null;
            teamId: string;
        };
    }>;
    /**
     * Get all active players assigned to a team.
     *
     * GET /api/v1/academies/teams/:teamId/players
     */
    getTeamPlayers(teamId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            jerseyNumber: number | null;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            player: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            };
            joinedAt: Date;
            leftAt: Date | null;
            teamId: string;
        }[];
    }>;
    /**
     * Remove a player from a team.
     *
     * DELETE /api/v1/academies/teams/:teamId/players/:playerId
     */
    removeTeamPlayer(userId: string, teamId: string, playerId: string): Promise<{
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
            coachId: string;
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
            joinedAt: Date;
            leftAt: Date | null;
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
            coachId: string;
            role: string | null;
            coach: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                coachingRole: string | null;
                yearsOfExperience: number | null;
            };
            academyId: string;
            joinedAt: Date;
            leftAt: Date | null;
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
