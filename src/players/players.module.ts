import { Module } from '@nestjs/common';

import { PlayersController } from './players.controller.js';
import { PlayersService } from './players.service.js';

import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [
    PlayersController,
  ],

  providers: [
    PlayersService,
    PrismaService,
  ],

  exports: [
    PlayersService,
  ],
})
export class PlayersModule {}