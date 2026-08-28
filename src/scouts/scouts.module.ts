import { Module } from '@nestjs/common';

import { ScoutsController } from './scouts.controller.js';
import { ScoutsService } from './scouts.service.js';

@Module({
  controllers: [
    ScoutsController,
  ],

  providers: [
    ScoutsService,
  ],

  exports: [
    ScoutsService,
  ],
})
export class ScoutsModule {}