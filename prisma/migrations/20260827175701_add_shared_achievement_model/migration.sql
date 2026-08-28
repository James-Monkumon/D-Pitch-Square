-- CreateEnum
CREATE TYPE "AchievementOwnerType" AS ENUM ('PLAYER', 'COACH', 'SCOUT');

-- CreateEnum
CREATE TYPE "AchievementVerificationStatus" AS ENUM ('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('AWARD', 'CHAMPIONSHIP', 'CERTIFICATION', 'MILESTONE', 'INTERNATIONAL_EXPERIENCE', 'NATIONAL_ACHIEVEMENT', 'STATE_ACHIEVEMENT', 'DISTRICT_ACHIEVEMENT', 'OTHER', 'PLAYER_AWARD', 'TEAM_TITLE', 'PERFORMANCE_MILESTONE', 'COACH_OF_THE_YEAR', 'TEAM_PROMOTION', 'PLAYERS_DEVELOPED', 'COACHING_LICENSE', 'ACADEMY_MILESTONE', 'PLAYER_DISCOVERED', 'PLAYER_SIGNED', 'PLAYER_PROMOTED', 'TOURNAMENT_SCOUTED', 'SCOUTING_CERTIFICATION', 'TALENT_DISCOVERY');

-- CreateTable
CREATE TABLE "achievements" (
    "id" UUID NOT NULL,
    "owner_type" "AchievementOwnerType" NOT NULL,
    "player_id" UUID,
    "coach_id" UUID,
    "scout_id" UUID,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "achievement_type" "AchievementType" NOT NULL,
    "achievement_date" TIMESTAMP(3),
    "organization" VARCHAR(200),
    "level" VARCHAR(100),
    "role" VARCHAR(150),
    "evidence_url" TEXT,
    "verification_status" "AchievementVerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "achievements_player_id_idx" ON "achievements"("player_id");

-- CreateIndex
CREATE INDEX "achievements_coach_id_idx" ON "achievements"("coach_id");

-- CreateIndex
CREATE INDEX "achievements_scout_id_idx" ON "achievements"("scout_id");

-- CreateIndex
CREATE INDEX "achievements_owner_type_idx" ON "achievements"("owner_type");

-- CreateIndex
CREATE INDEX "achievements_achievement_type_idx" ON "achievements"("achievement_type");

-- CreateIndex
CREATE INDEX "achievements_verification_status_idx" ON "achievements"("verification_status");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "scout_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
