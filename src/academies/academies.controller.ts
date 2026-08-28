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
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateAcademyDto } from './dto/create-academy.dto.js';
import { UpdateAcademyDto } from './dto/update-academy.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email: string;
    roles: string[];
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
      academyId,
    );
  }
  /**
 * Get academy statistics.
 *
 * GET /api/v1/academies/:academyId/statistics
 */
@UseGuards(JwtAuthGuard)
@Get(':academyId/statistics')
getAcademyStatistics(
  @Param('academyId') academyId: string,
) {
  return this.academies.getAcademyStatistics(
    academyId,
  );
}
/**
 * Request academy verification.
 *
 * POST /api/v1/academies/:academyId/verification/request
 */
@UseGuards(JwtAuthGuard)
@Post(':academyId/verification/request')
requestVerification(
  @Req() req: AuthenticatedRequest,
  @Param('academyId') academyId: string,
) {
  return this.academies.requestVerification(
    req.user.id,
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
      req.user.id,
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
      req.user.id,
      academyId,
      playerId,
    );
  }
    // ============================================================
  // ACADEMY TEAM PLAYERS
  // ============================================================
/**
 * Add player to a team.
 *
 * POST /api/v1/academies/teams/:teamId/players
 */
@UseGuards(JwtAuthGuard)
@Post('teams/:teamId/players')
addTeamPlayer(
  @Req() req: AuthenticatedRequest,
  @Param('teamId') teamId: string,
  @Body() dto: AddTeamPlayerDto,
) {
  return this.academies.addTeamPlayer(
    req.user.id,
    teamId,
    dto,
  );
}
  /**
   * Get players assigned to a team.
   *
   * GET /api/v1/academies/teams/:teamId/players
   */
  @UseGuards(JwtAuthGuard)
  @Get('teams/:teamId/players')
  getTeamPlayers(
    @Param('teamId') teamId: string,
  ) {
    return this.academies.getTeamPlayers(
      teamId,
    );
  }

  /**
   * Remove player from team.
   *
   * DELETE /api/v1/academies/teams/:teamId/players/:playerId
   */
  @UseGuards(JwtAuthGuard)
  @Delete('teams/:teamId/players/:playerId')
  removeTeamPlayer(
    @Req() req: AuthenticatedRequest,
    @Param('teamId') teamId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.academies.removeTeamPlayer(
      req.user.id,
      teamId,
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
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
      req.user.id,
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