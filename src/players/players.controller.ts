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
   * Create my player profile.
   *
   * POST /players/profile
   *
   * Requires authentication.
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
   *
   * Requires authentication.
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
   * Get my player profile.
   *
   * GET /players/profile/me
   *
   * Requires authentication.
   *
   * This is an explicit /me alias for
   * GET /players/profile.
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
   *
   * Requires authentication.
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

  // =========================================================
  // PLAYER STATISTICS
  // =========================================================

  /**
   * Update my player statistics.
   *
   * Creates statistics if they don't already exist.
   *
   * PATCH /players/statistics
   *
   * Requires authentication.
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
   * Create an achievement for my profile.
   *
   * POST /players/achievements
   *
   * Requires authentication.
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
   * Update one of my achievements.
   *
   * PATCH /players/achievements/:achievementId
   *
   * Requires authentication.
   */
  @Patch('achievements/:achievementId')
  @UseGuards(JwtAuthGuard)
  async updateAchievement(
    @Req() req: any,
    @Param('achievementId') achievementId: string,
    @Body() dto: UpdateAchievementDto,
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
   *
   * Requires authentication.
   */
  @Delete('achievements/:achievementId')
  @UseGuards(JwtAuthGuard)
  async deleteAchievement(
    @Req() req: any,
    @Param('achievementId') achievementId: string,
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
   * Follow a player.
   *
   * POST /players/:playerId/follow
   *
   * Requires authentication.
   */
  @Post(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async followPlayer(
    @Req() req: any,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.followPlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Unfollow a player.
   *
   * DELETE /players/:playerId/follow
   *
   * Requires authentication.
   */
  @Delete(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async unfollowPlayer(
    @Req() req: any,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.unfollowPlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Check whether the authenticated user
   * follows a player.
   *
   * GET /players/:playerId/follow
   *
   * Requires authentication.
   */
  @Get(':playerId/follow')
  @UseGuards(JwtAuthGuard)
  async isFollowingPlayer(
    @Req() req: any,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.isFollowingPlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Get follower count for a player.
   *
   * GET /players/:playerId/followers/count
   *
   * Public endpoint.
   */
  @Get(':playerId/followers/count')
  async getPlayerFollowerCount(
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.getPlayerFollowerCount(
      playerId,
    );
  }

  // =========================================================
  // PLAYER LIKE
  // =========================================================

  /**
   * Like a player.
   *
   * POST /players/:playerId/like
   *
   * Requires authentication.
   */
  @Post(':playerId/like')
  @UseGuards(JwtAuthGuard)
  async likePlayer(
    @Req() req: any,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.likePlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Unlike a player.
   *
   * DELETE /players/:playerId/like
   *
   * Requires authentication.
   */
  @Delete(':playerId/like')
  @UseGuards(JwtAuthGuard)
  async unlikePlayer(
    @Req() req: any,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.unlikePlayer(
      req.user.id,
      playerId,
    );
  }

  /**
   * Check whether the authenticated user
   * likes a player.
   *
   * GET /players/:playerId/like
   *
   * Requires authentication.
   */
  @Get(':playerId/like')
  @UseGuards(JwtAuthGuard)
  async isPlayerLiked(
    @Req() req: any,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.isPlayerLiked(
      req.user.id,
      playerId,
    );
  }

  /**
   * Get total likes for a player.
   *
   * GET /players/:playerId/likes/count
   *
   * Public endpoint.
   */
  @Get(':playerId/likes/count')
  async getPlayerLikesCount(
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.getPlayerLikesCount(
      playerId,
    );
  }

  // =========================================================
  // PUBLIC PLAYER PROFILE
  // =========================================================

  /**
   * Get a public player profile.
   *
   * GET /players/:playerId
   *
   * Does not require authentication.
   *
   * Example:
   * GET /players/dc210453-08fd-43e5-a644-a75f8ae07c15
   */
  @Get(':playerId')
  async getPlayerById(
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.getPlayerById(
      playerId,
    );
  }
}