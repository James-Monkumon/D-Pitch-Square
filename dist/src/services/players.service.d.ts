import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
export declare class PlayersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    /**
     * Create player profile for the authenticated user.
     */
    createProfile(userId: string, dto: CreatePlayerDto): Promise<{
        statistics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            goals: number;
            assists: number;
            appearances: number;
            cleanSheets: number;
        } | null;
        achievements: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            title: string;
            description: string | null;
            year: number | null;
            organization: string | null;
        }[];
    } & {
        id: string;
        profilePicture: string | null;
        coverPhoto: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        nationality: string | null;
        country: string | null;
        state: string | null;
        city: string | null;
        currentClub: string | null;
        currentAcademyName: string | null;
        height: number | null;
        weight: number | null;
        preferredFoot: import(".prisma/client").$Enums.PreferredFoot | null;
        primaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        secondaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        jerseyNumber: number | null;
        biography: string | null;
        contactInformation: string | null;
        socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    /**
     * Get authenticated player's own profile.
     */
    getMyProfile(userId: string): Promise<{
        statistics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            goals: number;
            assists: number;
            appearances: number;
            cleanSheets: number;
        } | null;
        achievements: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            title: string;
            description: string | null;
            year: number | null;
            organization: string | null;
        }[];
    } & {
        id: string;
        profilePicture: string | null;
        coverPhoto: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        nationality: string | null;
        country: string | null;
        state: string | null;
        city: string | null;
        currentClub: string | null;
        currentAcademyName: string | null;
        height: number | null;
        weight: number | null;
        preferredFoot: import(".prisma/client").$Enums.PreferredFoot | null;
        primaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        secondaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        jerseyNumber: number | null;
        biography: string | null;
        contactInformation: string | null;
        socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    /**
     * Update authenticated player's profile.
     */
    updateProfile(userId: string, dto: UpdatePlayerDto): Promise<{
        statistics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            goals: number;
            assists: number;
            appearances: number;
            cleanSheets: number;
        } | null;
        achievements: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            title: string;
            description: string | null;
            year: number | null;
            organization: string | null;
        }[];
    } & {
        id: string;
        profilePicture: string | null;
        coverPhoto: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        nationality: string | null;
        country: string | null;
        state: string | null;
        city: string | null;
        currentClub: string | null;
        currentAcademyName: string | null;
        height: number | null;
        weight: number | null;
        preferredFoot: import(".prisma/client").$Enums.PreferredFoot | null;
        primaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        secondaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        jerseyNumber: number | null;
        biography: string | null;
        contactInformation: string | null;
        socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    /**
     * Get a public player profile.
     */
    getPublicProfile(playerId: string): Promise<{
        statistics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            goals: number;
            assists: number;
            appearances: number;
            cleanSheets: number;
        } | null;
        achievements: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            playerId: string;
            title: string;
            description: string | null;
            year: number | null;
            organization: string | null;
        }[];
    } & {
        id: string;
        profilePicture: string | null;
        coverPhoto: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        nationality: string | null;
        country: string | null;
        state: string | null;
        city: string | null;
        currentClub: string | null;
        currentAcademyName: string | null;
        height: number | null;
        weight: number | null;
        preferredFoot: import(".prisma/client").$Enums.PreferredFoot | null;
        primaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        secondaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        jerseyNumber: number | null;
        biography: string | null;
        contactInformation: string | null;
        socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    /**
     * Search players.
     */
    searchPlayers(query: {
        country?: string;
        state?: string;
        city?: string;
        ageMin?: number;
        ageMax?: number;
        position?: string;
        preferredFoot?: string;
        academy?: string;
        heightMin?: number;
        heightMax?: number;
    }): Promise<{
        id: string;
        profilePicture: string | null;
        coverPhoto: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        nationality: string | null;
        country: string | null;
        state: string | null;
        city: string | null;
        currentClub: string | null;
        currentAcademyName: string | null;
        height: number | null;
        weight: number | null;
        preferredFoot: import(".prisma/client").$Enums.PreferredFoot | null;
        primaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        secondaryPosition: import(".prisma/client").$Enums.PlayerPosition | null;
        jerseyNumber: number | null;
        biography: string | null;
        contactInformation: string | null;
        socialMediaLinks: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    /**
     * Get player's statistics.
     */
    getMyStatistics(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        goals: number;
        assists: number;
        appearances: number;
        cleanSheets: number;
    } | {
        playerId: string;
        goals: number;
        assists: number;
        appearances: number;
        cleanSheets: number;
    }>;
    /**
     * Create/update player's statistics.
     */
    updateMyStatistics(userId: string, dto: UpdatePlayerStatisticsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        goals: number;
        assists: number;
        appearances: number;
        cleanSheets: number;
    }>;
    /**
     * Public statistics.
     */
    getStatistics(playerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        goals: number;
        assists: number;
        appearances: number;
        cleanSheets: number;
    } | {
        playerId: string;
        goals: number;
        assists: number;
        appearances: number;
        cleanSheets: number;
    }>;
    /**
     * Create achievement.
     */
    createAchievement(userId: string, dto: CreateAchievementDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        title: string;
        description: string | null;
        year: number | null;
        organization: string | null;
    }>;
    /**
     * Get own achievements.
     */
    getMyAchievements(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        title: string;
        description: string | null;
        year: number | null;
        organization: string | null;
    }[]>;
    /**
     * Get public achievements.
     */
    getAchievements(playerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        title: string;
        description: string | null;
        year: number | null;
        organization: string | null;
    }[]>;
    /**
     * Update achievement.
     */
    updateAchievement(userId: string, achievementId: string, dto: UpdateAchievementDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        playerId: string;
        title: string;
        description: string | null;
        year: number | null;
        organization: string | null;
    }>;
    /**
     * Delete achievement.
     */
    deleteAchievement(userId: string, achievementId: string): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    private calculateAge;
}
