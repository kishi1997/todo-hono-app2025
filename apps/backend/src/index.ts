import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Todos, Profile } from "./db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import type { User as AuthUser } from "@supabase/supabase-js";

export type Env = {
  DATABASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};
type Variables = {
  user: AuthUser;
};
const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use(
  "*",
  cors({
    allowHeaders: ["Content-Type", "Authorization"],
    origin: "*",
  })
);

app.use("*", async (c, next) => {
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
// 更新データの型を定義
type UpdateTodoData = {
  title?: string;
  description?: string | null;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
};
const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
  description: z.string().nullable(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "DONE"]).default("NOT_STARTED"),
});

const todoUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(2).optional(),
  description: z.string().nullable().optional(),
  status: z
    .enum(["NOT_STARTED", "IN_PROGRESS", "DONE"])
    .optional()
    .default("NOT_STARTED"),
});
const profileUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
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
    const user = c.get("user");
    const todos = await db
      .select()
      .from(Todos)
      .where(eq(Todos.profileId, user.id));
    return c.json({ todos });
  })
  .post(
    "/todos",
    zValidator("json", todoSchema, (result, c) => {
      if (!result.success) {
        return c.text(result.error.issues[0].message, 400);
      }
    }),
    async (c) => {
      const user = c.get("user");
      const { id, title, description, status } = c.req.valid("json");
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      const todo = await db
        .insert(Todos)
        .values({ id, title, description, profileId: user.id, status })
        .returning();
      return c.json({ todo: todo[0] });
    }
  )
  .patch(
    "/todos",
    zValidator("json", todoUpdateSchema, (result, c) => {
      if (!result.success) {
        return c.text(result.error.issues[0].message, 400);
      }
    }),
    async (c) => {
      const { id, title, description, status } = c.req.valid("json");
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      // UpdateTodoData型のオブジェクトを作成
      const updateData: UpdateTodoData = {};

      if (title !== null) updateData.title = title;
      if (description !== null) updateData.description = description;
      if (status !== null) updateData.status = status;
      const todo = await db
        .update(Todos)
        .set(updateData)
        .where(eq(Todos.id, id))
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
      if (id == null || email == null) {
        return c.text("Unauthorized", 401);
      }
      const { name } = c.req.valid("json");
      const userData = await db
        .insert(Profile)
        .values({ id, name, email })
        .returning();
      return c.json({ user: userData[0] });
    }
  )
  .patch(
    "/profile",
    zValidator("json", profileUpdateSchema, (result, c) => {
      if (!result.success) {
        return c.text(result.error.issues[0].message, 400);
      }
    }),
    async (c) => {
      const { id, name } = c.req.valid("json");
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      const newProfile = await db
        .update(Profile)
        .set({ name })
        .where(eq(Profile.id, id))
        .returning();
      return c.json({ newProfile: newProfile[0] });
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
      if (id == null || email == null) {
        return c.text("Unauthorized", 401);
      }
      const { name } = c.req.valid("json");
      const userData = await db
        .insert(Profile)
        .values({ id, name, email })
        .returning();
      return c.json({ user: userData[0] });
    }
  )
  .get("/profile", async (c) => {
    const client = postgres(c.env.DATABASE_URL, { prepare: false });
    const db = drizzle({ client });
    const user = c.get("user");
    const userData = await db
      .select()
      .from(Profile)
      .where(eq(Profile.id, user.id));
    return c.json({ user: userData[0] });
  })
  .delete(
    "/todos",
    zValidator("json", z.object({ id: z.string() }), (result, c) => {
      if (!result.success) {
        return c.text(result.error.issues[0].message, 400);
      }
    }),
    async (c) => {
      const { id } = c.req.valid("json");
      const client = postgres(c.env.DATABASE_URL, { prepare: false });
      const db = drizzle({ client });
      const todo = await db.delete(Todos).where(eq(Todos.id, id)).returning();
      return c.json({ todo: todo[0] });
    }
  );
export type AppType = typeof route;

export default app;
