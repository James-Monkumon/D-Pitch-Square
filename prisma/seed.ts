import {
  PrismaClient,
  RoleName,
} from '@prisma/client';

const prisma = new PrismaClient();

/**
 * --------------------------------------------------
 * PLATFORM PERMISSIONS
 * --------------------------------------------------
 *
 * This file seeds RBAC configuration only.
 *
 * IMPORTANT:
 * - It does NOT create users.
 * - It does NOT create a SUPER_ADMIN account.
 * - It does NOT modify passwords.
 *
 * The initial SUPER_ADMIN is created separately by:
 *
 *   scripts/bootstrap-super-admin.js
 */

const permissions = [
  'user.read',
  'user.update',

  'player.read',
  'player.update',

  'academy.read',
  'academy.update',

  'scout.read',
  'scout.update',

  'coach.read',
  'coach.update',

  'team.read',
  'team.manage',

  'training.read',
  'training.manage',

  'development.read',
  'development.manage',

  'media.read',
  'media.manage',

  'message.read',
  'message.send',

  'verification.request',
  'verification.review',

  'admin.user.manage',
  'admin.permissions.manage',
  'admin.audit.read',
  'admin.moderation.manage',
] as const;

/**
 * --------------------------------------------------
 * ROLE -> PERMISSION MAPPING
 * --------------------------------------------------
 *
 * ADMIN:
 * Operational administration.
 *
 * SUPER_ADMIN:
 * Root administrative authority.
 *
 * SUPER_ADMIN receives every seeded permission.
 */

const rolePermissions: Record<
  RoleName,
  readonly string[]
> = {
  PLAYER: [
    'user.read',
    'user.update',
    'player.read',
    'player.update',
    'academy.read',
    'media.read',
    'media.manage',
    'message.read',
    'message.send',
    'verification.request',
  ],

  ACADEMY: [
    'user.read',
    'user.update',
    'academy.read',
    'academy.update',
    'player.read',
    'team.read',
    'team.manage',
    'training.read',
    'training.manage',
    'development.read',
    'media.read',
    'media.manage',
    'message.read',
    'message.send',
    'verification.request',
  ],

  SCOUT: [
    'user.read',
    'user.update',
    'player.read',
    'academy.read',
    'scout.read',
    'scout.update',
    'media.read',
    'message.read',
    'message.send',
    'verification.request',
  ],

  COACH: [
    'user.read',
    'user.update',
    'player.read',
    'academy.read',
    'coach.read',
    'coach.update',
    'team.read',
    'training.read',
    'training.manage',
    'development.read',
    'development.manage',
    'media.read',
    'media.manage',
    'message.read',
    'message.send',
    'verification.request',
  ],

  /**
   * Ordinary administrators perform operational
   * administrative work.
   *
   * They cannot manage administrator permissions.
   */
  ADMIN: [
    'user.read',

    'player.read',
    'academy.read',
    'scout.read',
    'coach.read',

    'media.read',

    'verification.review',

    'admin.audit.read',
    'admin.moderation.manage',
  ],

  /**
   * SUPER_ADMIN receives every permission.
   *
   * Our future PermissionsGuard will also treat
   * SUPER_ADMIN as root authority so newly-added
   * permissions do not accidentally lock out the
   * root administrator before a seed is rerun.
   */
  SUPER_ADMIN: permissions,
};

async function main() {
  console.log('Starting RBAC seed...');

  // --------------------------------------------------
  // 1. Create/update all roles
  // --------------------------------------------------

  for (const name of Object.values(RoleName)) {
    await prisma.role.upsert({
      where: {
        name,
      },

      update: {},

      create: {
        name,
      },
    });
  }

  console.log('Roles synchronized.');

  // --------------------------------------------------
  // 2. Create/update all permissions
  // --------------------------------------------------

  for (const name of permissions) {
    await prisma.permission.upsert({
      where: {
        name,
      },

      update: {},

      create: {
        name,
      },
    });
  }

  console.log('Permissions synchronized.');

  // --------------------------------------------------
  // 3. Synchronize permissions for every role
  // --------------------------------------------------

  for (const roleName of Object.values(RoleName)) {
    const desiredPermissionNames =
      rolePermissions[roleName];

    const role =
      await prisma.role.findUniqueOrThrow({
        where: {
          name: roleName,
        },
      });

    const desiredPermissions =
      await prisma.permission.findMany({
        where: {
          name: {
            in: [...desiredPermissionNames],
          },
        },
      });

    /**
     * Defensive check.
     *
     * If we accidentally put a permission into
     * rolePermissions that doesn't exist in the
     * permissions array, fail instead of silently
     * creating an incomplete RBAC configuration.
     */
    if (
      desiredPermissions.length !==
      desiredPermissionNames.length
    ) {
      const foundNames = new Set(
        desiredPermissions.map(
          (permission) => permission.name,
        ),
      );

      const missingNames =
        desiredPermissionNames.filter(
          (name) => !foundNames.has(name),
        );

      throw new Error(
        `Missing permissions for ${roleName}: ${missingNames.join(', ')}`,
      );
    }

    const desiredPermissionIds =
      desiredPermissions.map(
        (permission) => permission.id,
      );

    /**
     * Remove old role-permission relationships that
     * are no longer part of the desired configuration.
     */
    if (desiredPermissionIds.length > 0) {
      await prisma.rolePermission.deleteMany({
        where: {
          roleId: role.id,

          permissionId: {
            notIn: desiredPermissionIds,
          },
        },
      });
    } else {
      await prisma.rolePermission.deleteMany({
        where: {
          roleId: role.id,
        },
      });
    }

    /**
     * Add missing role-permission relationships.
     */
    for (const permission of desiredPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },

        update: {},

        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }

    console.log(
      `${roleName}: ${desiredPermissions.length} permission(s) synchronized.`,
    );
  }

  console.log('RBAC seed completed successfully.');
  console.log(
    'No users or passwords were modified.',
  );
}

main()
  .catch((error) => {
    console.error('RBAC seed failed:');
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });