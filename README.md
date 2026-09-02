# Football Scouting Platform Backend

## Stack
NestJS + TypeScript + PostgreSQL + Prisma + JWT + Argon2.

## Run
1. Copy `.env.example` to `.env`.
2. Run `npm install`.
3. Run `docker compose up -d`.
4. Run `npx prisma generate`.
5. Run `npx prisma migrate dev --name init_auth`.
6. Run `npm run prisma:seed`.
7. Run `npm run start:dev`.

API: `http://localhost:3000/api/v1`

Initial endpoints:
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /users/me

Public registration supports PLAYER, ACADEMY, SCOUT and COACH. ADMIN is provisioned by authorized administration.

This repository contains the public portfolio version of the platform, including authentication, role-based user profiles for players, coaches, scouts, academies, administrators, and super-admin controls. Active development and additional proprietary features continue in a private repository.
