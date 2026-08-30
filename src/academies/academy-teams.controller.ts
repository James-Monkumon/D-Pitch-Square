import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { AcademyTeamsService } from './academy-teams.service.js';

import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email: string;
    roles: string[];
  };
};

@Controller('academies/:academyId/teams')
export class AcademyTeamsController {
  constructor(
    private readonly teams: AcademyTeamsService,
  ) {}

  /**
   * Create team.
   *
   * POST /api/v1/academies/:academyId/teams
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  createTeam(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Body() dto: CreateTeamDto,
  ) {
    return this.teams.createTeam(
      req.user.id,
      academyId,
      dto,
    );
  }

  /**
   * Get academy teams.
   *
   * GET /api/v1/academies/:academyId/teams
   */
  @Get()
  getTeams(
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
  ) {
    return this.teams.getTeams(
      academyId,
    );
  }

  /**
   * Get one team.
   *
   * GET /api/v1/academies/:academyId/teams/:teamId
   */
  @Get(':teamId')
  getTeam(
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
  ) {
    return this.teams.getTeam(
      academyId,
      teamId,
    );
  }

  /**
   * Update team.
   *
   * PATCH /api/v1/academies/:academyId/teams/:teamId
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':teamId')
  updateTeam(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teams.updateTeam(
      req.user.id,
      academyId,
      teamId,
      dto,
    );
  }

  /**
   * Delete team.
   *
   * DELETE /api/v1/academies/:academyId/teams/:teamId
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId')
  deleteTeam(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
  ) {
    return this.teams.deleteTeam(
      req.user.id,
      academyId,
      teamId,
    );
  }

  // ============================================================
  // TEAM PLAYERS
  // ============================================================

  /**
   * Add player to team.
   *
   * POST /api/v1/academies/:academyId/teams/:teamId/players
   */
  @UseGuards(JwtAuthGuard)
  @Post(':teamId/players')
  addPlayer(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
    @Body() dto: AddTeamPlayerDto,
  ) {
    return this.teams.addPlayer(
      req.user.id,
      academyId,
      teamId,
      dto,
    );
  }

  /**
   * Remove player from team.
   *
   * DELETE /api/v1/academies/:academyId/teams/:teamId/players/:playerId
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId/players/:playerId')
  removePlayer(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
    @Param(
      'playerId',
      new ParseUUIDPipe(),
    )
    playerId: string,
  ) {
    return this.teams.removePlayer(
      req.user.id,
      academyId,
      teamId,
      playerId,
    );
  }

  // ============================================================
  // TEAM COACHES
  // ============================================================

  /**
   * Add coach to team.
   *
   * POST /api/v1/academies/:academyId/teams/:teamId/coaches
   */
  @UseGuards(JwtAuthGuard)
  @Post(':teamId/coaches')
  addCoach(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
    @Body() dto: AddTeamCoachDto,
  ) {
    return this.teams.addCoach(
      req.user.id,
      academyId,
      teamId,
      dto,
    );
  }

  /**
   * Remove coach from team.
   *
   * DELETE /api/v1/academies/:academyId/teams/:teamId/coaches/:coachId
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId/coaches/:coachId')
  removeCoach(
    @Req() req: AuthenticatedRequest,
    @Param(
      'academyId',
      new ParseUUIDPipe(),
    )
    academyId: string,
    @Param(
      'teamId',
      new ParseUUIDPipe(),
    )
    teamId: string,
    @Param(
      'coachId',
      new ParseUUIDPipe(),
    )
    coachId: string,
  ) {
    return this.teams.removeCoach(
      req.user.id,
      academyId,
      teamId,
      coachId,
    );
  }
}