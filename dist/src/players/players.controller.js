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
import { PlayersService } from './players.service.js';
import { CreatePlayerDto } from './dto/create-player.dto.js';
import { UpdatePlayerDto } from './dto/update-player.dto.js';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto.js';
import { CreateAchievementDto } from './dto/create-achievement.dto.js';
import { UpdateAchievementDto } from './dto/update-achievement.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
let PlayersController = class PlayersController {
    playersService;
    constructor(playersService) {
        this.playersService = playersService;
    }
    // =========================================================
    // PLAYER PROFILE
    // =========================================================
    /**
     * Create or restore my player profile.
     *
     * POST /players/profile
     */
    async createProfile(req, dto) {
        return this.playersService.createProfile(req.user.id, dto);
    }
    /**
     * Get my player profile.
     *
     * GET /players/profile
     */
    async getMyProfile(req) {
        return this.playersService.getMyProfile(req.user.id);
    }
    /**
     * Explicit /me alias.
     *
     * GET /players/profile/me
     */
    async getMyProfileMe(req) {
        return this.playersService.getMyProfile(req.user.id);
    }
    /**
     * Update my player profile.
     *
     * PATCH /players/profile
     */
    async updateProfile(req, dto) {
        return this.playersService.updateProfile(req.user.id, dto);
    }
    /**
     * Soft-delete my player profile.
     *
     * DELETE /players/profile
     */
    async deleteProfile(req) {
        return this.playersService.deleteProfile(req.user.id);
    }
    // =========================================================
    // PLAYER STATISTICS
    // =========================================================
    /**
     * Create/update player statistics.
     *
     * PATCH /players/statistics
     */
    async updateStatistics(req, dto) {
        return this.playersService.updateStatistics(req.user.id, dto);
    }
    // =========================================================
    // PLAYER ACHIEVEMENTS
    // =========================================================
    /**
     * Create player achievement.
     *
     * POST /players/achievements
     */
    async createAchievement(req, dto) {
        return this.playersService.createAchievement(req.user.id, dto);
    }
    /**
     * Get all my achievements.
     *
     * GET /players/achievements
     */
    async getMyAchievements(req) {
        return this.playersService.getMyAchievements(req.user.id);
    }
    /**
     * Update one of my achievements.
     *
     * PATCH /players/achievements/:achievementId
     */
    async updateAchievement(req, achievementId, dto) {
        return this.playersService.updateAchievement(req.user.id, achievementId, dto);
    }
    /**
     * Delete one of my achievements.
     *
     * DELETE /players/achievements/:achievementId
     */
    async deleteAchievement(req, achievementId) {
        return this.playersService.deleteAchievement(req.user.id, achievementId);
    }
    // =========================================================
    // PLAYER FOLLOW
    // =========================================================
    /**
     * Follow player.
     *
     * POST /players/:playerId/follow
     */
    async followPlayer(req, playerId) {
        return this.playersService.followPlayer(req.user.id, playerId);
    }
    /**
     * Unfollow player.
     *
     * DELETE /players/:playerId/follow
     */
    async unfollowPlayer(req, playerId) {
        return this.playersService.unfollowPlayer(req.user.id, playerId);
    }
    /**
     * Check follow status.
     *
     * GET /players/:playerId/follow
     */
    async isFollowingPlayer(req, playerId) {
        return this.playersService.isFollowingPlayer(req.user.id, playerId);
    }
    /**
     * Get follower count.
     *
     * GET /players/:playerId/followers/count
     */
    async getPlayerFollowerCount(playerId) {
        return this.playersService.getPlayerFollowerCount(playerId);
    }
    // =========================================================
    // PLAYER LIKE
    // =========================================================
    /**
     * Like player.
     *
     * POST /players/:playerId/like
     */
    async likePlayer(req, playerId) {
        return this.playersService.likePlayer(req.user.id, playerId);
    }
    /**
     * Unlike player.
     *
     * DELETE /players/:playerId/like
     */
    async unlikePlayer(req, playerId) {
        return this.playersService.unlikePlayer(req.user.id, playerId);
    }
    /**
     * Check like status.
     *
     * GET /players/:playerId/like
     */
    async isPlayerLiked(req, playerId) {
        return this.playersService.isPlayerLiked(req.user.id, playerId);
    }
    /**
     * Get total player likes.
     *
     * GET /players/:playerId/likes/count
     */
    async getPlayerLikesCount(playerId) {
        return this.playersService.getPlayerLikesCount(playerId);
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
    async getPlayerById(playerId) {
        return this.playersService.getPlayerById(playerId);
    }
};
__decorate([
    Post('profile'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePlayerDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "createProfile", null);
__decorate([
    Get('profile'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getMyProfile", null);
__decorate([
    Get('profile/me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getMyProfileMe", null);
__decorate([
    Patch('profile'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdatePlayerDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updateProfile", null);
__decorate([
    Delete('profile'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deleteProfile", null);
__decorate([
    Patch('statistics'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdatePlayerStatisticsDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updateStatistics", null);
__decorate([
    Post('achievements'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateAchievementDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "createAchievement", null);
__decorate([
    Get('achievements'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getMyAchievements", null);
__decorate([
    Patch('achievements/:achievementId'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateAchievementDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updateAchievement", null);
__decorate([
    Delete('achievements/:achievementId'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deleteAchievement", null);
__decorate([
    Post(':playerId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "followPlayer", null);
__decorate([
    Delete(':playerId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "unfollowPlayer", null);
__decorate([
    Get(':playerId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "isFollowingPlayer", null);
__decorate([
    Get(':playerId/followers/count'),
    __param(0, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayerFollowerCount", null);
__decorate([
    Post(':playerId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "likePlayer", null);
__decorate([
    Delete(':playerId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "unlikePlayer", null);
__decorate([
    Get(':playerId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "isPlayerLiked", null);
__decorate([
    Get(':playerId/likes/count'),
    __param(0, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayerLikesCount", null);
__decorate([
    Get(':playerId'),
    __param(0, Param('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayerById", null);
PlayersController = __decorate([
    Controller('players'),
    __metadata("design:paramtypes", [PlayersService])
], PlayersController);
export { PlayersController };
//# sourceMappingURL=players.controller.js.map