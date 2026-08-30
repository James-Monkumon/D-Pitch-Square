import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { Permissions } from '../auth/decorators/permissions.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PermissionsGuard } from '../auth/guards/permissions.guard.js';

import { AdminService } from './admin.service.js';

import {
  UpdateVerificationDto,
} from './dto/update-verification.dto.js';

import {
  UpdateAchievementVerificationDto,
} from './dto/update-achievement-verification.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
  };
};

@Controller('admin')
@UseGuards(
  JwtAuthGuard,
  PermissionsGuard,
)
@Permissions('verification.review')
export class AdminController {
  constructor(
    private readonly adminService:
      AdminService,
  ) {}

  // =========================================================
  // PENDING VERIFICATIONS
  // =========================================================

  /**
   * GET /api/v1/admin/verifications/profiles
   */
  @Get('verifications/profiles')
  getPendingProfileVerifications() {
    return this.adminService
      .getPendingProfileVerifications();
  }

  /**
   * GET /api/v1/admin/verifications/achievements
   */
  @Get('verifications/achievements')
  getPendingAchievementVerifications() {
    return this.adminService
      .getPendingAchievementVerifications();
  }

  // =========================================================
  // PROFILE VERIFICATION
  // =========================================================

  /**
   * PATCH /api/v1/admin/players/:playerId/verification
   */
  @Patch(
    'players/:playerId/verification',
  )
  verifyPlayer(
    @Req()
    req: AuthenticatedRequest,

    @Param('playerId')
    playerId: string,

    @Body()
    dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyPlayer(
      req.user.id,
      playerId,
      dto.verificationStatus,
    );
  }

  /**
   * PATCH /api/v1/admin/academies/:academyId/verification
   */
  @Patch(
    'academies/:academyId/verification',
  )
  verifyAcademy(
    @Req()
    req: AuthenticatedRequest,

    @Param('academyId')
    academyId: string,

    @Body()
    dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyAcademy(
      req.user.id,
      academyId,
      dto.verificationStatus,
    );
  }

  /**
   * PATCH /api/v1/admin/scouts/:scoutId/verification
   */
  @Patch(
    'scouts/:scoutId/verification',
  )
  verifyScout(
    @Req()
    req: AuthenticatedRequest,

    @Param('scoutId')
    scoutId: string,

    @Body()
    dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyScout(
      req.user.id,
      scoutId,
      dto.verificationStatus,
    );
  }

  /**
   * PATCH /api/v1/admin/coaches/:coachId/verification
   */
  @Patch(
    'coaches/:coachId/verification',
  )
  verifyCoach(
    @Req()
    req: AuthenticatedRequest,

    @Param('coachId')
    coachId: string,

    @Body()
    dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyCoach(
      req.user.id,
      coachId,
      dto.verificationStatus,
    );
  }

  // =========================================================
  // ACHIEVEMENT VERIFICATION
  // =========================================================

  /**
   * PATCH
   * /api/v1/admin/achievements/:achievementId/verification
   */
  @Patch(
    'achievements/:achievementId/verification',
  )
  verifyAchievement(
    @Req()
    req: AuthenticatedRequest,

    @Param('achievementId')
    achievementId: string,

    @Body()
    dto:
      UpdateAchievementVerificationDto,
  ) {
    return this.adminService
      .verifyAchievement(
        req.user.id,
        achievementId,
        dto.verificationStatus,
      );
  }
}