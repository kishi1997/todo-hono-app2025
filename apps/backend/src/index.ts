import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import z from "zod";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { todosTable } from "./db/schema";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

const todoSchema = z.object({
  title: z.string().min(2),
  desc: z.string().nullable(),
});

const route = app
  .get("/todos", async (c) => {
    const client = postgres(process.env.DATABASE_URL as string, {
      prepare: false,
    });
    const db = drizzle({ client });
    const todos = await db.select().from(todosTable);
    if (todos == null) {
      return c.text("'Failed to fetch todos', 500");
    }
    return c.json({ todos });
  })
  .post(
    "/todo",
    zValidator("json", todoSchema, (result, c) => {
      if (!result.success) {
        return c.text(result.error.issues[0].message, 400);
      }
    }),
    async (c) => {
      const { title, desc } = c.req.valid("json");
      const client = postgres(process.env.DATABASE_URL as string, {
        prepare: false,
      });
      const db = drizzle({ client });
      const todo = await db
        .insert(todosTable)
        .values({ title, desc })
        .returning();
      return c.json({ todo: todo[0] });
    }
  );

export type AppType = typeof route;

export default app;
