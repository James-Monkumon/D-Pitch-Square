import { AdminService } from './admin.service.js';
import { UpdateVerificationDto } from './dto/update-verification.dto.js';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    verifyPlayer(playerId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
        };
    }>;
    verifyAcademy(academyId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
            academyName: string;
        };
    }>;
    verifyScout(scoutId: string, dto: UpdateVerificationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            fullName: string;
            verificationStatus: import("@prisma/client").$Enums.VerificationStatus;
            updatedAt: Date;
        };
    }>;
    verifyCoach(coachId: string, dto: UpdateVerificationDto): Promise<{
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
