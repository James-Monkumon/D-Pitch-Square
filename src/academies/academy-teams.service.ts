import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

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

  // =========================================================
  // PRIVATE HELPERS
  // =========================================================

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
   * Make sure a team belongs to the academy,
   * the academy is active,
   * and the team has not been soft-deleted.
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
          deletedAt: null,

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
   * Normalize a team name before comparing or storing it.
   */
  private normalizeTeamName(
    name: string,
  ) {
    return name.trim();
  }

  /**
   * Translate PostgreSQL/Prisma unique-constraint failures
   * into a friendly HTTP 409 response.
   *
   * This is the final protection for race conditions where
   * two requests attempt to create/reactivate/rename teams
   * to the same active normalized name simultaneously.
   */
  private handleTeamNameUniqueConstraint(
    error: unknown,
  ): never {
    if (
      error instanceof
        Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(
        'An active team with this name already exists in this academy',
      );
    }

    throw error;
  }

  // =========================================================
  // TEAM
  // =========================================================

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
  async createTeam(
    userId: string,
    academyId: string,
    dto: CreateTeamDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const normalizedName =
      this.normalizeTeamName(dto.name);

    /**
     * Prevent duplicate ACTIVE teams
     * with the same name in the academy.
     */
    const activeTeam =
      await this.prisma.academyTeam.findFirst({
        where: {
          academyId,
          deletedAt: null,

          name: {
            equals: normalizedName,
            mode: 'insensitive',
          },
        },
      });

    if (activeTeam) {
      throw new ConflictException(
        'An active team with this name already exists in this academy',
      );
    }

    /**
     * Search historical/deleted teams.
     *
     * If several historical duplicates exist from old
     * test data, reactivate the most recently deleted one.
     */
    const deletedTeam =
      await this.prisma.academyTeam.findFirst({
        where: {
          academyId,

          deletedAt: {
            not: null,
          },

          name: {
            equals: normalizedName,
            mode: 'insensitive',
          },
        },

        orderBy: {
          deletedAt: 'desc',
        },
      });

    /**
     * Reactivate historical team.
     */
    if (deletedTeam) {
      try {
        const reactivated =
          await this.prisma.academyTeam.update({
            where: {
              id: deletedTeam.id,
            },

            data: {
              name: normalizedName,

              ageGroup:
                dto.ageGroup ?? null,

              category:
                dto.category ?? null,

              description:
                dto.description ?? null,

              deletedAt: null,
            },
          });

        /**
         * IMPORTANT:
         *
         * We do NOT modify AcademyTeamPlayer
         * or AcademyTeamCoach here.
         *
         * Historical memberships remain inactive
         * with leftAt populated.
         *
         * addPlayer/addCoach must be called explicitly
         * to reactivate those historical memberships.
         */
        return {
          success: true,
          message:
            'Team reactivated successfully',
          data: reactivated,
        };
      } catch (error) {
        this.handleTeamNameUniqueConstraint(
          error,
        );
      }
    }

    /**
     * No active or historical matching team exists.
     * Create a brand-new team.
     */
    try {
      const team =
        await this.prisma.academyTeam.create({
          data: {
            academyId,

            name: normalizedName,

            ageGroup:
              dto.ageGroup ?? null,

            category:
              dto.category ?? null,

            description:
              dto.description ?? null,
          },
        });

      return {
        success: true,
        message:
          'Team created successfully',
        data: team,
      };
    } catch (error) {
      this.handleTeamNameUniqueConstraint(
        error,
      );
    }
  }

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
          deletedAt: null,
        },

        include: {
          _count: {
            select: {
              players: {
                where: {
                  leftAt: null,
                },
              },

              coaches: {
                where: {
                  leftAt: null,
                },
              },
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
   * Get one active team.
   *
   * Soft-deleted teams are treated as not found.
   *
   * Only active players and coaches
   * are returned in the current roster.
   *
   * GET /api/v1/academies/:academyId/teams/:teamId
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
          deletedAt: null,

          academy: {
            deletedAt: null,
          },
        },

        include: {
          players: {
            where: {
              leftAt: null,
            },

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

            orderBy: {
              joinedAt: 'desc',
            },
          },

          coaches: {
            where: {
              leftAt: null,
            },

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

            orderBy: {
              joinedAt: 'desc',
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
      message:
        'Team retrieved successfully',
      data: team,
    };
  }

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

    let normalizedName:
      | string
      | undefined;

    /**
     * If changing the name, prevent creating
     * a duplicate active team name.
     */
    if (dto.name !== undefined) {
      normalizedName =
        this.normalizeTeamName(
          dto.name,
        );

      const duplicateTeam =
        await this.prisma.academyTeam.findFirst({
          where: {
            academyId,
            deletedAt: null,

            id: {
              not: teamId,
            },

            name: {
              equals: normalizedName,
              mode: 'insensitive',
            },
          },
        });

      if (duplicateTeam) {
        throw new ConflictException(
          'An active team with this name already exists in this academy',
        );
      }
    }

    try {
      const updated =
        await this.prisma.academyTeam.update({
          where: {
            id: teamId,
          },

          data: {
            ...(normalizedName !== undefined && {
              name: normalizedName,
            }),

            ...(dto.ageGroup !== undefined && {
              ageGroup: dto.ageGroup,
            }),

            ...(dto.category !== undefined && {
              category: dto.category,
            }),

            ...(dto.description !== undefined && {
              description:
                dto.description,
            }),
          },
        });

      return {
        success: true,
        message:
          'Team updated successfully',
        data: updated,
      };
    } catch (error) {
      this.handleTeamNameUniqueConstraint(
        error,
      );
    }
  }

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

    const now = new Date();

    await this.prisma.$transaction([
      /**
       * Soft-close all active player memberships.
       */
      this.prisma.academyTeamPlayer.updateMany({
        where: {
          teamId,
          leftAt: null,
        },

        data: {
          leftAt: now,
        },
      }),

      /**
       * Soft-close all active coach memberships.
       */
      this.prisma.academyTeamCoach.updateMany({
        where: {
          teamId,
          leftAt: null,
        },

        data: {
          leftAt: now,
        },
      }),

      /**
       * Soft-delete the team.
       */
      this.prisma.academyTeam.update({
        where: {
          id: teamId,
        },

        data: {
          deletedAt: now,
        },
      }),
    ]);

    return {
      success: true,
      message:
        'Team deleted successfully',
      data: null,
    };
  }

  // =========================================================
  // TEAM PLAYERS
  // =========================================================

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

    /**
     * Player must currently belong to academy.
     */
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

    /**
     * Find active or historical team membership.
     */
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
      /**
       * Membership already active.
       */
      if (!existing.leftAt) {
        throw new ConflictException(
          'Player is already assigned to this team',
        );
      }

      /**
       * Historical membership exists.
       * Reactivate same row.
       */
      const reactivated =
        await this.prisma.academyTeamPlayer.update({
          where: {
            id: existing.id,
          },

          data: {
            jerseyNumber:
              dto.jerseyNumber ?? null,

            joinedAt:
              new Date(),

            leftAt:
              null,
          },

          select: {
            id: true,
            teamId: true,
            playerId: true,
            jerseyNumber: true,
            joinedAt: true,
            leftAt: true,
            createdAt: true,
            updatedAt: true,

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
        message:
          'Player team membership reactivated successfully',
        data: reactivated,
      };
    }

    /**
     * No previous membership.
     */
    const membership =
      await this.prisma.academyTeamPlayer.create({
        data: {
          teamId,
          playerId: dto.playerId,

          jerseyNumber:
            dto.jerseyNumber ?? null,
        },

        select: {
          id: true,
          teamId: true,
          playerId: true,
          jerseyNumber: true,
          joinedAt: true,
          leftAt: true,
          createdAt: true,
          updatedAt: true,

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
      message:
        'Player added to team successfully',
      data: membership,
    };
  }

  /**
   * Soft-remove a player from an active team.
   *
   * DELETE /api/v1/academies/:academyId/teams/:teamId/players/:playerId
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

    if (
      !membership ||
      membership.leftAt
    ) {
      throw new NotFoundException(
        'Player is not an active member of this team',
      );
    }

    await this.prisma.academyTeamPlayer.update({
      where: {
        id: membership.id,
      },

      data: {
        leftAt:
          new Date(),
      },
    });

    return {
      success: true,
      message:
        'Player removed from team successfully',
      data: null,
    };
  }

  // =========================================================
  // TEAM COACHES
  // =========================================================

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

    /**
     * Coach must currently belong to academy.
     */
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

    /**
     * Find active or historical team membership.
     */
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
      /**
       * Membership already active.
       */
      if (!existing.leftAt) {
        throw new ConflictException(
          'Coach is already assigned to this team',
        );
      }

      /**
       * Historical membership exists.
       * Reactivate same membership row.
       */
      const reactivated =
        await this.prisma.academyTeamCoach.update({
          where: {
            id: existing.id,
          },

          data: {
            role:
              dto.role,

            joinedAt:
              new Date(),

            leftAt:
              null,
          },

          select: {
            id: true,
            teamId: true,
            coachId: true,
            role: true,
            joinedAt: true,
            leftAt: true,
            createdAt: true,
            updatedAt: true,

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
        message:
          'Coach team membership reactivated successfully',
        data: reactivated,
      };
    }

    /**
     * No historical membership exists.
     */
    const membership =
      await this.prisma.academyTeamCoach.create({
        data: {
          teamId,
          coachId: dto.coachId,
          role: dto.role,
        },

        select: {
          id: true,
          teamId: true,
          coachId: true,
          role: true,
          joinedAt: true,
          leftAt: true,
          createdAt: true,
          updatedAt: true,

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
      message:
        'Coach added to team successfully',
      data: membership,
    };
  }

  /**
   * Soft-remove a coach from an active team.
   *
   * DELETE /api/v1/academies/:academyId/teams/:teamId/coaches/:coachId
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

    if (
      !membership ||
      membership.leftAt
    ) {
      throw new NotFoundException(
        'Coach is not an active member of this team',
      );
    }

    await this.prisma.academyTeamCoach.update({
      where: {
        id: membership.id,
      },

      data: {
        leftAt:
          new Date(),
      },
    });

    return {
      success: true,
      message:
        'Coach removed from team successfully',
      data: null,
    };
  }
}