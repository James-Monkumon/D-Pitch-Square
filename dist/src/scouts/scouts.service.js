var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { AchievementOwnerType, AchievementType, } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let ScoutsService = class ScoutsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // =========================================================
    // PRIVATE HELPERS
    // =========================================================
    async verifyScoutRole(userId) {
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
        const isScout = user.roles.some((userRole) => userRole.role.name === 'SCOUT');
        if (!isScout) {
            throw new ForbiddenException('Only scout users can manage a scout profile');
        }
        return user;
    }
    async verifyScoutOwner(userId) {
        const scout = await this.prisma.scoutProfile.findUnique({
            where: {
                userId,
            },
        });
        if (!scout || scout.deletedAt) {
            throw new NotFoundException('Scout profile not found');
        }
        return scout;
    }
    async findActiveScout(scoutId) {
        const scout = await this.prisma.scoutProfile.findFirst({
            where: {
                id: scoutId,
                deletedAt: null,
            },
        });
        if (!scout) {
            throw new NotFoundException('Scout profile not found');
        }
        return scout;
    }
    allowedScoutAchievementTypes = [
        AchievementType.AWARD,
        AchievementType.CERTIFICATION,
        AchievementType.MILESTONE,
        AchievementType.INTERNATIONAL_EXPERIENCE,
        AchievementType.NATIONAL_ACHIEVEMENT,
        AchievementType.STATE_ACHIEVEMENT,
        AchievementType.DISTRICT_ACHIEVEMENT,
        AchievementType.OTHER,
        AchievementType.PLAYER_DISCOVERED,
        AchievementType.PLAYER_SIGNED,
        AchievementType.PLAYER_PROMOTED,
        AchievementType.TOURNAMENT_SCOUTED,
        AchievementType.SCOUTING_CERTIFICATION,
        AchievementType.TALENT_DISCOVERY,
    ];
    validateScoutAchievementType(type) {
        if (!this.allowedScoutAchievementTypes.includes(type)) {
            throw new BadRequestException('This achievement type is not allowed for scout profiles');
        }
    }
    // =========================================================
    // SCOUT PROFILE
    // =========================================================
    async createProfile(userId, dto) {
        await this.verifyScoutRole(userId);
        const existingProfile = await this.prisma.scoutProfile.findUnique({
            where: {
                userId,
            },
        });
        if (existingProfile &&
            existingProfile.deletedAt === null) {
            throw new ConflictException('Scout profile already exists');
        }
        if (existingProfile &&
            existingProfile.deletedAt !== null) {
            const restored = await this.prisma.scoutProfile.update({
                where: {
                    id: existingProfile.id,
                },
                data: {
                    fullName: dto.fullName,
                    profilePicture: dto.profilePicture,
                    organization: dto.organization,
                    country: dto.country,
                    state: dto.state,
                    city: dto.city,
                    role: dto.role,
                    biography: dto.biography,
                    contactEmail: dto.contactEmail,
                    contactPhone: dto.contactPhone,
                    socialMediaLinks: dto.socialMediaLinks,
                    deletedAt: null,
                },
            });
            return {
                success: true,
                message: 'Scout profile created successfully',
                data: restored,
            };
        }
        const scout = await this.prisma.scoutProfile.create({
            data: {
                userId,
                fullName: dto.fullName,
                profilePicture: dto.profilePicture,
                organization: dto.organization,
                country: dto.country,
                state: dto.state,
                city: dto.city,
                role: dto.role,
                biography: dto.biography,
                contactEmail: dto.contactEmail,
                contactPhone: dto.contactPhone,
                socialMediaLinks: dto.socialMediaLinks,
            },
        });
        return {
            success: true,
            message: 'Scout profile created successfully',
            data: scout,
        };
    }
    async getMyProfile(userId) {
        const scout = await this.verifyScoutOwner(userId);
        const profile = await this.prisma.scoutProfile.findUnique({
            where: {
                id: scout.id,
            },
            include: {
                achievements: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
        return {
            success: true,
            message: 'Scout profile retrieved successfully',
            data: profile,
        };
    }
    async updateProfile(userId, dto) {
        const scout = await this.verifyScoutOwner(userId);
        const updated = await this.prisma.scoutProfile.update({
            where: {
                id: scout.id,
            },
            data: {
                ...(dto.fullName !== undefined && {
                    fullName: dto.fullName,
                }),
                ...(dto.profilePicture !== undefined && {
                    profilePicture: dto.profilePicture,
                }),
                ...(dto.organization !== undefined && {
                    organization: dto.organization,
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
                ...(dto.role !== undefined && {
                    role: dto.role,
                }),
                ...(dto.biography !== undefined && {
                    biography: dto.biography,
                }),
                ...(dto.contactEmail !== undefined && {
                    contactEmail: dto.contactEmail,
                }),
                ...(dto.contactPhone !== undefined && {
                    contactPhone: dto.contactPhone,
                }),
                ...(dto.socialMediaLinks !== undefined && {
                    socialMediaLinks: dto.socialMediaLinks,
                }),
            },
        });
        return {
            success: true,
            message: 'Scout profile updated successfully',
            data: updated,
        };
    }
    async getProfileById(scoutId) {
        const scout = await this.prisma.scoutProfile.findFirst({
            where: {
                id: scoutId,
                deletedAt: null,
            },
            include: {
                achievements: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
        if (!scout) {
            throw new NotFoundException('Scout profile not found');
        }
        return {
            success: true,
            message: 'Scout profile retrieved successfully',
            data: scout,
        };
    }
    async deleteProfile(userId) {
        const scout = await this.verifyScoutOwner(userId);
        await this.prisma.scoutProfile.update({
            where: {
                id: scout.id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        return {
            success: true,
            message: 'Scout profile deleted successfully',
            data: null,
        };
    }
    // =========================================================
    // SCOUT ACHIEVEMENTS
    // =========================================================
    async createAchievement(userId, dto) {
        const scout = await this.verifyScoutOwner(userId);
        this.validateScoutAchievementType(dto.achievementType);
        const achievement = await this.prisma.achievement.create({
            data: {
                ownerType: AchievementOwnerType.SCOUT,
                scoutId: scout.id,
                playerId: null,
                coachId: null,
                title: dto.title,
                description: dto.description,
                achievementType: dto.achievementType,
                achievementDate: dto.achievementDate
                    ? new Date(dto.achievementDate)
                    : null,
                organization: dto.organization,
                level: dto.level,
                role: dto.role,
                evidenceUrl: dto.evidenceUrl,
            },
        });
        return {
            success: true,
            message: 'Scout achievement created successfully',
            data: achievement,
        };
    }
    async getMyAchievements(userId) {
        const scout = await this.verifyScoutOwner(userId);
        const achievements = await this.prisma.achievement.findMany({
            where: {
                ownerType: AchievementOwnerType.SCOUT,
                scoutId: scout.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return {
            success: true,
            message: 'Scout achievements retrieved successfully',
            data: achievements,
        };
    }
    async updateAchievement(userId, achievementId, dto) {
        const scout = await this.verifyScoutOwner(userId);
        const achievement = await this.prisma.achievement.findFirst({
            where: {
                id: achievementId,
                ownerType: AchievementOwnerType.SCOUT,
                scoutId: scout.id,
            },
        });
        if (!achievement) {
            throw new NotFoundException('Scout achievement not found');
        }
        if (dto.achievementType !== undefined) {
            this.validateScoutAchievementType(dto.achievementType);
        }
        const updated = await this.prisma.achievement.update({
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
                ...(dto.achievementType !== undefined && {
                    achievementType: dto.achievementType,
                }),
                ...(dto.achievementDate !== undefined && {
                    achievementDate: dto.achievementDate
                        ? new Date(dto.achievementDate)
                        : null,
                }),
                ...(dto.organization !== undefined && {
                    organization: dto.organization,
                }),
                ...(dto.level !== undefined && {
                    level: dto.level,
                }),
                ...(dto.role !== undefined && {
                    role: dto.role,
                }),
                ...(dto.evidenceUrl !== undefined && {
                    evidenceUrl: dto.evidenceUrl,
                }),
            },
        });
        return {
            success: true,
            message: 'Scout achievement updated successfully',
            data: updated,
        };
    }
    async deleteAchievement(userId, achievementId) {
        const scout = await this.verifyScoutOwner(userId);
        const achievement = await this.prisma.achievement.findFirst({
            where: {
                id: achievementId,
                ownerType: AchievementOwnerType.SCOUT,
                scoutId: scout.id,
            },
        });
        if (!achievement) {
            throw new NotFoundException('Scout achievement not found');
        }
        await this.prisma.achievement.delete({
            where: {
                id: achievementId,
            },
        });
        return {
            success: true,
            message: 'Scout achievement deleted successfully',
            data: null,
        };
    }
    // =========================================================
    // SCOUT FOLLOW
    // =========================================================
    async followScout(userId, scoutId) {
        const scout = await this.findActiveScout(scoutId);
        if (scout.userId === userId) {
            throw new ForbiddenException('You cannot follow your own scout profile');
        }
        const existing = await this.prisma.scoutFollower.findUnique({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        if (existing) {
            return {
                success: true,
                message: 'Already following scout',
                data: {
                    following: true,
                },
            };
        }
        await this.prisma.scoutFollower.create({
            data: {
                scoutId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Scout followed successfully',
            data: {
                following: true,
            },
        };
    }
    async unfollowScout(userId, scoutId) {
        await this.findActiveScout(scoutId);
        const existing = await this.prisma.scoutFollower.findUnique({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        if (!existing) {
            return {
                success: true,
                message: 'Scout is not being followed',
                data: {
                    following: false,
                },
            };
        }
        await this.prisma.scoutFollower.delete({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Scout unfollowed successfully',
            data: {
                following: false,
            },
        };
    }
    async isFollowingScout(userId, scoutId) {
        await this.findActiveScout(scoutId);
        const follow = await this.prisma.scoutFollower.findUnique({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Scout follow status retrieved successfully',
            data: {
                following: !!follow,
            },
        };
    }
    async getScoutFollowerCount(scoutId) {
        await this.findActiveScout(scoutId);
        const followers = await this.prisma.scoutFollower.count({
            where: {
                scoutId,
            },
        });
        return {
            success: true,
            message: 'Scout follower count retrieved successfully',
            data: {
                followers,
            },
        };
    }
    // =========================================================
    // SCOUT LIKE
    // =========================================================
    async likeScout(userId, scoutId) {
        const scout = await this.findActiveScout(scoutId);
        if (scout.userId === userId) {
            throw new ForbiddenException('You cannot like your own scout profile');
        }
        const existing = await this.prisma.scoutLike.findUnique({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        if (existing) {
            return {
                success: true,
                message: 'Scout already liked',
                data: {
                    liked: true,
                },
            };
        }
        await this.prisma.scoutLike.create({
            data: {
                scoutId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Scout liked successfully',
            data: {
                liked: true,
            },
        };
    }
    async unlikeScout(userId, scoutId) {
        await this.findActiveScout(scoutId);
        const existing = await this.prisma.scoutLike.findUnique({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        if (!existing) {
            return {
                success: true,
                message: 'Scout is not liked',
                data: {
                    liked: false,
                },
            };
        }
        await this.prisma.scoutLike.delete({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Scout unliked successfully',
            data: {
                liked: false,
            },
        };
    }
    async isScoutLiked(userId, scoutId) {
        await this.findActiveScout(scoutId);
        const like = await this.prisma.scoutLike.findUnique({
            where: {
                scoutId_userId: {
                    scoutId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Scout like status retrieved successfully',
            data: {
                liked: !!like,
            },
        };
    }
    async getScoutLikesCount(scoutId) {
        await this.findActiveScout(scoutId);
        const count = await this.prisma.scoutLike.count({
            where: {
                scoutId,
            },
        });
        return {
            success: true,
            message: 'Scout likes count retrieved successfully',
            data: {
                count,
            },
        };
    }
};
ScoutsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ScoutsService);
export { ScoutsService };
//# sourceMappingURL=scouts.service.js.map