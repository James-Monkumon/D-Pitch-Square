import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { AcademiesService } from './academies.service.js';

import { AcademyQueryDto } from './dto/academy-query.dto.js';
import { AddAcademyCoachDto } from './dto/add-academy-coach.dto.js';
import { AddAcademyPlayerDto } from './dto/add-academy-player.dto.js';
import { CreateAcademyDto } from './dto/create-academy.dto.js';
import { UpdateAcademyDto } from './dto/update-academy.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    sub: string;
  };
};

@Controller('academies')
export class AcademiesController {
  constructor(
    private readonly academies: AcademiesService,
  ) {}

  // ============================================================
  // ACADEMY PROFILE
  // ============================================================

  /**
   * Create academy profile.
   *
   * POST /api/v1/academies
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  createAcademy(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateAcademyDto,
  ) {
    return this.academies.createAcademy(
      req.user.sub,
      dto,
    );
  }

  /**
   * Get academies.
   *
   * GET /api/v1/academies
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getAcademies(
    @Query() query: AcademyQueryDto,
  ) {
    return this.academies.getAcademies(query);
  }

  /**
   * Get one academy.
   *
   * GET /api/v1/academies/:academyId
   */
  @UseGuards(JwtAuthGuard)
  @Get(':academyId')
  getAcademy(
    @Param('academyId') academyId: string,
  ) {
    return this.academies.getAcademyById(
      academyId,
    );
  }

  /**
   * Update academy.
   *
   * PATCH /api/v1/academies/:academyId
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':academyId')
  updateAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Body() dto: UpdateAcademyDto,
  ) {
    return this.academies.updateAcademy(
      req.user.sub,
      academyId,
      dto,
    );
  }

  /**
   * Soft-delete academy.
   *
   * DELETE /api/v1/academies/:academyId
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':academyId')
  deleteAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.deleteAcademy(
      req.user.sub,
      academyId,
    );
  }

  // ============================================================
  // ACADEMY PLAYERS
  // ============================================================

  /**
   * Get academy players.
   *
   * GET /api/v1/academies/:academyId/players
   */
  @Get(':academyId/players')
  getAcademyPlayers(
    @Param('academyId') academyId: string,
  ) {
    return this.academies.getAcademyPlayers(
      academyId,
    );
  }

  /**
   * Add player to academy.
   *
   * POST /api/v1/academies/:academyId/players
   */
  @UseGuards(JwtAuthGuard)
  @Post(':academyId/players')
  addAcademyPlayer(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Body() dto: AddAcademyPlayerDto,
  ) {
    return this.academies.addAcademyPlayer(
      req.user.sub,
      academyId,
      dto,
    );
  }

  /**
   * Remove player from academy.
   *
   * DELETE /api/v1/academies/:academyId/players/:playerId
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':academyId/players/:playerId')
  removeAcademyPlayer(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.academies.removeAcademyPlayer(
      req.user.sub,
      academyId,
      playerId,
    );
  }

  // ============================================================
  // ACADEMY COACHES
  // ============================================================

  /**
   * Get academy coaches.
   *
   * GET /api/v1/academies/:academyId/coaches
   */
  @Get(':academyId/coaches')
  getAcademyCoaches(
    @Param('academyId') academyId: string,
  ) {
    return this.academies.getAcademyCoaches(
      academyId,
    );
  }

  /**
   * Add coach to academy.
   *
   * POST /api/v1/academies/:academyId/coaches
   */
  @UseGuards(JwtAuthGuard)
  @Post(':academyId/coaches')
  addAcademyCoach(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Body() dto: AddAcademyCoachDto,
  ) {
    return this.academies.addAcademyCoach(
      req.user.sub,
      academyId,
      dto,
    );
  }

  /**
   * Remove coach from academy.
   *
   * DELETE /api/v1/academies/:academyId/coaches/:coachId
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':academyId/coaches/:coachId')
  removeAcademyCoach(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('coachId') coachId: string,
  ) {
    return this.academies.removeAcademyCoach(
      req.user.sub,
      academyId,
      coachId,
    );
  }

  // ============================================================
  // ACADEMY FOLLOW
  // ============================================================

  /**
   * Follow academy.
   *
   * POST /api/v1/academies/:academyId/follow
   */
  @UseGuards(JwtAuthGuard)
  @Post(':academyId/follow')
  followAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.followAcademy(
      req.user.sub,
      academyId,
    );
  }

  /**
   * Unfollow academy.
   *
   * DELETE /api/v1/academies/:academyId/follow
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':academyId/follow')
  unfollowAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.unfollowAcademy(
      req.user.sub,
      academyId,
    );
  }

  /**
   * Check whether current user follows academy.
   *
   * GET /api/v1/academies/:academyId/is-following
   */
  @UseGuards(JwtAuthGuard)
  @Get(':academyId/is-following')
  isFollowingAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.isFollowingAcademy(
      req.user.sub,
      academyId,
    );
  }

  /**
   * Get academy follower count.
   *
   * GET /api/v1/academies/:academyId/followers/count
   */
  @Get(':academyId/followers/count')
  getAcademyFollowerCount(
    @Param('academyId') academyId: string,
  ) {
    return this.academies.getAcademyFollowerCount(
      academyId,
    );
  }

  // ============================================================
  // ACADEMY LIKES
  // ============================================================

  /**
   * Like an academy.
   *
   * POST /api/v1/academies/:academyId/like
   */
  @UseGuards(JwtAuthGuard)
  @Post(':academyId/like')
  likeAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.likeAcademy(
      req.user.sub,
      academyId,
    );
  }

  /**
   * Unlike an academy.
   *
   * DELETE /api/v1/academies/:academyId/like
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':academyId/like')
  unlikeAcademy(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.unlikeAcademy(
      req.user.sub,
      academyId,
    );
  }

  /**
   * Check whether the authenticated user
   * likes an academy.
   *
   * GET /api/v1/academies/:academyId/is-liked
   */
  @UseGuards(JwtAuthGuard)
  @Get(':academyId/is-liked')
  isAcademyLiked(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
  ) {
    return this.academies.isAcademyLiked(
      req.user.sub,
      academyId,
    );
  }

  /**
   * Get academy like count.
   *
   * GET /api/v1/academies/:academyId/likes/count
   */
  @Get(':academyId/likes/count')
  getAcademyLikesCount(
    @Param('academyId') academyId: string,
  ) {
    return this.academies.getAcademyLikesCount(
      academyId,
    );
  }
}