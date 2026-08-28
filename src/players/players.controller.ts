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
   * POST /players/profile
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
   * GET /players/profile
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
   * GET /players/profile/me
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
   * PATCH /players/profile
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
   * DELETE /players/profile
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
  // PLAYER STATISTICS
  // =========================================================

  /**
   * Create/update player statistics.
   *
   * PATCH /players/statistics
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
   * POST /players/achievements
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
   * GET /players/achievements
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
   * PATCH /players/achievements/:achievementId
   */
  @Patch('achievements/:achievementId')
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
   * DELETE /players/achievements/:achievementId
   */
  @Delete('achievements/:achievementId')
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
  // PLAYER FOLLOW
  // =========================================================

  /**
   * Follow player.
   *
   * POST /players/:playerId/follow
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
   * DELETE /players/:playerId/follow
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
   * GET /players/:playerId/follow
   */
  @Get(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async isFollowingPlayer(
    @Req() req: any,
    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.isFollowingPlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Get follower count.
   *
   * GET /players/:playerId/followers/count
   */
  @Get(':playerId/followers/count')
  async getPlayerFollowerCount(
    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.getPlayerFollowerCount(
      playerId,
    );
  }

  // =========================================================
  // PLAYER LIKE
  // =========================================================

  /**
   * Like player.
   *
   * POST /players/:playerId/like
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
   * DELETE /players/:playerId/like
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
   * GET /players/:playerId/like
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
   * GET /players/:playerId/likes/count
   */
  @Get(':playerId/likes/count')
  async getPlayerLikesCount(
    @Param('playerId')
    playerId: string,
  ) {
    return this.playersService.getPlayerLikesCount(
      playerId,
    );
  }

  // =========================================================
  // PUBLIC PLAYER PROFILE
  // =========================================================

  /**
   * Get public player profile.
   *
   * Keep this generic parameter route
   * at the bottom of the controller.
   *
   * GET /players/:playerId
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