import { hc } from "hono/client";
import { AppType } from "backend/src";
import { getToken } from "./utils";

// 認証あり
export const createAuthorizedClient = async () => {
  const accessToken = await getToken();
  if (!accessToken) {
    throw new Error("ログインしてください");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  return hc<AppType>(process.env.API_URL!, { headers });
};
// 認証なし　型の宣言用
export const client = hc<AppType>(process.env.API_URL!);
