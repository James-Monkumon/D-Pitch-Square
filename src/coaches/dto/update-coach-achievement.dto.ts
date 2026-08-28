import {
  PartialType,
} from '@nestjs/mapped-types';

import {
  CreateCoachAchievementDto,
} from './create-coach-achievement.dto.js';

export class UpdateCoachAchievementDto extends PartialType(
  CreateCoachAchievementDto,
) {}