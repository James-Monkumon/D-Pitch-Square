import { RoleName } from '@prisma/client';
export declare const ROLES_KEY = "rbac_roles";
export declare const Roles: (...roles: RoleName[]) => import("@nestjs/common").CustomDecorator<string>;
