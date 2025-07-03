import React from "react";
import { Skeleton } from "./ui/skeleton";

export const Loading = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4">
      <div className="flex items-center gap-4 animate-pulse max-w-md w-full">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
};
