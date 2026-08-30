import { Module } from '@nestjs/common';

import {
  AuthModule,
} from '../auth/auth.module.js';

import {
  AdminController,
} from './admin.controller.js';

import {
  AdminService,
} from './admin.service.js';

import {
  SuperAdminController,
} from './super-admin.controller.js';

import {
  SuperAdminService,
} from './super-admin.service.js';

@Module({
  imports: [
    AuthModule,
  ],

  controllers: [
    AdminController,
    SuperAdminController,
  ],

  providers: [
    AdminService,
    SuperAdminService,
  ],
})
export class AdminModule {}