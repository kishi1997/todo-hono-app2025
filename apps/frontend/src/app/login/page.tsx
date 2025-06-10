"use client";
import { useActionState } from "react";
import { signup, supabaseSignup } from "./actions";

export default function LoginPage() {
  const signupAction = async (preverror: string | null, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await supabaseSignup(email, password);
    await signup(email, password);
    return null;
  };
  const [error, submitAction, isPending] = useActionState(signupAction, null);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
