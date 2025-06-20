CREATE TYPE "public"."status" AS ENUM('not started', 'in progress', 'DONE');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "status" "status" DEFAULT 'not started';--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;