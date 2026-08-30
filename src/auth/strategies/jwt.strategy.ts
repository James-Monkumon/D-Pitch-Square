import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserStatus } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service.js';

interface JwtPayload {
  sub: string;
  email: string;
  roles?: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey:
        config.getOrThrow<string>(
          'JWT_ACCESS_SECRET',
        ),
    });
  }

  async validate(payload: JwtPayload) {
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
      throw new UnauthorizedException(
        'User account no longer exists',
      );
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException(
       'User account is suspended',
  );
}

    const roles = user.roles.map(
      (userRole) => userRole.role.name,
    );

    /**
     * A Set prevents duplicate permissions when multiple
     * roles grant the same permission.
     */
    const permissionSet = new Set<string>();

    for (const userRole of user.roles) {
      for (
        const rolePermission
        of userRole.role.permissions
      ) {
        permissionSet.add(
          rolePermission.permission.name,
        );
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
}