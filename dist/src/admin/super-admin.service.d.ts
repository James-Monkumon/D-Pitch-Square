import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto.js';
import { UpdateAdminPermissionsDto } from './dto/update-admin-permissions.dto.js';
export declare class SuperAdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    /**
     * Create a new ADMIN account.
     *
     * The user, role assignment, and audit entry are created
     * atomically.
     */
    createAdmin(actorUserId: string, dto: CreateAdminDto): Promise<{
        success: boolean;
        message: string;
        data: {
            roles: "ADMIN"[];
            id: string;
            createdAt: Date;
            email: string;
            status: import("@prisma/client").$Enums.UserStatus;
            emailVerifiedAt: Date | null;
            updatedAt: Date;
        };
    }>;
    /**
     * List all users assigned the ADMIN role.
     */
    getAdmins(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            email: string;
            status: import("@prisma/client").$Enums.UserStatus;
            emailVerifiedAt: Date | null;
            roles: import("@prisma/client").$Enums.RoleName[];
            roleAssignments: {
                role: import("@prisma/client").$Enums.RoleName;
                assignedAt: Date;
            }[];
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    /**
     * Suspend an ADMIN.
     *
     * Existing access tokens stop working on the very next
     * request because JwtStrategy reads the user's current
     * database status.
     *
     * Existing refresh tokens are also revoked.
     */
    suspendAdmin(actorUserId: string, targetUserId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            refreshTokensRevoked: number;
            id: string;
            email: string;
            status: import("@prisma/client").$Enums.UserStatus;
            updatedAt: Date;
        };
    }>;
    /**
     * Reactivate a suspended ADMIN.
     *
     * Previously revoked refresh tokens remain revoked.
     */
    reactivateAdmin(actorUserId: string, targetUserId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            email: string;
            status: import("@prisma/client").$Enums.UserStatus;
            updatedAt: Date;
        };
    }>;
    /**
     * Return the current permission set assigned to ADMIN.
     */
    getAdminRolePermissions(): Promise<{
        success: boolean;
        message: string;
        data: {
            roleId: string;
            role: import("@prisma/client").$Enums.RoleName;
            permissions: {
                id: string;
                name: string;
                description: string | null;
            }[];
        };
    }>;
    /**
     * Replace the ADMIN role's permission set.
     *
     * IMPORTANT:
     * RolePermission is role-wide in the current schema.
     * This changes permissions for every ADMIN user.
     */
    updateAdminRolePermissions(actorUserId: string, dto: UpdateAdminPermissionsDto): Promise<{
        success: boolean;
        message: string;
        data: {
            roleId: string;
            role: import("@prisma/client").$Enums.RoleName;
            permissions: {
                id: string;
                name: string;
                description: string | null;
            }[];
        };
    }>;
    getAuditLogs(query: ListAuditLogsDto): Promise<{
        success: boolean;
        message: string;
        data: {
            logs: {
                id: string;
                actorUserId: string;
                actor: {
                    id: string;
                    email: string;
                    roles: import("@prisma/client").$Enums.RoleName[];
                };
                action: string;
                targetType: string | null;
                targetId: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue;
                createdAt: Date;
            }[];
            pagination: {
                total: number;
                limit: number;
                offset: number;
            };
        };
    }>;
    /**
     * ADMIN-management endpoints must never modify a
     * SUPER_ADMIN account.
     *
     * This is deliberately stricter than only checking
     * "last SUPER_ADMIN". No SUPER_ADMIN can be suspended or
     * demoted through these endpoints at all.
     */
    private getManagedAdmin;
}
