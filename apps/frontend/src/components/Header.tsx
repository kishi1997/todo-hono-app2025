"use client";
import { useGetProfile } from "@/features/profile/api/use-get-profile";
import { supabaseSignout } from "@/features/supabase/action";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const Header = () => {
  const signout = async () => {
    try {
      await supabaseSignout();
      toast("サインアウトしました。");
    } catch (error) {
      console.error(error);
      toast("サインアウトに失敗しました。");
    }
  };
  const { data, isLoading } = useGetProfile();
  if (isLoading) {
    return (
      <div className="flex justify-between items-center p-4 w-full">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex justify-between items-center p-4 w-full">
        dataが見つかりません
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt={data.user.name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button
        className="bg-white/20 text-gray-400 hover:cursor-pointer hover:bg-white/30 hover:text-white"
        onClick={() => signout()}
      >
        Sign out
      </Button>
    </div>
  );
};
