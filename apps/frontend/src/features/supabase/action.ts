"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// 登録
export const supabaseSignup = async (email: string, password: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    // エラーメッセージを返す
    return {
      success: false,
      message: error.message || "サインアップに失敗しました。",
    };
  }
  redirect("/setProfile");
};
// ログイン
export async function supabaseSignin(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return {
      success: false,
      message: error.message || "サインインに失敗しました。",
    };
  }
  revalidatePath("/", "layout");
  redirect("/");
}
// ログアウト
export async function supabaseSignout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return {
      success: false,
      message: error.message || "サインアウトに失敗しました。",
    };
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
