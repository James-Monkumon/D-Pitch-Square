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
import { Body, Controller, Param, Patch, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { AdminService } from './admin.service.js';
import { UpdateVerificationDto } from './dto/update-verification.dto.js';
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    verifyPlayer(playerId, dto) {
        return this.adminService.verifyPlayer(playerId, dto.verificationStatus);
    }
    verifyAcademy(academyId, dto) {
        return this.adminService.verifyAcademy(academyId, dto.verificationStatus);
    }
    verifyScout(scoutId, dto) {
        return this.adminService.verifyScout(scoutId, dto.verificationStatus);
    }
    verifyCoach(coachId, dto) {
        return this.adminService.verifyCoach(coachId, dto.verificationStatus);
    }
};
__decorate([
    Patch('players/:playerId/verification'),
    __param(0, Param('playerId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyPlayer", null);
__decorate([
    Patch('academies/:academyId/verification'),
    __param(0, Param('academyId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyAcademy", null);
__decorate([
    Patch('scouts/:scoutId/verification'),
    __param(0, Param('scoutId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyScout", null);
__decorate([
    Patch('coaches/:coachId/verification'),
    __param(0, Param('coachId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verifyCoach", null);
AdminController = __decorate([
    Controller('admin'),
    UseGuards(JwtAuthGuard, RolesGuard),
    __metadata("design:paramtypes", [AdminService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map