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
import { Body, Controller, Get, Param, Patch, Post, Put, Query, Req, UseGuards, } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { Roles, } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard, } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard, } from '../auth/guards/roles.guard.js';
import { CreateAdminDto, } from './dto/create-admin.dto.js';
import { ListAuditLogsDto, } from './dto/list-audit-logs.dto.js';
import { UpdateAdminPermissionsDto, } from './dto/update-admin-permissions.dto.js';
import { SuperAdminService, } from './super-admin.service.js';
let SuperAdminController = class SuperAdminController {
    superAdminService;
    constructor(superAdminService) {
        this.superAdminService = superAdminService;
    }
    // =========================================================
    // ADMIN USERS
    // =========================================================
    /**
     * POST /api/v1/super-admin/admins
     */
    createAdmin(request, dto) {
        return this.superAdminService
            .createAdmin(request.user.id, dto);
    }
    /**
     * GET /api/v1/super-admin/admins
     */
    getAdmins() {
        return this.superAdminService
            .getAdmins();
    }
    /**
     * PATCH
     * /api/v1/super-admin/admins/:userId/suspend
     */
    suspendAdmin(request, userId) {
        return this.superAdminService
            .suspendAdmin(request.user.id, userId);
    }
    /**
     * PATCH
     * /api/v1/super-admin/admins/:userId/reactivate
     */
    reactivateAdmin(request, userId) {
        return this.superAdminService
            .reactivateAdmin(request.user.id, userId);
    }
    // =========================================================
    // ADMIN ROLE PERMISSIONS
    // =========================================================
    /**
     * GET
     * /api/v1/super-admin/admin-role/permissions
     */
    getAdminRolePermissions() {
        return this.superAdminService
            .getAdminRolePermissions();
    }
    /**
     * PUT
     * /api/v1/super-admin/admin-role/permissions
     */
    updateAdminRolePermissions(request, dto) {
        return this.superAdminService
            .updateAdminRolePermissions(request.user.id, dto);
    }
    // =========================================================
    // AUDIT LOG
    // =========================================================
    /**
     * GET /api/v1/super-admin/audit-logs
     */
    getAuditLogs(query) {
        return this.superAdminService
            .getAuditLogs(query);
    }
};
__decorate([
    Post('admins'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateAdminDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "createAdmin", null);
__decorate([
    Get('admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getAdmins", null);
__decorate([
    Patch('admins/:userId/suspend'),
    __param(0, Req()),
    __param(1, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "suspendAdmin", null);
__decorate([
    Patch('admins/:userId/reactivate'),
    __param(0, Req()),
    __param(1, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "reactivateAdmin", null);
__decorate([
    Get('admin-role/permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getAdminRolePermissions", null);
__decorate([
    Put('admin-role/permissions'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateAdminPermissionsDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "updateAdminRolePermissions", null);
__decorate([
    Get('audit-logs'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListAuditLogsDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getAuditLogs", null);
SuperAdminController = __decorate([
    Controller('super-admin'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(RoleName.SUPER_ADMIN),
    __metadata("design:paramtypes", [SuperAdminService])
], SuperAdminController);
export { SuperAdminController };
//# sourceMappingURL=super-admin.controller.js.map