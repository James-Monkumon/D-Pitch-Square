import {
  ArrayUnique,
  IsArray,
  IsString,
} from 'class-validator';

export class UpdateAdminPermissionsDto {
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  permissions!: string[];
}