import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from '@prisma/client';

import {
  ROLES_KEY,
} from '../decorators/roles.decorator.js';

interface AuthenticatedUser {
  id: string;
  email: string;
  roles: RoleName[];
  permissions: string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<
        RoleName[]
      >(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    /**
     * No @Roles() decorator means this guard has no
     * role restriction to enforce.
     */
    if (
      !requiredRoles ||
      requiredRoles.length === 0
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

    const hasRequiredRole =
      requiredRoles.some(
        (requiredRole) =>
          user.roles.includes(requiredRole),
      );

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        'Insufficient role',
      );
    }

    return true;
  }
}