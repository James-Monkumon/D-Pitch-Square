import {
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import {
  PlayerPosition,
  PreferredFoot,
} from '@prisma/client';

export class CreatePlayerDto {
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
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nationality?: string;

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
  @MaxLength(300)
  address?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(300)
  height?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(300)
  weight?: number;

  @IsOptional()
  @IsEnum(PreferredFoot)
  preferredFoot?: PreferredFoot;

  @IsOptional()
  @IsEnum(PlayerPosition)
  primaryPosition?: PlayerPosition;

  @IsOptional()
  @IsEnum(PlayerPosition)
  secondaryPosition?: PlayerPosition;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  jerseyNumber?: number;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  currentClub?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  currentAcademyName?: string;

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