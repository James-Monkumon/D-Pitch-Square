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

import { PlayersService } from './players.service.js';

import { CreatePlayerDto } from './dto/create-player.dto.js';
import { UpdatePlayerDto } from './dto/update-player.dto.js';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto.js';
import { CreateAchievementDto } from './dto/create-achievement.dto.js';
import { UpdateAchievementDto } from './dto/update-achievement.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
  ) {}

  // =========================================================
  // PLAYER PROFILE
  // =========================================================

  /**
   * Create or restore my player profile.
   *
   * POST /api/v1/players/profile
   */
  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Req() req: any,
    @Body() dto: CreatePlayerDto,
  ) {
    return this.playersService.createProfile(
      req.user.id,
      dto,
    );
  }

  /**
   * Get my player profile.
   *
   * GET /api/v1/players/profile
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(
    @Req() req: any,
  ) {
    return this.playersService.getMyProfile(
      req.user.id,
    );
  }

  /**
   * Explicit /me alias.
   *
   * GET /api/v1/players/profile/me
   */
  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  async getMyProfileMe(
    @Req() req: any,
  ) {
    return this.playersService.getMyProfile(
      req.user.id,
    );
  }

  /**
   * Update my player profile.
   *
   * PATCH /api/v1/players/profile
   */
  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req: any,
    @Body() dto: UpdatePlayerDto,
  ) {
    return this.playersService.updateProfile(
      req.user.id,
      dto,
    );
  }

  /**
   * Soft-delete my player profile.
   *
   * DELETE /api/v1/players/profile
   */
  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(
    @Req() req: any,
  ) {
    return this.playersService.deleteProfile(
      req.user.id,
    );
  }

  // =========================================================
  // PLAYER PROFILE VERIFICATION
  // =========================================================

  /**
   * Submit my player profile for admin verification.
   *
   * POST /api/v1/players/profile/verification
   */
  @Post('profile/verification')
  @UseGuards(JwtAuthGuard)
  async submitProfileForVerification(
    @Req() req: any,
  ) {
    return this.playersService
      .submitProfileForVerification(
        req.user.id,
      );
  }

  // =========================================================
  // PLAYER STATISTICS
  // =========================================================

  /**
   * Create/update player statistics.
   *
   * PATCH /api/v1/players/statistics
   */
  @Patch('statistics')
  @UseGuards(JwtAuthGuard)
  async updateStatistics(
    @Req() req: any,
    @Body() dto: UpdatePlayerStatisticsDto,
  ) {
    return this.playersService.updateStatistics(
      req.user.id,
      dto,
    );
  }

  // =========================================================
  // PLAYER ACHIEVEMENTS
  // =========================================================

  /**
   * Create player achievement.
   *
   * POST /api/v1/players/achievements
   */
  @Post('achievements')
  @UseGuards(JwtAuthGuard)
  async createAchievement(
    @Req() req: any,
    @Body() dto: CreateAchievementDto,
  ) {
    return this.playersService.createAchievement(
      req.user.id,
      dto,
    );
  }

  /**
   * Get all my achievements.
   *
   * GET /api/v1/players/achievements
   */
  @Get('achievements')
  @UseGuards(JwtAuthGuard)
  async getMyAchievements(
    @Req() req: any,
  ) {
    return this.playersService.getMyAchievements(
      req.user.id,
    );
  }

  /**
   * Update one of my achievements.
   *
   * PATCH
   * /api/v1/players/achievements/:achievementId
   */
  @Patch(
    'achievements/:achievementId',
  )
  @UseGuards(JwtAuthGuard)
  async updateAchievement(
    @Req() req: any,

    @Param('achievementId')
    achievementId: string,

    @Body()
    dto: UpdateAchievementDto,
  ) {
    return this.playersService.updateAchievement(
      req.user.id,
      achievementId,
      dto,
    );
  }

  /**
   * Delete one of my achievements.
   *
   * DELETE
   * /api/v1/players/achievements/:achievementId
   */
  @Delete(
    'achievements/:achievementId',
  )
  @UseGuards(JwtAuthGuard)
  async deleteAchievement(
    @Req() req: any,

    @Param('achievementId')
    achievementId: string,
  ) {
    return this.playersService.deleteAchievement(
      req.user.id,
      achievementId,
    );
  }

  // =========================================================
  // PLAYER ACHIEVEMENT VERIFICATION
  // =========================================================

  /**
   * Submit one of my achievements
   * for admin verification.
   *
   * POST
   * /api/v1/players/achievements/:achievementId/verification
   */
  @Post(
    'achievements/:achievementId/verification',
  )
  @UseGuards(JwtAuthGuard)
  async submitAchievementForVerification(
    @Req() req: any,

    @Param('achievementId')
    achievementId: string,
  ) {
    return this.playersService
      .submitAchievementForVerification(
        req.user.id,
        achievementId,
      );
  }

  // =========================================================
  // PLAYER FOLLOW
  // =========================================================

  /**
   * Follow player.
   *
   * POST /api/v1/players/:playerId/follow
   */
  @Post(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async followPlayer(
    @Req() req: any,

    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.followPlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Unfollow player.
   *
   * DELETE /api/v1/players/:playerId/follow
   */
  @Delete(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async unfollowPlayer(
    @Req() req: any,

    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.unfollowPlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Check follow status.
   *
   * GET /api/v1/players/:playerId/follow
   */
  @Get(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async isFollowingPlayer(
    @Req() req: any,

    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService
      .isFollowingPlayer(
        req.user.id,
        playerId,
      );
  }

  /**
   * Get follower count.
   *
   * GET
   * /api/v1/players/:playerId/followers/count
   */
  @Get(
    ':playerId/followers/count',
  )
  async getPlayerFollowerCount(
    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService
      .getPlayerFollowerCount(
        playerId,
      );
  }

  // =========================================================
  // PLAYER LIKE
  // =========================================================

  /**
   * Like player.
   *
   * POST /api/v1/players/:playerId/like
   */
  @Post(':playerId/like')
  @UseGuards(JwtAuthGuard)
  async likePlayer(
    @Req() req: any,

    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.likePlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Unlike player.
   *
   * DELETE /api/v1/players/:playerId/like
   */
  @Delete(':playerId/like')
  @UseGuards(JwtAuthGuard)
  async unlikePlayer(
    @Req() req: any,

    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.unlikePlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Check like status.
   *
   * GET /api/v1/players/:playerId/like
   */
  @Get(':playerId/like')
  @UseGuards(JwtAuthGuard)
  async isPlayerLiked(
    @Req() req: any,

    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.isPlayerLiked(
      req.user.id,
      playerId,
    );
  }

  /**
   * Get total player likes.
   *
   * GET
   * /api/v1/players/:playerId/likes/count
   */
  @Get(
    ':playerId/likes/count',
  )
  async getPlayerLikesCount(
    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService
      .getPlayerLikesCount(
        playerId,
      );
  }

  // =========================================================
  // PUBLIC PLAYER PROFILE
  // =========================================================

  /**
   * Get public player profile.
   *
   * Keep this generic route at the bottom.
   *
   * GET /api/v1/players/:playerId
   */
  @Get(':playerId')
  async getPlayerById(
    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.getPlayerById(
      playerId,
    );
  }
}