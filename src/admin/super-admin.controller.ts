import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RoleName } from '@prisma/client';

import {
  Roles,
} from '../auth/decorators/roles.decorator.js';

import {
  JwtAuthGuard,
} from '../auth/guards/jwt-auth.guard.js';

import {
  RolesGuard,
} from '../auth/guards/roles.guard.js';

import {
  CreateAdminDto,
} from './dto/create-admin.dto.js';

import {
  ListAuditLogsDto,
} from './dto/list-audit-logs.dto.js';

import {
  UpdateAdminPermissionsDto,
} from './dto/update-admin-permissions.dto.js';

import {
  SuperAdminService,
} from './super-admin.service.js';

interface AuthenticatedRequest {
  user: {
    id: string;
    email: string;
  };
}

@Controller('super-admin')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(
  RoleName.SUPER_ADMIN,
)
export class SuperAdminController {
  constructor(
    private readonly superAdminService:
      SuperAdminService,
  ) {}

  // =========================================================
  // ADMIN USERS
  // =========================================================

  /**
   * POST /api/v1/super-admin/admins
   */
  @Post('admins')
  createAdmin(
    @Req()
    request:
      AuthenticatedRequest,

    @Body()
    dto:
      CreateAdminDto,
  ) {
    return this.superAdminService
      .createAdmin(
        request.user.id,
        dto,
      );
  }

  /**
   * GET /api/v1/super-admin/admins
   */
  @Get('admins')
  getAdmins() {
    return this.superAdminService
      .getAdmins();
  }

  /**
   * PATCH
   * /api/v1/super-admin/admins/:userId/suspend
   */
  @Patch(
    'admins/:userId/suspend',
  )
  suspendAdmin(
    @Req()
    request:
      AuthenticatedRequest,

    @Param('userId')
    userId: string,
  ) {
    return this.superAdminService
      .suspendAdmin(
        request.user.id,
        userId,
      );
  }

  /**
   * PATCH
   * /api/v1/super-admin/admins/:userId/reactivate
   */
  @Patch(
    'admins/:userId/reactivate',
  )
  reactivateAdmin(
    @Req()
    request:
      AuthenticatedRequest,

    @Param('userId')
    userId: string,
  ) {
    return this.superAdminService
      .reactivateAdmin(
        request.user.id,
        userId,
      );
  }

  // =========================================================
  // ADMIN ROLE PERMISSIONS
  // =========================================================

  /**
   * GET
   * /api/v1/super-admin/admin-role/permissions
   */
  @Get(
    'admin-role/permissions',
  )
  getAdminRolePermissions() {
    return this.superAdminService
      .getAdminRolePermissions();
  }

  /**
   * PUT
   * /api/v1/super-admin/admin-role/permissions
   */
  @Put(
    'admin-role/permissions',
  )
  updateAdminRolePermissions(
    @Req()
    request:
      AuthenticatedRequest,

    @Body()
    dto:
      UpdateAdminPermissionsDto,
  ) {
    return this.superAdminService
      .updateAdminRolePermissions(
        request.user.id,
        dto,
      );
  }

  // =========================================================
  // AUDIT LOG
  // =========================================================

  /**
   * GET /api/v1/super-admin/audit-logs
   */
  @Get('audit-logs')
  getAuditLogs(
    @Query()
    query:
      ListAuditLogsDto,
  ) {
    return this.superAdminService
      .getAuditLogs(query);
  }
}