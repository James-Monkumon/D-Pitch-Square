import type { Request } from 'express';
import { AcademyTeamsService } from './academy-teams.service.js';
import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
type AuthenticatedRequest = Request & {
    user: {
        sub: string;
    };
};
export declare class AcademyTeamsController {
    private readonly teams;
    constructor(teams: AcademyTeamsService);
    /**
     * Create a team.
     */
    createTeam(req: AuthenticatedRequest, academyId: string, dto: CreateTeamDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            academyId: string;
            ageGroup: string | null;
            category: string | null;
        };
    }>;
    /**
     * Get all teams belonging to an academy.
     *
     * Public endpoint.
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            academyId: string;
            ageGroup: string | null;
            category: string | null;
        })[];
    }>;
    /**
     * Get one team.
     *
     * Public endpoint.
     */
    getTeam(academyId: string, teamId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            players: {
                id: string;
                jerseyNumber: number | null;
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
            coaches: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            academyId: string;
            ageGroup: string | null;
            category: string | null;
        };
    }>;
    /**
     * Update a team.
     */
    updateTeam(req: AuthenticatedRequest, academyId: string, teamId: string, dto: UpdateTeamDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            academyId: string;
            ageGroup: string | null;
            category: string | null;
        };
    }>;
    /**
     * Delete a team.
     */
    deleteTeam(req: AuthenticatedRequest, academyId: string, teamId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Add a player to a team.
     */
    addPlayer(req: AuthenticatedRequest, academyId: string, teamId: string, dto: AddTeamPlayerDto): Promise<{
        success: boolean;
        message: string;
        data: {
            player: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                preferredFoot: import("@prisma/client").$Enums.PreferredFoot | null;
                primaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                secondaryPosition: import("@prisma/client").$Enums.PlayerPosition | null;
                jerseyNumber: number | null;
            };
        } & {
            id: string;
            jerseyNumber: number | null;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            joinedAt: Date;
            leftAt: Date | null;
            teamId: string;
        };
    }>;
    /**
     * Remove a player from a team.
     */
    removePlayer(req: AuthenticatedRequest, academyId: string, teamId: string, playerId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    /**
     * Add a coach to a team.
     */
    addCoach(req: AuthenticatedRequest, academyId: string, teamId: string, dto: AddTeamCoachDto): Promise<{
        success: boolean;
        message: string;
        data: {
            coach: {
                id: string;
                profilePicture: string | null;
                fullName: string;
                currentAcademyClub: string | null;
                coachingRole: string | null;
                yearsOfExperience: number | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            coachId: string;
            role: string | null;
            joinedAt: Date;
            leftAt: Date | null;
            teamId: string;
        };
    }>;
    /**
     * Remove a coach from a team.
     */
    removeCoach(req: AuthenticatedRequest, academyId: string, teamId: string, coachId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
export {};
