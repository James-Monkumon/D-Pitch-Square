import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class AddAcademyCoachDto {
  @IsUUID()
  coachId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  role?: string;
}