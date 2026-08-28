/*
  Warnings:

  - You are about to drop the `player_achievements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "player_achievements" DROP CONSTRAINT "player_achievements_player_id_fkey";

-- DropTable
DROP TABLE "player_achievements";
