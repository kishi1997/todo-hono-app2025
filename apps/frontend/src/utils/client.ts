import { hc } from "hono/client";
import { AppType } from "backend/src";

export const getHonoClient = (accessToken: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return hc<AppType>(process.env.NEXT_PUBLIC_API_URL!, { headers });
};
// export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);
