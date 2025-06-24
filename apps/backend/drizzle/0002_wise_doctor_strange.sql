ALTER TABLE "todos" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('NOT_STARTED', 'IN_PROGRESS', 'DONE');--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED'::"public"."status";--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET NOT NULL;