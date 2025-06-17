"use server";
import { createAuthorizedClient } from "@/utils/client";
import { redirect } from "next/navigation";

export const setUserName = async (name: string) => {
  const client = await createAuthorizedClient();
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
