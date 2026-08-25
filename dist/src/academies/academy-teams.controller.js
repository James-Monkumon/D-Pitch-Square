var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AcademyTeamsService } from './academy-teams.service.js';
import { AddTeamCoachDto } from './dto/add-team-coach.dto.js';
import { AddTeamPlayerDto } from './dto/add-team-player.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
let AcademyTeamsController = class AcademyTeamsController {
    teams;
    constructor(teams) {
        this.teams = teams;
    }
    /**
     * Create a team.
     */
    createTeam(req, academyId, dto) {
        return this.teams.createTeam(req.user.sub, academyId, dto);
    }
    /**
     * Get all teams belonging to an academy.
     *
     * Public endpoint.
     */
    getTeams(academyId) {
        return this.teams.getTeams(academyId);
    }
    /**
     * Get one team.
     *
     * Public endpoint.
     */
    getTeam(academyId, teamId) {
        return this.teams.getTeam(academyId, teamId);
    }
    /**
     * Update a team.
     */
    updateTeam(req, academyId, teamId, dto) {
        return this.teams.updateTeam(req.user.sub, academyId, teamId, dto);
    }
    /**
     * Delete a team.
     */
    deleteTeam(req, academyId, teamId) {
        return this.teams.deleteTeam(req.user.sub, academyId, teamId);
    }
    /**
     * Add a player to a team.
     */
    addPlayer(req, academyId, teamId, dto) {
        return this.teams.addPlayer(req.user.sub, academyId, teamId, dto);
    }
    /**
     * Remove a player from a team.
     */
    removePlayer(req, academyId, teamId, playerId) {
        return this.teams.removePlayer(req.user.sub, academyId, teamId, playerId);
    }
    /**
     * Add a coach to a team.
     */
    addCoach(req, academyId, teamId, dto) {
        return this.teams.addCoach(req.user.sub, academyId, teamId, dto);
    }
    /**
     * Remove a coach from a team.
     */
    removeCoach(req, academyId, teamId, coachId) {
        return this.teams.removeCoach(req.user.sub, academyId, teamId, coachId);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post(),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CreateTeamDto]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "createTeam", null);
__decorate([
    Get(),
    __param(0, Param('academyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "getTeams", null);
__decorate([
    Get(':teamId'),
    __param(0, Param('academyId')),
    __param(1, Param('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "getTeam", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Patch(':teamId'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Param('teamId')),
    __param(3, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, UpdateTeamDto]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "updateTeam", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':teamId'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Param('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "deleteTeam", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':teamId/players'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Param('teamId')),
    __param(3, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, AddTeamPlayerDto]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "addPlayer", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':teamId/players/:playerId'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Param('teamId')),
    __param(3, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "removePlayer", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':teamId/coaches'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Param('teamId')),
    __param(3, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, AddTeamCoachDto]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "addCoach", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':teamId/coaches/:coachId'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Param('teamId')),
    __param(3, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], AcademyTeamsController.prototype, "removeCoach", null);
AcademyTeamsController = __decorate([
    Controller('academies/:academyId/teams'),
    __metadata("design:paramtypes", [AcademyTeamsService])
], AcademyTeamsController);
export { AcademyTeamsController };
//# sourceMappingURL=academy-teams.controller.js.map