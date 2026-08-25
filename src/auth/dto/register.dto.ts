import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum RegistrationRole { PLAYER='PLAYER', ACADEMY='ACADEMY', SCOUT='SCOUT', COACH='COACH' }

export class RegisterDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(8) password!: string;
  @IsEnum(RegistrationRole) role!: RegistrationRole;
}
