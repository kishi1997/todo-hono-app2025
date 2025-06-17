"use client";
import { useActionState } from "react";
import Link from "next/link";
import { supabaseSignin } from "@/features/supabase/action";
// import { redirect } from "next/navigation";

export default function LoginPage() {
  const signinAction = async (
    preverror: string | null,
    formData: FormData
  ): Promise<string | null> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await supabaseSignin(email, password);
    if (!res.success) {
      console.error("signin、失敗", res.message);
      return res.message || "サインインに失敗しました。";
    }
    return null;
  };
  const [error, submitAction, isPending] = useActionState(signinAction, null);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign in</h1>
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
      <p className="mt-4">
        if you don&apos;t have an account, please
        <Link href="/signup" className="text-blue-500 pl-2">
          Sign up
        </Link>
      </p>
    </div>
  );
}
