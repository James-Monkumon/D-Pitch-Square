-- CreateEnum
CREATE TYPE "PreferredFoot" AS ENUM ('LEFT', 'RIGHT', 'BOTH');

-- CreateEnum
CREATE TYPE "PlayerPosition" AS ENUM ('GOALKEEPER', 'CENTER_BACK', 'LEFT_BACK', 'RIGHT_BACK', 'DEFENSIVE_MIDFIELDER', 'CENTRAL_MIDFIELDER', 'ATTACKING_MIDFIELDER', 'LEFT_WINGER', 'RIGHT_WINGER', 'SECOND_STRIKER', 'STRIKER');

-- CreateTable
CREATE TABLE "player_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "profile_picture" TEXT,
    "cover_photo" TEXT,
    "full_name" VARCHAR(150) NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "nationality" VARCHAR(100),
    "country" VARCHAR(100),
    "state" VARCHAR(100),
    "city" VARCHAR(100),
    "current_club" TEXT,
    "current_academy_name" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "preferred_foot" "PreferredFoot",
    "primary_position" "PlayerPosition",
    "secondary_position" "PlayerPosition",
    "jersey_number" INTEGER,
    "biography" TEXT,
    "contact_information" TEXT,
    "social_media_links" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_statistics" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "appearances" INTEGER NOT NULL DEFAULT 0,
    "clean_sheets" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_achievements" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "year" INTEGER,
    "organization" VARCHAR(150),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_profiles_user_id_key" ON "player_profiles"("user_id");

-- CreateIndex
CREATE INDEX "player_profiles_nationality_idx" ON "player_profiles"("nationality");

-- CreateIndex
CREATE INDEX "player_profiles_country_idx" ON "player_profiles"("country");

-- CreateIndex
CREATE INDEX "player_profiles_state_idx" ON "player_profiles"("state");

-- CreateIndex
CREATE INDEX "player_profiles_city_idx" ON "player_profiles"("city");

-- CreateIndex
CREATE INDEX "player_profiles_primary_position_idx" ON "player_profiles"("primary_position");

-- CreateIndex
CREATE INDEX "player_profiles_preferred_foot_idx" ON "player_profiles"("preferred_foot");

-- CreateIndex
CREATE INDEX "player_profiles_date_of_birth_idx" ON "player_profiles"("date_of_birth");

-- CreateIndex
CREATE INDEX "player_profiles_current_academy_name_idx" ON "player_profiles"("current_academy_name");

-- CreateIndex
CREATE INDEX "player_profiles_height_idx" ON "player_profiles"("height");

-- CreateIndex
CREATE UNIQUE INDEX "player_statistics_player_id_key" ON "player_statistics"("player_id");

-- CreateIndex
CREATE INDEX "player_achievements_player_id_idx" ON "player_achievements"("player_id");

-- AddForeignKey
ALTER TABLE "player_profiles" ADD CONSTRAINT "player_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_statistics" ADD CONSTRAINT "player_statistics_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_achievements" ADD CONSTRAINT "player_achievements_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
