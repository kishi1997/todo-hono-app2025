"use client";
import { supabaseSignup } from "@/features/supabase/action";
import { useActionState } from "react";

export default function LoginPage() {
  const signupAction = async (
    preverror: string | null,
    formData: FormData
  ): Promise<string | null> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await supabaseSignup(email, password);
    if (!res.success) {
      console.error("signup、失敗", res.message);
      return res.message || "サインインに失敗しました。";
    }
    return null;
  };
  const [error, submitAction, isPending] = useActionState(signupAction, null);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign up</h1>
      <form action={submitAction} className="flex flex-col space-y-4 min-w-3xl">
        <label htmlFor="email" className="font-semibold">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <label htmlFor="password" className="font-semibold">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <button
          disabled={isPending}
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign up
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
