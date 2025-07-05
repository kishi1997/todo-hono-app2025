"use client";

import { useGetTodos } from "@/features/todos/api/use-get-todos";
import { TodoItem } from "./TodoItem";
import { Skeleton } from "@/components/ui/skeleton";

export const Todos = () => {
  const { data, isLoading, error } = useGetTodos();

  if (isLoading) {
    // ローディング中のスケルトン表示
    return (
      <div className="space-y-3 mt-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-muted-foreground">
        エラー: タスクの読み込みに失敗しました。
      </div>
    );
  }

  if (!data || data.todos.length === 0) {
    return (
      <div className="mt-10 text-center text-muted-foreground">
        タスクはありません。最初のタスクを追加してみましょう！
      </div>
    );
  }

  return (
    <div className="pt-4 pb-8">
      <h2 className="text-2xl font-bold mb-2">Today&apos;s Task</h2>
      {data.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
