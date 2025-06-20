"use client";

import { useActionState, useState, useRef } from "react";
import { useCreateTodo } from "@/features/todos/api/use-create-todos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // shadcn/uiのToasterを使うとより良い体験になります

type FormState = {
  message: string;
  isSuccess: boolean;
};

const initialState: FormState = {
  message: "",
  isSuccess: false,
};

export const TodoInput = () => {
  const { mutate } = useCreateTodo();
  const [title, setTitle] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const title = formData.get("title") as string;
    if (!title) {
      return { message: "タイトルは必須です。", isSuccess: false };
    }

    return new Promise((resolve) => {
      mutate(
        // Descriptionは不要なので空文字やnullを渡す
        { title, description: "" },
        {
          onSuccess: () => {
            // 成功時にフォームをリセット
            formRef.current?.reset();
            setTitle("");
            toast.success("Todoを追加しました！");
            resolve({ message: "成功", isSuccess: true });
          },
          onError: (err) => {
            const errorMessage = `追加に失敗しました: ${
              (err as Error).message
            }`;
            toast.error(errorMessage);
            resolve({ message: errorMessage, isSuccess: false });
          },
        }
      );
    });
  };

  const [, submitAction, isPending] = useActionState(formAction, initialState);

  return (
    <form
      ref={formRef}
      action={submitAction}
      className="flex w-full items-center space-x-2"
    >
      <Input
        type="text"
        name="title"
        placeholder="新しいタスクを追加..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPending}
        required
        className="flex-grow rounded-lg border-none bg-white/10 px-4 py-2 text-white 
        backdrop-blur-sm placeholder:text-gray-300 focus-visible:shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
      />
      <Button
        className="hover:cursor-pointer hover:filter hover:brightness-75"
        type="submit"
        disabled={isPending || title.length === 0}
      >
        {isPending ? "追加中..." : "追加"}
      </Button>
    </form>
  );
};
