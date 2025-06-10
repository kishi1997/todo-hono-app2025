import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  todos: many(todosTable),
}));

export const todosRelations = relations(todosTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [todosTable.userId],
    references: [usersTable.id],
  }),
}));
