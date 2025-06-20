"use client";
import React, { useActionState, useState } from "react";
import { usePostProfile } from "@/features/profile/api/use-post-profile";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// フォームが管理する状態の型
type FormState = {
  message: string;
  isSuccess: boolean;
};

export default function SetProfilePage() {
  const [name, setName] = useState<string>("");
  // パスワードが6文字以上かチェック
  const isNameValid = name.length > 0;

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
            toast("ニックネームの設定に成功しました。");
            router.push("/");
            // resolveは必要なら空でOK。状態使わないなら何でもいい。
            resolve({ message: "", isSuccess: true });
          },
          onError: (err) => {
            // 失敗したら、useActionStateに失敗状態を返す
            toast("ニックネームの設定に失敗しました。");
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
    <div className="p-4 w-full max-w-lg mx-auto">
      <h1 className="w-full max-w-lg border-muted/50 scroll-m-20 border-b pb-2 mb-8 text-3xl font-semibold tracking-tight first:mt-0">
        ニックネームを決めよう！
      </h1>
      <form
        action={submitAction}
        className="flex flex-col space-y-4 w-full max-w-lg "
      >
        <Input
          name="name"
          type="text"
          value={name}
          placeholder="ニックネーム"
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-grow rounded-lg border-none bg-white/10 px-4 py-2 text-white 
        backdrop-blur-sm placeholder:text-xs placeholder:text-gray-400 focus-visible:shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
        />
        <Button
          disabled={isPending && !isNameValid}
          type="submit"
          className={
            isNameValid
              ? "text-white bg-[#73ac99] hover:cursor-pointer hover:bg-[#73ac99] hover:filter hover:brightness-110 hover:text-white"
              : "text-gray-400 bg-white/20 hover:bg-white/20"
          }
        >
          決定
        </Button>
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
