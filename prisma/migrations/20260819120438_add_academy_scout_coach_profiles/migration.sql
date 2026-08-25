-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('NOT_REQUESTED', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "academy_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "logo_url" TEXT,
    "cover_image_url" TEXT,
    "academy_name" VARCHAR(200) NOT NULL,
    "country" VARCHAR(100),
    "state" VARCHAR(100),
    "city" VARCHAR(100),
    "address" TEXT,
    "founded_year" INTEGER,
    "description" TEXT,
    "contact_email" VARCHAR(320),
    "contact_phone" VARCHAR(50),
    "website_url" TEXT,
    "social_media_links" JSONB,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "academy_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scout_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "profile_picture" TEXT,
    "full_name" VARCHAR(150) NOT NULL,
    "organization" VARCHAR(200),
    "country" VARCHAR(100),
    "state" VARCHAR(100),
    "city" VARCHAR(100),
    "role" VARCHAR(150),
    "biography" TEXT,
    "contact_email" VARCHAR(320),
    "contact_phone" VARCHAR(50),
    "social_media_links" JSONB,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "scout_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "profile_picture" TEXT,
    "cover_photo" TEXT,
    "full_name" VARCHAR(150) NOT NULL,
    "country" VARCHAR(100),
    "state" VARCHAR(100),
    "city" VARCHAR(100),
    "current_academy_club" VARCHAR(200),
    "coaching_role" VARCHAR(150),
    "coaching_license" VARCHAR(200),
    "coaching_certification" VARCHAR(200),
    "years_of_experience" INTEGER,
    "biography" TEXT,
    "contact_information" TEXT,
    "social_media_links" JSONB,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "coach_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academy_profiles_user_id_key" ON "academy_profiles"("user_id");

-- CreateIndex
CREATE INDEX "academy_profiles_country_idx" ON "academy_profiles"("country");

-- CreateIndex
CREATE INDEX "academy_profiles_state_idx" ON "academy_profiles"("state");

-- CreateIndex
CREATE INDEX "academy_profiles_city_idx" ON "academy_profiles"("city");

-- CreateIndex
CREATE INDEX "academy_profiles_verification_status_idx" ON "academy_profiles"("verification_status");

-- CreateIndex
CREATE UNIQUE INDEX "scout_profiles_user_id_key" ON "scout_profiles"("user_id");

-- CreateIndex
CREATE INDEX "scout_profiles_organization_idx" ON "scout_profiles"("organization");

-- CreateIndex
CREATE INDEX "scout_profiles_country_idx" ON "scout_profiles"("country");

-- CreateIndex
CREATE INDEX "scout_profiles_state_idx" ON "scout_profiles"("state");

-- CreateIndex
CREATE INDEX "scout_profiles_city_idx" ON "scout_profiles"("city");

-- CreateIndex
CREATE INDEX "scout_profiles_verification_status_idx" ON "scout_profiles"("verification_status");

-- CreateIndex
CREATE UNIQUE INDEX "coach_profiles_user_id_key" ON "coach_profiles"("user_id");

-- CreateIndex
CREATE INDEX "coach_profiles_country_idx" ON "coach_profiles"("country");

-- CreateIndex
CREATE INDEX "coach_profiles_state_idx" ON "coach_profiles"("state");

-- CreateIndex
CREATE INDEX "coach_profiles_city_idx" ON "coach_profiles"("city");

-- CreateIndex
CREATE INDEX "coach_profiles_coaching_role_idx" ON "coach_profiles"("coaching_role");

-- CreateIndex
CREATE INDEX "coach_profiles_verification_status_idx" ON "coach_profiles"("verification_status");

-- AddForeignKey
ALTER TABLE "academy_profiles" ADD CONSTRAINT "academy_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scout_profiles" ADD CONSTRAINT "scout_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
