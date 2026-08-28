import { AchievementType } from '@prisma/client';
export declare class CreateAchievementDto {
    title: string;
    description?: string;
    achievementType: AchievementType;
    achievementDate?: string;
    organization?: string;
    level?: string;
    role?: string;
    evidenceUrl?: string;
}
