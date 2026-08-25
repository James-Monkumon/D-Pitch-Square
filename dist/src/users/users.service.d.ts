import { PrismaService } from '../prisma/prisma.service.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            email: string;
            status: import("@prisma/client").$Enums.UserStatus;
            emailVerifiedAt: Date | null;
            roles: string[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
