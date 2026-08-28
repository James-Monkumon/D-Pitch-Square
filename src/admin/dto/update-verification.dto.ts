import { IsEnum } from 'class-validator';

export enum AdminVerificationDecision {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateVerificationDto {
  @IsEnum(AdminVerificationDecision)
  verificationStatus!: AdminVerificationDecision;
}