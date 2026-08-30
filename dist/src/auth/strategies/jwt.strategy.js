var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserStatus } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
let JwtStrategy = class JwtStrategy extends PassportStrategy(Strategy) {
    prisma;
    constructor(config, prisma) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow('JWT_ACCESS_SECRET'),
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        /**
         * The JWT establishes identity, but we deliberately
         * do NOT trust payload.roles for authorization.
         *
         * Roles and permissions are loaded from the database
         * so authorization changes take effect immediately.
         */
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
            select: {
                id: true,
                email: true,
                status: true,
                roles: {
                    select: {
                        role: {
                            select: {
                                name: true,
                                permissions: {
                                    select: {
                                        permission: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new UnauthorizedException('User account no longer exists');
        }
        if (user.status === UserStatus.SUSPENDED) {
            throw new UnauthorizedException('User account is suspended');
        }
        const roles = user.roles.map((userRole) => userRole.role.name);
        /**
         * A Set prevents duplicate permissions when multiple
         * roles grant the same permission.
         */
        const permissionSet = new Set();
        for (const userRole of user.roles) {
            for (const rolePermission of userRole.role.permissions) {
                permissionSet.add(rolePermission.permission.name);
            }
        }
        const permissions = [...permissionSet];
        /**
         * This becomes request.user.
         */
        return {
            id: user.id,
            email: user.email,
            roles,
            permissions,
        };
    }
};
JwtStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        PrismaService])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=jwt.strategy.js.map