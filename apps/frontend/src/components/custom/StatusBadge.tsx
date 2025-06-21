import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ステータスの文字列リテラル型
type TodoStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

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
interface StatusBadgeProps {
  status: TodoStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  // 不正なステータスが渡された場合は何も表示しない
  if (!config) {
    return null;
  }

  return (
    <Badge
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-sm font-medium capitalize",
        config.badgeClass,
        className
      )}
    >
      <span className={cn("h-2.5 w-2.5 rounded-full", config.dotClass)} />
      <span>{config.label}</span>
    </Badge>
  );
};
