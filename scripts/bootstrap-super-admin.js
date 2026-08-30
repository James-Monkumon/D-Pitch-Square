import {
  PrismaClient,
  RoleName,
  UserStatus,
} from '@prisma/client';

import argon2 from 'argon2';

const prisma = new PrismaClient();

/**
 * --------------------------------------------------
 * ONE-TIME SUPER ADMIN BOOTSTRAP
 * --------------------------------------------------
 *
 * This script creates the platform's initial
 * SUPER_ADMIN.
 *
 * SECURITY RULE:
 *
 * If ANY SUPER_ADMIN already exists, this script
 * aborts immediately.
 *
 * It never:
 * - resets an existing SUPER_ADMIN password
 * - creates a second SUPER_ADMIN
 * - promotes another account after bootstrap
 *
 * Usage:
 *
 *   node scripts/bootstrap-super-admin.js
 */

async function main() {
  console.log(
    'Starting SUPER_ADMIN bootstrap...',
  );

  // --------------------------------------------------
  // 1. Ensure SUPER_ADMIN role exists
  // --------------------------------------------------

  const superAdminRole =
    await prisma.role.findUnique({
      where: {
        name: RoleName.SUPER_ADMIN,
      },
    });

  if (!superAdminRole) {
    throw new Error(
      [
        'SUPER_ADMIN role does not exist.',
        'Run "npx prisma db seed" first.',
      ].join(' '),
    );
  }

  // --------------------------------------------------
  // 2. Refuse bootstrap if ANY SUPER_ADMIN exists
  // --------------------------------------------------

  const existingSuperAdminRole =
    await prisma.userRole.findFirst({
      where: {
        roleId: superAdminRole.id,
      },

      include: {
        user: {
          select: {
            id: true,
            email: true,
            status: true,
          },
        },
      },
    });

  if (existingSuperAdminRole) {
    console.error(
      'SUPER_ADMIN bootstrap aborted.',
    );

    console.error(
      'A SUPER_ADMIN already exists.',
    );

    console.error({
      id: existingSuperAdminRole.user.id,
      email:
        existingSuperAdminRole.user.email,
      status:
        existingSuperAdminRole.user.status,
    });

    process.exitCode = 1;

    return;
  }

  // --------------------------------------------------
  // 3. Read bootstrap credentials
  // --------------------------------------------------

  const rawEmail =
    process.env.BOOTSTRAP_SUPER_ADMIN_EMAIL;

  const password =
    process.env.BOOTSTRAP_SUPER_ADMIN_PASSWORD;

  if (!rawEmail || !password) {
    throw new Error(
      [
        'BOOTSTRAP_SUPER_ADMIN_EMAIL and',
        'BOOTSTRAP_SUPER_ADMIN_PASSWORD',
        'must be defined in the environment.',
      ].join(' '),
    );
  }

  const email =
    rawEmail.trim().toLowerCase();

  if (!email) {
    throw new Error(
      'BOOTSTRAP_SUPER_ADMIN_EMAIL cannot be empty.',
    );
  }

  /**
   * Basic bootstrap password requirement.
   *
   * Your normal password DTO can later enforce the
   * application's complete password policy.
   */
  if (password.length < 12) {
    throw new Error(
      'Bootstrap SUPER_ADMIN password must be at least 12 characters.',
    );
  }

  // --------------------------------------------------
  // 4. Check whether this email belongs to a user
  // --------------------------------------------------

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

  /**
   * We deliberately refuse to silently promote an
   * existing ordinary account to SUPER_ADMIN.
   *
   * Root privilege escalation should never happen
   * merely because an email was placed in an env var.
   */
  if (existingUser) {
    const existingRoles =
      existingUser.roles.map(
        (userRole) =>
          userRole.role.name,
      );

    throw new Error(
      [
        `A user already exists with email ${email}.`,
        `Current roles: ${
          existingRoles.length
            ? existingRoles.join(', ')
            : 'NONE'
        }.`,
        'Bootstrap will not automatically promote an existing user.',
      ].join(' '),
    );
  }

  // --------------------------------------------------
  // 5. Hash password with Argon2
  // --------------------------------------------------

  const passwordHash =
    await argon2.hash(password);

  /**
   * Defensive verification.
   *
   * This catches malformed/unusable hashes before
   * anything is written to the database.
   */
  const hashIsValid =
    await argon2.verify(
      passwordHash,
      password,
    );

  if (!hashIsValid) {
    throw new Error(
      'Generated password hash failed verification.',
    );
  }

  // --------------------------------------------------
  // 6. Create SUPER_ADMIN atomically
  // --------------------------------------------------

  const superAdmin =
    await prisma.$transaction(
      async (tx) => {
        /**
         * Check again inside the transaction.
         *
         * This reduces the chance of two bootstrap
         * processes creating root accounts at nearly
         * the same time.
         */
        const rootAlreadyExists =
          await tx.userRole.findFirst({
            where: {
              roleId:
                superAdminRole.id,
            },
          });

        if (rootAlreadyExists) {
          throw new Error(
            'SUPER_ADMIN bootstrap aborted: a SUPER_ADMIN already exists.',
          );
        }

        const user =
          await tx.user.create({
            data: {
              email,
              passwordHash,

              status:
                UserStatus.ACTIVE,

              emailVerifiedAt:
                new Date(),
            },
          });

        await tx.userRole.create({
          data: {
            userId: user.id,
            roleId:
              superAdminRole.id,
          },
        });

        await tx.adminAuditLog.create({
          data: {
            actorUserId:
              user.id,

            action:
              'SUPER_ADMIN_BOOTSTRAPPED',

            targetType:
              'USER',

            targetId:
              user.id,

            metadata: {
              source:
                'bootstrap-super-admin',
            },
          },
        });

        return user;
      },
    );

  // --------------------------------------------------
  // 7. Success
  // --------------------------------------------------

  console.log(
    'SUPER_ADMIN bootstrap completed successfully.',
  );

  console.log({
    id: superAdmin.id,
    email: superAdmin.email,
    role: RoleName.SUPER_ADMIN,
  });

  console.log(
    'This bootstrap script will refuse to create another SUPER_ADMIN while one already exists.',
  );
}

main()
  .catch((error) => {
    console.error(
      'SUPER_ADMIN bootstrap failed:',
    );

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });