import type { Request } from 'express';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    me(req: Request & {
        user: {
            sub: string;
        };
    }): Promise<{
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
