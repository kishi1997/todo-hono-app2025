import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Todos, Profile } from "./db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

const todoSchema = z.object({
  title: z.string().min(2),
  description: z.string().nullable(),
  userId: z.number(),
});
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const route = app
  .get("/todos", async (c) => {
    const client = postgres(c.env.DATABASE_URL as string, {
      prepare: false,
    });
    const db = drizzle({ client });
    const todos = await db.select().from(Todos);
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
      const { title, description, userId } = c.req.valid("json");
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      const todo = await db
        .insert(Todos)
        .values({ title, description, userId })
        .returning();
      return c.json({ todo: todo[0] });
    }
  );
// .post(
//   "/signup",
//   zValidator("json", userSchema, (result, c) => {
//     if (!result.success) {
//       return c.text(result.error.issues[0].message, 400);
//     }
//   }),
//   async (c) => {
//     const client = postgres(c.env.DATABASE_URL, { prepare: false });
//     const db = drizzle({ client });
//     const { email, password } = c.req.valid("json");
//     const user = await db
//       .insert(Profile)
//       .values({ email, password })
//       .returning();
//     return c.json({ user: user[0] });
//   }
// );
export type AppType = typeof route;

export default app;
