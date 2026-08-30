-- AlterTable
ALTER TABLE "academy_teams" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "academy_teams_deleted_at_idx" ON "academy_teams"("deleted_at");
