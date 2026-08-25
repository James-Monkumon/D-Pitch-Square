var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let PlayersService = class PlayersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // =========================================================
    // PRIVATE HELPERS
    // =========================================================
    /**
     * Find an active player profile.
     */
    async findActivePlayer(playerId) {
        const player = await this.prisma.playerProfile.findFirst({
            where: {
                id: playerId,
                deletedAt: null,
            },
        });
        if (!player) {
            throw new NotFoundException('Player profile not found');
        }
        return player;
    }
    /**
     * Verify that the authenticated user owns
     * an active player profile.
     */
    async verifyPlayerOwner(userId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!player || player.deletedAt) {
            throw new NotFoundException('Player profile not found');
        }
        return player;
    }
    // =========================================================
    // PLAYER PROFILE
    // =========================================================
    /**
     * Create player profile.
     *
     * Only users with PLAYER role may create one.
     */
    async createProfile(userId, dto) {
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
            throw new NotFoundException('User not found');
        }
        const isPlayer = user.roles.some((userRole) => userRole.role.name === 'PLAYER');
        if (!isPlayer) {
            throw new ForbiddenException('Only player users can create a player profile');
        }
        const existingProfile = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
        });
        if (existingProfile) {
            throw new ConflictException('Player profile already exists');
        }
        const player = await this.prisma.playerProfile.create({
            data: {
                userId,
                fullName: dto.fullName,
                profilePicture: dto.profilePicture,
                coverPhoto: dto.coverPhoto,
                dateOfBirth: dto.dateOfBirth
                    ? new Date(dto.dateOfBirth)
                    : undefined,
                nationality: dto.nationality,
                country: dto.country,
                state: dto.state,
                city: dto.city,
                address: dto.address,
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
                socialMediaLinks: dto.socialMediaLinks,
            },
        });
        return {
            success: true,
            message: 'Player profile created successfully',
            data: player,
        };
    }
    /**
     * Get my player profile.
     */
    async getMyProfile(userId) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                userId,
            },
            include: {
                achievements: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                statistics: true,
            },
        });
        if (!player || player.deletedAt) {
            throw new NotFoundException('Player profile not found');
        }
        return {
            success: true,
            message: 'Player profile retrieved successfully',
            data: player,
        };
    }
    /**
     * Update my player profile.
     */
    async updateProfile(userId, dto) {
        const player = await this.verifyPlayerOwner(userId);
        const updated = await this.prisma.playerProfile.update({
            where: {
                id: player.id,
            },
            data: {
                ...(dto.fullName !== undefined && {
                    fullName: dto.fullName,
                }),
                ...(dto.profilePicture !== undefined && {
                    profilePicture: dto.profilePicture,
                }),
                ...(dto.coverPhoto !== undefined && {
                    coverPhoto: dto.coverPhoto,
                }),
                ...(dto.dateOfBirth !== undefined && {
                    dateOfBirth: dto.dateOfBirth
                        ? new Date(dto.dateOfBirth)
                        : null,
                }),
                ...(dto.nationality !== undefined && {
                    nationality: dto.nationality,
                }),
                ...(dto.country !== undefined && {
                    country: dto.country,
                }),
                ...(dto.state !== undefined && {
                    state: dto.state,
                }),
                ...(dto.city !== undefined && {
                    city: dto.city,
                }),
                ...(dto.address !== undefined && {
                    address: dto.address,
                }),
                ...(dto.currentClub !== undefined && {
                    currentClub: dto.currentClub,
                }),
                ...(dto.currentAcademyName !== undefined && {
                    currentAcademyName: dto.currentAcademyName,
                }),
                ...(dto.height !== undefined && {
                    height: dto.height,
                }),
                ...(dto.weight !== undefined && {
                    weight: dto.weight,
                }),
                ...(dto.preferredFoot !== undefined && {
                    preferredFoot: dto.preferredFoot,
                }),
                ...(dto.primaryPosition !== undefined && {
                    primaryPosition: dto.primaryPosition,
                }),
                ...(dto.secondaryPosition !== undefined && {
                    secondaryPosition: dto.secondaryPosition,
                }),
                ...(dto.jerseyNumber !== undefined && {
                    jerseyNumber: dto.jerseyNumber,
                }),
                ...(dto.biography !== undefined && {
                    biography: dto.biography,
                }),
                ...(dto.contactInformation !== undefined && {
                    contactInformation: dto.contactInformation,
                }),
                ...(dto.socialMediaLinks !== undefined && {
                    socialMediaLinks: dto.socialMediaLinks,
                }),
            },
        });
        return {
            success: true,
            message: 'Player profile updated successfully',
            data: updated,
        };
    }
    // =========================================================
    // PLAYER STATISTICS
    // =========================================================
    /**
     * Update player statistics.
     */
    async updateStatistics(userId, dto) {
        const player = await this.verifyPlayerOwner(userId);
        const statistics = await this.prisma.playerStatistics.upsert({
            where: {
                playerId: player.id,
            },
            create: {
                playerId: player.id,
                ...(dto.matchesPlayed !== undefined && {
                    matchesPlayed: dto.matchesPlayed,
                }),
                ...(dto.matchesStarted !== undefined && {
                    matchesStarted: dto.matchesStarted,
                }),
                ...(dto.minutesPlayed !== undefined && {
                    minutesPlayed: dto.minutesPlayed,
                }),
                ...(dto.goals !== undefined && {
                    goals: dto.goals,
                }),
                ...(dto.assists !== undefined && {
                    assists: dto.assists,
                }),
                ...(dto.yellowCards !== undefined && {
                    yellowCards: dto.yellowCards,
                }),
                ...(dto.redCards !== undefined && {
                    redCards: dto.redCards,
                }),
                ...(dto.cleanSheets !== undefined && {
                    cleanSheets: dto.cleanSheets,
                }),
                ...(dto.saves !== undefined && {
                    saves: dto.saves,
                }),
            },
            update: {
                ...(dto.matchesPlayed !== undefined && {
                    matchesPlayed: dto.matchesPlayed,
                }),
                ...(dto.matchesStarted !== undefined && {
                    matchesStarted: dto.matchesStarted,
                }),
                ...(dto.minutesPlayed !== undefined && {
                    minutesPlayed: dto.minutesPlayed,
                }),
                ...(dto.goals !== undefined && {
                    goals: dto.goals,
                }),
                ...(dto.assists !== undefined && {
                    assists: dto.assists,
                }),
                ...(dto.yellowCards !== undefined && {
                    yellowCards: dto.yellowCards,
                }),
                ...(dto.redCards !== undefined && {
                    redCards: dto.redCards,
                }),
                ...(dto.cleanSheets !== undefined && {
                    cleanSheets: dto.cleanSheets,
                }),
                ...(dto.saves !== undefined && {
                    saves: dto.saves,
                }),
            },
        });
        return {
            success: true,
            message: 'Player statistics updated successfully',
            data: statistics,
        };
    }
    // =========================================================
    // PLAYER ACHIEVEMENTS
    // =========================================================
    /**
     * Create achievement.
     */
    async createAchievement(userId, dto) {
        const player = await this.verifyPlayerOwner(userId);
        const achievement = await this.prisma.playerAchievement.create({
            data: {
                playerId: player.id,
                title: dto.title,
                description: dto.description,
                year: dto.year,
                organization: dto.organization,
                imageUrl: dto.imageUrl,
            },
        });
        return {
            success: true,
            message: 'Achievement created successfully',
            data: achievement,
        };
    }
    /**
     * Update achievement.
     */
    async updateAchievement(userId, achievementId, dto) {
        const player = await this.verifyPlayerOwner(userId);
        const achievement = await this.prisma.playerAchievement.findFirst({
            where: {
                id: achievementId,
                playerId: player.id,
            },
        });
        if (!achievement) {
            throw new NotFoundException('Achievement not found');
        }
        const updated = await this.prisma.playerAchievement.update({
            where: {
                id: achievementId,
            },
            data: {
                ...(dto.title !== undefined && {
                    title: dto.title,
                }),
                ...(dto.description !== undefined && {
                    description: dto.description,
                }),
                ...(dto.year !== undefined && {
                    year: dto.year,
                }),
                ...(dto.organization !== undefined && {
                    organization: dto.organization,
                }),
                ...(dto.imageUrl !== undefined && {
                    imageUrl: dto.imageUrl,
                }),
            },
        });
        return {
            success: true,
            message: 'Achievement updated successfully',
            data: updated,
        };
    }
    /**
     * Delete achievement.
     */
    async deleteAchievement(userId, achievementId) {
        const player = await this.verifyPlayerOwner(userId);
        const achievement = await this.prisma.playerAchievement.findFirst({
            where: {
                id: achievementId,
                playerId: player.id,
            },
        });
        if (!achievement) {
            throw new NotFoundException('Achievement not found');
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
    // =========================================================
    // PLAYER FOLLOW
    // =========================================================
    /**
     * Follow a player.
     */
    async followPlayer(userId, playerId) {
        const player = await this.findActivePlayer(playerId);
        if (player.userId === userId) {
            throw new ForbiddenException('You cannot follow yourself');
        }
        const existingFollow = await this.prisma.playerFollower.findUnique({
            where: {
                playerId_userId: {
                    playerId,
                    userId,
                },
            },
        });
        if (existingFollow) {
            return {
                success: true,
                message: 'Already following player',
                data: {
                    following: true,
                },
            };
        }
        await this.prisma.playerFollower.create({
            data: {
                playerId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Player followed successfully',
            data: {
                following: true,
            },
        };
    }
    /**
     * Unfollow a player.
     */
    async unfollowPlayer(userId, playerId) {
        await this.findActivePlayer(playerId);
        await this.prisma.playerFollower.deleteMany({
            where: {
                playerId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Player unfollowed successfully',
            data: {
                following: false,
            },
        };
    }
    /**
     * Check whether current user follows
     * a player.
     */
    async isFollowingPlayer(userId, playerId) {
        await this.findActivePlayer(playerId);
        const follow = await this.prisma.playerFollower.findUnique({
            where: {
                playerId_userId: {
                    playerId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Player follow status retrieved successfully',
            data: {
                following: !!follow,
            },
        };
    }
    /**
     * Get total follower count.
     */
    async getPlayerFollowerCount(playerId) {
        await this.findActivePlayer(playerId);
        const followers = await this.prisma.playerFollower.count({
            where: {
                playerId,
            },
        });
        return {
            success: true,
            message: 'Player follower count retrieved successfully',
            data: {
                followers,
            },
        };
    }
    // =========================================================
    // PLAYER LIKE
    // =========================================================
    /**
     * Like a player.
     */
    async likePlayer(userId, playerId) {
        const player = await this.findActivePlayer(playerId);
        if (player.userId === userId) {
            throw new ForbiddenException('You cannot like your own profile');
        }
        const existingLike = await this.prisma.playerLike.findUnique({
            where: {
                playerId_userId: {
                    playerId,
                    userId,
                },
            },
        });
        if (existingLike) {
            return {
                success: true,
                message: 'Player already liked',
                data: {
                    liked: true,
                },
            };
        }
        await this.prisma.playerLike.create({
            data: {
                playerId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Player liked successfully',
            data: {
                liked: true,
            },
        };
    }
    /**
     * Unlike a player.
     */
    async unlikePlayer(userId, playerId) {
        await this.findActivePlayer(playerId);
        await this.prisma.playerLike.deleteMany({
            where: {
                playerId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Player unliked successfully',
            data: {
                liked: false,
            },
        };
    }
    /**
     * Check whether authenticated user likes a player.
     */
    async isPlayerLiked(userId, playerId) {
        await this.findActivePlayer(playerId);
        const like = await this.prisma.playerLike.findUnique({
            where: {
                playerId_userId: {
                    playerId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Player like status retrieved successfully',
            data: {
                liked: !!like,
            },
        };
    }
    /**
     * Get total likes for a player.
     */
    async getPlayerLikesCount(playerId) {
        await this.findActivePlayer(playerId);
        const count = await this.prisma.playerLike.count({
            where: {
                playerId,
            },
        });
        return {
            success: true,
            message: 'Player likes count retrieved successfully',
            data: {
                count,
            },
        };
    }
    // =========================================================
    // PUBLIC PLAYER PROFILE
    // =========================================================
    /**
     * Get public player profile.
     *
     * Includes achievements, statistics,
     * follower total and like total.
     */
    async getPlayerById(playerId) {
        const player = await this.prisma.playerProfile.findFirst({
            where: {
                id: playerId,
                deletedAt: null,
            },
            include: {
                achievements: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                statistics: true,
            },
        });
        if (!player) {
            throw new NotFoundException('Player profile not found');
        }
        const [followers, likes,] = await this.prisma.$transaction([
            this.prisma.playerFollower.count({
                where: {
                    playerId,
                },
            }),
            this.prisma.playerLike.count({
                where: {
                    playerId,
                },
            }),
        ]);
        return {
            success: true,
            message: 'Player profile retrieved successfully',
            data: {
                ...player,
                followers,
                likes,
            },
        };
    }
};
PlayersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PlayersService);
export { PlayersService };
//# sourceMappingURL=players.service.js.map