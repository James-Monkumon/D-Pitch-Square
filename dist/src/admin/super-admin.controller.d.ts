import { CreateAdminDto } from './dto/create-admin.dto.js';
import { ListAuditLogsDto } from './dto/list-audit-logs.dto.js';
import { UpdateAdminPermissionsDto } from './dto/update-admin-permissions.dto.js';
import { SuperAdminService } from './super-admin.service.js';
interface AuthenticatedRequest {
    user: {
        id: string;
        email: string;
    };
}
export declare class SuperAdminController {
    private readonly superAdminService;
    constructor(superAdminService: SuperAdminService);
    /**
     * POST /api/v1/super-admin/admins
     */
    createAdmin(request: AuthenticatedRequest, dto: CreateAdminDto): Promise<{
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
     * GET /api/v1/super-admin/admins
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
     * PATCH
     * /api/v1/super-admin/admins/:userId/suspend
     */
    suspendAdmin(request: AuthenticatedRequest, userId: string): Promise<{
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
     * PATCH
     * /api/v1/super-admin/admins/:userId/reactivate
     */
    reactivateAdmin(request: AuthenticatedRequest, userId: string): Promise<{
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
     * GET
     * /api/v1/super-admin/admin-role/permissions
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
     * PUT
     * /api/v1/super-admin/admin-role/permissions
     */
    updateAdminRolePermissions(request: AuthenticatedRequest, dto: UpdateAdminPermissionsDto): Promise<{
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
     * GET /api/v1/super-admin/audit-logs
     */
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
}
export {};
