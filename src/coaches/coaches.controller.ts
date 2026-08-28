import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { CoachesService } from './coaches.service.js';

import { CreateCoachDto } from './dto/create-coach.dto.js';
import { UpdateCoachDto } from './dto/update-coach.dto.js';

import { CreateCoachAchievementDto } from './dto/create-coach-achievement.dto.js';
import { UpdateCoachAchievementDto } from './dto/update-coach-achievement.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email?: string;
    roles?: string[];
  };
};

@Controller('coaches')
export class CoachesController {
  constructor(
    private readonly coachesService: CoachesService,
  ) {}

  // =========================================================
  // COACH PROFILE
  // =========================================================

  /**
   * Create my Coach profile.
   *
   * POST /api/v1/coaches
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCoachDto,
  ) {
    return this.coachesService.createProfile(
      req.user.id,
      dto,
    );
  }

  /**
   * Get my Coach profile.
   *
   * GET /api/v1/coaches/me
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.coachesService.getMyProfile(
      req.user.id,
    );
  }

  /**
   * Update my Coach profile.
   *
   * PATCH /api/v1/coaches/me
   */
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateCoachDto,
  ) {
    return this.coachesService.updateProfile(
      req.user.id,
      dto,
    );
  }

  /**
   * Soft-delete my Coach profile.
   *
   * DELETE /api/v1/coaches/me
   */
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.coachesService.deleteProfile(
      req.user.id,
    );
  }

  // =========================================================
  // COACH ACHIEVEMENTS
  // =========================================================

  /**
   * Create a Coach achievement.
   *
   * POST /api/v1/coaches/achievements
   */
  @Post('achievements')
  @UseGuards(JwtAuthGuard)
  async createAchievement(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCoachAchievementDto,
  ) {
    return this.coachesService.createAchievement(
      req.user.id,
      dto,
    );
  }

  /**
   * Get my Coach achievements.
   *
   * GET /api/v1/coaches/achievements
   */
  @Get('achievements')
  @UseGuards(JwtAuthGuard)
  async getMyAchievements(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.coachesService.getMyAchievements(
      req.user.id,
    );
  }

  /**
   * Update one of my Coach achievements.
   *
   * PATCH /api/v1/coaches/achievements/:achievementId
   */
  @Patch('achievements/:achievementId')
  @UseGuards(JwtAuthGuard)
  async updateAchievement(
    @Req() req: AuthenticatedRequest,
    @Param('achievementId')
    achievementId: string,
    @Body()
    dto: UpdateCoachAchievementDto,
  ) {
    return this.coachesService.updateAchievement(
      req.user.id,
      achievementId,
      dto,
    );
  }

  /**
   * Delete one of my Coach achievements.
   *
   * DELETE /api/v1/coaches/achievements/:achievementId
   */
  @Delete('achievements/:achievementId')
  @UseGuards(JwtAuthGuard)
  async deleteAchievement(
    @Req() req: AuthenticatedRequest,
    @Param('achievementId')
    achievementId: string,
  ) {
    return this.coachesService.deleteAchievement(
      req.user.id,
      achievementId,
    );
  }

  // =========================================================
// COACH FOLLOW
// =========================================================

/**
 * Follow Coach.
 *
 * POST /api/v1/coaches/:coachId/follow
 */
@Post(':coachId/follow')
@UseGuards(JwtAuthGuard)
async followCoach(
  @Req() req: AuthenticatedRequest,
  @Param('coachId') coachId: string,
) {
  return this.coachesService.followCoach(
    req.user.id,
    coachId,
  );
}

/**
 * Unfollow Coach.
 *
 * DELETE /api/v1/coaches/:coachId/follow
 */
@Delete(':coachId/follow')
@UseGuards(JwtAuthGuard)
async unfollowCoach(
  @Req() req: AuthenticatedRequest,
  @Param('coachId') coachId: string,
) {
  return this.coachesService.unfollowCoach(
    req.user.id,
    coachId,
  );
}

/**
 * Check follow status.
 *
 * GET /api/v1/coaches/:coachId/follow
 */
@Get(':coachId/follow')
@UseGuards(JwtAuthGuard)
async isFollowingCoach(
  @Req() req: AuthenticatedRequest,
  @Param('coachId') coachId: string,
) {
  return this.coachesService.isFollowingCoach(
    req.user.id,
    coachId,
  );
}

/**
 * Get Coach follower count.
 *
 * GET /api/v1/coaches/:coachId/followers/count
 */
@Get(':coachId/followers/count')
async getCoachFollowerCount(
  @Param('coachId') coachId: string,
) {
  return this.coachesService.getCoachFollowerCount(
    coachId,
  );
}

// =========================================================
// COACH LIKE
// =========================================================

/**
 * Like Coach.
 *
 * POST /api/v1/coaches/:coachId/like
 */
@Post(':coachId/like')
@UseGuards(JwtAuthGuard)
async likeCoach(
  @Req() req: AuthenticatedRequest,
  @Param('coachId') coachId: string,
) {
  return this.coachesService.likeCoach(
    req.user.id,
    coachId,
  );
}

/**
 * Unlike Coach.
 *
 * DELETE /api/v1/coaches/:coachId/like
 */
@Delete(':coachId/like')
@UseGuards(JwtAuthGuard)
async unlikeCoach(
  @Req() req: AuthenticatedRequest,
  @Param('coachId') coachId: string,
) {
  return this.coachesService.unlikeCoach(
    req.user.id,
    coachId,
  );
}

/**
 * Check like status.
 *
 * GET /api/v1/coaches/:coachId/like
 */
@Get(':coachId/like')
@UseGuards(JwtAuthGuard)
async isCoachLiked(
  @Req() req: AuthenticatedRequest,
  @Param('coachId') coachId: string,
) {
  return this.coachesService.isCoachLiked(
    req.user.id,
    coachId,
  );
}

/**
 * Get Coach like count.
 *
 * GET /api/v1/coaches/:coachId/likes/count
 */
@Get(':coachId/likes/count')
async getCoachLikesCount(
  @Param('coachId') coachId: string,
) {
  return this.coachesService.getCoachLikesCount(
    coachId,
  );
}

  // =========================================================
  // PUBLIC COACH PROFILE
  // =========================================================

  /**
   * Get public Coach profile.
   *
   * GET /api/v1/coaches/:coachId
   */
  @Get(':coachId')
  async getProfileById(
    @Param('coachId') coachId: string,
  ) {
    return this.coachesService.getProfileById(
      coachId,
    );
  }
}