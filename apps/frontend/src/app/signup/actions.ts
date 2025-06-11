"use server";
import { revalidatePath } from "next/cache";
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
  revalidatePath("/", "layout");
  redirect("/");
};
// export const signup = async (email: string, password: string) => {
//   try {
//     const res = await client.signup.$post({
//       json: { email, password },
//     });
//     if (!res.ok) {
//       const error = await res.text();
//       return error;
//     }
//     return res.json();
//   } catch (e) {
//     throw e;
//   }
// };
