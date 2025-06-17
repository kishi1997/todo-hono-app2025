import { useCreateTodo } from "@/features/todos/api/use-create-todos";
import { TodoPostResponse } from "@/types/api";
import { useActionState } from "react";

// フォームが管理する状態の型
type FormState = {
  message: string;
  isSuccess: boolean;
};

// フォームの初期状態
const initialState: FormState = {
  message: "",
  isSuccess: false,
};
const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md"
      type="submit"
      disabled={isPending}
    >
      {isPending ? "作成中..." : "作成"}
    </button>
  );
};

export const TodoInput = () => {
  const { mutate } = useCreateTodo();
  // ★ TanStack Queryのフックを呼び出す
  const formAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const title = formData.get("title") as string;
    const description = formData.get("desc") as string;
    return new Promise((resolve) => {
      mutate(
        { title, description },
        {
          onSuccess: (data: TodoPostResponse) => {
            // 成功したら、useActionStateに成功状態を返す
            console.log("作成成功:", data);
            resolve({ message: "Todoを正常に作成しました！", isSuccess: true });
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
    formAction,
    initialState
  );

  return (
    <form
      action={submitAction}
      className="flex flex-col gap-2 max-w-[600px] mx-auto mt-10"
    >
      <label htmlFor="title" className="text-sm font-medium">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <label htmlFor="desc" className="text-sm font-medium">
        Description
      </label>
      <input
        type="text"
        name="desc"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      {/* isPendingをボタンに渡して無効化を制御 */}
      <SubmitButton isPending={isPending} />
      {/* useActionStateが管理する状態メッセージを表示 */}
      {state.message && !isPending && (
        <p style={{ color: state.isSuccess ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </form>
  );
};
