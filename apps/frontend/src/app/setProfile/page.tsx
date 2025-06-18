"use client";
import React, { useActionState } from "react";
import { usePostProfile } from "@/features/profile/api/use-post-profile";
import { useRouter } from "next/navigation";

// フォームが管理する状態の型
type FormState = {
  message: string;
  isSuccess: boolean;
};

export default function SetProfilePage() {
  const router = useRouter();
  // フォームの初期状態
  const initialState: FormState = {
    message: "",
    isSuccess: false,
  };
  const { mutate } = usePostProfile();
  const profileAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const name = formData.get("name") as string;
    return new Promise((resolve) => {
      mutate(
        { name },
        {
          onSuccess: (data: void) => {
            // 成功したら、useActionStateに成功状態を返す
            console.log("ニックネーム設定成功:", data);
            router.push("/");
            // resolveは必要なら空でOK。状態使わないなら何でもいい。
            resolve({ message: "", isSuccess: true });
          },
          onError: (err) => {
            // 失敗したら、useActionStateに失敗状態を返す
            resolve({
              message: `作成に失敗しました: ${(err as Error).message}`,
              isSuccess: false,
            });
          },
        }
      );
    });
  };
  const [state, submitAction, isPending] = useActionState(
    profileAction,
    initialState
  );

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
      </form>
      {/* useActionStateが管理する状態メッセージを表示 */}
      {state.message && !isPending && (
        <p style={{ color: state.isSuccess ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}
