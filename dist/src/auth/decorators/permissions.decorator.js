import { SetMetadata } from '@nestjs/common';
export const PERMISSIONS_KEY = 'rbac_permissions';
export const Permissions = (...permissions) => SetMetadata(PERMISSIONS_KEY, permissions);
//# sourceMappingURL=permissions.decorator.js.map