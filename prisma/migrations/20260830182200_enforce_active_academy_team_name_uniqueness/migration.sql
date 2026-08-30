CREATE UNIQUE INDEX "academy_teams_active_name_unique"
ON "academy_teams" (
    "academy_id",
    LOWER(TRIM("name"))
)
WHERE "deleted_at" IS NULL;