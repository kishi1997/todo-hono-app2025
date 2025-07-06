"use client";

import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Todo } from "@/types/api";
// import { StatusBadge } from "./custom/StatusBadge";
import { useState } from "react";
import { useUpdateTodo } from "@/features/todos/api/use-update-todos";
import { toast } from "sonner";
import { useDeleteTodo } from "@/features/todos/api/use-delete-todos";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTodoStore } from "@/store/todos";

export const TodoItem = (todo: Todo) => {
  const deleteTodoStore = useTodoStore((state) => state.deleteTodo);
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
          deleteTodoStore(todo.id);
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
        "hover:cursor-pointer hover:bg-muted/10 flex items-center p-4 border-t-1 border-muted/50 transition-all duration-200 mb-0 last:border-b-1"
      )}
    >
      <input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onBlur={(e) => updateTitle(e.target.value)}
        onFocus={(e) => setFocusedTitle(e.target.value)}
        className={cn(
          "flex-grow font-medium transition-colors focus:border-none focus-visible:outline-none hover:cursor-pointer"
        )}
      />
      {/* <StatusBadge currentStatus={todo.status} todo={todo} /> */}
      <AlertDialog>
        <AlertDialogTrigger className="ml-4 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:cursor-pointer">
          <Trash2 className="h-4 w-4" />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Do you really want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete your data from our
              servers.
            </AlertDialogDescription>
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
