"use client";
import { supabaseSignup } from "@/features/supabase/action";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // パスワードが6文字以上かチェック
  const isPasswordValid = password.length >= 6;
  // 両方の条件を満たしているか
  const isFormValid = isEmailValid && isPasswordValid;

  const signupAction = async (
    preverror: string | null,
    formData: FormData
  ): Promise<string | null> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (password.length < 6) {
      toast("パスワードは6文字以上にしてください");
    }
    const res = await supabaseSignup(email, password);
    if (!res.success) {
      toast("サインアップに失敗しました。");
      return res.message || "サインアップに失敗しました。";
    }
    toast("サインアップに成功しました。");
    return null;
  };
  const [, submitAction, isPending] = useActionState(signupAction, null);
  // <div className="bg-gradient-to-br from-[#44485a] via-[#44485a] to-[#73ac99] text-white min-h-screen">

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign up</h1>
      <form
        action={submitAction}
        className="flex flex-col space-y-4 w-full max-w-lg"
      >
        <label htmlFor="email" className="font-semibold">
          Email:
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          disabled={isPending}
          required
          className="flex-grow rounded-lg border-none bg-white/10 px-4 py-2 text-white 
        backdrop-blur-sm placeholder:text-gray-300 focus-visible:shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
        />
        <label htmlFor="password" className="font-semibold">
          Password:
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password should be longer than 6 characters"
          disabled={isPending}
          required
          className="flex-grow rounded-lg border-none bg-white/10 px-4 py-2 text-white 
        backdrop-blur-sm placeholder:text-gray-300 focus-visible:shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
        />
        <Button
          disabled={isPending && !isFormValid}
          type="submit"
          className={
            isFormValid
              ? "text-white bg-[#73ac99] hover:cursor-pointer hover:bg-[#73ac99] hover:filter hover:brightness-110 hover:text-white"
              : "text-gray-400 bg-white/20 hover:bg-white/20"
          }
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
