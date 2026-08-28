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
import { ScoutsService } from './scouts.service.js';
import { CreateScoutDto } from './dto/create-scout.dto.js';
import { UpdateScoutDto } from './dto/update-scout.dto.js';
import { CreateScoutAchievementDto } from './dto/create-scout-achievement.dto.js';
import { UpdateScoutAchievementDto } from './dto/update-scout-achievement.dto.js';
let ScoutsController = class ScoutsController {
    scoutsService;
    constructor(scoutsService) {
        this.scoutsService = scoutsService;
    }
    // =========================================================
    // PROFILE
    // =========================================================
    createProfile(req, dto) {
        return this.scoutsService.createProfile(req.user.id, dto);
    }
    getMyProfile(req) {
        return this.scoutsService.getMyProfile(req.user.id);
    }
    updateProfile(req, dto) {
        return this.scoutsService.updateProfile(req.user.id, dto);
    }
    deleteProfile(req) {
        return this.scoutsService.deleteProfile(req.user.id);
    }
    // =========================================================
    // ACHIEVEMENTS
    // =========================================================
    createAchievement(req, dto) {
        return this.scoutsService.createAchievement(req.user.id, dto);
    }
    getMyAchievements(req) {
        return this.scoutsService.getMyAchievements(req.user.id);
    }
    updateAchievement(req, achievementId, dto) {
        return this.scoutsService.updateAchievement(req.user.id, achievementId, dto);
    }
    deleteAchievement(req, achievementId) {
        return this.scoutsService.deleteAchievement(req.user.id, achievementId);
    }
    // =========================================================
    // FOLLOW
    // =========================================================
    followScout(req, scoutId) {
        return this.scoutsService.followScout(req.user.id, scoutId);
    }
    unfollowScout(req, scoutId) {
        return this.scoutsService.unfollowScout(req.user.id, scoutId);
    }
    isFollowingScout(req, scoutId) {
        return this.scoutsService.isFollowingScout(req.user.id, scoutId);
    }
    getScoutFollowerCount(scoutId) {
        return this.scoutsService.getScoutFollowerCount(scoutId);
    }
    // =========================================================
    // LIKE
    // =========================================================
    likeScout(req, scoutId) {
        return this.scoutsService.likeScout(req.user.id, scoutId);
    }
    unlikeScout(req, scoutId) {
        return this.scoutsService.unlikeScout(req.user.id, scoutId);
    }
    isScoutLiked(req, scoutId) {
        return this.scoutsService.isScoutLiked(req.user.id, scoutId);
    }
    getScoutLikesCount(scoutId) {
        return this.scoutsService.getScoutLikesCount(scoutId);
    }
    // =========================================================
    // PUBLIC PROFILE
    // =========================================================
    getProfileById(scoutId) {
        return this.scoutsService.getProfileById(scoutId);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateScoutDto]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "createProfile", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "getMyProfile", null);
__decorate([
    Patch('me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateScoutDto]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "updateProfile", null);
__decorate([
    Delete('me'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "deleteProfile", null);
__decorate([
    Post('achievements'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateScoutAchievementDto]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "createAchievement", null);
__decorate([
    Get('achievements'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "getMyAchievements", null);
__decorate([
    Patch('achievements/:achievementId'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateScoutAchievementDto]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "updateAchievement", null);
__decorate([
    Delete('achievements/:achievementId'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "deleteAchievement", null);
__decorate([
    Post(':scoutId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "followScout", null);
__decorate([
    Delete(':scoutId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "unfollowScout", null);
__decorate([
    Get(':scoutId/follow'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "isFollowingScout", null);
__decorate([
    Get(':scoutId/followers/count'),
    __param(0, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "getScoutFollowerCount", null);
__decorate([
    Post(':scoutId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "likeScout", null);
__decorate([
    Delete(':scoutId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "unlikeScout", null);
__decorate([
    Get(':scoutId/like'),
    UseGuards(JwtAuthGuard),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "isScoutLiked", null);
__decorate([
    Get(':scoutId/likes/count'),
    __param(0, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "getScoutLikesCount", null);
__decorate([
    Get(':scoutId'),
    __param(0, Param('scoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScoutsController.prototype, "getProfileById", null);
ScoutsController = __decorate([
    Controller('scouts'),
    __metadata("design:paramtypes", [ScoutsService])
], ScoutsController);
export { ScoutsController };
//# sourceMappingURL=scouts.controller.js.map