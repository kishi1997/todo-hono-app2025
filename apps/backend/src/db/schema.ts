import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  desc: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
});
