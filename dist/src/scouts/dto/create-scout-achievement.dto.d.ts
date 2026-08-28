import { AchievementType } from '@prisma/client';
export declare class CreateScoutAchievementDto {
    title: string;
    description?: string;
    achievementType: AchievementType;
    achievementDate?: string;
    organization?: string;
    level?: string;
    role?: string;
    evidenceUrl?: string;
}
