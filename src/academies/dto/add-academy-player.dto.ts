import { IsUUID } from 'class-validator';

export class AddAcademyPlayerDto {
  @IsUUID()
  playerId!: string;
}