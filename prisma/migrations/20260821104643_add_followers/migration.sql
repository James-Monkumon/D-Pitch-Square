-- CreateEnum
CREATE TYPE "AcademyMediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateTable
CREATE TABLE "player_followers" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_player_memberships" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_player_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_coach_memberships" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "role" VARCHAR(150),
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_coach_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_teams" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "age_group" VARCHAR(100),
    "category" VARCHAR(100),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_team_players" (
    "id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "jersey_number" INTEGER,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_team_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_team_coaches" (
    "id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "role" VARCHAR(150),
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_team_coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_media" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "type" "AcademyMediaType" NOT NULL,
    "title" VARCHAR(200),
    "description" TEXT,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_followers" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academy_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_statistics" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "total_players" INTEGER NOT NULL DEFAULT 0,
    "total_coaches" INTEGER NOT NULL DEFAULT 0,
    "total_teams" INTEGER NOT NULL DEFAULT 0,
    "total_followers" INTEGER NOT NULL DEFAULT 0,
    "total_media" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academy_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scout_followers" (
    "id" UUID NOT NULL,
    "scout_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scout_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_followers" (
    "id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_followers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "player_followers_player_id_idx" ON "player_followers"("player_id");

-- CreateIndex
CREATE INDEX "player_followers_user_id_idx" ON "player_followers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "player_followers_player_id_user_id_key" ON "player_followers"("player_id", "user_id");

-- CreateIndex
CREATE INDEX "academy_player_memberships_academy_id_idx" ON "academy_player_memberships"("academy_id");

-- CreateIndex
CREATE INDEX "academy_player_memberships_player_id_idx" ON "academy_player_memberships"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_player_memberships_academy_id_player_id_key" ON "academy_player_memberships"("academy_id", "player_id");

-- CreateIndex
CREATE INDEX "academy_coach_memberships_academy_id_idx" ON "academy_coach_memberships"("academy_id");

-- CreateIndex
CREATE INDEX "academy_coach_memberships_coach_id_idx" ON "academy_coach_memberships"("coach_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_coach_memberships_academy_id_coach_id_key" ON "academy_coach_memberships"("academy_id", "coach_id");

-- CreateIndex
CREATE INDEX "academy_teams_academy_id_idx" ON "academy_teams"("academy_id");

-- CreateIndex
CREATE INDEX "academy_team_players_team_id_idx" ON "academy_team_players"("team_id");

-- CreateIndex
CREATE INDEX "academy_team_players_player_id_idx" ON "academy_team_players"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_team_players_team_id_player_id_key" ON "academy_team_players"("team_id", "player_id");

-- CreateIndex
CREATE INDEX "academy_team_coaches_team_id_idx" ON "academy_team_coaches"("team_id");

-- CreateIndex
CREATE INDEX "academy_team_coaches_coach_id_idx" ON "academy_team_coaches"("coach_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_team_coaches_team_id_coach_id_key" ON "academy_team_coaches"("team_id", "coach_id");

-- CreateIndex
CREATE INDEX "academy_media_academy_id_idx" ON "academy_media"("academy_id");

-- CreateIndex
CREATE INDEX "academy_media_type_idx" ON "academy_media"("type");

-- CreateIndex
CREATE INDEX "academy_followers_academy_id_idx" ON "academy_followers"("academy_id");

-- CreateIndex
CREATE INDEX "academy_followers_user_id_idx" ON "academy_followers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_followers_academy_id_user_id_key" ON "academy_followers"("academy_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_statistics_academy_id_key" ON "academy_statistics"("academy_id");

-- CreateIndex
CREATE INDEX "scout_followers_scout_id_idx" ON "scout_followers"("scout_id");

-- CreateIndex
CREATE INDEX "scout_followers_user_id_idx" ON "scout_followers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "scout_followers_scout_id_user_id_key" ON "scout_followers"("scout_id", "user_id");

-- CreateIndex
CREATE INDEX "coach_followers_coach_id_idx" ON "coach_followers"("coach_id");

-- CreateIndex
CREATE INDEX "coach_followers_user_id_idx" ON "coach_followers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_followers_coach_id_user_id_key" ON "coach_followers"("coach_id", "user_id");

-- AddForeignKey
ALTER TABLE "player_followers" ADD CONSTRAINT "player_followers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_followers" ADD CONSTRAINT "player_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_player_memberships" ADD CONSTRAINT "academy_player_memberships_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_player_memberships" ADD CONSTRAINT "academy_player_memberships_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_coach_memberships" ADD CONSTRAINT "academy_coach_memberships_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_coach_memberships" ADD CONSTRAINT "academy_coach_memberships_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_teams" ADD CONSTRAINT "academy_teams_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_team_players" ADD CONSTRAINT "academy_team_players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "academy_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_team_players" ADD CONSTRAINT "academy_team_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_team_coaches" ADD CONSTRAINT "academy_team_coaches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "academy_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_team_coaches" ADD CONSTRAINT "academy_team_coaches_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_media" ADD CONSTRAINT "academy_media_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_followers" ADD CONSTRAINT "academy_followers_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_followers" ADD CONSTRAINT "academy_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_statistics" ADD CONSTRAINT "academy_statistics_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_followers" ADD CONSTRAINT "scout_followers_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "scout_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_followers" ADD CONSTRAINT "scout_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_followers" ADD CONSTRAINT "coach_followers_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_followers" ADD CONSTRAINT "coach_followers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
