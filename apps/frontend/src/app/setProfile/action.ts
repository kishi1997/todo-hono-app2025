"use server";
import { getHonoClient } from "@/utils/client";
import { getToken } from "@/utils/utils";
import { redirect } from "next/navigation";

export const setUserName = async (name: string) => {
  const token = await getToken();
  if (token == null)
    return {
      success: false,
      message: "ログインしてください",
    };
  const client = getHonoClient(token);
  const res = await client.profile.$post({
    json: { name },
  });
  if (!res.ok) {
    const error = await res.text();
    return {
      success: false,
      message: error || "ニックネームの登録に失敗しました。",
    };
  }
  redirect("/");
};
