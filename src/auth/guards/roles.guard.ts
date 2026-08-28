import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const roles: string[] = user.roles ?? [];

    if (!roles.includes('ADMIN')) {
      throw new ForbiddenException('Admin role required');
    }

    return true;
  }
}