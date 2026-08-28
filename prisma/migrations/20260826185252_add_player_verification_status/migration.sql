-- AlterTable
ALTER TABLE "player_profiles" ADD COLUMN     "verification_status" "VerificationStatus" NOT NULL DEFAULT 'NOT_REQUESTED';

-- CreateIndex
CREATE INDEX "player_profiles_verification_status_idx" ON "player_profiles"("verification_status");
