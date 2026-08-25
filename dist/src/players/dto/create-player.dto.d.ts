import { PlayerPosition, PreferredFoot } from '@prisma/client';
export declare class CreatePlayerDto {
    fullName: string;
    profilePicture?: string;
    coverPhoto?: string;
    dateOfBirth?: string;
    nationality?: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    height?: number;
    weight?: number;
    preferredFoot?: PreferredFoot;
    primaryPosition?: PlayerPosition;
    secondaryPosition?: PlayerPosition;
    jerseyNumber?: number;
    currentClub?: string;
    currentAcademyName?: string;
    biography?: string;
    contactInformation?: string;
    socialMediaLinks?: Record<string, string>;
}
