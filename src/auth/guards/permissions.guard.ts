import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from '@prisma/client';

import {
  PERMISSIONS_KEY,
} from '../decorators/permissions.decorator.js';

interface AuthenticatedUser {
  id: string;
  email: string;
  roles: RoleName[];
  permissions: string[];
}

@Injectable()
export class PermissionsGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredPermissions =
      this.reflector.getAllAndOverride<
        string[]
      >(
        PERMISSIONS_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    /**
     * No @Permissions() decorator means there is
     * nothing for this guard to enforce.
     */
    if (
      !requiredPermissions ||
      requiredPermissions.length === 0
    ) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user =
      request.user as
        | AuthenticatedUser
        | undefined;

    if (!user) {
      throw new ForbiddenException(
        'User not authenticated',
      );
    }

    /**
     * SUPER_ADMIN is root authority.
     *
     * This means a newly introduced permission cannot
     * accidentally lock out the root administrator
     * before the RBAC seed is rerun.
     */
    if (
      user.roles.includes(
        RoleName.SUPER_ADMIN,
      )
    ) {
      return true;
    }

    const userPermissions =
      new Set(user.permissions ?? []);

    /**
     * ALL declared permissions are required.
     *
     * Example:
     *
     * @Permissions('a', 'b')
     *
     * means the user must have both a AND b.
     */
    const hasAllPermissions =
      requiredPermissions.every(
        (permission) =>
          userPermissions.has(permission),
      );

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        'Insufficient permissions',
      );
    }

    return true;
  }
}