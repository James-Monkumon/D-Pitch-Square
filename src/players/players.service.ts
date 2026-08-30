import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  AchievementOwnerType,
  AchievementType,
  AchievementVerificationStatus,
  VerificationStatus,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreatePlayerDto } from './dto/create-player.dto.js';
import { UpdatePlayerDto } from './dto/update-player.dto.js';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto.js';
import { CreateAchievementDto } from './dto/create-achievement.dto.js';
import { UpdateAchievementDto } from './dto/update-achievement.dto.js';

@Injectable()
export class PlayersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // PRIVATE HELPERS
  // =========================================================

  /**
   * Find an active player profile.
   */
  private async findActivePlayer(
    playerId: string,
  ) {
    const player =
      await this.prisma.playerProfile.findFirst({
        where: {
          id: playerId,
          deletedAt: null,
        },
      });

    if (!player) {
      throw new NotFoundException(
        'Player profile not found',
      );
    }

    return player;
  }

  /**
   * Verify that the authenticated user owns
   * an active player profile.
   */
  private async verifyPlayerOwner(
    userId: string,
  ) {
    const player =
      await this.prisma.playerProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!player || player.deletedAt) {
      throw new NotFoundException(
        'Player profile not found',
      );
    }

    return player;
  }

  /**
   * Achievement types allowed for player profiles.
   */
  private readonly allowedPlayerAchievementTypes:
    AchievementType[] = [
      AchievementType.AWARD,
      AchievementType.CHAMPIONSHIP,
      AchievementType.CERTIFICATION,
      AchievementType.MILESTONE,
      AchievementType.INTERNATIONAL_EXPERIENCE,
      AchievementType.NATIONAL_ACHIEVEMENT,
      AchievementType.STATE_ACHIEVEMENT,
      AchievementType.DISTRICT_ACHIEVEMENT,
      AchievementType.OTHER,
      AchievementType.PLAYER_AWARD,
      AchievementType.TEAM_TITLE,
      AchievementType.PERFORMANCE_MILESTONE,
    ];

  /**
   * Validate that an achievement type
   * is allowed for player profiles.
   */
  private validatePlayerAchievementType(
    type: AchievementType,
  ) {
    if (
      !this.allowedPlayerAchievementTypes.includes(
        type,
      )
    ) {
      throw new BadRequestException(
        'This achievement type is not allowed for player profiles',
      );
    }
  }

  // =========================================================
  // PLAYER PROFILE
  // =========================================================

  /**
   * Create or restore player profile.
   *
   * If a soft-deleted profile already exists,
   * restore the same profile row and ID.
   */
  async createProfile(
    userId: string,
    dto: CreatePlayerDto,
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

    const isPlayer =
      user.roles.some(
        (userRole) =>
          userRole.role.name === 'PLAYER',
      );

    if (!isPlayer) {
      throw new ForbiddenException(
        'Only player users can create a player profile',
      );
    }

    const existingProfile =
      await this.prisma.playerProfile.findUnique({
        where: {
          userId,
        },
      });

    /**
     * Active profile already exists.
     */
    if (
      existingProfile &&
      existingProfile.deletedAt === null
    ) {
      throw new ConflictException(
        'Player profile already exists',
      );
    }

    /**
     * Restore soft-deleted profile.
     */
    if (
      existingProfile &&
      existingProfile.deletedAt !== null
    ) {
      const restored =
        await this.prisma.playerProfile.update({
          where: {
            id: existingProfile.id,
          },

          data: {
            fullName:
              dto.fullName,

            profilePicture:
              dto.profilePicture,

            coverPhoto:
              dto.coverPhoto,

            dateOfBirth:
              dto.dateOfBirth
                ? new Date(dto.dateOfBirth)
                : null,

            nationality:
              dto.nationality,

            country:
              dto.country,

            state:
              dto.state,

            city:
              dto.city,

            address:
              dto.address,

            currentClub:
              dto.currentClub,

            currentAcademyName:
              dto.currentAcademyName,

            height:
              dto.height,

            weight:
              dto.weight,

            preferredFoot:
              dto.preferredFoot,

            primaryPosition:
              dto.primaryPosition,

            secondaryPosition:
              dto.secondaryPosition,

            jerseyNumber:
              dto.jerseyNumber,

            biography:
              dto.biography,

            contactInformation:
              dto.contactInformation,

            socialMediaLinks:
              dto.socialMediaLinks,

            deletedAt:
              null,
          },
        });

      return {
        success: true,
        message:
          'Player profile restored successfully',
        data: restored,
      };
    }

    /**
     * Create a new player profile.
     */
    const player =
      await this.prisma.playerProfile.create({
        data: {
          userId,

          fullName:
            dto.fullName,

          profilePicture:
            dto.profilePicture,

          coverPhoto:
            dto.coverPhoto,

          dateOfBirth:
            dto.dateOfBirth
              ? new Date(dto.dateOfBirth)
              : undefined,

          nationality:
            dto.nationality,

          country:
            dto.country,

          state:
            dto.state,

          city:
            dto.city,

          address:
            dto.address,

          currentClub:
            dto.currentClub,

          currentAcademyName:
            dto.currentAcademyName,

          height:
            dto.height,

          weight:
            dto.weight,

          preferredFoot:
            dto.preferredFoot,

          primaryPosition:
            dto.primaryPosition,

          secondaryPosition:
            dto.secondaryPosition,

          jerseyNumber:
            dto.jerseyNumber,

          biography:
            dto.biography,

          contactInformation:
            dto.contactInformation,

          socialMediaLinks:
            dto.socialMediaLinks,
        },
      });

    return {
      success: true,
      message:
        'Player profile created successfully',
      data: player,
    };
  }

  /**
   * Get my player profile.
   */
  async getMyProfile(
    userId: string,
  ) {
    const player =
      await this.prisma.playerProfile.findUnique({
        where: {
          userId,
        },

        include: {
          achievements: {
            where: {
              ownerType:
                AchievementOwnerType.PLAYER,
            },

            orderBy: {
              createdAt:
                'desc',
            },
          },

          statistics:
            true,
        },
      });

    if (!player || player.deletedAt) {
      throw new NotFoundException(
        'Player profile not found',
      );
    }

    return {
      success: true,
      message:
        'Player profile retrieved successfully',
      data: player,
    };
  }

  /**
   * Update my player profile.
   */
  async updateProfile(
    userId: string,
    dto: UpdatePlayerDto,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    const updated =
      await this.prisma.playerProfile.update({
        where: {
          id: player.id,
        },

        data: {
          ...(dto.fullName !== undefined && {
            fullName:
              dto.fullName,
          }),

          ...(dto.profilePicture !== undefined && {
            profilePicture:
              dto.profilePicture,
          }),

          ...(dto.coverPhoto !== undefined && {
            coverPhoto:
              dto.coverPhoto,
          }),

          ...(dto.dateOfBirth !== undefined && {
            dateOfBirth:
              dto.dateOfBirth
                ? new Date(
                    dto.dateOfBirth,
                  )
                : null,
          }),

          ...(dto.nationality !== undefined && {
            nationality:
              dto.nationality,
          }),

          ...(dto.country !== undefined && {
            country:
              dto.country,
          }),

          ...(dto.state !== undefined && {
            state:
              dto.state,
          }),

          ...(dto.city !== undefined && {
            city:
              dto.city,
          }),

          ...(dto.address !== undefined && {
            address:
              dto.address,
          }),

          ...(dto.currentClub !== undefined && {
            currentClub:
              dto.currentClub,
          }),

          ...(dto.currentAcademyName !== undefined && {
            currentAcademyName:
              dto.currentAcademyName,
          }),

          ...(dto.height !== undefined && {
            height:
              dto.height,
          }),

          ...(dto.weight !== undefined && {
            weight:
              dto.weight,
          }),

          ...(dto.preferredFoot !== undefined && {
            preferredFoot:
              dto.preferredFoot,
          }),

          ...(dto.primaryPosition !== undefined && {
            primaryPosition:
              dto.primaryPosition,
          }),

          ...(dto.secondaryPosition !== undefined && {
            secondaryPosition:
              dto.secondaryPosition,
          }),

          ...(dto.jerseyNumber !== undefined && {
            jerseyNumber:
              dto.jerseyNumber,
          }),

          ...(dto.biography !== undefined && {
            biography:
              dto.biography,
          }),

          ...(dto.contactInformation !== undefined && {
            contactInformation:
              dto.contactInformation,
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
        'Player profile updated successfully',
      data: updated,
    };
  }

  /**
   * Soft-delete my player profile.
   */
  async deleteProfile(
    userId: string,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    await this.prisma.playerProfile.update({
      where: {
        id: player.id,
      },

      data: {
        deletedAt:
          new Date(),
      },
    });

    return {
      success: true,
      message:
        'Player profile deleted successfully',
      data: null,
    };
  }

  // =========================================================
  // PLAYER PROFILE VERIFICATION
  // =========================================================

  /**
   * Submit player profile for admin verification.
   *
   * Allowed:
   * NOT_REQUESTED -> PENDING
   * REJECTED      -> PENDING
   */
  async submitProfileForVerification(
    userId: string,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    if (
      player.verificationStatus !==
        VerificationStatus.NOT_REQUESTED &&
      player.verificationStatus !==
        VerificationStatus.REJECTED
    ) {
      throw new BadRequestException(
        `Player verification cannot be submitted from ${player.verificationStatus}`,
      );
    }

    const updated =
      await this.prisma.playerProfile.update({
        where: {
          id: player.id,
        },

        data: {
          verificationStatus:
            VerificationStatus.PENDING,
        },

        select: {
          id: true,
          fullName: true,
          verificationStatus: true,
          updatedAt: true,
        },
      });

    return {
      success: true,
      message:
        'Player profile submitted for verification successfully',
      data: updated,
    };
  }

  // =========================================================
  // PLAYER STATISTICS
  // =========================================================

  /**
   * Create/update player statistics.
   */
  async updateStatistics(
    userId: string,
    dto: UpdatePlayerStatisticsDto,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    const statistics =
      await this.prisma.playerStatistics.upsert({
        where: {
          playerId:
            player.id,
        },

        create: {
          playerId:
            player.id,

          ...(dto.matchesPlayed !== undefined && {
            matchesPlayed:
              dto.matchesPlayed,
          }),

          ...(dto.matchesStarted !== undefined && {
            matchesStarted:
              dto.matchesStarted,
          }),

          ...(dto.minutesPlayed !== undefined && {
            minutesPlayed:
              dto.minutesPlayed,
          }),

          ...(dto.goals !== undefined && {
            goals:
              dto.goals,
          }),

          ...(dto.assists !== undefined && {
            assists:
              dto.assists,
          }),

          ...(dto.yellowCards !== undefined && {
            yellowCards:
              dto.yellowCards,
          }),

          ...(dto.redCards !== undefined && {
            redCards:
              dto.redCards,
          }),

          ...(dto.cleanSheets !== undefined && {
            cleanSheets:
              dto.cleanSheets,
          }),

          ...(dto.saves !== undefined && {
            saves:
              dto.saves,
          }),
        },

        update: {
          ...(dto.matchesPlayed !== undefined && {
            matchesPlayed:
              dto.matchesPlayed,
          }),

          ...(dto.matchesStarted !== undefined && {
            matchesStarted:
              dto.matchesStarted,
          }),

          ...(dto.minutesPlayed !== undefined && {
            minutesPlayed:
              dto.minutesPlayed,
          }),

          ...(dto.goals !== undefined && {
            goals:
              dto.goals,
          }),

          ...(dto.assists !== undefined && {
            assists:
              dto.assists,
          }),

          ...(dto.yellowCards !== undefined && {
            yellowCards:
              dto.yellowCards,
          }),

          ...(dto.redCards !== undefined && {
            redCards:
              dto.redCards,
          }),

          ...(dto.cleanSheets !== undefined && {
            cleanSheets:
              dto.cleanSheets,
          }),

          ...(dto.saves !== undefined && {
            saves:
              dto.saves,
          }),
        },
      });

    return {
      success: true,
      message:
        'Player statistics updated successfully',
      data: statistics,
    };
  }

  // =========================================================
  // PLAYER ACHIEVEMENTS
  // =========================================================

  /**
   * Create player achievement.
   */
  async createAchievement(
    userId: string,
    dto: CreateAchievementDto,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    this.validatePlayerAchievementType(
      dto.achievementType,
    );

    const achievement =
      await this.prisma.achievement.create({
        data: {
          ownerType:
            AchievementOwnerType.PLAYER,

          playerId:
            player.id,

          coachId:
            null,

          scoutId:
            null,

          title:
            dto.title,

          description:
            dto.description,

          achievementType:
            dto.achievementType,

          achievementDate:
            dto.achievementDate
              ? new Date(
                  dto.achievementDate,
                )
              : null,

          organization:
            dto.organization,

          level:
            dto.level,

          role:
            dto.role,

          evidenceUrl:
            dto.evidenceUrl,
        },
      });

    return {
      success: true,
      message:
        'Player achievement created successfully',
      data: achievement,
    };
  }

  /**
   * Get all my player achievements.
   */
  async getMyAchievements(
    userId: string,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    const achievements =
      await this.prisma.achievement.findMany({
        where: {
          ownerType:
            AchievementOwnerType.PLAYER,

          playerId:
            player.id,
        },

        orderBy: {
          createdAt:
            'desc',
        },
      });

    return {
      success: true,
      message:
        'Player achievements retrieved successfully',
      data: achievements,
    };
  }

  /**
   * Update one of my player achievements.
   */
  async updateAchievement(
    userId: string,
    achievementId: string,
    dto: UpdateAchievementDto,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    const achievement =
      await this.prisma.achievement.findFirst({
        where: {
          id:
            achievementId,

          ownerType:
            AchievementOwnerType.PLAYER,

          playerId:
            player.id,
        },
      });

    if (!achievement) {
      throw new NotFoundException(
        'Player achievement not found',
      );
    }

    if (
      dto.achievementType !== undefined
    ) {
      this.validatePlayerAchievementType(
        dto.achievementType,
      );
    }

    const updated =
      await this.prisma.achievement.update({
        where: {
          id:
            achievementId,
        },

        data: {
          ...(dto.title !== undefined && {
            title:
              dto.title,
          }),

          ...(dto.description !== undefined && {
            description:
              dto.description,
          }),

          ...(dto.achievementType !== undefined && {
            achievementType:
              dto.achievementType,
          }),

          ...(dto.achievementDate !== undefined && {
            achievementDate:
              dto.achievementDate
                ? new Date(
                    dto.achievementDate,
                  )
                : null,
          }),

          ...(dto.organization !== undefined && {
            organization:
              dto.organization,
          }),

          ...(dto.level !== undefined && {
            level:
              dto.level,
          }),

          ...(dto.role !== undefined && {
            role:
              dto.role,
          }),

          ...(dto.evidenceUrl !== undefined && {
            evidenceUrl:
              dto.evidenceUrl,
          }),
        },
      });

    return {
      success: true,
      message:
        'Player achievement updated successfully',
      data: updated,
    };
  }

  /**
   * Delete one of my player achievements.
   */
  async deleteAchievement(
    userId: string,
    achievementId: string,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    const achievement =
      await this.prisma.achievement.findFirst({
        where: {
          id:
            achievementId,

          ownerType:
            AchievementOwnerType.PLAYER,

          playerId:
            player.id,
        },
      });

    if (!achievement) {
      throw new NotFoundException(
        'Player achievement not found',
      );
    }

    await this.prisma.achievement.delete({
      where: {
        id:
          achievementId,
      },
    });

    return {
      success: true,
      message:
        'Player achievement deleted successfully',
      data: null,
    };
  }

  // =========================================================
  // PLAYER ACHIEVEMENT VERIFICATION
  // =========================================================

  /**
   * Submit one of my achievements for verification.
   *
   * Allowed:
   * UNVERIFIED -> PENDING
   * REJECTED   -> PENDING
   */
  async submitAchievementForVerification(
    userId: string,
    achievementId: string,
  ) {
    const player =
      await this.verifyPlayerOwner(
        userId,
      );

    const achievement =
      await this.prisma.achievement.findFirst({
        where: {
          id:
            achievementId,

          ownerType:
            AchievementOwnerType.PLAYER,

          playerId:
            player.id,
        },
      });

    if (!achievement) {
      throw new NotFoundException(
        'Player achievement not found',
      );
    }

    if (
      achievement.verificationStatus !==
        AchievementVerificationStatus.UNVERIFIED &&
      achievement.verificationStatus !==
        AchievementVerificationStatus.REJECTED
    ) {
      throw new BadRequestException(
        `Achievement verification cannot be submitted from ${achievement.verificationStatus}`,
      );
    }

    const updated =
      await this.prisma.achievement.update({
        where: {
          id:
            achievementId,
        },

        data: {
          verificationStatus:
            AchievementVerificationStatus.PENDING,
        },
      });

    return {
      success: true,
      message:
        'Player achievement submitted for verification successfully',
      data: updated,
    };
  }

  // =========================================================
  // PLAYER FOLLOW
  // =========================================================

  /**
   * Follow a player.
   */
  async followPlayer(
    userId: string,
    playerId: string,
  ) {
    const player =
      await this.findActivePlayer(
        playerId,
      );

    if (player.userId === userId) {
      throw new ForbiddenException(
        'You cannot follow yourself',
      );
    }

    const existingFollow =
      await this.prisma.playerFollower.findUnique({
        where: {
          playerId_userId: {
            playerId,
            userId,
          },
        },
      });

    if (existingFollow) {
      return {
        success: true,
        message:
          'Already following player',

        data: {
          following:
            true,
        },
      };
    }

    await this.prisma.playerFollower.create({
      data: {
        playerId,
        userId,
      },
    });

    return {
      success: true,
      message:
        'Player followed successfully',

      data: {
        following:
          true,
      },
    };
  }

  /**
   * Unfollow a player.
   */
  async unfollowPlayer(
    userId: string,
    playerId: string,
  ) {
    await this.findActivePlayer(
      playerId,
    );

    const existingFollow =
      await this.prisma.playerFollower.findUnique({
        where: {
          playerId_userId: {
            playerId,
            userId,
          },
        },
      });

    if (!existingFollow) {
      return {
        success: true,
        message:
          'Player is not being followed',

        data: {
          following:
            false,
        },
      };
    }

    await this.prisma.playerFollower.delete({
      where: {
        playerId_userId: {
          playerId,
          userId,
        },
      },
    });

    return {
      success: true,
      message:
        'Player unfollowed successfully',

      data: {
        following:
          false,
      },
    };
  }

  /**
   * Check follow status.
   */
  async isFollowingPlayer(
    userId: string,
    playerId: string,
  ) {
    await this.findActivePlayer(
      playerId,
    );

    const follow =
      await this.prisma.playerFollower.findUnique({
        where: {
          playerId_userId: {
            playerId,
            userId,
          },
        },
      });

    return {
      success: true,
      message:
        'Player follow status retrieved successfully',

      data: {
        following:
          !!follow,
      },
    };
  }

  /**
   * Get player follower count.
   */
  async getPlayerFollowerCount(
    playerId: string,
  ) {
    await this.findActivePlayer(
      playerId,
    );

    const followers =
      await this.prisma.playerFollower.count({
        where: {
          playerId,
        },
      });

    return {
      success: true,
      message:
        'Player follower count retrieved successfully',

      data: {
        followers,
      },
    };
  }

  // =========================================================
  // PLAYER LIKE
  // =========================================================

  /**
   * Like a player.
   */
  async likePlayer(
    userId: string,
    playerId: string,
  ) {
    const player =
      await this.findActivePlayer(
        playerId,
      );

    if (player.userId === userId) {
      throw new ForbiddenException(
        'You cannot like your own profile',
      );
    }

    const existingLike =
      await this.prisma.playerLike.findUnique({
        where: {
          playerId_userId: {
            playerId,
            userId,
          },
        },
      });

    if (existingLike) {
      return {
        success: true,
        message:
          'Player already liked',

        data: {
          liked:
            true,
        },
      };
    }

    await this.prisma.playerLike.create({
      data: {
        playerId,
        userId,
      },
    });

    return {
      success: true,
      message:
        'Player liked successfully',

      data: {
        liked:
          true,
      },
    };
  }

  /**
   * Unlike a player.
   */
  async unlikePlayer(
    userId: string,
    playerId: string,
  ) {
    await this.findActivePlayer(
      playerId,
    );

    const existingLike =
      await this.prisma.playerLike.findUnique({
        where: {
          playerId_userId: {
            playerId,
            userId,
          },
        },
      });

    if (!existingLike) {
      return {
        success: true,
        message:
          'Player is not liked',

        data: {
          liked:
            false,
        },
      };
    }

    await this.prisma.playerLike.delete({
      where: {
        playerId_userId: {
          playerId,
          userId,
        },
      },
    });

    return {
      success: true,
      message:
        'Player unliked successfully',

      data: {
        liked:
          false,
      },
    };
  }

  /**
   * Check player like status.
   */
  async isPlayerLiked(
    userId: string,
    playerId: string,
  ) {
    await this.findActivePlayer(
      playerId,
    );

    const like =
      await this.prisma.playerLike.findUnique({
        where: {
          playerId_userId: {
            playerId,
            userId,
          },
        },
      });

    return {
      success: true,
      message:
        'Player like status retrieved successfully',

      data: {
        liked:
          !!like,
      },
    };
  }

  /**
   * Get total player likes.
   */
  async getPlayerLikesCount(
    playerId: string,
  ) {
    await this.findActivePlayer(
      playerId,
    );

    const count =
      await this.prisma.playerLike.count({
        where: {
          playerId,
        },
      });

    return {
      success: true,
      message:
        'Player likes count retrieved successfully',

      data: {
        count,
      },
    };
  }

  // =========================================================
  // PUBLIC PLAYER PROFILE
  // =========================================================

  /**
   * Get public player profile.
   */
  async getPlayerById(
    playerId: string,
  ) {
    const player =
      await this.prisma.playerProfile.findFirst({
        where: {
          id:
            playerId,

          deletedAt:
            null,
        },

        include: {
          achievements: {
            where: {
              ownerType:
                AchievementOwnerType.PLAYER,
            },

            orderBy: {
              createdAt:
                'desc',
            },
          },

          statistics:
            true,
        },
      });

    if (!player) {
      throw new NotFoundException(
        'Player profile not found',
      );
    }

    const [
      followers,
      likes,
    ] =
      await this.prisma.$transaction([
        this.prisma.playerFollower.count({
          where: {
            playerId,
          },
        }),

        this.prisma.playerLike.count({
          where: {
            playerId,
          },
        }),
      ]);

    return {
      success: true,
      message:
        'Player profile retrieved successfully',

      data: {
        ...player,
        followers,
        likes,
      },
    };
  }
}