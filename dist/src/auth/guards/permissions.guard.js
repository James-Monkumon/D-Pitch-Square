var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from '@prisma/client';
import { PERMISSIONS_KEY, } from '../decorators/permissions.decorator.js';
let PermissionsGuard = class PermissionsGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        /**
         * No @Permissions() decorator means there is
         * nothing for this guard to enforce.
         */
        if (!requiredPermissions ||
            requiredPermissions.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }
        /**
         * SUPER_ADMIN is root authority.
         *
         * This means a newly introduced permission cannot
         * accidentally lock out the root administrator
         * before the RBAC seed is rerun.
         */
        if (user.roles.includes(RoleName.SUPER_ADMIN)) {
            return true;
        }
        const userPermissions = new Set(user.permissions ?? []);
        /**
         * ALL declared permissions are required.
         *
         * Example:
         *
         * @Permissions('a', 'b')
         *
         * means the user must have both a AND b.
         */
        const hasAllPermissions = requiredPermissions.every((permission) => userPermissions.has(permission));
        if (!hasAllPermissions) {
            throw new ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
PermissionsGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], PermissionsGuard);
export { PermissionsGuard };
//# sourceMappingURL=permissions.guard.js.map