import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const statusEnum = pgEnum("status", [
  "not started",
  "in progress",
  "DONE",
]);

// Profile テーブル（auth.users に対する 1:1 マッピング）
export const Profile = pgTable("profile", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});

// Todos テーブル
export const Todos = pgTable("todos", {
  id: uuid("id").primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => Profile.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  status: statusEnum().default("not started"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// リレーション定義
export const profileRelations = relations(Profile, ({ many }) => ({
  todos: many(Todos),
}));

export const todosRelations = relations(Todos, ({ one }) => ({
  profile: one(Profile, {
    fields: [Todos.profileId],
    references: [Profile.id],
  }),
}));
