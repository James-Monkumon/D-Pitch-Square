import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';

import { AcademiesController } from './academies.controller.js';
import { AcademiesService } from './academies.service.js';

import { AcademyTeamsController } from './academy-teams.controller.js';
import { AcademyTeamsService } from './academy-teams.service.js';

@Module({
  imports: [
    PrismaModule,
  ],

  controllers: [
    AcademiesController,
    AcademyTeamsController,
  ],

  providers: [
    AcademiesService,
    AcademyTeamsService,
  ],

  exports: [
    AcademiesService,
    AcademyTeamsService,
  ],
})
export class AcademiesModule {}