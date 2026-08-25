import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { AcademyQueryDto } from './dto/academy-query.dto.js';
import { AddAcademyCoachDto } from './dto/add-academy-coach.dto.js';
import { AddAcademyPlayerDto } from './dto/add-academy-player.dto.js';
import { CreateAcademyDto } from './dto/create-academy.dto.js';
import { UpdateAcademyDto } from './dto/update-academy.dto.js';

@Injectable()
export class AcademiesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // PRIVATE HELPERS
  // =========================================================

  /**
   * Verify that the authenticated user owns
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
   * Find an active academy or throw.
   */
  private async getActiveAcademy(
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

    return academy;
  }

  // =========================================================
  // ACADEMY PROFILE
  // =========================================================

  /**
   * Create an academy profile.
   *
   * POST /api/v1/academies
   */
  async createAcademy(
    userId: string,
    dto: CreateAcademyDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const isAcademy =
      user.roles.some(
        (userRole) =>
          userRole.role.name === 'ACADEMY',
      );

    if (!isAcademy) {
      throw new ForbiddenException(
        'Only academy users can create an academy profile',
      );
    }

    const existingProfile =
      await this.prisma.academyProfile.findUnique({
        where: {
          userId,
        },
      });

    if (existingProfile) {
      throw new ConflictException(
        'Academy profile already exists',
      );
    }

    const academy =
      await this.prisma.academyProfile.create({
        data: {
          userId,
          academyName: dto.academyName,
          logoUrl: dto.logoUrl,
          coverImageUrl: dto.coverImageUrl,
          country: dto.country,
          state: dto.state,
          city: dto.city,
          address: dto.address,
          foundedYear: dto.foundedYear,
          description: dto.description,
          contactEmail: dto.contactEmail,
          contactPhone: dto.contactPhone,
          websiteUrl: dto.websiteUrl,
          socialMediaLinks:
            dto.socialMediaLinks,
        },
      });

    return {
      success: true,
      message:
        'Academy profile created successfully',
      data: academy,
    };
  }

  /**
   * Get a paginated list of academies.
   *
   * GET /api/v1/academies
   */
  async getAcademies(
    query: AcademyQueryDto,
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,

      ...(query.country && {
        country: {
          equals: query.country,
          mode: 'insensitive' as const,
        },
      }),

      ...(query.state && {
        state: {
          equals: query.state,
          mode: 'insensitive' as const,
        },
      }),

      ...(query.city && {
        city: {
          equals: query.city,
          mode: 'insensitive' as const,
        },
      }),

      ...(query.search && {
        academyName: {
          contains: query.search,
          mode: 'insensitive' as const,
        },
      }),
    };

    const [
      academies,
      total,
    ] = await this.prisma.$transaction([
      this.prisma.academyProfile.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.academyProfile.count({
        where,
      }),
    ]);

    const totalPages =
      Math.ceil(total / limit);

    return {
      success: true,
      message:
        'Academies retrieved successfully',
      data: academies,

      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage:
          page < totalPages,
        hasPreviousPage:
          page > 1,
      },
    };
  }

  /**
   * Get one public academy profile.
   *
   * GET /api/v1/academies/:academyId
   */
  async getAcademyById(
    academyId: string,
  ) {
    const academy =
      await this.getActiveAcademy(
        academyId,
      );

    return {
      success: true,
      message:
        'Academy profile retrieved successfully',
      data: academy,
    };
  }

  /**
   * Update an academy.
   *
   * PATCH /api/v1/academies/:academyId
   */
  async updateAcademy(
    userId: string,
    academyId: string,
    dto: UpdateAcademyDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const updated =
      await this.prisma.academyProfile.update({
        where: {
          id: academyId,
        },

        data: {
          ...(dto.academyName !== undefined && {
            academyName: dto.academyName,
          }),

          ...(dto.logoUrl !== undefined && {
            logoUrl: dto.logoUrl,
          }),

          ...(dto.coverImageUrl !== undefined && {
            coverImageUrl:
              dto.coverImageUrl,
          }),

          ...(dto.country !== undefined && {
            country: dto.country,
          }),

          ...(dto.state !== undefined && {
            state: dto.state,
          }),

          ...(dto.city !== undefined && {
            city: dto.city,
          }),

          ...(dto.address !== undefined && {
            address: dto.address,
          }),

          ...(dto.foundedYear !== undefined && {
            foundedYear:
              dto.foundedYear,
          }),

          ...(dto.description !== undefined && {
            description:
              dto.description,
          }),

          ...(dto.contactEmail !== undefined && {
            contactEmail:
              dto.contactEmail,
          }),

          ...(dto.contactPhone !== undefined && {
            contactPhone:
              dto.contactPhone,
          }),

          ...(dto.websiteUrl !== undefined && {
            websiteUrl:
              dto.websiteUrl,
          }),

          ...(dto.socialMediaLinks !== undefined && {
            socialMediaLinks:
              dto.socialMediaLinks,
          }),
        },
      });

    return {
      success: true,
      message:
        'Academy profile updated successfully',
      data: updated,
    };
  }

  /**
   * Soft-delete an academy.
   *
   * DELETE /api/v1/academies/:academyId
   */
  async deleteAcademy(
    userId: string,
    academyId: string,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    await this.prisma.academyProfile.update({
      where: {
        id: academyId,
      },

      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message:
        'Academy profile deleted successfully',
      data: null,
    };
  }

  // =========================================================
  // ACADEMY PLAYERS
  // =========================================================

  /**
   * Get all active players belonging
   * to an academy.
   *
   * GET /api/v1/academies/:academyId/players
   */
  async getAcademyPlayers(
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const memberships =
      await this.prisma.academyPlayerMembership.findMany({
        where: {
          academyId,
          leftAt: null,
        },

        select: {
          id: true,
          playerId: true,
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
      });

    return {
      success: true,
      message:
        'Academy players retrieved successfully',
      data: memberships,
    };
  }

  /**
   * Add a player to an academy.
   */
  async addAcademyPlayer(
    userId: string,
    academyId: string,
    dto: AddAcademyPlayerDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const player =
      await this.prisma.playerProfile.findUnique({
        where: {
          id: dto.playerId,
        },
      });

    if (!player) {
      throw new NotFoundException(
        'Player profile not found',
      );
    }

    const existing =
      await this.prisma.academyPlayerMembership.findUnique({
        where: {
          academyId_playerId: {
            academyId,
            playerId: dto.playerId,
          },
        },
      });

    if (existing) {
      if (!existing.leftAt) {
        throw new ConflictException(
          'Player is already a member of this academy',
        );
      }

      const reactivated =
        await this.prisma.academyPlayerMembership.update({
          where: {
            id: existing.id,
          },

          data: {
            joinedAt: new Date(),
            leftAt: null,
          },

          select: {
            id: true,
            academyId: true,
            playerId: true,
            joinedAt: true,
            leftAt: true,

            player: {
              select: {
                id: true,
                fullName: true,
                profilePicture: true,
                primaryPosition: true,
                secondaryPosition: true,
                preferredFoot: true,
              },
            },
          },
        });

      return {
        success: true,
        message:
          'Player membership reactivated successfully',
        data: reactivated,
      };
    }

    const membership =
      await this.prisma.academyPlayerMembership.create({
        data: {
          academyId,
          playerId: dto.playerId,
        },

        select: {
          id: true,
          academyId: true,
          playerId: true,
          joinedAt: true,
          leftAt: true,

          player: {
            select: {
              id: true,
              fullName: true,
              profilePicture: true,
              primaryPosition: true,
              secondaryPosition: true,
              preferredFoot: true,
            },
          },
        },
      });

    return {
      success: true,
      message:
        'Player added to academy successfully',
      data: membership,
    };
  }

  /**
   * Remove a player from an academy.
   */
  async removeAcademyPlayer(
    userId: string,
    academyId: string,
    playerId: string,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const membership =
      await this.prisma.academyPlayerMembership.findUnique({
        where: {
          academyId_playerId: {
            academyId,
            playerId,
          },
        },
      });

    if (!membership || membership.leftAt) {
      throw new NotFoundException(
        'Player is not an active member of this academy',
      );
    }

    await this.prisma.$transaction([
      this.prisma.academyTeamPlayer.deleteMany({
        where: {
          playerId,
          team: {
            academyId,
          },
        },
      }),

      this.prisma.academyPlayerMembership.update({
        where: {
          id: membership.id,
        },

        data: {
          leftAt: new Date(),
        },
      }),
    ]);

    return {
      success: true,
      message:
        'Player removed from academy successfully',
      data: null,
    };
  }

  // =========================================================
  // ACADEMY COACHES
  // =========================================================

  /**
   * Get all active coaches belonging
   * to an academy.
   */
  async getAcademyCoaches(
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const memberships =
      await this.prisma.academyCoachMembership.findMany({
        where: {
          academyId,
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
      });

    return {
      success: true,
      message:
        'Academy coaches retrieved successfully',
      data: memberships,
    };
  }

  /**
   * Add a coach to an academy.
   */
  async addAcademyCoach(
    userId: string,
    academyId: string,
    dto: AddAcademyCoachDto,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const coach =
      await this.prisma.coachProfile.findUnique({
        where: {
          id: dto.coachId,
        },
      });

    if (!coach) {
      throw new NotFoundException(
        'Coach profile not found',
      );
    }

    const existing =
      await this.prisma.academyCoachMembership.findUnique({
        where: {
          academyId_coachId: {
            academyId,
            coachId: dto.coachId,
          },
        },
      });

    if (existing) {
      if (!existing.leftAt) {
        throw new ConflictException(
          'Coach is already a member of this academy',
        );
      }

      const reactivated =
        await this.prisma.academyCoachMembership.update({
          where: {
            id: existing.id,
          },

          data: {
            role: dto.role,
            joinedAt: new Date(),
            leftAt: null,
          },

          select: {
            id: true,
            academyId: true,
            coachId: true,
            role: true,
            joinedAt: true,
            leftAt: true,

            coach: {
              select: {
                id: true,
                fullName: true,
                profilePicture: true,
                coachingRole: true,
                yearsOfExperience: true,
              },
            },
          },
        });

      return {
        success: true,
        message:
          'Coach membership reactivated successfully',
        data: reactivated,
      };
    }

    const membership =
      await this.prisma.academyCoachMembership.create({
        data: {
          academyId,
          coachId: dto.coachId,
          role: dto.role,
        },

        select: {
          id: true,
          academyId: true,
          coachId: true,
          role: true,
          joinedAt: true,
          leftAt: true,

          coach: {
            select: {
              id: true,
              fullName: true,
              profilePicture: true,
              coachingRole: true,
              yearsOfExperience: true,
            },
          },
        },
      });

    return {
      success: true,
      message:
        'Coach added to academy successfully',
      data: membership,
    };
  }

  /**
   * Remove a coach from an academy.
   */
  async removeAcademyCoach(
    userId: string,
    academyId: string,
    coachId: string,
  ) {
    await this.verifyAcademyOwner(
      userId,
      academyId,
    );

    const membership =
      await this.prisma.academyCoachMembership.findUnique({
        where: {
          academyId_coachId: {
            academyId,
            coachId,
          },
        },
      });

    if (!membership || membership.leftAt) {
      throw new NotFoundException(
        'Coach is not an active member of this academy',
      );
    }

    await this.prisma.$transaction([
      this.prisma.academyTeamCoach.deleteMany({
        where: {
          coachId,
          team: {
            academyId,
          },
        },
      }),

      this.prisma.academyCoachMembership.update({
        where: {
          id: membership.id,
        },

        data: {
          leftAt: new Date(),
        },
      }),
    ]);

    return {
      success: true,
      message:
        'Coach removed from academy successfully',
      data: null,
    };
  }

  // =========================================================
  // ACADEMY FOLLOW
  // =========================================================

  /**
   * Follow an academy.
   */
  async followAcademy(
    userId: string,
    academyId: string,
  ) {
    const academy =
      await this.getActiveAcademy(
        academyId,
      );

    if (academy.userId === userId) {
      throw new ForbiddenException(
        'You cannot follow your own academy profile',
      );
    }

    const existingFollow =
      await this.prisma.academyFollower.findUnique({
        where: {
          academyId_userId: {
            academyId,
            userId,
          },
        },
      });

    if (existingFollow) {
      return {
        success: true,
        message: 'Already following academy',
        data: {
          following: true,
        },
      };
    }

    await this.prisma.academyFollower.create({
      data: {
        academyId,
        userId,
      },
    });

    return {
      success: true,
      message:
        'Academy followed successfully',
      data: {
        following: true,
      },
    };
  }

  /**
   * Unfollow an academy.
   */
  async unfollowAcademy(
    userId: string,
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const existingFollow =
      await this.prisma.academyFollower.findUnique({
        where: {
          academyId_userId: {
            academyId,
            userId,
          },
        },
      });

    if (!existingFollow) {
      return {
        success: true,
        message:
          'Academy is not being followed',
        data: {
          following: false,
        },
      };
    }

    await this.prisma.academyFollower.delete({
      where: {
        academyId_userId: {
          academyId,
          userId,
        },
      },
    });

    return {
      success: true,
      message:
        'Academy unfollowed successfully',
      data: {
        following: false,
      },
    };
  }

  /**
   * Check whether a user follows an academy.
   */
  async isFollowingAcademy(
    userId: string,
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const follow =
      await this.prisma.academyFollower.findUnique({
        where: {
          academyId_userId: {
            academyId,
            userId,
          },
        },
      });

    return {
      success: true,
      message:
        'Academy follow status retrieved successfully',
      data: {
        following: !!follow,
      },
    };
  }

  /**
   * Get academy follower count.
   */
  async getAcademyFollowerCount(
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const followers =
      await this.prisma.academyFollower.count({
        where: {
          academyId,
        },
      });

    return {
      success: true,
      message:
        'Academy follower count retrieved successfully',
      data: {
        followers,
      },
    };
  }

  // =========================================================
  // ACADEMY LIKE
  // =========================================================

  /**
   * Like an academy.
   *
   * POST /api/v1/academies/:academyId/like
   */
  async likeAcademy(
    userId: string,
    academyId: string,
  ) {
    const academy =
      await this.getActiveAcademy(
        academyId,
      );

    /**
     * An academy cannot like itself.
     */
    if (academy.userId === userId) {
      throw new ForbiddenException(
        'You cannot like your own academy profile',
      );
    }

    const existingLike =
      await this.prisma.academyLike.findUnique({
        where: {
          academyId_userId: {
            academyId,
            userId,
          },
        },
      });

    if (existingLike) {
      return {
        success: true,
        message:
          'Academy already liked',
        data: {
          liked: true,
        },
      };
    }

    await this.prisma.academyLike.create({
      data: {
        academyId,
        userId,
      },
    });

    return {
      success: true,
      message:
        'Academy liked successfully',
      data: {
        liked: true,
      },
    };
  }

  /**
   * Unlike an academy.
   *
   * DELETE /api/v1/academies/:academyId/like
   */
  async unlikeAcademy(
    userId: string,
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const existingLike =
      await this.prisma.academyLike.findUnique({
        where: {
          academyId_userId: {
            academyId,
            userId,
          },
        },
      });

    if (!existingLike) {
      return {
        success: true,
        message:
          'Academy is not liked',
        data: {
          liked: false,
        },
      };
    }

    await this.prisma.academyLike.delete({
      where: {
        academyId_userId: {
          academyId,
          userId,
        },
      },
    });

    return {
      success: true,
      message:
        'Academy unliked successfully',
      data: {
        liked: false,
      },
    };
  }

  /**
   * Check whether the authenticated user
   * likes an academy.
   *
   * GET /api/v1/academies/:academyId/is-liked
   */
  async isAcademyLiked(
    userId: string,
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const like =
      await this.prisma.academyLike.findUnique({
        where: {
          academyId_userId: {
            academyId,
            userId,
          },
        },
      });

    return {
      success: true,
      message:
        'Academy like status retrieved successfully',
      data: {
        liked: !!like,
      },
    };
  }

  /**
   * Get total number of likes
   * for an academy.
   *
   * GET /api/v1/academies/:academyId/likes/count
   */
  async getAcademyLikesCount(
    academyId: string,
  ) {
    await this.getActiveAcademy(
      academyId,
    );

    const count =
      await this.prisma.academyLike.count({
        where: {
          academyId,
        },
      });

    return {
      success: true,
      message:
        'Academy likes count retrieved successfully',
      data: {
        count,
      },
    };
  }
}



