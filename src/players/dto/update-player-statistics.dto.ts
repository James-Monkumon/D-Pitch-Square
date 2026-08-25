import {
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

export class UpdatePlayerStatisticsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  matchesPlayed?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  matchesStarted?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minutesPlayed?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  goals?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  assists?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  yellowCards?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  redCards?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cleanSheets?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  saves?: number;
}