import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@Injectable()
export class AcademyTeamsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Make sure the authenticated user owns
   * the academy and that the academy is active.
   */
  private async verifyAcademyOwner(
    userId: string,
    academyId: string,
  ) {
    const academy =
      await this.prisma.academyProfile.findFirst({
        where: {
          id: academyId,
          userId,
          deletedAt: null,
        },
      });

    if (!academy) {
      throw new ForbiddenException(
        'You cannot manage this academy',
      );
    }

    return academy;
  }

  /**
   * Make sure a team belongs to the academy.
   */
  private async findTeam(
    academyId: string,
    teamId: string,
  ) {
    const team =
      await this.prisma.academyTeam.findFirst({
        where: {
          id: teamId,
          academyId,
          academy: {
            deletedAt: null,
          },
        },
      });

    if (!team) {
      throw new NotFoundException(
        'Team not found',
      );
    }

    return team;
  }

  /**
   * Create a team.
   */
  async createTeam(
    userId: string,
    academyId: string,
    dto: CreateTeamDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const team =
      await this.prisma.academyTeam.create({
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
  async getTeams(
    academyId: string,
  ) {
    const academy =
      await this.prisma.academyProfile.findFirst({
        where: {
          id: academyId,
          deletedAt: null,
        },
      });

    if (!academy) {
      throw new NotFoundException(
        'Academy profile not found',
      );
    }

    const teams =
      await this.prisma.academyTeam.findMany({
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
      message:
        'Academy teams retrieved successfully',
      data: teams,
    };
  }

  /**
   * Get one team.
   *
   * Public endpoint.
   */
  async getTeam(
    academyId: string,
    teamId: string,
  ) {
    const team =
      await this.prisma.academyTeam.findFirst({
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
      throw new NotFoundException(
        'Team not found',
      );
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
  async updateTeam(
    userId: string,
    academyId: string,
    teamId: string,
    dto: UpdateTeamDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.findTeam(
      academyId,
      teamId,
    );

    const updated =
      await this.prisma.academyTeam.update({
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
  async deleteTeam(
    userId: string,
    academyId: string,
    teamId: string,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.findTeam(
      academyId,
      teamId,
    );

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
  async addPlayer(
    userId: string,
    academyId: string,
    teamId: string,
    dto: AddTeamPlayerDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.findTeam(
      academyId,
      teamId,
    );

    const playerMembership =
      await this.prisma.academyPlayerMembership.findFirst({
        where: {
          academyId,
          playerId: dto.playerId,
          leftAt: null,
        },
      });

    if (!playerMembership) {
      throw new NotFoundException(
        'Player is not an active member of this academy',
      );
    }

    const existing =
      await this.prisma.academyTeamPlayer.findUnique({
        where: {
          teamId_playerId: {
            teamId,
            playerId: dto.playerId,
          },
        },
      });

    if (existing) {
      throw new ConflictException(
        'Player is already assigned to this team',
      );
    }

    const membership =
      await this.prisma.academyTeamPlayer.create({
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
  async removePlayer(
    userId: string,
    academyId: string,
    teamId: string,
    playerId: string,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.findTeam(
      academyId,
      teamId,
    );

    const membership =
      await this.prisma.academyTeamPlayer.findUnique({
        where: {
          teamId_playerId: {
            teamId,
            playerId,
          },
        },
      });

    if (!membership) {
      throw new NotFoundException(
        'Player is not assigned to this team',
      );
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
  async addCoach(
    userId: string,
    academyId: string,
    teamId: string,
    dto: AddTeamCoachDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.findTeam(
      academyId,
      teamId,
    );

    const coachMembership =
      await this.prisma.academyCoachMembership.findFirst({
        where: {
          academyId,
          coachId: dto.coachId,
          leftAt: null,
        },
      });

    if (!coachMembership) {
      throw new NotFoundException(
        'Coach is not an active member of this academy',
      );
    }

    const existing =
      await this.prisma.academyTeamCoach.findUnique({
        where: {
          teamId_coachId: {
            teamId,
            coachId: dto.coachId,
          },
        },
      });

    if (existing) {
      throw new ConflictException(
        'Coach is already assigned to this team',
      );
    }

    const membership =
      await this.prisma.academyTeamCoach.create({
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
  async removeCoach(
    userId: string,
    academyId: string,
    teamId: string,
    coachId: string,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.findTeam(
      academyId,
      teamId,
    );

    const membership =
      await this.prisma.academyTeamCoach.findUnique({
        where: {
          teamId_coachId: {
            teamId,
            coachId,
          },
        },
      });

    if (!membership) {
      throw new NotFoundException(
        'Coach is not assigned to this team',
      );
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
}