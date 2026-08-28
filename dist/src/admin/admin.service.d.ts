import { PrismaService } from '../prisma/prisma.service.js';
import { AdminVerificationDecision } from './dto/update-verification.dto.js';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    verifyPlayer(playerId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
        };
    }>;
    verifyAcademy(academyId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
            academyName: string;
        };
    }>;
    verifyScout(scoutId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
        };
    }>;
    verifyCoach(coachId: string, status: AdminVerificationDecision): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
        };
    }>;
}
