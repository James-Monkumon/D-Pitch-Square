/*
  Warnings:

  - You are about to drop the column `years_of_experience` on the `coach_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coach_profiles" DROP COLUMN "years_of_experience",
ADD COLUMN     "yearsOfExperience" INTEGER;

-- CreateTable
CREATE TABLE "player_likes" (
    "id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_likes" (
    "id" UUID NOT NULL,
    "academy_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academy_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scout_likes" (
    "id" UUID NOT NULL,
    "scout_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scout_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_likes" (
    "id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "player_likes_player_id_idx" ON "player_likes"("player_id");

-- CreateIndex
CREATE INDEX "player_likes_user_id_idx" ON "player_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "player_likes_player_id_user_id_key" ON "player_likes"("player_id", "user_id");

-- CreateIndex
CREATE INDEX "academy_likes_academy_id_idx" ON "academy_likes"("academy_id");

-- CreateIndex
CREATE INDEX "academy_likes_user_id_idx" ON "academy_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_likes_academy_id_user_id_key" ON "academy_likes"("academy_id", "user_id");

-- CreateIndex
CREATE INDEX "scout_likes_scout_id_idx" ON "scout_likes"("scout_id");

-- CreateIndex
CREATE INDEX "scout_likes_user_id_idx" ON "scout_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "scout_likes_scout_id_user_id_key" ON "scout_likes"("scout_id", "user_id");

-- CreateIndex
CREATE INDEX "coach_likes_coach_id_idx" ON "coach_likes"("coach_id");

-- CreateIndex
CREATE INDEX "coach_likes_user_id_idx" ON "coach_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_likes_coach_id_user_id_key" ON "coach_likes"("coach_id", "user_id");

-- AddForeignKey
ALTER TABLE "player_likes" ADD CONSTRAINT "player_likes_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_likes" ADD CONSTRAINT "player_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_likes" ADD CONSTRAINT "academy_likes_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_likes" ADD CONSTRAINT "academy_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_likes" ADD CONSTRAINT "scout_likes_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "scout_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_likes" ADD CONSTRAINT "scout_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_likes" ADD CONSTRAINT "coach_likes_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_likes" ADD CONSTRAINT "coach_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
