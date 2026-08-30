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
let AcademiesService = class AcademiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // =========================================================
    // PRIVATE HELPERS
    // =========================================================
    /**
     * Verify that the authenticated user owns
     * the academy and that the academy is active.
     */
    async verifyAcademyOwner(userId, academyId) {
        const academy = await this.prisma.academyProfile.findFirst({
            where: {
                id: academyId,
                userId,
                deletedAt: null,
            },
        });
        if (!academy) {
            throw new ForbiddenException('You cannot manage this academy');
        }
        return academy;
    }
    /**
     * Find an active academy or throw.
     */
    async getActiveAcademy(academyId) {
        const academy = await this.prisma.academyProfile.findFirst({
            where: {
                id: academyId,
                deletedAt: null,
            },
        });
        if (!academy) {
            throw new NotFoundException('Academy profile not found');
        }
        return academy;
    }
    // =========================================================
    // ACADEMY PROFILE
    // =========================================================
    /**
     * Create an academy profile.
     *
     * If the user previously had an academy profile that was
     * soft-deleted, that profile is restored and reused.
     *
     * POST /api/v1/academies
     */
    async createAcademy(userId, dto) {
        if (!userId) {
            throw new ForbiddenException('Authenticated user ID is missing');
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
            throw new NotFoundException('User not found');
        }
        const isAcademy = user.roles.some((userRole) => userRole.role.name === 'ACADEMY');
        if (!isAcademy) {
            throw new ForbiddenException('Only academy users can create an academy profile');
        }
        /*
         * AcademyProfile.userId is unique.
         *
         * Therefore, if a previous profile exists and was
         * soft-deleted, restore that same row instead of
         * attempting to create another one.
         */
        const existingProfile = await this.prisma.academyProfile.findUnique({
            where: {
                userId,
            },
        });
        if (existingProfile &&
            existingProfile.deletedAt === null) {
            throw new ConflictException('Academy profile already exists');
        }
        if (existingProfile &&
            existingProfile.deletedAt !== null) {
            const restoredAcademy = await this.prisma.academyProfile.update({
                where: {
                    id: existingProfile.id,
                },
                data: {
                    logoUrl: dto.logoUrl,
                    coverImageUrl: dto.coverImageUrl,
                    academyName: dto.academyName,
                    country: dto.country,
                    state: dto.state,
                    city: dto.city,
                    address: dto.address,
                    foundedYear: dto.foundedYear,
                    description: dto.description,
                    contactEmail: dto.contactEmail,
                    contactPhone: dto.contactPhone,
                    websiteUrl: dto.websiteUrl,
                    socialMediaLinks: dto.socialMediaLinks,
                    deletedAt: null,
                },
            });
            return {
                success: true,
                message: 'Academy profile created successfully',
                data: restoredAcademy,
            };
        }
        const academy = await this.prisma.academyProfile.create({
            data: {
                userId,
                academyName: dto.academyName,
                logoUrl: dto.logoUrl,
                coverImageUrl: dto.coverImageUrl,
                country: dto.country,
                state: dto.state,
                city: dto.city,
                address: dto.address,
                foundedYear: dto.foundedYear,
                description: dto.description,
                contactEmail: dto.contactEmail,
                contactPhone: dto.contactPhone,
                websiteUrl: dto.websiteUrl,
                socialMediaLinks: dto.socialMediaLinks,
            },
        });
        return {
            success: true,
            message: 'Academy profile created successfully',
            data: academy,
        };
    }
    /**
     * Get a paginated list of academies.
     *
     * GET /api/v1/academies
     */
    async getAcademies(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
            ...(query.country && {
                country: {
                    equals: query.country,
                    mode: 'insensitive',
                },
            }),
            ...(query.state && {
                state: {
                    equals: query.state,
                    mode: 'insensitive',
                },
            }),
            ...(query.city && {
                city: {
                    equals: query.city,
                    mode: 'insensitive',
                },
            }),
            ...(query.search && {
                academyName: {
                    contains: query.search,
                    mode: 'insensitive',
                },
            }),
        };
        const [academies, total,] = await this.prisma.$transaction([
            this.prisma.academyProfile.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.academyProfile.count({
                where,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Academies retrieved successfully',
            data: academies,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    /**
     * Get one academy profile.
     *
     * GET /api/v1/academies/:academyId
     */
    async getAcademyById(academyId) {
        const academy = await this.getActiveAcademy(academyId);
        return {
            success: true,
            message: 'Academy profile retrieved successfully',
            data: academy,
        };
    }
    /**
     * Update an academy.
     *
     * PATCH /api/v1/academies/:academyId
     */
    async updateAcademy(userId, academyId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        const updated = await this.prisma.academyProfile.update({
            where: {
                id: academyId,
            },
            data: {
                ...(dto.academyName !== undefined && {
                    academyName: dto.academyName,
                }),
                ...(dto.logoUrl !== undefined && {
                    logoUrl: dto.logoUrl,
                }),
                ...(dto.coverImageUrl !== undefined && {
                    coverImageUrl: dto.coverImageUrl,
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
                ...(dto.foundedYear !== undefined && {
                    foundedYear: dto.foundedYear,
                }),
                ...(dto.description !== undefined && {
                    description: dto.description,
                }),
                ...(dto.contactEmail !== undefined && {
                    contactEmail: dto.contactEmail,
                }),
                ...(dto.contactPhone !== undefined && {
                    contactPhone: dto.contactPhone,
                }),
                ...(dto.websiteUrl !== undefined && {
                    websiteUrl: dto.websiteUrl,
                }),
                ...(dto.socialMediaLinks !== undefined && {
                    socialMediaLinks: dto.socialMediaLinks,
                }),
            },
        });
        return {
            success: true,
            message: 'Academy profile updated successfully',
            data: updated,
        };
    }
    /**
     * Soft-delete an academy.
     *
     * DELETE /api/v1/academies/:academyId
     */
    async deleteAcademy(userId, academyId) {
        await this.verifyAcademyOwner(userId, academyId);
        await this.prisma.academyProfile.update({
            where: {
                id: academyId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        return {
            success: true,
            message: 'Academy profile deleted successfully',
            data: null,
        };
    }
    // =========================================================
    // ACADEMY PLAYERS
    // =========================================================
    /**
     * Get all active players belonging
     * to an academy.
     *
     * GET /api/v1/academies/:academyId/players
     */
    async getAcademyPlayers(academyId) {
        await this.getActiveAcademy(academyId);
        const memberships = await this.prisma.academyPlayerMembership.findMany({
            where: {
                academyId,
                leftAt: null,
            },
            select: {
                id: true,
                playerId: true,
                joinedAt: true,
                leftAt: true,
                player: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePicture: true,
                        nationality: true,
                        country: true,
                        state: true,
                        city: true,
                        currentClub: true,
                        currentAcademyName: true,
                        height: true,
                        weight: true,
                        preferredFoot: true,
                        primaryPosition: true,
                        secondaryPosition: true,
                        jerseyNumber: true,
                    },
                },
            },
            orderBy: {
                joinedAt: 'desc',
            },
        });
        return {
            success: true,
            message: 'Academy players retrieved successfully',
            data: memberships,
        };
    }
    /**
     * Add a player to an academy.
     *
     * If a previous academy membership exists and was
     * soft-removed, reactivate the same row.
     *
     * POST /api/v1/academies/:academyId/players
     */
    async addAcademyPlayer(userId, academyId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                id: dto.playerId,
            },
        });
        if (!player) {
            throw new NotFoundException('Player profile not found');
        }
        const existing = await this.prisma.academyPlayerMembership.findUnique({
            where: {
                academyId_playerId: {
                    academyId,
                    playerId: dto.playerId,
                },
            },
        });
        if (existing) {
            if (!existing.leftAt) {
                throw new ConflictException('Player is already a member of this academy');
            }
            const reactivated = await this.prisma.academyPlayerMembership.update({
                where: {
                    id: existing.id,
                },
                data: {
                    joinedAt: new Date(),
                    leftAt: null,
                },
                select: {
                    id: true,
                    academyId: true,
                    playerId: true,
                    joinedAt: true,
                    leftAt: true,
                    player: {
                        select: {
                            id: true,
                            fullName: true,
                            profilePicture: true,
                            primaryPosition: true,
                            secondaryPosition: true,
                            preferredFoot: true,
                        },
                    },
                },
            });
            return {
                success: true,
                message: 'Player membership reactivated successfully',
                data: reactivated,
            };
        }
        const membership = await this.prisma.academyPlayerMembership.create({
            data: {
                academyId,
                playerId: dto.playerId,
            },
            select: {
                id: true,
                academyId: true,
                playerId: true,
                joinedAt: true,
                leftAt: true,
                player: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePicture: true,
                        primaryPosition: true,
                        secondaryPosition: true,
                        preferredFoot: true,
                    },
                },
            },
        });
        return {
            success: true,
            message: 'Player added to academy successfully',
            data: membership,
        };
    }
    /**
     * Remove a player from an academy.
     *
     * The academy membership and any currently active team
     * assignments inside this academy are soft-removed.
     *
     * DELETE /api/v1/academies/:academyId/players/:playerId
     */
    async removeAcademyPlayer(userId, academyId, playerId) {
        await this.verifyAcademyOwner(userId, academyId);
        const membership = await this.prisma.academyPlayerMembership.findUnique({
            where: {
                academyId_playerId: {
                    academyId,
                    playerId,
                },
            },
        });
        if (!membership ||
            membership.leftAt) {
            throw new NotFoundException('Player is not an active member of this academy');
        }
        const now = new Date();
        await this.prisma.$transaction([
            /*
             * Soft-remove all active team assignments
             * belonging to this academy.
             *
             * Historical team membership rows are preserved.
             */
            this.prisma.academyTeamPlayer.updateMany({
                where: {
                    playerId,
                    leftAt: null,
                    team: {
                        academyId,
                    },
                },
                data: {
                    leftAt: now,
                },
            }),
            /*
             * Soft-remove the academy-level membership.
             */
            this.prisma.academyPlayerMembership.update({
                where: {
                    id: membership.id,
                },
                data: {
                    leftAt: now,
                },
            }),
        ]);
        return {
            success: true,
            message: 'Player removed from academy successfully',
            data: null,
        };
    }
    // =========================================================
    // ACADEMY STATISTICS
    // =========================================================
    /**
     * Get academy statistics.
     *
     * GET /api/v1/academies/:academyId/statistics
     */
    async getAcademyStatistics(academyId) {
        await this.getActiveAcademy(academyId);
        const [totalPlayers, totalCoaches, totalTeams, totalFollowers,] = await this.prisma.$transaction([
            this.prisma.academyPlayerMembership.count({
                where: {
                    academyId,
                    leftAt: null,
                },
            }),
            this.prisma.academyCoachMembership.count({
                where: {
                    academyId,
                    leftAt: null,
                },
            }),
            this.prisma.academyTeam.count({
                where: {
                    academyId,
                },
            }),
            this.prisma.academyFollower.count({
                where: {
                    academyId,
                },
            }),
        ]);
        return {
            success: true,
            message: 'Academy statistics retrieved successfully',
            data: {
                totalPlayers,
                totalCoaches,
                totalTeams,
                totalFollowers,
            },
        };
    }
    // =========================================================
    // ACADEMY VERIFICATION
    // =========================================================
    /**
     * Request academy verification.
     *
     * POST /api/v1/academies/:academyId/verification/request
     */
    async requestVerification(userId, academyId) {
        const academy = await this.verifyAcademyOwner(userId, academyId);
        if (academy.verificationStatus === 'PENDING') {
            throw new ConflictException('Academy verification is already pending');
        }
        if (academy.verificationStatus === 'APPROVED') {
            throw new ConflictException('Academy is already verified');
        }
        const updated = await this.prisma.academyProfile.update({
            where: {
                id: academyId,
            },
            data: {
                verificationStatus: 'PENDING',
            },
        });
        return {
            success: true,
            message: 'Academy verification requested successfully',
            data: {
                verificationStatus: updated.verificationStatus,
            },
        };
    }
    // =========================================================
    // ACADEMY COACHES
    // =========================================================
    /**
     * Get all active coaches belonging
     * to an academy.
     *
     * GET /api/v1/academies/:academyId/coaches
     */
    async getAcademyCoaches(academyId) {
        await this.getActiveAcademy(academyId);
        const memberships = await this.prisma.academyCoachMembership.findMany({
            where: {
                academyId,
                leftAt: null,
            },
            select: {
                id: true,
                coachId: true,
                role: true,
                joinedAt: true,
                leftAt: true,
                coach: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePicture: true,
                        country: true,
                        state: true,
                        city: true,
                        currentAcademyClub: true,
                        coachingRole: true,
                        coachingLicense: true,
                        coachingCertification: true,
                        yearsOfExperience: true,
                    },
                },
            },
            orderBy: {
                joinedAt: 'desc',
            },
        });
        return {
            success: true,
            message: 'Academy coaches retrieved successfully',
            data: memberships,
        };
    }
    /**
     * Add a coach to an academy.
     *
     * If a previous academy membership exists and was
     * soft-removed, reactivate the same row.
     *
     * POST /api/v1/academies/:academyId/coaches
     */
    async addAcademyCoach(userId, academyId, dto) {
        await this.verifyAcademyOwner(userId, academyId);
        const coach = await this.prisma.coachProfile.findUnique({
            where: {
                id: dto.coachId,
            },
        });
        if (!coach) {
            throw new NotFoundException('Coach profile not found');
        }
        const existing = await this.prisma.academyCoachMembership.findUnique({
            where: {
                academyId_coachId: {
                    academyId,
                    coachId: dto.coachId,
                },
            },
        });
        if (existing) {
            if (!existing.leftAt) {
                throw new ConflictException('Coach is already a member of this academy');
            }
            const reactivated = await this.prisma.academyCoachMembership.update({
                where: {
                    id: existing.id,
                },
                data: {
                    role: dto.role,
                    joinedAt: new Date(),
                    leftAt: null,
                },
                select: {
                    id: true,
                    academyId: true,
                    coachId: true,
                    role: true,
                    joinedAt: true,
                    leftAt: true,
                    coach: {
                        select: {
                            id: true,
                            fullName: true,
                            profilePicture: true,
                            coachingRole: true,
                            yearsOfExperience: true,
                        },
                    },
                },
            });
            return {
                success: true,
                message: 'Coach membership reactivated successfully',
                data: reactivated,
            };
        }
        const membership = await this.prisma.academyCoachMembership.create({
            data: {
                academyId,
                coachId: dto.coachId,
                role: dto.role,
            },
            select: {
                id: true,
                academyId: true,
                coachId: true,
                role: true,
                joinedAt: true,
                leftAt: true,
                coach: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePicture: true,
                        coachingRole: true,
                        yearsOfExperience: true,
                    },
                },
            },
        });
        return {
            success: true,
            message: 'Coach added to academy successfully',
            data: membership,
        };
    }
    /**
     * Remove a coach from an academy.
     *
     * The academy membership and any active team assignments
     * in this academy are soft-removed.
     *
     * DELETE /api/v1/academies/:academyId/coaches/:coachId
     */
    async removeAcademyCoach(userId, academyId, coachId) {
        await this.verifyAcademyOwner(userId, academyId);
        const membership = await this.prisma.academyCoachMembership.findUnique({
            where: {
                academyId_coachId: {
                    academyId,
                    coachId,
                },
            },
        });
        if (!membership ||
            membership.leftAt) {
            throw new NotFoundException('Coach is not an active member of this academy');
        }
        const now = new Date();
        await this.prisma.$transaction([
            /*
             * Soft-remove all current team assignments
             * in this academy.
             */
            this.prisma.academyTeamCoach.updateMany({
                where: {
                    coachId,
                    leftAt: null,
                    team: {
                        academyId,
                    },
                },
                data: {
                    leftAt: now,
                },
            }),
            /*
             * Soft-remove academy-level membership.
             */
            this.prisma.academyCoachMembership.update({
                where: {
                    id: membership.id,
                },
                data: {
                    leftAt: now,
                },
            }),
        ]);
        return {
            success: true,
            message: 'Coach removed from academy successfully',
            data: null,
        };
    }
    // =========================================================
    // ACADEMY FOLLOW
    // =========================================================
    /**
     * Follow an academy.
     *
     * POST /api/v1/academies/:academyId/follow
     */
    async followAcademy(userId, academyId) {
        const academy = await this.getActiveAcademy(academyId);
        if (academy.userId === userId) {
            throw new ForbiddenException('You cannot follow your own academy profile');
        }
        const existingFollow = await this.prisma.academyFollower.findUnique({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        if (existingFollow) {
            return {
                success: true,
                message: 'Already following academy',
                data: {
                    following: true,
                },
            };
        }
        await this.prisma.academyFollower.create({
            data: {
                academyId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Academy followed successfully',
            data: {
                following: true,
            },
        };
    }
    /**
     * Unfollow an academy.
     *
     * DELETE /api/v1/academies/:academyId/follow
     */
    async unfollowAcademy(userId, academyId) {
        await this.getActiveAcademy(academyId);
        const existingFollow = await this.prisma.academyFollower.findUnique({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        if (!existingFollow) {
            return {
                success: true,
                message: 'Academy is not being followed',
                data: {
                    following: false,
                },
            };
        }
        await this.prisma.academyFollower.delete({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Academy unfollowed successfully',
            data: {
                following: false,
            },
        };
    }
    /**
     * Check whether a user follows an academy.
     *
     * GET /api/v1/academies/:academyId/is-following
     */
    async isFollowingAcademy(userId, academyId) {
        await this.getActiveAcademy(academyId);
        const follow = await this.prisma.academyFollower.findUnique({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Academy follow status retrieved successfully',
            data: {
                following: !!follow,
            },
        };
    }
    /**
     * Get academy follower count.
     *
     * GET /api/v1/academies/:academyId/followers/count
     */
    async getAcademyFollowerCount(academyId) {
        await this.getActiveAcademy(academyId);
        const followers = await this.prisma.academyFollower.count({
            where: {
                academyId,
            },
        });
        return {
            success: true,
            message: 'Academy follower count retrieved successfully',
            data: {
                followers,
            },
        };
    }
    // =========================================================
    // ACADEMY LIKE
    // =========================================================
    /**
     * Like an academy.
     *
     * POST /api/v1/academies/:academyId/like
     */
    async likeAcademy(userId, academyId) {
        const academy = await this.getActiveAcademy(academyId);
        if (academy.userId === userId) {
            throw new ForbiddenException('You cannot like your own academy profile');
        }
        const existingLike = await this.prisma.academyLike.findUnique({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        if (existingLike) {
            return {
                success: true,
                message: 'Academy already liked',
                data: {
                    liked: true,
                },
            };
        }
        await this.prisma.academyLike.create({
            data: {
                academyId,
                userId,
            },
        });
        return {
            success: true,
            message: 'Academy liked successfully',
            data: {
                liked: true,
            },
        };
    }
    /**
     * Unlike an academy.
     *
     * DELETE /api/v1/academies/:academyId/like
     */
    async unlikeAcademy(userId, academyId) {
        await this.getActiveAcademy(academyId);
        const existingLike = await this.prisma.academyLike.findUnique({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        if (!existingLike) {
            return {
                success: true,
                message: 'Academy is not liked',
                data: {
                    liked: false,
                },
            };
        }
        await this.prisma.academyLike.delete({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Academy unliked successfully',
            data: {
                liked: false,
            },
        };
    }
    /**
     * Check whether the authenticated user
     * likes an academy.
     *
     * GET /api/v1/academies/:academyId/is-liked
     */
    async isAcademyLiked(userId, academyId) {
        await this.getActiveAcademy(academyId);
        const like = await this.prisma.academyLike.findUnique({
            where: {
                academyId_userId: {
                    academyId,
                    userId,
                },
            },
        });
        return {
            success: true,
            message: 'Academy like status retrieved successfully',
            data: {
                liked: !!like,
            },
        };
    }
    /**
     * Get total number of likes for an academy.
     *
     * GET /api/v1/academies/:academyId/likes/count
     */
    async getAcademyLikesCount(academyId) {
        await this.getActiveAcademy(academyId);
        const count = await this.prisma.academyLike.count({
            where: {
                academyId,
            },
        });
        return {
            success: true,
            message: 'Academy likes count retrieved successfully',
            data: {
                count,
            },
        };
    }
};
AcademiesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AcademiesService);
export { AcademiesService };
//# sourceMappingURL=academies.service.js.map