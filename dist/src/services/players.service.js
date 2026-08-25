"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlayersService = class PlayersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Create player profile for the authenticated user.
     */
    async createProfile(userId, dto) {
        const existing = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Player profile already exists');
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPlayer = user.roles.some((r) => r.role.name === 'PLAYER');
        if (!isPlayer) {
            throw new common_1.ForbiddenException('Only players can create a player profile');
        }
        const dateOfBirth = dto.dateOfBirth
            ? new Date(dto.dateOfBirth)
            : undefined;
        return this.prisma.playerProfile.create({
            data: {
                userId,
                fullName: dto.fullName,
                dateOfBirth,
                nationality: dto.nationality,
                currentClub: dto.currentClub,
                currentAcademyName: dto.currentAcademyName,
                height: dto.height,
                weight: dto.weight,
                preferredFoot: dto.preferredFoot,
                primaryPosition: dto.primaryPosition,
                secondaryPosition: dto.secondaryPosition,
                jerseyNumber: dto.jerseyNumber,
                biography: dto.biography,
                contactInformation: dto.contactInformation,
                profilePicture: dto.profilePicture,
                coverPhoto: dto.coverPhoto,
                socialMediaLinks: dto.socialMediaLinks,
            },
            include: {
                statistics: true,
                achievements: true,
            },
        });
    }
    /**
     * Get authenticated player's own profile.
     */
    async getMyProfile(userId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
            include: {
                statistics: true,
                achievements: true,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        return player;
    }
    /**
     * Update authenticated player's profile.
     */
    async updateProfile(userId, dto) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        const data = {
            ...dto,
        };
        if (dto.dateOfBirth) {
            data.dateOfBirth =
                new Date(dto.dateOfBirth);
        }
        return this.prisma.playerProfile.update({
            where: {
                userId,
            },
            data,
            include: {
                statistics: true,
                achievements: true,
            },
        });
    }
    /**
     * Get a public player profile.
     */
    async getPublicProfile(playerId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                id: playerId,
            },
            include: {
                statistics: true,
                achievements: true,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return player;
    }
    /**
     * Search players.
     */
    async searchPlayers(query) {
        const players = await this.prisma.playerProfile.findMany({
            where: {
                nationality: query.country
                    ? {
                        contains: query.country,
                        mode: 'insensitive',
                    }
                    : undefined,
                currentAcademyName: query.academy
                    ? {
                        contains: query.academy,
                        mode: 'insensitive',
                    }
                    : undefined,
                primaryPosition: query.position
                    ? {
                        equals: query.position,
                        mode: 'insensitive',
                    }
                    : undefined,
                preferredFoot: query.preferredFoot
                    ? {
                        equals: query.preferredFoot,
                        mode: 'insensitive',
                    }
                    : undefined,
                height: query.heightMin !== undefined ||
                    query.heightMax !== undefined
                    ? {
                        gte: query.heightMin,
                        lte: query.heightMax,
                    }
                    : undefined,
            },
            include: {
                statistics: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        /**
         * Age is calculated from dateOfBirth rather than
         * stored as a separate database column.
         */
        return players.filter((player) => {
            if (query.ageMin === undefined &&
                query.ageMax === undefined) {
                return true;
            }
            if (!player.dateOfBirth) {
                return false;
            }
            const age = this.calculateAge(player.dateOfBirth);
            if (query.ageMin !== undefined &&
                age < query.ageMin) {
                return false;
            }
            if (query.ageMax !== undefined &&
                age > query.ageMax) {
                return false;
            }
            return true;
        });
    }
    /**
     * Get player's statistics.
     */
    async getMyStatistics(userId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
            include: {
                statistics: true,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        return (player.statistics ?? {
            playerId: player.id,
            goals: 0,
            assists: 0,
            appearances: 0,
            cleanSheets: 0,
        });
    }
    /**
     * Create/update player's statistics.
     */
    async updateMyStatistics(userId, dto) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        return this.prisma.playerStatistics.upsert({
            where: {
                playerId: player.id,
            },
            create: {
                playerId: player.id,
                goals: dto.goals ?? 0,
                assists: dto.assists ?? 0,
                appearances: dto.appearances ?? 0,
                cleanSheets: dto.cleanSheets ?? 0,
            },
            update: {
                ...(dto.goals !== undefined && {
                    goals: dto.goals,
                }),
                ...(dto.assists !== undefined && {
                    assists: dto.assists,
                }),
                ...(dto.appearances !== undefined && {
                    appearances: dto.appearances,
                }),
                ...(dto.cleanSheets !== undefined && {
                    cleanSheets: dto.cleanSheets,
                }),
            },
        });
    }
    /**
     * Public statistics.
     */
    async getStatistics(playerId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                id: playerId,
            },
            include: {
                statistics: true,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return (player.statistics ?? {
            playerId: player.id,
            goals: 0,
            assists: 0,
            appearances: 0,
            cleanSheets: 0,
        });
    }
    /**
     * Create achievement.
     */
    async createAchievement(userId, dto) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        return this.prisma.playerAchievement.create({
            data: {
                playerId: player.id,
                title: dto.title,
                description: dto.description,
                year: dto.year,
                organization: dto.organization,
            },
        });
    }
    /**
     * Get own achievements.
     */
    async getMyAchievements(userId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        return this.prisma.playerAchievement.findMany({
            where: {
                playerId: player.id,
            },
            orderBy: {
                year: 'desc',
            },
        });
    }
    /**
     * Get public achievements.
     */
    async getAchievements(playerId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                id: playerId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return this.prisma.playerAchievement.findMany({
            where: {
                playerId,
            },
            orderBy: {
                year: 'desc',
            },
        });
    }
    /**
     * Update achievement.
     */
    async updateAchievement(userId, achievementId, dto) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        const achievement = await this.prisma.playerAchievement.findFirst({
            where: {
                id: achievementId,
                playerId: player.id,
            },
        });
        if (!achievement) {
            throw new common_1.NotFoundException('Achievement not found');
        }
        return this.prisma.playerAchievement.update({
            where: {
                id: achievementId,
            },
            data: dto,
        });
    }
    /**
     * Delete achievement.
     */
    async deleteAchievement(userId, achievementId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player) {
            throw new common_1.NotFoundException('Player profile not found');
        }
        const achievement = await this.prisma.playerAchievement.findFirst({
            where: {
                id: achievementId,
                playerId: player.id,
            },
        });
        if (!achievement) {
            throw new common_1.NotFoundException('Achievement not found');
        }
        await this.prisma.playerAchievement.delete({
            where: {
                id: achievementId,
            },
        });
        return {
            success: true,
            message: 'Achievement deleted successfully',
            data: null,
        };
    }
    calculateAge(dateOfBirth) {
        const today = new Date();
        let age = today.getFullYear() -
            dateOfBirth.getFullYear();
        const month = today.getMonth() -
            dateOfBirth.getMonth();
        if (month < 0 ||
            (month === 0 &&
                today.getDate() <
                    dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlayersService);
//# sourceMappingURL=players.service.js.map