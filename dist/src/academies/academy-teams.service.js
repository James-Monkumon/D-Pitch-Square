var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AcademyTeamsService = class AcademyTeamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Make sure the authenticated user owns
     * the academy and that the academy is active.
     */
    async verifyAcademyOwner(userId, academyId) {
        const academy = await this.prisma.academyProfile.findFirst({
            where: {
                id: academyId,
                userId,
                deletedAt: null,
            },
        });
        if (!academy) {
            throw new ForbiddenException('You cannot manage this academy');
        }
        return academy;
    }
    /**
     * Make sure a team belongs to the academy.
     */
    async findTeam(academyId, teamId) {
        const team = await this.prisma.academyTeam.findFirst({
            where: {
                id: teamId,
                academyId,
                academy: {
                    deletedAt: null,
                },
            },
        });
        if (!team) {
            throw new NotFoundException('Team not found');
        }
        return team;
    }
    /**
     * Create a team.
     */
    async createTeam(userId, academyId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        const team = await this.prisma.academyTeam.create({
            data: {
                academyId,
                name: dto.name,
                ageGroup: dto.ageGroup,
                category: dto.category,
                description: dto.description,
            },
        });
        return {
            success: true,
            message: 'Team created successfully',
            data: team,
        };
    }
    /**
     * Get all teams belonging to an academy.
     *
     * Public endpoint.
     */
    async getTeams(academyId) {
        const academy = await this.prisma.academyProfile.findFirst({
            where: {
                id: academyId,
                deletedAt: null,
            },
        });
        if (!academy) {
            throw new NotFoundException('Academy profile not found');
        }
        const teams = await this.prisma.academyTeam.findMany({
            where: {
                academyId,
            },
            include: {
                _count: {
                    select: {
                        players: true,
                        coaches: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return {
            success: true,
            message: 'Academy teams retrieved successfully',
            data: teams,
        };
    }
    /**
     * Get one team.
     *
     * Public endpoint.
     */
    async getTeam(academyId, teamId) {
        const team = await this.prisma.academyTeam.findFirst({
            where: {
                id: teamId,
                academyId,
                academy: {
                    deletedAt: null,
                },
            },
            include: {
                players: {
                    select: {
                        id: true,
                        playerId: true,
                        jerseyNumber: true,
                        joinedAt: true,
                        leftAt: true,
                        player: {
                            select: {
                                id: true,
                                fullName: true,
                                profilePicture: true,
                                nationality: true,
                                country: true,
                                state: true,
                                city: true,
                                currentClub: true,
                                currentAcademyName: true,
                                height: true,
                                weight: true,
                                preferredFoot: true,
                                primaryPosition: true,
                                secondaryPosition: true,
                                jerseyNumber: true,
                            },
                        },
                    },
                },
                coaches: {
                    select: {
                        id: true,
                        coachId: true,
                        role: true,
                        joinedAt: true,
                        leftAt: true,
                        coach: {
                            select: {
                                id: true,
                                fullName: true,
                                profilePicture: true,
                                country: true,
                                state: true,
                                city: true,
                                currentAcademyClub: true,
                                coachingRole: true,
                                coachingLicense: true,
                                coachingCertification: true,
                                yearsOfExperience: true,
                            },
                        },
                    },
                },
            },
        });
        if (!team) {
            throw new NotFoundException('Team not found');
        }
        return {
            success: true,
            message: 'Team retrieved successfully',
            data: team,
        };
    }
    /**
     * Update a team.
     */
    async updateTeam(userId, academyId, teamId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.findTeam(academyId, teamId);
        const updated = await this.prisma.academyTeam.update({
            where: {
                id: teamId,
            },
            data: {
                ...(dto.name !== undefined && {
                    name: dto.name,
                }),
                ...(dto.ageGroup !== undefined && {
                    ageGroup: dto.ageGroup,
                }),
                ...(dto.category !== undefined && {
                    category: dto.category,
                }),
                ...(dto.description !== undefined && {
                    description: dto.description,
                }),
            },
        });
        return {
            success: true,
            message: 'Team updated successfully',
            data: updated,
        };
    }
    /**
     * Delete a team.
     */
    async deleteTeam(userId, academyId, teamId) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.findTeam(academyId, teamId);
        await this.prisma.academyTeam.delete({
            where: {
                id: teamId,
            },
        });
        return {
            success: true,
            message: 'Team deleted successfully',
            data: null,
        };
    }
    /**
     * Add a player to a team.
     *
     * The player must already belong to the academy.
     */
    async addPlayer(userId, academyId, teamId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.findTeam(academyId, teamId);
        const playerMembership = await this.prisma.academyPlayerMembership.findFirst({
            where: {
                academyId,
                playerId: dto.playerId,
                leftAt: null,
            },
        });
        if (!playerMembership) {
            throw new NotFoundException('Player is not an active member of this academy');
        }
        const existing = await this.prisma.academyTeamPlayer.findUnique({
            where: {
                teamId_playerId: {
                    teamId,
                    playerId: dto.playerId,
                },
            },
        });
        if (existing) {
            throw new ConflictException('Player is already assigned to this team');
        }
        const membership = await this.prisma.academyTeamPlayer.create({
            data: {
                teamId,
                playerId: dto.playerId,
                jerseyNumber: dto.jerseyNumber,
            },
            include: {
                player: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePicture: true,
                        primaryPosition: true,
                        secondaryPosition: true,
                        preferredFoot: true,
                        jerseyNumber: true,
                    },
                },
            },
        });
        return {
            success: true,
            message: 'Player added to team successfully',
            data: membership,
        };
    }
    /**
     * Remove a player from a team.
     */
    async removePlayer(userId, academyId, teamId, playerId) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.findTeam(academyId, teamId);
        const membership = await this.prisma.academyTeamPlayer.findUnique({
            where: {
                teamId_playerId: {
                    teamId,
                    playerId,
                },
            },
        });
        if (!membership) {
            throw new NotFoundException('Player is not assigned to this team');
        }
        await this.prisma.academyTeamPlayer.delete({
            where: {
                teamId_playerId: {
                    teamId,
                    playerId,
                },
            },
        });
        return {
            success: true,
            message: 'Player removed from team successfully',
            data: null,
        };
    }
    /**
     * Add a coach to a team.
     *
     * The coach must already belong to the academy.
     */
    async addCoach(userId, academyId, teamId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.findTeam(academyId, teamId);
        const coachMembership = await this.prisma.academyCoachMembership.findFirst({
            where: {
                academyId,
                coachId: dto.coachId,
                leftAt: null,
            },
        });
        if (!coachMembership) {
            throw new NotFoundException('Coach is not an active member of this academy');
        }
        const existing = await this.prisma.academyTeamCoach.findUnique({
            where: {
                teamId_coachId: {
                    teamId,
                    coachId: dto.coachId,
                },
            },
        });
        if (existing) {
            throw new ConflictException('Coach is already assigned to this team');
        }
        const membership = await this.prisma.academyTeamCoach.create({
            data: {
                teamId,
                coachId: dto.coachId,
                role: dto.role,
            },
            include: {
                coach: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePicture: true,
                        currentAcademyClub: true,
                        coachingRole: true,
                        yearsOfExperience: true,
                    },
                },
            },
        });
        return {
            success: true,
            message: 'Coach added to team successfully',
            data: membership,
        };
    }
    /**
     * Remove a coach from a team.
     */
    async removeCoach(userId, academyId, teamId, coachId) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.findTeam(academyId, teamId);
        const membership = await this.prisma.academyTeamCoach.findUnique({
            where: {
                teamId_coachId: {
                    teamId,
                    coachId,
                },
            },
        });
        if (!membership) {
            throw new NotFoundException('Coach is not assigned to this team');
        }
        await this.prisma.academyTeamCoach.delete({
            where: {
                teamId_coachId: {
                    teamId,
                    coachId,
                },
            },
        });
        return {
            success: true,
            message: 'Coach removed from team successfully',
            data: null,
        };
    }
};
AcademyTeamsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AcademyTeamsService);
export { AcademyTeamsService };
//# sourceMappingURL=academy-teams.service.js.map