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
        data: any;
    }>;
    /**
     * List all users assigned the ADMIN role.
     */
    getAdmins(): Promise<{
        success: boolean;
        message: string;
        data: any;
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
        data: any;
    }>;
    /**
     * Reactivate a suspended ADMIN.
     *
     * Previously revoked refresh tokens remain revoked.
     */
    reactivateAdmin(actorUserId: string, targetUserId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Return the current permission set assigned to ADMIN.
     */
    getAdminRolePermissions(): Promise<{
        success: boolean;
        message: string;
        data: {
            roleId: any;
            role: any;
            permissions: any;
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
            roleId: any;
            role: any;
            permissions: any;
        };
    }>;
    getAuditLogs(query: ListAuditLogsDto): Promise<{
        success: boolean;
        message: string;
        data: {
            logs: any;
            pagination: {
                total: any;
                limit: any;
                offset: any;
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
