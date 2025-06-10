"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { client } from "@/utils/client";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export const supabaseSignup = async (email: string, password: string) => {
  const supabase = await createClient();
  try {
    await supabase.auth.signUp({ email, password });
  } catch (error) {
    console.log(error);
  }
};
export const signup = async (email: string, password: string) => {
  const res = await client.signup.$post({
    json: { email, password },
  });
  if (!res.ok) {
    const error = await res.text();
    return error;
  }
  return res.json();
};
