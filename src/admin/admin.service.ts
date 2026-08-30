import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  AchievementVerificationStatus,
  VerificationStatus,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service.js';

import {
  AdminVerificationDecision,
} from './dto/update-verification.dto.js';

import {
  AdminAchievementVerificationDecision,
} from './dto/update-achievement-verification.dto.js';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================================================
  // PENDING PROFILE VERIFICATIONS
  // =========================================================

  async getPendingProfileVerifications() {
    const [
      players,
      academies,
      scouts,
      coaches,
    ] = await this.prisma.$transaction([
      this.prisma.playerProfile.findMany({
        where: {
          verificationStatus:
            VerificationStatus.PENDING,
          deletedAt: null,
        },

        select: {
          id: true,
          userId: true,
          fullName: true,
          country: true,
          state: true,
          city: true,
          verificationStatus: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt: 'asc',
        },
      }),

      this.prisma.academyProfile.findMany({
        where: {
          verificationStatus:
            VerificationStatus.PENDING,
          deletedAt: null,
        },

        select: {
          id: true,
          userId: true,
          academyName: true,
          country: true,
          state: true,
          city: true,
          verificationStatus: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt: 'asc',
        },
      }),

      this.prisma.scoutProfile.findMany({
        where: {
          verificationStatus:
            VerificationStatus.PENDING,
          deletedAt: null,
        },

        select: {
          id: true,
          userId: true,
          fullName: true,
          organization: true,
          country: true,
          state: true,
          city: true,
          verificationStatus: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt: 'asc',
        },
      }),

      this.prisma.coachProfile.findMany({
        where: {
          verificationStatus:
            VerificationStatus.PENDING,
          deletedAt: null,
        },

        select: {
          id: true,
          userId: true,
          fullName: true,
          currentAcademyClub: true,
          coachingRole: true,
          country: true,
          state: true,
          city: true,
          verificationStatus: true,
          createdAt: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt: 'asc',
        },
      }),
    ]);

    return {
      success: true,

      message:
        'Pending profile verifications retrieved successfully',

      data: {
        players,
        academies,
        scouts,
        coaches,

        total:
          players.length +
          academies.length +
          scouts.length +
          coaches.length,
      },
    };
  }

  // =========================================================
  // PLAYER VERIFICATION
  // =========================================================

  async verifyPlayer(
    actorUserId: string,
    playerId: string,
    status: AdminVerificationDecision,
  ) {
    const updatedPlayer =
      await this.prisma.$transaction(
        async (tx) => {
          const player =
            await tx.playerProfile.findFirst({
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

          if (
            player.verificationStatus !==
            VerificationStatus.PENDING
          ) {
            throw new BadRequestException(
              `Player verification cannot be changed from ${player.verificationStatus}`,
            );
          }

          const updated =
            await tx.playerProfile.update({
              where: {
                id: playerId,
              },

              data: {
                verificationStatus:
                  status,
              },

              select: {
                id: true,
                fullName: true,
                verificationStatus: true,
                updatedAt: true,
              },
            });

          await tx.adminAuditLog.create({
            data: {
              actorUserId,

              action:
                `PLAYER_VERIFICATION_${status}`,

              targetType:
                'PLAYER_PROFILE',

              targetId:
                player.id,

              metadata: {
                previousStatus:
                  player.verificationStatus,

                newStatus:
                  status,

                profileUserId:
                  player.userId,
              },
            },
          });

          return updated;
        },
      );

    return {
      success: true,

      message:
        `Player verification ${status.toLowerCase()} successfully`,

      data: updatedPlayer,
    };
  }

  // =========================================================
  // ACADEMY VERIFICATION
  // =========================================================

  async verifyAcademy(
    actorUserId: string,
    academyId: string,
    status: AdminVerificationDecision,
  ) {
    const updatedAcademy =
      await this.prisma.$transaction(
        async (tx) => {
          const academy =
            await tx.academyProfile.findFirst({
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

          if (
            academy.verificationStatus !==
            VerificationStatus.PENDING
          ) {
            throw new BadRequestException(
              `Academy verification cannot be changed from ${academy.verificationStatus}`,
            );
          }

          const updated =
            await tx.academyProfile.update({
              where: {
                id: academyId,
              },

              data: {
                verificationStatus:
                  status,
              },

              select: {
                id: true,
                academyName: true,
                verificationStatus: true,
                updatedAt: true,
              },
            });

          await tx.adminAuditLog.create({
            data: {
              actorUserId,

              action:
                `ACADEMY_VERIFICATION_${status}`,

              targetType:
                'ACADEMY_PROFILE',

              targetId:
                academy.id,

              metadata: {
                previousStatus:
                  academy.verificationStatus,

                newStatus:
                  status,

                profileUserId:
                  academy.userId,
              },
            },
          });

          return updated;
        },
      );

    return {
      success: true,

      message:
        `Academy verification ${status.toLowerCase()} successfully`,

      data: updatedAcademy,
    };
  }

  // =========================================================
  // SCOUT VERIFICATION
  // =========================================================

  async verifyScout(
    actorUserId: string,
    scoutId: string,
    status: AdminVerificationDecision,
  ) {
    const updatedScout =
      await this.prisma.$transaction(
        async (tx) => {
          const scout =
            await tx.scoutProfile.findFirst({
              where: {
                id: scoutId,
                deletedAt: null,
              },
            });

          if (!scout) {
            throw new NotFoundException(
              'Scout profile not found',
            );
          }

          if (
            scout.verificationStatus !==
            VerificationStatus.PENDING
          ) {
            throw new BadRequestException(
              `Scout verification cannot be changed from ${scout.verificationStatus}`,
            );
          }

          const updated =
            await tx.scoutProfile.update({
              where: {
                id: scoutId,
              },

              data: {
                verificationStatus:
                  status,
              },

              select: {
                id: true,
                fullName: true,
                verificationStatus: true,
                updatedAt: true,
              },
            });

          await tx.adminAuditLog.create({
            data: {
              actorUserId,

              action:
                `SCOUT_VERIFICATION_${status}`,

              targetType:
                'SCOUT_PROFILE',

              targetId:
                scout.id,

              metadata: {
                previousStatus:
                  scout.verificationStatus,

                newStatus:
                  status,

                profileUserId:
                  scout.userId,
              },
            },
          });

          return updated;
        },
      );

    return {
      success: true,

      message:
        `Scout verification ${status.toLowerCase()} successfully`,

      data: updatedScout,
    };
  }

  // =========================================================
  // COACH VERIFICATION
  // =========================================================

  async verifyCoach(
    actorUserId: string,
    coachId: string,
    status: AdminVerificationDecision,
  ) {
    const updatedCoach =
      await this.prisma.$transaction(
        async (tx) => {
          const coach =
            await tx.coachProfile.findFirst({
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

          if (
            coach.verificationStatus !==
            VerificationStatus.PENDING
          ) {
            throw new BadRequestException(
              `Coach verification cannot be changed from ${coach.verificationStatus}`,
            );
          }

          const updated =
            await tx.coachProfile.update({
              where: {
                id: coachId,
              },

              data: {
                verificationStatus:
                  status,
              },

              select: {
                id: true,
                fullName: true,
                verificationStatus: true,
                updatedAt: true,
              },
            });

          await tx.adminAuditLog.create({
            data: {
              actorUserId,

              action:
                `COACH_VERIFICATION_${status}`,

              targetType:
                'COACH_PROFILE',

              targetId:
                coach.id,

              metadata: {
                previousStatus:
                  coach.verificationStatus,

                newStatus:
                  status,

                profileUserId:
                  coach.userId,
              },
            },
          });

          return updated;
        },
      );

    return {
      success: true,

      message:
        `Coach verification ${status.toLowerCase()} successfully`,

      data: updatedCoach,
    };
  }

  // =========================================================
  // ACHIEVEMENT VERIFICATIONS
  // =========================================================

  async getPendingAchievementVerifications() {
    const achievements =
      await this.prisma.achievement.findMany({
        where: {
          verificationStatus:
            AchievementVerificationStatus.PENDING,
        },

        include: {
          player: {
            select: {
              id: true,
              fullName: true,
            },
          },

          coach: {
            select: {
              id: true,
              fullName: true,
            },
          },

          scout: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },

        orderBy: {
          updatedAt: 'asc',
        },
      });

    return {
      success: true,

      message:
        'Pending achievement verifications retrieved successfully',

      data: achievements,
    };
  }

  async verifyAchievement(
    actorUserId: string,
    achievementId: string,
    status:
      AdminAchievementVerificationDecision,
  ) {
    const updatedAchievement =
      await this.prisma.$transaction(
        async (tx) => {
          const achievement =
            await tx.achievement.findUnique({
              where: {
                id: achievementId,
              },
            });

          if (!achievement) {
            throw new NotFoundException(
              'Achievement not found',
            );
          }

          if (
            achievement.verificationStatus !==
            AchievementVerificationStatus.PENDING
          ) {
            throw new BadRequestException(
              `Achievement verification cannot be changed from ${achievement.verificationStatus}`,
            );
          }

          const updated =
            await tx.achievement.update({
              where: {
                id: achievementId,
              },

              data: {
                verificationStatus:
                  status,
              },
            });

          await tx.adminAuditLog.create({
            data: {
              actorUserId,

              action:
                `ACHIEVEMENT_VERIFICATION_${status}`,

              targetType:
                'ACHIEVEMENT',

              targetId:
                achievement.id,

              metadata: {
                previousStatus:
                  achievement.verificationStatus,

                newStatus:
                  status,

                ownerType:
                  achievement.ownerType,

                playerId:
                  achievement.playerId,

                coachId:
                  achievement.coachId,

                scoutId:
                  achievement.scoutId,
              },
            },
          });

          return updated;
        },
      );

    return {
      success: true,

      message:
        `Achievement verification ${status.toLowerCase()} successfully`,

      data: updatedAchievement,
    };
  }
}