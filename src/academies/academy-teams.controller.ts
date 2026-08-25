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

import { AcademyTeamsService } from './academy-teams.service.js';

import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

type AuthenticatedRequest = Request & {
  user: {
    sub: string;
  };
};

@Controller('academies/:academyId/teams')
export class AcademyTeamsController {
  constructor(
    private readonly teams: AcademyTeamsService,
  ) {}

  /**
   * Create a team.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  createTeam(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Body() dto: CreateTeamDto,
  ) {
    return this.teams.createTeam(
      req.user.sub,
      academyId,
      dto,
    );
  }

  /**
   * Get all teams belonging to an academy.
   *
   * Public endpoint.
   */
  @Get()
  getTeams(
    @Param('academyId') academyId: string,
  ) {
    return this.teams.getTeams(
      academyId,
    );
  }

  /**
   * Get one team.
   *
   * Public endpoint.
   */
  @Get(':teamId')
  getTeam(
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
  ) {
    return this.teams.getTeam(
      academyId,
      teamId,
    );
  }

  /**
   * Update a team.
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':teamId')
  updateTeam(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teams.updateTeam(
      req.user.sub,
      academyId,
      teamId,
      dto,
    );
  }

  /**
   * Delete a team.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId')
  deleteTeam(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
  ) {
    return this.teams.deleteTeam(
      req.user.sub,
      academyId,
      teamId,
    );
  }

  /**
   * Add a player to a team.
   */
  @UseGuards(JwtAuthGuard)
  @Post(':teamId/players')
  addPlayer(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
    @Body() dto: AddTeamPlayerDto,
  ) {
    return this.teams.addPlayer(
      req.user.sub,
      academyId,
      teamId,
      dto,
    );
  }

  /**
   * Remove a player from a team.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId/players/:playerId')
  removePlayer(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.teams.removePlayer(
      req.user.sub,
      academyId,
      teamId,
      playerId,
    );
  }

  /**
   * Add a coach to a team.
   */
  @UseGuards(JwtAuthGuard)
  @Post(':teamId/coaches')
  addCoach(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
    @Body() dto: AddTeamCoachDto,
  ) {
    return this.teams.addCoach(
      req.user.sub,
      academyId,
      teamId,
      dto,
    );
  }

  /**
   * Remove a coach from a team.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId/coaches/:coachId')
  removeCoach(
    @Req() req: AuthenticatedRequest,
    @Param('academyId') academyId: string,
    @Param('teamId') teamId: string,
    @Param('coachId') coachId: string,
  ) {
    return this.teams.removeCoach(
      req.user.sub,
      academyId,
      teamId,
      coachId,
    );
  }
}