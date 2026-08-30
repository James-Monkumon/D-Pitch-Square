import { PrismaService } from '../prisma/prisma.service.js';
import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
export declare class AcademyTeamsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    /**
     * Make sure the authenticated user owns
     * the academy and that the academy is active.
     */
    private verifyAcademyOwner;
    /**
     * Make sure a team belongs to the academy,
     * the academy is active,
     * and the team has not been soft-deleted.
     */
    private findTeam;
    /**
     * Normalize a team name before comparing or storing it.
     */
    private normalizeTeamName;
    /**
     * Translate PostgreSQL/Prisma unique-constraint failures
     * into a friendly HTTP 409 response.
     *
     * This is the final protection for race conditions where
     * two requests attempt to create/reactivate/rename teams
     * to the same active normalized name simultaneously.
     */
    private handleTeamNameUniqueConstraint;
    /**
     * Create or reactivate a team.
     *
     * Behavior:
     *
     * 1. If an ACTIVE team with the same name already exists,
     *    reject with 409 Conflict.
     *
     * 2. If a SOFT-DELETED team with the same name exists,
     *    reactivate that same team row.
     *
     * 3. Otherwise create a brand-new team.
     *
     * Reactivating a team DOES NOT automatically reactivate
     * its previous player or coach memberships.
     *
     * POST /api/v1/academies/:academyId/teams
     */
    createTeam(userId: string, academyId: string, dto: CreateTeamDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            academyId: string;
            name: string;
            ageGroup: string | null;
            category: string | null;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Get all active teams belonging to an academy.
     *
     * Soft-deleted teams are excluded.
     *
     * Only active player/coach memberships
     * are included in relationship counts.
     *
     * GET /api/v1/academies/:academyId/teams
     */
    getTeams(academyId: string): Promise<{
        success: boolean;
        message: string;
        data: ({
            _count: {
                players: number;
                coaches: number;
            };
        } & {
            id: string;
            academyId: string;
            name: string;
            ageGroup: string | null;
            category: string | null;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        })[];
    }>;
    /**
     * Get one active team.
     *
     * Soft-deleted teams are treated as not found.
     *
     * Only active players and coaches
     * are returned in the current roster.
     *
     * GET /api/v1/academies/:academyId/teams/:teamId
     */
    getTeam(academyId: string, teamId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            players: {
                id: string;
                leftAt: Date | null;
                playerId: string;
                jerseyNumber: number | null;
                joinedAt: Date;
                player: {
                    id: string;
                    country: string | null;
                    state: string | null;
                    city: string | null;
                    jerseyNumber: number | null;
                    profilePicture: string | null;
                    fullName: string;
                    nationality: string | null;
                    currentClub: string | null;
                    currentAcademyName: string | null;
                    height: number | null;
                    weight: number | null;
                    preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                    primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                    secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                };
            }[];
            coaches: {
                id: string;
                leftAt: Date | null;
                joinedAt: Date;
                coachId: string;
                role: string | null;
                coach: {
                    id: string;
                    country: string | null;
                    state: string | null;
                    city: string | null;
                    profilePicture: string | null;
                    fullName: string;
                    currentAcademyClub: string | null;
                    coachingRole: string | null;
                    coachingLicense: string | null;
                    coachingCertification: string | null;
                    yearsOfExperience: number | null;
                };
            }[];
        } & {
            id: string;
            academyId: string;
            name: string;
            ageGroup: string | null;
            category: string | null;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Update an active team.
     *
     * Soft-deleted teams cannot be updated.
     *
     * Renaming to another active team's name
     * is rejected.
     *
     * PATCH /api/v1/academies/:academyId/teams/:teamId
     */
    updateTeam(userId: string, academyId: string, teamId: string, dto: UpdateTeamDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            academyId: string;
            name: string;
            ageGroup: string | null;
            category: string | null;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    /**
     * Soft-delete a team.
     *
     * The team row is preserved by setting deletedAt.
     *
     * Every currently active player and coach membership
     * belonging to the team is closed using the same
     * timestamp.
     *
     * Historical membership rows remain in the database.
     *
     * DELETE /api/v1/academies/:academyId/teams/:teamId
     */
    deleteTeam(userId: string, academyId: string, teamId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Add a player to an active team.
     *
     * Player must already be an active
     * academy member.
     *
     * If the player previously belonged to the team
     * and was removed, the historical membership row
     * is reactivated.
     *
     * POST /api/v1/academies/:academyId/teams/:teamId/players
     */
    addPlayer(userId: string, academyId: string, teamId: string, dto: AddTeamPlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            leftAt: Date | null;
            teamId: string;
            playerId: string;
            jerseyNumber: number | null;
            joinedAt: Date;
            player: {
                id: string;
                jerseyNumber: number | null;
                profilePicture: string | null;
                fullName: string;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
            };
        };
    }>;
    /**
     * Soft-remove a player from an active team.
     *
     * DELETE /api/v1/academies/:academyId/teams/:teamId/players/:playerId
     */
    removePlayer(userId: string, academyId: string, teamId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Add a coach to an active team.
     *
     * Coach must already be an active
     * academy member.
     *
     * Historical membership is reactivated
     * instead of creating a duplicate.
     *
     * POST /api/v1/academies/:academyId/teams/:teamId/coaches
     */
    addCoach(userId: string, academyId: string, teamId: string, dto: AddTeamCoachDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            leftAt: Date | null;
            teamId: string;
            joinedAt: Date;
            coachId: string;
            role: string | null;
            coach: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                currentAcademyClub: string | null;
                coachingRole: string | null;
                yearsOfExperience: number | null;
            };
        };
    }>;
    /**
     * Soft-remove a coach from an active team.
     *
     * DELETE /api/v1/academies/:academyId/teams/:teamId/coaches/:coachId
     */
    removeCoach(userId: string, academyId: string, teamId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
