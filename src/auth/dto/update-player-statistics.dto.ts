import {
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

export class UpdatePlayerStatisticsDto {
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
  appearances?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cleanSheets?: number;
}