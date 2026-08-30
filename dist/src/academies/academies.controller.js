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
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AcademiesService } from './academies.service.js';
import { AcademyQueryDto } from './dto/academy-query.dto.js';
import { AddAcademyCoachDto } from './dto/add-academy-coach.dto.js';
import { AddAcademyPlayerDto } from './dto/add-academy-player.dto.js';
import { CreateAcademyDto } from './dto/create-academy.dto.js';
import { UpdateAcademyDto } from './dto/update-academy.dto.js';
let AcademiesController = class AcademiesController {
    academies;
    constructor(academies) {
        this.academies = academies;
    }
    // ============================================================
    // ACADEMY PROFILE
    // ============================================================
    /**
     * Create academy profile.
     *
     * POST /api/v1/academies
     */
    createAcademy(req, dto) {
        return this.academies.createAcademy(req.user.id, dto);
    }
    /**
     * Get academies.
     *
     * GET /api/v1/academies
     */
    getAcademies(query) {
        return this.academies.getAcademies(query);
    }
    /**
     * Get one academy.
     *
     * GET /api/v1/academies/:academyId
     */
    getAcademy(academyId) {
        return this.academies.getAcademyById(academyId);
    }
    /**
     * Update academy.
     *
     * PATCH /api/v1/academies/:academyId
     */
    updateAcademy(req, academyId, dto) {
        return this.academies.updateAcademy(req.user.id, academyId, dto);
    }
    /**
     * Soft-delete academy.
     *
     * DELETE /api/v1/academies/:academyId
     */
    deleteAcademy(req, academyId) {
        return this.academies.deleteAcademy(req.user.id, academyId);
    }
    /**
     * Get academy statistics.
     *
     * GET /api/v1/academies/:academyId/statistics
     */
    getAcademyStatistics(academyId) {
        return this.academies.getAcademyStatistics(academyId);
    }
    /**
     * Request academy verification.
     *
     * POST /api/v1/academies/:academyId/verification/request
     */
    requestVerification(req, academyId) {
        return this.academies.requestVerification(req.user.id, academyId);
    }
    // ============================================================
    // ACADEMY PLAYERS
    // ============================================================
    /**
     * Get academy players.
     *
     * GET /api/v1/academies/:academyId/players
     */
    getAcademyPlayers(academyId) {
        return this.academies.getAcademyPlayers(academyId);
    }
    /**
     * Add player to academy.
     *
     * POST /api/v1/academies/:academyId/players
     */
    addAcademyPlayer(req, academyId, dto) {
        return this.academies.addAcademyPlayer(req.user.id, academyId, dto);
    }
    /**
     * Remove player from academy.
     *
     * DELETE /api/v1/academies/:academyId/players/:playerId
     */
    removeAcademyPlayer(req, academyId, playerId) {
        return this.academies.removeAcademyPlayer(req.user.id, academyId, playerId);
    }
    // ============================================================
    // ACADEMY COACHES
    // ============================================================
    /**
     * Get academy coaches.
     *
     * GET /api/v1/academies/:academyId/coaches
     */
    getAcademyCoaches(academyId) {
        return this.academies.getAcademyCoaches(academyId);
    }
    /**
     * Add coach to academy.
     *
     * POST /api/v1/academies/:academyId/coaches
     */
    addAcademyCoach(req, academyId, dto) {
        return this.academies.addAcademyCoach(req.user.id, academyId, dto);
    }
    /**
     * Remove coach from academy.
     *
     * DELETE /api/v1/academies/:academyId/coaches/:coachId
     */
    removeAcademyCoach(req, academyId, coachId) {
        return this.academies.removeAcademyCoach(req.user.id, academyId, coachId);
    }
    // ============================================================
    // ACADEMY FOLLOW
    // ============================================================
    /**
     * Follow academy.
     *
     * POST /api/v1/academies/:academyId/follow
     */
    followAcademy(req, academyId) {
        return this.academies.followAcademy(req.user.id, academyId);
    }
    /**
     * Unfollow academy.
     *
     * DELETE /api/v1/academies/:academyId/follow
     */
    unfollowAcademy(req, academyId) {
        return this.academies.unfollowAcademy(req.user.id, academyId);
    }
    /**
     * Check whether current user follows academy.
     *
     * GET /api/v1/academies/:academyId/is-following
     */
    isFollowingAcademy(req, academyId) {
        return this.academies.isFollowingAcademy(req.user.id, academyId);
    }
    /**
     * Get academy follower count.
     *
     * GET /api/v1/academies/:academyId/followers/count
     */
    getAcademyFollowerCount(academyId) {
        return this.academies.getAcademyFollowerCount(academyId);
    }
    // ============================================================
    // ACADEMY LIKES
    // ============================================================
    /**
     * Like an academy.
     *
     * POST /api/v1/academies/:academyId/like
     */
    likeAcademy(req, academyId) {
        return this.academies.likeAcademy(req.user.id, academyId);
    }
    /**
     * Unlike an academy.
     *
     * DELETE /api/v1/academies/:academyId/like
     */
    unlikeAcademy(req, academyId) {
        return this.academies.unlikeAcademy(req.user.id, academyId);
    }
    /**
     * Check whether the authenticated user
     * likes an academy.
     *
     * GET /api/v1/academies/:academyId/is-liked
     */
    isAcademyLiked(req, academyId) {
        return this.academies.isAcademyLiked(req.user.id, academyId);
    }
    /**
     * Get academy like count.
     *
     * GET /api/v1/academies/:academyId/likes/count
     */
    getAcademyLikesCount(academyId) {
        return this.academies.getAcademyLikesCount(academyId);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    Post(),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateAcademyDto]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "createAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademyQueryDto]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademies", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get(':academyId'),
    __param(0, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Patch(':academyId'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateAcademyDto]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "updateAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':academyId'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "deleteAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get(':academyId/statistics'),
    __param(0, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademyStatistics", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':academyId/verification/request'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "requestVerification", null);
__decorate([
    Get(':academyId/players'),
    __param(0, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademyPlayers", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':academyId/players'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, AddAcademyPlayerDto]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "addAcademyPlayer", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':academyId/players/:playerId'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __param(2, Param('playerId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "removeAcademyPlayer", null);
__decorate([
    Get(':academyId/coaches'),
    __param(0, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademyCoaches", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':academyId/coaches'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, AddAcademyCoachDto]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "addAcademyCoach", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':academyId/coaches/:coachId'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __param(2, Param('coachId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "removeAcademyCoach", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':academyId/follow'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "followAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':academyId/follow'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "unfollowAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get(':academyId/is-following'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "isFollowingAcademy", null);
__decorate([
    Get(':academyId/followers/count'),
    __param(0, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademyFollowerCount", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(':academyId/like'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "likeAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':academyId/like'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "unlikeAcademy", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get(':academyId/is-liked'),
    __param(0, Req()),
    __param(1, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "isAcademyLiked", null);
__decorate([
    Get(':academyId/likes/count'),
    __param(0, Param('academyId', new ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademiesController.prototype, "getAcademyLikesCount", null);
AcademiesController = __decorate([
    Controller('academies'),
    __metadata("design:paramtypes", [AcademiesService])
], AcademiesController);
export { AcademiesController };
//# sourceMappingURL=academies.controller.js.map