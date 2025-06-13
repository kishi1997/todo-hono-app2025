"use server";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const supabaseSignup = async (email: string, password: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    // エラーメッセージを返す
    return {
      success: false,
      message: error.message || "サインインに失敗しました。",
    };
  }
  redirect("/setProfile");
};
