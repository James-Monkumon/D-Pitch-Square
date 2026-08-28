import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PlayersModule } from './players/players.module.js';
import { AcademiesModule } from './academies/academies.module.js';
import { AdminModule } from './admin/admin.module.js';
import { CoachesModule } from './coaches/coaches.module.js';
import { ScoutsModule } from './scouts/scouts.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    PlayersModule,
    AcademiesModule,
    AdminModule,
    CoachesModule,
    ScoutsModule,
  ],
})
export class AppModule {}