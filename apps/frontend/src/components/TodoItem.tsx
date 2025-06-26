"use client";

import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { TodoPostResponse } from "@/types/api";
import { StatusBadge } from "./custom/StatusBadge";
import { useState } from "react";
import { useUpdateTodo } from "@/features/todos/api/use-update-todos";
import { toast } from "sonner";
import { useDeleteTodo } from "@/features/todos/api/use-delete-todos";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const TodoItem = ({ todo }: TodoPostResponse) => {
  const { mutate: updateMutate } = useUpdateTodo();
  const { mutate: deleteMutate } = useDeleteTodo();
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [focusedTitle, setFocusedTitle] = useState<string>("");
  const updateTitle = (currentTitle: string) => {
    if (currentTitle == focusedTitle) return;
    updateMutate(
      {
        id: todo.id,
        title: todoTitle,
      },
      {
        onSuccess: () => {
          toast.success("タスクを更新しました！");
        },
        onError: (err) => {
          const errorMessage = `${(err as Error).message}`;
          toast.error(errorMessage);
        },
      }
    );
  };
  const deleteTodo = () => {
    deleteMutate(
      { id: todo.id },
      {
        onSuccess: () => {
          toast.success("タスクを削除しました！");
        },
        onError: (err) => {
          const errorMessage = `${(err as Error).message}`;
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        // --- ベーススタイル ---
        "hover:cursor-pointer hover:bg-muted/10 flex items-center p-4 border-t-1 border-muted/50 transition-all duration-200 mb-0 last:border-b-1"
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
      <input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onBlur={(e) => updateTitle(e.target.value)}
        onFocus={(e) => setFocusedTitle(e.target.value)}
        className={cn(
          "flex-grow font-medium transition-colors focus:border-none focus-visible:outline-none hover:cursor-pointer"
          // isPendingではない場合のみ、カーソルをポインターにする
          // !isPending && "cursor-pointer",
          // // 完了時のスタイル
          // todo.isCompleted && "line-through text-muted-foreground"
        )}
      />
      <StatusBadge currentStatus={todo.status} todo={todo} />
      <AlertDialog>
        <AlertDialogTrigger className="ml-4 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:cursor-pointer">
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground shrink-0 hover:bg-destructive/10 hover:text-destructive"
          >
          </Button> */}
          <Trash2 className="h-4 w-4" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Do you really want to delete?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-black hover:cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className=" hover:cursor-pointer"
              onClick={deleteTodo}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
