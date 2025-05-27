import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

const route = app.get("/hello", (c) => {
  return c.json({ message: "hello world" });
});

export type AppType = typeof route;

export default app;
