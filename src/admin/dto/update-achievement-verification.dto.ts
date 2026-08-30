import { IsEnum } from 'class-validator';

export enum AdminAchievementVerificationDecision {
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export class UpdateAchievementVerificationDto {
  @IsEnum(AdminAchievementVerificationDecision)
  verificationStatus!: AdminAchievementVerificationDecision;
}