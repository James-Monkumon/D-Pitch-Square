import { Module } from '@nestjs/common';

import { CoachesController } from './coaches.controller.js';
import { CoachesService } from './coaches.service.js';

import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    CoachesController,
  ],

  providers: [
    CoachesService,
  ],

  exports: [
    CoachesService,
  ],
})
export class CoachesModule {}