import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUpdateTodo } from "@/features/todos/api/use-update-todos";
import { Todo } from "@/types/api";
import { toast } from "sonner";
import { useState } from "react";

// ステータスの文字列リテラル型
type TodoStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";
type Config = {
  label: string;
  badgeClass: string;
  dotClass: string;
};
// ステータスごとの設定を定義するオブジェクト
const statusConfig: Record<
  TodoStatus,
  {
    label: string;
    badgeClass: string;
    dotClass: string;
  }
> = {
  NOT_STARTED: {
    label: "Not started",
    badgeClass:
      "bg-gray-200/20 hover:bg-gray-200/30 border-transparent text-gray-200",
    dotClass: "bg-gray-400",
  },
  IN_PROGRESS: {
    label: "In progress",
    badgeClass:
      "bg-blue-500/20 hover:bg-blue-500/30 border-transparent text-blue-200",
    dotClass: "bg-blue-400",
  },
  DONE: {
    label: "Done",
    badgeClass:
      "bg-green-500/20 hover:bg-green-500/30 border-transparent text-green-300",
    dotClass: "bg-green-400",
  },
};

// コンポーネントのPropsの型定義
// Props
interface StatusBadgeProps {
  todo: Todo;
  currentStatus: TodoStatus;
  className?: string;
}

export const StatusBadge = ({
  todo,
  currentStatus,
  className,
}: StatusBadgeProps) => {
  const { mutate } = useUpdateTodo();
  const [config, setConfig] = useState<Config>(statusConfig[currentStatus]);
  // 不正なステータスが渡された場合は何も表示しない
  if (!config) {
    return null;
  }
  const otherStatuses = (Object.keys(statusConfig) as TodoStatus[]).filter(
    (s) => s !== status
  );
  const changeStatus = (newStatus: TodoStatus) => {
    setConfig(statusConfig[newStatus]);
    mutate(
      {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: newStatus,
      },
      {
        onSuccess: () => {
          toast.success("ステータスを更新しました！");
        },
        onError: (err) => {
          const errorMessage = `${(err as Error).message}`;
          toast.error(errorMessage);
        },
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize cursor-pointer",
            config.badgeClass,
            className
          )}
        >
          <span className={cn("h-2.5 w-2.5 rounded-full", config.dotClass)} />
          <span>{config.label}</span>
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 min-w-[160px]">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherStatuses.map((s) => {
          const c = statusConfig[s];
          return (
            <DropdownMenuItem
              key={s}
              onClick={() => changeStatus(s)}
              className="cursor-pointer flex items-center gap-2"
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", c.dotClass)} />
              <span>{c.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
