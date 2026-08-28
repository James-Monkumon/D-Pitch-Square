import { PrismaClient, RoleName } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
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
];
const rolePermissions = {
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
    ADMIN: permissions,
};
async function main() {
    // --------------------------------------------------
    // 1. Create/update roles
    // --------------------------------------------------
    for (const name of Object.values(RoleName)) {
        await prisma.role.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
    // --------------------------------------------------
    // 2. Create/update permissions
    // --------------------------------------------------
    for (const name of permissions) {
        await prisma.permission.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
    // --------------------------------------------------
    // 3. Connect permissions to roles
    // --------------------------------------------------
    for (const [roleName, names] of Object.entries(rolePermissions)) {
        const role = await prisma.role.findUniqueOrThrow({
            where: {
                name: roleName,
            },
        });
        for (const permissionName of names) {
            const permission = await prisma.permission.findUniqueOrThrow({
                where: {
                    name: permissionName,
                },
            });
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
    }
    // --------------------------------------------------
    // 4. Create development admin
    // --------------------------------------------------
    const adminEmail = process.env.DEV_ADMIN_EMAIL;
    const adminPassword = process.env.DEV_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
        throw new Error('DEV_ADMIN_EMAIL and DEV_ADMIN_PASSWORD must be defined in .env');
    }
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const adminRole = await prisma.role.findUniqueOrThrow({
        where: {
            name: RoleName.ADMIN,
        },
    });
    const adminUser = await prisma.user.upsert({
        where: {
            email: adminEmail,
        },
        update: {
            passwordHash,
            status: 'ACTIVE',
            emailVerifiedAt: new Date(),
        },
        create: {
            email: adminEmail,
            passwordHash,
            status: 'ACTIVE',
            emailVerifiedAt: new Date(),
        },
    });
    // --------------------------------------------------
    // 5. Assign ADMIN role
    // --------------------------------------------------
    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: adminUser.id,
                roleId: adminRole.id,
            },
        },
        update: {},
        create: {
            userId: adminUser.id,
            roleId: adminRole.id,
        },
    });
    console.log('Roles and permissions seeded.');
    console.log(`Development admin ready: ${adminEmail}`);
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map