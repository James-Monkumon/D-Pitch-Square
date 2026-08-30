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
import { Body, Controller, Get, Param, Patch, Req, UseGuards, } from '@nestjs/common';
import { Permissions } from '../auth/decorators/permissions.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PermissionsGuard } from '../auth/guards/permissions.guard.js';
import { AdminService } from './admin.service.js';
import { UpdateVerificationDto, } from './dto/update-verification.dto.js';
import { UpdateAchievementVerificationDto, } from './dto/update-achievement-verification.dto.js';
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    // =========================================================
    // PENDING VERIFICATIONS
    // =========================================================
    /**
     * GET /api/v1/admin/verifications/profiles
     */
    getPendingProfileVerifications() {
        return this.adminService
            .getPendingProfileVerifications();
    }
    /**
     * GET /api/v1/admin/verifications/achievements
     */
    getPendingAchievementVerifications() {
        return this.adminService
            .getPendingAchievementVerifications();
    }
    // =========================================================
    // PROFILE VERIFICATION
    // =========================================================
    /**
     * PATCH /api/v1/admin/players/:playerId/verification
     */
    verifyPlayer(req, playerId, dto) {
        return this.adminService.verifyPlayer(req.user.id, playerId, dto.verificationStatus);
    }
    /**
     * PATCH /api/v1/admin/academies/:academyId/verification
     */
    verifyAcademy(req, academyId, dto) {
        return this.adminService.verifyAcademy(req.user.id, academyId, dto.verificationStatus);
    }
    /**
     * PATCH /api/v1/admin/scouts/:scoutId/verification
     */
    verifyScout(req, scoutId, dto) {
        return this.adminService.verifyScout(req.user.id, scoutId, dto.verificationStatus);
    }
    /**
     * PATCH /api/v1/admin/coaches/:coachId/verification
     */
    verifyCoach(req, coachId, dto) {
        return this.adminService.verifyCoach(req.user.id, coachId, dto.verificationStatus);
    }
    // =========================================================
    // ACHIEVEMENT VERIFICATION
    // =========================================================
    /**
     * PATCH
     * /api/v1/admin/achievements/:achievementId/verification
     */
    verifyAchievement(req, achievementId, dto) {
        return this.adminService
            .verifyAchievement(req.user.id, achievementId, dto.verificationStatus);
    }
};
__decorate([
    Get('verifications/profiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingProfileVerifications", null);
__decorate([
    Get('verifications/achievements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPendingAchievementVerifications", null);
__decorate([
    Patch('players/:playerId/verification'),
    __param(0, Req()),
    __param(1, Param('playerId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyPlayer", null);
__decorate([
    Patch('academies/:academyId/verification'),
    __param(0, Req()),
    __param(1, Param('academyId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyAcademy", null);
__decorate([
    Patch('scouts/:scoutId/verification'),
    __param(0, Req()),
    __param(1, Param('scoutId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyScout", null);
__decorate([
    Patch('coaches/:coachId/verification'),
    __param(0, Req()),
    __param(1, Param('coachId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyCoach", null);
__decorate([
    Patch('achievements/:achievementId/verification'),
    __param(0, Req()),
    __param(1, Param('achievementId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateAchievementVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyAchievement", null);
AdminController = __decorate([
    Controller('admin'),
    UseGuards(JwtAuthGuard, PermissionsGuard),
    Permissions('verification.review'),
    __metadata("design:paramtypes", [AdminService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map