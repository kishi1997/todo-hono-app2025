import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Todos, Profile } from "./db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { createSupabaseClientWithToken } from "./utils/supabase/client";
import { createClient } from "@supabase/supabase-js";
export type Env = {
  DATABASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    allowHeaders: ["Content-Type", "Authorization"],
    origin: "*",
  })
);

app.use("/profile/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.text("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || user == null) {
    return c.text("Unauthorized", 401);
  }
  // コンテキストにuserをセット
  c.set("user", user);

  await next(); // 次の処理へ
});

const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
  description: z.string().nullable(),
  profileId: z.string(),
});
const userSchema = z.object({
  name: z.string(),
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
      const { id, title, description, profileId } = c.req.valid("json");
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      const todo = await db
        .insert(Todos)
        .values({ id, title, description, profileId })
        .returning();
      return c.json({ todo: todo[0] });
    }
  )
  .post(
    "/profile",
    zValidator("json", userSchema, (result, c) => {
      if (!result.success) {
        return c.text(result.error.issues[0].message, 400);
      }
    }),
    async (c) => {
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      const user = c.get("user");
      const { id, email } = user;
      const { name } = c.req.valid("json");
      const userData = await db
        .insert(Profile)
        .values({ id, name, email })
        .returning();
      return c.json({ user: userData[0] });
    }
  );
export type AppType = typeof route;

export default app;
