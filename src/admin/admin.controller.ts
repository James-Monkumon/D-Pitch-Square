import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';

import { AdminService } from './admin.service.js';
import { UpdateVerificationDto } from './dto/update-verification.dto.js';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('players/:playerId/verification')
  verifyPlayer(
    @Param('playerId') playerId: string,
    @Body() dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyPlayer(
      playerId,
      dto.verificationStatus,
    );
  }

  @Patch('academies/:academyId/verification')
  verifyAcademy(
    @Param('academyId') academyId: string,
    @Body() dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyAcademy(
      academyId,
      dto.verificationStatus,
    );
  }

  @Patch('scouts/:scoutId/verification')
  verifyScout(
    @Param('scoutId') scoutId: string,
    @Body() dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyScout(
      scoutId,
      dto.verificationStatus,
    );
  }

  @Patch('coaches/:coachId/verification')
  verifyCoach(
    @Param('coachId') coachId: string,
    @Body() dto: UpdateVerificationDto,
  ) {
    return this.adminService.verifyCoach(
      coachId,
      dto.verificationStatus,
    );
  }
}