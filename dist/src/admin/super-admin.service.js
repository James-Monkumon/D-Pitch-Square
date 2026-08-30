var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { RoleName, UserStatus, } from '@prisma/client';
import argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service.js';
/**
 * These permissions belong to root-level administration.
 *
 * Even though SUPER_ADMIN may change the ordinary ADMIN
 * permission set, these permissions must never be granted
 * to ADMIN.
 */
const ROOT_ONLY_PERMISSIONS = new Set([
    'admin.user.manage',
    'admin.permissions.manage',
]);
let SuperAdminService = class SuperAdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // =========================================================
    // ADMIN USERS
    // =========================================================
    /**
     * Create a new ADMIN account.
     *
     * The user, role assignment, and audit entry are created
     * atomically.
     */
    async createAdmin(actorUserId, dto) {
        const email = dto.email.trim().toLowerCase();
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (existingUser) {
            throw new ConflictException('A user with this email already exists');
        }
        const adminRole = await this.prisma.role.findUnique({
            where: {
                name: RoleName.ADMIN,
            },
        });
        if (!adminRole) {
            throw new NotFoundException('ADMIN role does not exist');
        }
        const passwordHash = await argon2.hash(dto.password);
        const admin = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    status: UserStatus.ACTIVE,
                    /**
                     * This account is provisioned directly
                     * by SUPER_ADMIN, so it is considered
                     * administratively verified.
                     */
                    emailVerifiedAt: new Date(),
                },
                select: {
                    id: true,
                    email: true,
                    status: true,
                    emailVerifiedAt: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            await tx.userRole.create({
                data: {
                    userId: user.id,
                    roleId: adminRole.id,
                },
            });
            await tx.adminAuditLog.create({
                data: {
                    actorUserId,
                    action: 'ADMIN_CREATED',
                    targetType: 'USER',
                    targetId: user.id,
                    metadata: {
                        email: user.email,
                        assignedRole: RoleName.ADMIN,
                    },
                },
            });
            return user;
        });
        return {
            success: true,
            message: 'Admin created successfully',
            data: {
                ...admin,
                roles: [
                    RoleName.ADMIN,
                ],
            },
        };
    }
    /**
     * List all users assigned the ADMIN role.
     */
    async getAdmins() {
        const admins = await this.prisma.user.findMany({
            where: {
                roles: {
                    some: {
                        role: {
                            name: RoleName.ADMIN,
                        },
                    },
                },
            },
            select: {
                id: true,
                email: true,
                status: true,
                emailVerifiedAt: true,
                createdAt: true,
                updatedAt: true,
                roles: {
                    select: {
                        assignedAt: true,
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return {
            success: true,
            message: 'Admins retrieved successfully',
            data: admins.map((admin) => ({
                id: admin.id,
                email: admin.email,
                status: admin.status,
                emailVerifiedAt: admin.emailVerifiedAt,
                roles: admin.roles.map((userRole) => userRole.role.name),
                roleAssignments: admin.roles.map((userRole) => ({
                    role: userRole.role.name,
                    assignedAt: userRole.assignedAt,
                })),
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            })),
        };
    }
    /**
     * Suspend an ADMIN.
     *
     * Existing access tokens stop working on the very next
     * request because JwtStrategy reads the user's current
     * database status.
     *
     * Existing refresh tokens are also revoked.
     */
    async suspendAdmin(actorUserId, targetUserId) {
        const target = await this.getManagedAdmin(targetUserId);
        if (target.status ===
            UserStatus.SUSPENDED) {
            throw new BadRequestException('Admin is already suspended');
        }
        const now = new Date();
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({
                where: {
                    id: target.id,
                },
                data: {
                    status: UserStatus.SUSPENDED,
                },
                select: {
                    id: true,
                    email: true,
                    status: true,
                    updatedAt: true,
                },
            });
            const revokedTokens = await tx.refreshToken.updateMany({
                where: {
                    userId: target.id,
                    revokedAt: null,
                },
                data: {
                    revokedAt: now,
                },
            });
            await tx.adminAuditLog.create({
                data: {
                    actorUserId,
                    action: 'ADMIN_SUSPENDED',
                    targetType: 'USER',
                    targetId: target.id,
                    metadata: {
                        email: target.email,
                        previousStatus: target.status,
                        newStatus: UserStatus.SUSPENDED,
                        refreshTokensRevoked: revokedTokens.count,
                    },
                },
            });
            return {
                updatedUser,
                revokedTokens: revokedTokens.count,
            };
        });
        return {
            success: true,
            message: 'Admin suspended successfully',
            data: {
                ...result.updatedUser,
                refreshTokensRevoked: result.revokedTokens,
            },
        };
    }
    /**
     * Reactivate a suspended ADMIN.
     *
     * Previously revoked refresh tokens remain revoked.
     */
    async reactivateAdmin(actorUserId, targetUserId) {
        const target = await this.getManagedAdmin(targetUserId);
        if (target.status !==
            UserStatus.SUSPENDED) {
            throw new BadRequestException('Admin is not suspended');
        }
        const updatedAdmin = await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.update({
                where: {
                    id: target.id,
                },
                data: {
                    status: UserStatus.ACTIVE,
                },
                select: {
                    id: true,
                    email: true,
                    status: true,
                    updatedAt: true,
                },
            });
            await tx.adminAuditLog.create({
                data: {
                    actorUserId,
                    action: 'ADMIN_REACTIVATED',
                    targetType: 'USER',
                    targetId: target.id,
                    metadata: {
                        email: target.email,
                        previousStatus: target.status,
                        newStatus: UserStatus.ACTIVE,
                    },
                },
            });
            return user;
        });
        return {
            success: true,
            message: 'Admin reactivated successfully',
            data: updatedAdmin,
        };
    }
    // =========================================================
    // ADMIN ROLE PERMISSIONS
    // =========================================================
    /**
     * Return the current permission set assigned to ADMIN.
     */
    async getAdminRolePermissions() {
        const adminRole = await this.prisma.role.findUnique({
            where: {
                name: RoleName.ADMIN,
            },
            select: {
                id: true,
                name: true,
                permissions: {
                    select: {
                        permission: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
        if (!adminRole) {
            throw new NotFoundException('ADMIN role does not exist');
        }
        const permissions = adminRole.permissions
            .map((rolePermission) => rolePermission.permission)
            .sort((a, b) => a.name.localeCompare(b.name));
        return {
            success: true,
            message: 'Admin role permissions retrieved successfully',
            data: {
                roleId: adminRole.id,
                role: adminRole.name,
                permissions,
            },
        };
    }
    /**
     * Replace the ADMIN role's permission set.
     *
     * IMPORTANT:
     * RolePermission is role-wide in the current schema.
     * This changes permissions for every ADMIN user.
     */
    async updateAdminRolePermissions(actorUserId, dto) {
        const requestedNames = [
            ...new Set(dto.permissions),
        ];
        const forbiddenPermissions = requestedNames.filter((permission) => ROOT_ONLY_PERMISSIONS.has(permission));
        if (forbiddenPermissions.length > 0) {
            throw new BadRequestException(`The following permissions are reserved for SUPER_ADMIN: ${forbiddenPermissions.join(', ')}`);
        }
        const adminRole = await this.prisma.role.findUnique({
            where: {
                name: RoleName.ADMIN,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
        if (!adminRole) {
            throw new NotFoundException('ADMIN role does not exist');
        }
        const permissions = await this.prisma.permission.findMany({
            where: {
                name: {
                    in: requestedNames,
                },
            },
        });
        if (permissions.length !==
            requestedNames.length) {
            const foundNames = new Set(permissions.map((permission) => permission.name));
            const missing = requestedNames.filter((permission) => !foundNames.has(permission));
            throw new BadRequestException(`Unknown permissions: ${missing.join(', ')}`);
        }
        const previousPermissions = adminRole.permissions
            .map((rolePermission) => rolePermission
            .permission
            .name)
            .sort();
        await this.prisma.$transaction(async (tx) => {
            await tx.rolePermission.deleteMany({
                where: {
                    roleId: adminRole.id,
                },
            });
            if (permissions.length > 0) {
                await tx.rolePermission.createMany({
                    data: permissions.map((permission) => ({
                        roleId: adminRole.id,
                        permissionId: permission.id,
                    })),
                });
            }
            await tx.adminAuditLog.create({
                data: {
                    actorUserId,
                    action: 'ADMIN_PERMISSIONS_UPDATED',
                    targetType: 'ROLE',
                    targetId: adminRole.id,
                    metadata: {
                        role: RoleName.ADMIN,
                        previousPermissions,
                        newPermissions: requestedNames
                            .slice()
                            .sort(),
                    },
                },
            });
        });
        return this
            .getAdminRolePermissions();
    }
    // =========================================================
    // AUDIT LOGS
    // =========================================================
    async getAuditLogs(query) {
        const where = {
            ...(query.action
                ? {
                    action: query.action,
                }
                : {}),
            ...(query.targetType
                ? {
                    targetType: query.targetType,
                }
                : {}),
            ...(query.targetId
                ? {
                    targetId: query.targetId,
                }
                : {}),
            ...(query.actorUserId
                ? {
                    actorUserId: query.actorUserId,
                }
                : {}),
        };
        const [logs, total,] = await this.prisma.$transaction([
            this.prisma.adminAuditLog.findMany({
                where,
                skip: query.offset,
                take: query.limit,
                select: {
                    id: true,
                    actorUserId: true,
                    action: true,
                    targetType: true,
                    targetId: true,
                    metadata: true,
                    createdAt: true,
                    actor: {
                        select: {
                            id: true,
                            email: true,
                            roles: {
                                select: {
                                    role: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.adminAuditLog.count({
                where,
            }),
        ]);
        return {
            success: true,
            message: 'Admin audit logs retrieved successfully',
            data: {
                logs: logs.map((log) => ({
                    id: log.id,
                    actorUserId: log.actorUserId,
                    actor: {
                        id: log.actor.id,
                        email: log.actor.email,
                        roles: log.actor.roles.map((userRole) => userRole
                            .role
                            .name),
                    },
                    action: log.action,
                    targetType: log.targetType,
                    targetId: log.targetId,
                    metadata: log.metadata,
                    createdAt: log.createdAt,
                })),
                pagination: {
                    total,
                    limit: query.limit,
                    offset: query.offset,
                },
            },
        };
    }
    // =========================================================
    // INTERNAL ADMIN TARGET VALIDATION
    // =========================================================
    /**
     * ADMIN-management endpoints must never modify a
     * SUPER_ADMIN account.
     *
     * This is deliberately stricter than only checking
     * "last SUPER_ADMIN". No SUPER_ADMIN can be suspended or
     * demoted through these endpoints at all.
     */
    async getManagedAdmin(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
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
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const roles = user.roles.map((userRole) => userRole.role.name);
        if (roles.includes(RoleName.SUPER_ADMIN)) {
            throw new BadRequestException('SUPER_ADMIN accounts cannot be modified through ADMIN management endpoints');
        }
        if (!roles.includes(RoleName.ADMIN)) {
            throw new BadRequestException('Target user is not an ADMIN');
        }
        return user;
    }
};
SuperAdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SuperAdminService);
export { SuperAdminService };
//# sourceMappingURL=super-admin.service.js.map