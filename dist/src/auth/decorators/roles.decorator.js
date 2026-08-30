import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'rbac_roles';
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
//# sourceMappingURL=roles.decorator.js.map