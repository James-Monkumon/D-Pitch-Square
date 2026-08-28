import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import {
  AdminVerificationDecision,
} from './dto/update-verification.dto.js';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyPlayer(
    playerId: string,
    status: AdminVerificationDecision,
  ) {
    const player = await this.prisma.playerProfile.findUnique({
      where: {
        id: playerId,
      },
    });

    if (!player) {
      throw new NotFoundException('Player profile not found');
    }

    if (player.verificationStatus !== 'PENDING') {
      throw new BadRequestException(
        `Player verification cannot be changed from ${player.verificationStatus}`,
      );
    }

    const updatedPlayer = await this.prisma.playerProfile.update({
      where: {
        id: playerId,
      },
      data: {
        verificationStatus: status,
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
      message: `Player verification ${status.toLowerCase()} successfully`,
      data: updatedPlayer,
    };
  }

  async verifyAcademy(
    academyId: string,
    status: AdminVerificationDecision,
  ) {
    const academy = await this.prisma.academyProfile.findUnique({
      where: {
        id: academyId,
      },
    });

    if (!academy) {
      throw new NotFoundException('Academy profile not found');
    }

    if (academy.verificationStatus !== 'PENDING') {
      throw new BadRequestException(
        `Academy verification cannot be changed from ${academy.verificationStatus}`,
      );
    }

    const updatedAcademy = await this.prisma.academyProfile.update({
      where: {
        id: academyId,
      },
      data: {
        verificationStatus: status,
      },
      select: {
        id: true,
        academyName: true,
        verificationStatus: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      message: `Academy verification ${status.toLowerCase()} successfully`,
      data: updatedAcademy,
    };
  }

  async verifyScout(
    scoutId: string,
    status: AdminVerificationDecision,
  ) {
    const scout = await this.prisma.scoutProfile.findUnique({
      where: {
        id: scoutId,
      },
    });

    if (!scout) {
      throw new NotFoundException('Scout profile not found');
    }

    if (scout.verificationStatus !== 'PENDING') {
      throw new BadRequestException(
        `Scout verification cannot be changed from ${scout.verificationStatus}`,
      );
    }

    const updatedScout = await this.prisma.scoutProfile.update({
      where: {
        id: scoutId,
      },
      data: {
        verificationStatus: status,
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
      message: `Scout verification ${status.toLowerCase()} successfully`,
      data: updatedScout,
    };
  }

  async verifyCoach(
    coachId: string,
    status: AdminVerificationDecision,
  ) {
    const coach = await this.prisma.coachProfile.findUnique({
      where: {
        id: coachId,
      },
    });

    if (!coach) {
      throw new NotFoundException('Coach profile not found');
    }

    if (coach.verificationStatus !== 'PENDING') {
      throw new BadRequestException(
        `Coach verification cannot be changed from ${coach.verificationStatus}`,
      );
    }

    const updatedCoach = await this.prisma.coachProfile.update({
      where: {
        id: coachId,
      },
      data: {
        verificationStatus: status,
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
      message: `Coach verification ${status.toLowerCase()} successfully`,
      data: updatedCoach,
    };
  }
}