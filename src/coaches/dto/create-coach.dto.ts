import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCoachDto {
  @IsString()
  @MaxLength(150)
  fullName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  profilePicture?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  coverPhoto?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  currentAcademyClub?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  coachingRole?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  coachingLicense?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  coachingCertification?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsString()
  contactInformation?: string;

  @IsOptional()
  @IsObject()
  socialMediaLinks?: Record<string, string>;
}