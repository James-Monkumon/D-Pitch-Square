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

import { ScoutsService } from './scouts.service.js';

import { CreateScoutDto } from './dto/create-scout.dto.js';
import { UpdateScoutDto } from './dto/update-scout.dto.js';
import { CreateScoutAchievementDto } from './dto/create-scout-achievement.dto.js';
import { UpdateScoutAchievementDto } from './dto/update-scout-achievement.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
};

@Controller('scouts')
export class ScoutsController {
  constructor(
    private readonly scoutsService: ScoutsService,
  ) {}

  // =========================================================
  // PROFILE
  // =========================================================

  @Post()
  @UseGuards(JwtAuthGuard)
  createProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateScoutDto,
  ) {
    return this.scoutsService.createProfile(
      req.user.id,
      dto,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyProfile(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.scoutsService.getMyProfile(
      req.user.id,
    );
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateScoutDto,
  ) {
    return this.scoutsService.updateProfile(
      req.user.id,
      dto,
    );
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  deleteProfile(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.scoutsService.deleteProfile(
      req.user.id,
    );
  }

  // =========================================================
  // ACHIEVEMENTS
  // =========================================================

  @Post('achievements')
  @UseGuards(JwtAuthGuard)
  createAchievement(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateScoutAchievementDto,
  ) {
    return this.scoutsService.createAchievement(
      req.user.id,
      dto,
    );
  }

  @Get('achievements')
  @UseGuards(JwtAuthGuard)
  getMyAchievements(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.scoutsService.getMyAchievements(
      req.user.id,
    );
  }

  @Patch('achievements/:achievementId')
  @UseGuards(JwtAuthGuard)
  updateAchievement(
    @Req() req: AuthenticatedRequest,
    @Param('achievementId') achievementId: string,
    @Body() dto: UpdateScoutAchievementDto,
  ) {
    return this.scoutsService.updateAchievement(
      req.user.id,
      achievementId,
      dto,
    );
  }

  @Delete('achievements/:achievementId')
  @UseGuards(JwtAuthGuard)
  deleteAchievement(
    @Req() req: AuthenticatedRequest,
    @Param('achievementId') achievementId: string,
  ) {
    return this.scoutsService.deleteAchievement(
      req.user.id,
      achievementId,
    );
  }

  // =========================================================
  // FOLLOW
  // =========================================================

  @Post(':scoutId/follow')
  @UseGuards(JwtAuthGuard)
  followScout(
    @Req() req: AuthenticatedRequest,
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.followScout(
      req.user.id,
      scoutId,
    );
  }

  @Delete(':scoutId/follow')
  @UseGuards(JwtAuthGuard)
  unfollowScout(
    @Req() req: AuthenticatedRequest,
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.unfollowScout(
      req.user.id,
      scoutId,
    );
  }

  @Get(':scoutId/follow')
  @UseGuards(JwtAuthGuard)
  isFollowingScout(
    @Req() req: AuthenticatedRequest,
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.isFollowingScout(
      req.user.id,
      scoutId,
    );
  }

  @Get(':scoutId/followers/count')
  getScoutFollowerCount(
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.getScoutFollowerCount(
      scoutId,
    );
  }

  // =========================================================
  // LIKE
  // =========================================================

  @Post(':scoutId/like')
  @UseGuards(JwtAuthGuard)
  likeScout(
    @Req() req: AuthenticatedRequest,
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.likeScout(
      req.user.id,
      scoutId,
    );
  }

  @Delete(':scoutId/like')
  @UseGuards(JwtAuthGuard)
  unlikeScout(
    @Req() req: AuthenticatedRequest,
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.unlikeScout(
      req.user.id,
      scoutId,
    );
  }

  @Get(':scoutId/like')
  @UseGuards(JwtAuthGuard)
  isScoutLiked(
    @Req() req: AuthenticatedRequest,
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.isScoutLiked(
      req.user.id,
      scoutId,
    );
  }

  @Get(':scoutId/likes/count')
  getScoutLikesCount(
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.getScoutLikesCount(
      scoutId,
    );
  }

  // =========================================================
  // PUBLIC PROFILE
  // =========================================================

  @Get(':scoutId')
  getProfileById(
    @Param('scoutId') scoutId: string,
  ) {
    return this.scoutsService.getProfileById(
      scoutId,
    );
  }
}