"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

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
