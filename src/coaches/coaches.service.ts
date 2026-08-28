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
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateCoachDto } from './dto/create-coach.dto.js';
import { UpdateCoachDto } from './dto/update-coach.dto.js';

import { CreateCoachAchievementDto } from './dto/create-coach-achievement.dto.js';
import { UpdateCoachAchievementDto } from './dto/update-coach-achievement.dto.js';

// =========================================================
// ALLOWED COACH ACHIEVEMENT TYPES
// =========================================================

const COACH_ACHIEVEMENT_TYPES: AchievementType[] = [
  // General
  AchievementType.AWARD,
  AchievementType.CHAMPIONSHIP,
  AchievementType.CERTIFICATION,
  AchievementType.MILESTONE,
  AchievementType.INTERNATIONAL_EXPERIENCE,
  AchievementType.NATIONAL_ACHIEVEMENT,
  AchievementType.STATE_ACHIEVEMENT,
  AchievementType.DISTRICT_ACHIEVEMENT,
  AchievementType.OTHER,

  // Coach-specific
  AchievementType.COACH_OF_THE_YEAR,
  AchievementType.TEAM_PROMOTION,
  AchievementType.PLAYERS_DEVELOPED,
  AchievementType.COACHING_LICENSE,
  AchievementType.ACADEMY_MILESTONE,
];

