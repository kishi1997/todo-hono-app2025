"use client";
import React, { useActionState } from "react";
import { setUserName } from "./action";

export default function SetProfilePage() {
  const profileAction = async (
    preverror: string | null,
    formData: FormData
  ): Promise<string | null> => {
    const name = formData.get("name") as string;
    const res = await setUserName(name);
    if (!res.success) {
      console.error("signup、失敗", res.message);
      return res.message || "サインインに失敗しました。";
    }
    return null;
  };

  const [error, submitAction, isPending] = useActionState(profileAction, null);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">ニックネームを決めよう！</h1>
      <form action={submitAction} className="flex flex-col space-y-4 min-w-3xl">
        <label className="font-semibold" htmlFor="name">
          ニックネーム
        </label>
        <input
          name="name"
          type="text"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <button
          disabled={isPending}
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          決定
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
