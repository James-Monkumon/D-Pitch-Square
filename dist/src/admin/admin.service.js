var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async verifyPlayer(playerId, status) {
        const player = await this.prisma.playerProfile.findUnique({
            where: {
                id: playerId,
            },
        });
        if (!player) {
            throw new NotFoundException('Player profile not found');
        }
        if (player.verificationStatus !== 'PENDING') {
            throw new BadRequestException(`Player verification cannot be changed from ${player.verificationStatus}`);
        }
        const updatedPlayer = await this.prisma.playerProfile.update({
            where: {
                id: playerId,
            },
            data: {
                verificationStatus: status,
            },
            select: {
                id: true,
                fullName: true,
                verificationStatus: true,
                updatedAt: true,
            },
        });
        return {
            success: true,
            message: `Player verification ${status.toLowerCase()} successfully`,
            data: updatedPlayer,
        };
    }
    async verifyAcademy(academyId, status) {
        const academy = await this.prisma.academyProfile.findUnique({
            where: {
                id: academyId,
            },
        });
        if (!academy) {
            throw new NotFoundException('Academy profile not found');
        }
        if (academy.verificationStatus !== 'PENDING') {
            throw new BadRequestException(`Academy verification cannot be changed from ${academy.verificationStatus}`);
        }
        const updatedAcademy = await this.prisma.academyProfile.update({
            where: {
                id: academyId,
            },
            data: {
                verificationStatus: status,
            },
            select: {
                id: true,
                academyName: true,
                verificationStatus: true,
                updatedAt: true,
            },
        });
        return {
            success: true,
            message: `Academy verification ${status.toLowerCase()} successfully`,
            data: updatedAcademy,
        };
    }
    async verifyScout(scoutId, status) {
        const scout = await this.prisma.scoutProfile.findUnique({
            where: {
                id: scoutId,
            },
        });
        if (!scout) {
            throw new NotFoundException('Scout profile not found');
        }
        if (scout.verificationStatus !== 'PENDING') {
            throw new BadRequestException(`Scout verification cannot be changed from ${scout.verificationStatus}`);
        }
        const updatedScout = await this.prisma.scoutProfile.update({
            where: {
                id: scoutId,
            },
            data: {
                verificationStatus: status,
            },
            select: {
                id: true,
                fullName: true,
                verificationStatus: true,
                updatedAt: true,
            },
        });
        return {
            success: true,
            message: `Scout verification ${status.toLowerCase()} successfully`,
            data: updatedScout,
        };
    }
    async verifyCoach(coachId, status) {
        const coach = await this.prisma.coachProfile.findUnique({
            where: {
                id: coachId,
            },
        });
        if (!coach) {
            throw new NotFoundException('Coach profile not found');
        }
        if (coach.verificationStatus !== 'PENDING') {
            throw new BadRequestException(`Coach verification cannot be changed from ${coach.verificationStatus}`);
        }
        const updatedCoach = await this.prisma.coachProfile.update({
            where: {
                id: coachId,
            },
            data: {
                verificationStatus: status,
            },
            select: {
                id: true,
                fullName: true,
                verificationStatus: true,
                updatedAt: true,
            },
        });
        return {
            success: true,
            message: `Coach verification ${status.toLowerCase()} successfully`,
            data: updatedCoach,
        };
    }
};
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map