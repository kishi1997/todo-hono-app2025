"use client";

// import { Todo } from "@/types/api"; // あなたのプロジェクトの型定義に合わせてください
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { TodoPostResponse } from "@/types/api";
import { StatusBadge } from "./custom/StatusBadge";

// ※これらのAPIフックは、別途作成する必要があります
// import { useUpdateTodo } from "@/features/todos/api/use-update-todo";
// import { useDeleteTodo } from "@/features/todos/api/use-delete-todo";

export const TodoItem = ({ todo }: TodoPostResponse) => {
  // --- 以下はAPIフックが存在すると仮定した実装です ---
  // const updateMutation = useUpdateTodo(todo.id);
  // const deleteMutation = useDeleteTodo(todo.id);

  // const handleToggle = (checked: boolean) => {
  //   updateMutation.mutate(
  //     { isCompleted: checked },
  //     { onSuccess: () => toast.success("タスクを更新しました") }
  //   );
  // };

  // const handleDelete = () => {
  //   if (confirm("本当にこのタスクを削除しますか？")) {
  //     deleteMutation.mutate(undefined, {
  //       onSuccess: () => toast.success("タスクを削除しました"),
  //     });
  //   }
  // };
  // --- ここまでAPI連携の仮実装 ---
  // isPendingを追加して、更新・削除処理中の状態を管理
  // const isPending = updateMutation.isPending || deleteMutation.isPending;

  return (
    <div
      className={cn(
        // --- ベーススタイル ---
        "hover:cursor-pointer hover:bg-muted/10 flex items-center py-4 pl-4 border-t-1 border-muted/50 transition-all duration-200 mb-0 last:border-b-1"
        // --- 状態に応じたスタイル ---
        // 完了時のスタイル
        //   todo.isCompleted
        //     ? "bg-muted/50 border-transparent"
        //     : "bg-card hover:bg-muted/50",
        //   // API通信中のスタイル
        //   isPending && "opacity-50 cursor-not-allowed"
      )}
    >
      <Checkbox
        id={`todo-${todo.id}`}
        //   checked={todo.isCompleted}
        //   onCheckedChange={handleToggle}
        //   disabled={isPending}
        className="mr-4"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={cn(
          "flex-grow font-medium transition-colors"
          // isPendingではない場合のみ、カーソルをポインターにする
          // !isPending && "cursor-pointer",
          // // 完了時のスタイル
          // todo.isCompleted && "line-through text-muted-foreground"
        )}
      >
        {todo.title}
      </label>
      <StatusBadge currentStatus={todo.status} todo={todo} />
      <Button
        variant="ghost"
        size="icon"
        //   onClick={handleDelete}
        //   disabled={isPending}
        className="h-8 w-8 text-muted-foreground shrink-0 hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
