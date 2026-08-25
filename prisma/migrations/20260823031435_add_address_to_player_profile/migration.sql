/*
  Warnings:

  - You are about to drop the column `appearances` on the `player_statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "player_achievements" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "player_profiles" ADD COLUMN     "address" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "player_statistics" DROP COLUMN "appearances",
ADD COLUMN     "matches_played" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "matches_started" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minutes_played" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "red_cards" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "saves" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "yellow_cards" INTEGER NOT NULL DEFAULT 0;
