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
import { CoachesService } from './coaches.service.js';
import { CreateCoachDto } from './dto/create-coach.dto.js';
import { UpdateCoachDto } from './dto/update-coach.dto.js';
import { CreateCoachAchievementDto } from './dto/create-coach-achievement.dto.js';
import { UpdateCoachAchievementDto } from './dto/update-coach-achievement.dto.js';
let CoachesController = class CoachesController {
    coachesService;
    constructor(coachesService) {
        this.coachesService = coachesService;
    }
    // =========================================================
    // COACH PROFILE
    // =========================================================
    /**
     * Create my Coach profile.
     *
     * POST /api/v1/coaches
     */
    async createProfile(req, dto) {
        return this.coachesService.createProfile(req.user.id, dto);
    }
    /**
     * Get my Coach profile.
     *
     * GET /api/v1/coaches/me
     */
    async getMyProfile(req) {
        return this.coachesService.getMyProfile(req.user.id);
    }
    /**
     * Update my Coach profile.
     *
     * PATCH /api/v1/coaches/me
     */
    async updateProfile(req, dto) {
        return this.coachesService.updateProfile(req.user.id, dto);
    }
    /**
     * Soft-delete my Coach profile.
     *
     * DELETE /api/v1/coaches/me
     */
    async deleteProfile(req) {
        return this.coachesService.deleteProfile(req.user.id);
    }
    // =========================================================
    // COACH ACHIEVEMENTS
    // =========================================================
    /**
     * Create a Coach achievement.
     *
     * POST /api/v1/coaches/achievements
     */
    async createAchievement(req, dto) {
        return this.coachesService.createAchievement(req.user.id, dto);
    }
    /**
     * Get my Coach achievements.
     *
     * GET /api/v1/coaches/achievements
     */
    async getMyAchievements(req) {
        return this.coachesService.getMyAchievements(req.user.id);
    }
    /**
     * Update one of my Coach achievements.
     *
     * PATCH /api/v1/coaches/achievements/:achievementId
     */
    async updateAchievement(req, achievementId, dto) {
        return this.coachesService.updateAchievement(req.user.id, achievementId, dto);
    }
    /**
     * Delete one of my Coach achievements.
     *
     * DELETE /api/v1/coaches/achievements/:achievementId
     */
    async deleteAchievement(req, achievementId) {
        return this.coachesService.deleteAchievement(req.user.id, achievementId);
    }
    // =========================================================
    // COACH FOLLOW
    // =========================================================
    /**
     * Follow Coach.
     *
     * POST /api/v1/coaches/:coachId/follow
     */
    async followCoach(req, coachId) {
        return this.coachesService.followCoach(req.user.id, coachId);
    }
    /**
     * Unfollow Coach.
     *
     * DELETE /api/v1/coaches/:coachId/follow
     */
    async unfollowCoach(req, coachId) {
        return this.coachesService.unfollowCoach(req.user.id, coachId);
    }
    /**
     * Check follow status.
     *
     * GET /api/v1/coaches/:coachId/follow
     */
    async isFollowingCoach(req, coachId) {
        return this.coachesService.isFollowingCoach(req.user.id, coachId);
    }
    /**
     * Get Coach follower count.
     *
     * GET /api/v1/coaches/:coachId/followers/count
     */
    async getCoachFollowerCount(coachId) {
        return this.coachesService.getCoachFollowerCount(coachId);
    }
    // =========================================================
    // COACH LIKE
    // =========================================================
    /**
     * Like Coach.
     *
     * POST /api/v1/coaches/:coachId/like
     */
    async likeCoach(req, coachId) {
        return this.coachesService.likeCoach(req.user.id, coachId);
    }
    /**
     * Unlike Coach.
     *
     * DELETE /api/v1/coaches/:coachId/like
     */
    async unlikeCoach(req, coachId) {
        return this.coachesService.unlikeCoach(req.user.id, coachId);
    }
    /**
     * Check like status.
     *
     * GET /api/v1/coaches/:coachId/like
     */
    async isCoachLiked(req, coachId) {
        return this.coachesService.isCoachLiked(req.user.id, coachId);
    }
    /**
     * Get Coach like count.
     *
     * GET /api/v1/coaches/:coachId/likes/count
     */
    async getCoachLikesCount(coachId) {
        return this.coachesService.getCoachLikesCount(coachId);
    }
    // =========================================================
    // PUBLIC COACH PROFILE
    // =========================================================
    /**
     * Get public Coach profile.
     *
     * GET /api/v1/coaches/:coachId
     */
    async getProfileById(coachId) {
        return this.coachesService.getProfileById(coachId);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateCoachDto]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "createProfile", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "getMyProfile", null);
__decorate([
    Patch('me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateCoachDto]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "updateProfile", null);
__decorate([
    Delete('me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "deleteProfile", null);
__decorate([
    Post('achievements'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateCoachAchievementDto]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "createAchievement", null);
__decorate([
    Get('achievements'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "getMyAchievements", null);
__decorate([
    Patch('achievements/:achievementId'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateCoachAchievementDto]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "updateAchievement", null);
__decorate([
    Delete('achievements/:achievementId'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "deleteAchievement", null);
__decorate([
    Post(':coachId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "followCoach", null);
__decorate([
    Delete(':coachId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "unfollowCoach", null);
__decorate([
    Get(':coachId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "isFollowingCoach", null);
__decorate([
    Get(':coachId/followers/count'),
    __param(0, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "getCoachFollowerCount", null);
__decorate([
    Post(':coachId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "likeCoach", null);
__decorate([
    Delete(':coachId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "unlikeCoach", null);
__decorate([
    Get(':coachId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "isCoachLiked", null);
__decorate([
    Get(':coachId/likes/count'),
    __param(0, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "getCoachLikesCount", null);
__decorate([
    Get(':coachId'),
    __param(0, Param('coachId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoachesController.prototype, "getProfileById", null);
CoachesController = __decorate([
    Controller('coaches'),
    __metadata("design:paramtypes", [CoachesService])
], CoachesController);
export { CoachesController };
//# sourceMappingURL=coaches.controller.js.map