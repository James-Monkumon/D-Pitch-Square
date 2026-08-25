import { PrismaClient, RoleName } from '@prisma/client';

const prisma = new PrismaClient();

const permissions = [
  'user.read','user.update','player.read','player.update',
  'academy.read','academy.update','scout.read','scout.update',
  'coach.read','coach.update','team.read','team.manage',
  'training.read','training.manage','development.read','development.manage',
  'media.read','media.manage','message.read','message.send',
  'verification.request','verification.review','admin.user.manage',
  'admin.permissions.manage','admin.audit.read','admin.moderation.manage'
];

const rolePermissions: Record<RoleName, string[]> = {
  PLAYER: ['user.read','user.update','player.read','player.update','academy.read','media.read','media.manage','message.read','message.send','verification.request'],
  ACADEMY: ['user.read','user.update','academy.read','academy.update','player.read','team.read','team.manage','training.read','training.manage','development.read','media.read','media.manage','message.read','message.send','verification.request'],
  SCOUT: ['user.read','user.update','player.read','academy.read','scout.read','scout.update','media.read','message.read','message.send','verification.request'],
  COACH: ['user.read','user.update','player.read','academy.read','coach.read','coach.update','team.read','training.read','training.manage','development.read','development.manage','media.read','media.manage','message.read','message.send','verification.request'],
  ADMIN: permissions,
};

async function main() {
  for (const name of Object.values(RoleName)) {
    await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
  }
  for (const name of permissions) {
    await prisma.permission.upsert({ where: { name }, update: {}, create: { name } });
  }
  for (const [roleName, names] of Object.entries(rolePermissions)) {
    const role = await prisma.role.findUniqueOrThrow({ where: { name: roleName as RoleName } });
    for (const permissionName of names) {
      const permission = await prisma.permission.findUniqueOrThrow({ where: { name: permissionName } });
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id },
      });
    }
  }
  console.log('Roles and permissions seeded.');
}
main().catch(console.error).finally(() => prisma.$disconnect());
