"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetProfile } from "@/features/profile/api/use-get-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function MyPage() {
  const { data, isLoading } = useGetProfile();
  if (isLoading)
    return (
      <div className="w-full max-w-4xl min-h-screen flex justify-between items-center p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  if (data == null) {
    toast.error("ログインしてください");
    redirect("/login");
  }
  return (
    <div className="w-full max-w-4xl min-h-screen text-white px-6 py-12 flex flex-col items-center justify-center">
      <div className="w-full space-y-8">
        <header className="text-center bg-black border border-zinc-700 py-4">
          <h1 className="text-4xl font-bold tracking-tight">My Page</h1>
          <p className="text-zinc-400 mt-2">
            Welcome back, {data.user.name} 👋
          </p>
        </header>
        <Card className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-xl transition hover:shadow-2xl">
          <CardHeader className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 ring-2 ring-zinc-600">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white text-xl">
                {data.user.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="mt-4 space-y-6">
            <section>
              <h3 className="text-zinc-400 uppercase text-xs mb-1">
                Account Info
              </h3>
              <p className="text-white">
                Name: <span className="text-zinc-300">{data.user.name}</span>
              </p>
              <p className="text-white">
                email: <span className="text-zinc-300">{data.user.email}</span>
              </p>
            </section>

            <div className="text-right">
              <Button className="bg-white/20 text-gray-400 hover:cursor-pointer hover:bg-white/30 hover:text-white">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
