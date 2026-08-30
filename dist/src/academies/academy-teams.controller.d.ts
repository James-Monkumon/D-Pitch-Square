import type { Request } from 'express';
import { AcademyTeamsService } from './academy-teams.service.js';
import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        id: string;
        email: string;
        roles: string[];
    };
};
export declare class AcademyTeamsController {
    private readonly teams;
    constructor(teams: AcademyTeamsService);
    /**
     * Create team.
     *
     * POST /api/v1/academies/:academyId/teams
     */
    createTeam(req: AuthenticatedRequest, academyId: string, dto: CreateTeamDto): Promise<{
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
     * Get academy teams.
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
     * Get one team.
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
     * Update team.
     *
     * PATCH /api/v1/academies/:academyId/teams/:teamId
     */
    updateTeam(req: AuthenticatedRequest, academyId: string, teamId: string, dto: UpdateTeamDto): Promise<{
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
     * Delete team.
     *
     * DELETE /api/v1/academies/:academyId/teams/:teamId
     */
    deleteTeam(req: AuthenticatedRequest, academyId: string, teamId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Add player to team.
     *
     * POST /api/v1/academies/:academyId/teams/:teamId/players
     */
    addPlayer(req: AuthenticatedRequest, academyId: string, teamId: string, dto: AddTeamPlayerDto): Promise<{
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
     * Remove player from team.
     *
     * DELETE /api/v1/academies/:academyId/teams/:teamId/players/:playerId
     */
    removePlayer(req: AuthenticatedRequest, academyId: string, teamId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Add coach to team.
     *
     * POST /api/v1/academies/:academyId/teams/:teamId/coaches
     */
    addCoach(req: AuthenticatedRequest, academyId: string, teamId: string, dto: AddTeamCoachDto): Promise<{
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
     * Remove coach from team.
     *
     * DELETE /api/v1/academies/:academyId/teams/:teamId/coaches/:coachId
     */
    removeCoach(req: AuthenticatedRequest, academyId: string, teamId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
export {};
