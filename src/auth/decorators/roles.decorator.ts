import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@prisma/client';

export const ROLES_KEY = 'rbac_roles';

export const Roles = (...roles: RoleName[]) =>
  SetMetadata(ROLES_KEY, roles);