@Injectable()
export class CoachesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // PRIVATE HELPERS
  // =========================================================

  /**
   * Verify that the authenticated user has
   * the COACH role.
   */
  private async verifyCoachRole(
    userId: string,
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

    const isCoach =
      user.roles.some(
        (userRole) =>
          userRole.role.name === 'COACH',
      );

    if (!isCoach) {
      throw new ForbiddenException(
        'Only coach users can manage a coach profile',
      );
    }

    return user;
  }

  /**
   * Get the authenticated user's
   * active coach profile.
   */
  private async verifyCoachOwner(
    userId: string,
  ) {
    const profile =
      await this.prisma.coachProfile.findUnique({
        where: {
          userId,
        },
      });

    if (!profile || profile.deletedAt) {
      throw new NotFoundException(
        'Coach profile not found',
      );
    }

    return profile;
  }

  /**
   * Find an active coach profile
   * by profile ID.
   */
  private async findActiveCoach(
    coachId: string,
  ) {
    const coach =
      await this.prisma.coachProfile.findFirst({
        where: {
          id: coachId,
          deletedAt: null,
        },
      });

    if (!coach) {
      throw new NotFoundException(
        'Coach profile not found',
      );
    }

    return coach;
  }

  /**
   * Ensure that the supplied AchievementType
   * is valid for Coach profiles.
   */
  private validateCoachAchievementType(
    achievementType: AchievementType,
  ) {
    if (
      !COACH_ACHIEVEMENT_TYPES.includes(
        achievementType,
      )
    ) {
      throw new BadRequestException(
        'This achievement type is not allowed for coach profiles',
      );
    }
  }

  // =========================================================
  // COACH PROFILE
  // =========================================================

  /**
   * Create the authenticated user's
   * coach profile.
   *
   * POST /api/v1/coaches
   */
  async createProfile(
  userId: string,
  dto: CreateCoachDto,
) {
  await this.verifyCoachRole(userId);

  const existingProfile =
    await this.prisma.coachProfile.findUnique({
      where: {
        userId,
      },
    });

  // Active profile already exists.
  if (
    existingProfile &&
    existingProfile.deletedAt === null
  ) {
    throw new ConflictException(
      'Coach profile already exists',
    );
  }

  // Soft-deleted profile exists.
  // Restore and reuse it because userId is unique.
  if (
    existingProfile &&
    existingProfile.deletedAt !== null
  ) {
    const restoredProfile =
      await this.prisma.coachProfile.update({
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

          country:
            dto.country,

          state:
            dto.state,

          city:
            dto.city,

          currentAcademyClub:
            dto.currentAcademyClub,

          coachingRole:
            dto.coachingRole,

          coachingLicense:
            dto.coachingLicense,

          coachingCertification:
            dto.coachingCertification,

          yearsOfExperience:
            dto.yearsOfExperience,

          biography:
            dto.biography,

          contactInformation:
            dto.contactInformation,

          socialMediaLinks:
            dto.socialMediaLinks,

          deletedAt: null,
        },
      });

    return {
      success: true,
      message:
        'Coach profile created successfully',
      data: restoredProfile,
    };
  }

  // No previous profile exists.
  const profile =
    await this.prisma.coachProfile.create({
      data: {
        userId,

        fullName:
          dto.fullName,

        profilePicture:
          dto.profilePicture,

        coverPhoto:
          dto.coverPhoto,

        country:
          dto.country,

        state:
          dto.state,

        city:
          dto.city,

        currentAcademyClub:
          dto.currentAcademyClub,

        coachingRole:
          dto.coachingRole,

        coachingLicense:
          dto.coachingLicense,

        coachingCertification:
          dto.coachingCertification,

        yearsOfExperience:
          dto.yearsOfExperience,

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
      'Coach profile created successfully',
    data: profile,
  };
}

  /**
   * Get authenticated user's
   * coach profile.
   *
   * Includes shared Coach achievements.
   *
   * GET /api/v1/coaches/me
   */
  async getMyProfile(
    userId: string,
  ) {
    const coach =
      await this.verifyCoachOwner(
        userId,
      );

    const profile =
      await this.prisma.coachProfile.findUnique({
        where: {
          id: coach.id,
        },

        include: {
          achievements: {
            orderBy: [
              {
                achievementDate: 'desc',
              },
              {
                createdAt: 'desc',
              },
            ],
          },
        },
      });

    return {
      success: true,
      message:
        'Coach profile retrieved successfully',
      data: profile,
    };
  }

  /**
   * Update authenticated user's
   * coach profile.
   *
   * PATCH /api/v1/coaches/me
   */
  async updateProfile(
    userId: string,
    dto: UpdateCoachDto,
  ) {
    const profile =
      await this.verifyCoachOwner(
        userId,
      );

    const updated =
      await this.prisma.coachProfile.update({
        where: {
          id: profile.id,
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

          ...(dto.currentAcademyClub !== undefined && {
            currentAcademyClub:
              dto.currentAcademyClub,
          }),

          ...(dto.coachingRole !== undefined && {
            coachingRole:
              dto.coachingRole,
          }),

          ...(dto.coachingLicense !== undefined && {
            coachingLicense:
              dto.coachingLicense,
          }),

          ...(dto.coachingCertification !== undefined && {
            coachingCertification:
              dto.coachingCertification,
          }),

          ...(dto.yearsOfExperience !== undefined && {
            yearsOfExperience:
              dto.yearsOfExperience,
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
        'Coach profile updated successfully',
      data: updated,
    };
  }

  /**
   * Get a public coach profile.
   *
   * Includes Coach achievements.
   *
   * GET /api/v1/coaches/:coachId
   */
  async getProfileById(
    coachId: string,
  ) {
    await this.findActiveCoach(
      coachId,
    );

    const profile =
      await this.prisma.coachProfile.findFirst({
        where: {
          id: coachId,
          deletedAt: null,
        },

        include: {
          achievements: {
            orderBy: [
              {
                achievementDate: 'desc',
              },
              {
                createdAt: 'desc',
              },
            ],
          },
        },
      });

    if (!profile) {
      throw new NotFoundException(
        'Coach profile not found',
      );
    }

    return {
      success: true,
      message:
        'Coach profile retrieved successfully',
      data: profile,
    };
  }

  /**
   * Soft-delete authenticated user's
   * coach profile.
   *
   * DELETE /api/v1/coaches/me
   */
  async deleteProfile(
    userId: string,
  ) {
    const profile =
      await this.verifyCoachOwner(
        userId,
      );

    await this.prisma.coachProfile.update({
      where: {
        id: profile.id,
      },

      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message:
        'Coach profile deleted successfully',
      data: null,
    };
  }

  // =========================================================
  // COACH ACHIEVEMENTS
  // =========================================================

  /**
   * Create an achievement for
   * the authenticated Coach.
   *
   * POST /api/v1/coaches/achievements
   */
  async createAchievement(
    userId: string,
    dto: CreateCoachAchievementDto,
  ) {
    const coach =
      await this.verifyCoachOwner(
        userId,
      );

    this.validateCoachAchievementType(
      dto.achievementType,
    );

    const achievement =
      await this.prisma.achievement.create({
        data: {
          /**
           * The backend determines ownership.
           *
           * Clients never provide ownerType
           * or coachId.
           */
          ownerType:
            AchievementOwnerType.COACH,

          coachId:
            coach.id,

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
              : undefined,

          organization:
            dto.organization,

          level:
            dto.level,

          role:
            dto.role,

          evidenceUrl:
            dto.evidenceUrl,

          /**
           * verificationStatus is intentionally
           * not provided here.
           *
           * Prisma/database default:
           *
           * UNVERIFIED
           */
        },
      });

    return {
      success: true,
      message:
        'Coach achievement created successfully',
      data: achievement,
    };
  }

  /**
   * Get all achievements belonging
   * to the authenticated Coach.
   *
   * GET /api/v1/coaches/achievements
   */
  async getMyAchievements(
    userId: string,
  ) {
    const coach =
      await this.verifyCoachOwner(
        userId,
      );

    const achievements =
      await this.prisma.achievement.findMany({
        where: {
          ownerType:
            AchievementOwnerType.COACH,

          coachId:
            coach.id,
        },

        orderBy: [
          {
            achievementDate: 'desc',
          },
          {
            createdAt: 'desc',
          },
        ],
      });

    return {
      success: true,
      message:
        'Coach achievements retrieved successfully',
      data: achievements,
    };
  }

  /**
   * Update one of the authenticated
   * Coach's achievements.
   *
   * PATCH /api/v1/coaches/achievements/:achievementId
   */
  async updateAchievement(
    userId: string,
    achievementId: string,
    dto: UpdateCoachAchievementDto,
  ) {
    const coach =
      await this.verifyCoachOwner(
        userId,
      );

    const achievement =
      await this.prisma.achievement.findFirst({
        where: {
          id:
            achievementId,

          ownerType:
            AchievementOwnerType.COACH,

          coachId:
            coach.id,
        },
      });

    if (!achievement) {
      throw new NotFoundException(
        'Coach achievement not found',
      );
    }

    if (
      dto.achievementType !== undefined
    ) {
      this.validateCoachAchievementType(
        dto.achievementType,
      );
    }

    const updated =
      await this.prisma.achievement.update({
        where: {
          id:
            achievement.id,
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
        'Coach achievement updated successfully',
      data: updated,
    };
  }

  /**
   * Delete one of the authenticated
   * Coach's achievements.
   *
   * DELETE /api/v1/coaches/achievements/:achievementId
   */
  async deleteAchievement(
    userId: string,
    achievementId: string,
  ) {
    const coach =
      await this.verifyCoachOwner(
        userId,
      );

    const achievement =
      await this.prisma.achievement.findFirst({
        where: {
          id:
            achievementId,

          ownerType:
            AchievementOwnerType.COACH,

          coachId:
            coach.id,
        },
      });

    if (!achievement) {
      throw new NotFoundException(
        'Coach achievement not found',
      );
    }

    await this.prisma.achievement.delete({
      where: {
        id:
          achievement.id,
      },
    });

    return {
      success: true,
      message:
        'Coach achievement deleted successfully',
      data: null,
    };
  }
// =========================================================
// COACH FOLLOW
// =========================================================

/**
 * Follow a Coach.
 *
 * POST /api/v1/coaches/:coachId/follow
 */
async followCoach(
  userId: string,
  coachId: string,
) {
  const coach =
    await this.findActiveCoach(
      coachId,
    );

  if (coach.userId === userId) {
    throw new ForbiddenException(
      'You cannot follow your own coach profile',
    );
  }

  const existingFollow =
    await this.prisma.coachFollower.findUnique({
      where: {
        coachId_userId: {
          coachId,
          userId,
        },
      },
    });

  if (existingFollow) {
    return {
      success: true,
      message:
        'Already following coach',
      data: {
        following: true,
      },
    };
  }

  await this.prisma.coachFollower.create({
    data: {
      coachId,
      userId,
    },
  });

  return {
    success: true,
    message:
      'Coach followed successfully',
    data: {
      following: true,
    },
  };
}

/**
 * Unfollow a Coach.
 *
 * DELETE /api/v1/coaches/:coachId/follow
 */
async unfollowCoach(
  userId: string,
  coachId: string,
) {
  await this.findActiveCoach(
    coachId,
  );

  const existingFollow =
    await this.prisma.coachFollower.findUnique({
      where: {
        coachId_userId: {
          coachId,
          userId,
        },
      },
    });

  if (!existingFollow) {
    return {
      success: true,
      message:
        'Coach is not being followed',
      data: {
        following: false,
      },
    };
  }

  await this.prisma.coachFollower.delete({
    where: {
      coachId_userId: {
        coachId,
        userId,
      },
    },
  });

  return {
    success: true,
    message:
      'Coach unfollowed successfully',
    data: {
      following: false,
    },
  };
}

/**
 * Check whether the authenticated
 * user follows a Coach.
 *
 * GET /api/v1/coaches/:coachId/follow
 */
async isFollowingCoach(
  userId: string,
  coachId: string,
) {
  await this.findActiveCoach(
    coachId,
  );

  const follow =
    await this.prisma.coachFollower.findUnique({
      where: {
        coachId_userId: {
          coachId,
          userId,
        },
      },
    });

  return {
    success: true,
    message:
      'Coach follow status retrieved successfully',
    data: {
      following: !!follow,
    },
  };
}

/**
 * Get Coach follower count.
 *
 * GET /api/v1/coaches/:coachId/followers/count
 */
async getCoachFollowerCount(
  coachId: string,
) {
  await this.findActiveCoach(
    coachId,
  );

  const followers =
    await this.prisma.coachFollower.count({
      where: {
        coachId,
      },
    });

  return {
    success: true,
    message:
      'Coach follower count retrieved successfully',
    data: {
      followers,
    },
  };
}


// =========================================================
// COACH LIKE
// =========================================================

/**
 * Like a Coach.
 *
 * POST /api/v1/coaches/:coachId/like
 */
async likeCoach(
  userId: string,
  coachId: string,
) {
  const coach =
    await this.findActiveCoach(
      coachId,
    );

  if (coach.userId === userId) {
    throw new ForbiddenException(
      'You cannot like your own coach profile',
    );
  }

  const existingLike =
    await this.prisma.coachLike.findUnique({
      where: {
        coachId_userId: {
          coachId,
          userId,
        },
      },
    });

  if (existingLike) {
    return {
      success: true,
      message:
        'Coach already liked',
      data: {
        liked: true,
      },
    };
  }

  await this.prisma.coachLike.create({
    data: {
      coachId,
      userId,
    },
  });

  return {
    success: true,
    message:
      'Coach liked successfully',
    data: {
      liked: true,
    },
  };
}

/**
 * Unlike a Coach.
 *
 * DELETE /api/v1/coaches/:coachId/like
 */
async unlikeCoach(
  userId: string,
  coachId: string,
) {
  await this.findActiveCoach(
    coachId,
  );

  const existingLike =
    await this.prisma.coachLike.findUnique({
      where: {
        coachId_userId: {
          coachId,
          userId,
        },
      },
    });

  if (!existingLike) {
    return {
      success: true,
      message:
        'Coach is not liked',
      data: {
        liked: false,
      },
    };
  }

  await this.prisma.coachLike.delete({
    where: {
      coachId_userId: {
        coachId,
        userId,
      },
    },
  });

  return {
    success: true,
    message:
      'Coach unliked successfully',
    data: {
      liked: false,
    },
  };
}

/**
 * Check whether authenticated
 * user likes a Coach.
 *
 * GET /api/v1/coaches/:coachId/like
 */
async isCoachLiked(
  userId: string,
  coachId: string,
) {
  await this.findActiveCoach(
    coachId,
  );

  const like =
    await this.prisma.coachLike.findUnique({
      where: {
        coachId_userId: {
          coachId,
          userId,
        },
      },
    });

  return {
    success: true,
    message:
      'Coach like status retrieved successfully',
    data: {
      liked: !!like,
    },
  };
}

/**
 * Get Coach like count.
 *
 * GET /api/v1/coaches/:coachId/likes/count
 */
async getCoachLikesCount(
  coachId: string,
) {
  await this.findActiveCoach(
    coachId,
  );

  const count =
    await this.prisma.coachLike.count({
      where: {
        coachId,
      },
    });

  return {
    success: true,
    message:
      'Coach likes count retrieved successfully',
    data: {
      count,
    },
  };
}
}