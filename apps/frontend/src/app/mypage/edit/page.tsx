"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { toast } from "sonner";
import { usePatchProfile } from "@/features/profile/api/use-patch-profile";
import { BreadcrumbComponent } from "@/components/Breadcrumb";

type FormState = {
  message: string;
  isSuccess: boolean;
};

const initialState: FormState = {
  message: "",
  isSuccess: false,
};

const breadcrumbProps = {
  child: [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/mypage",
      title: "My Page",
    },
  ],
  noChild: {
    title: "Edit Profile",
  },
};
export default function MyPage() {
  const { mutate } = usePatchProfile();
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const userid = searchParams.get("id");
  if (!username || !userid) {
    throw new Error("name not found");
  }
  const [name, setName] = useState<string>(username);
  const formRef = useRef<HTMLFormElement>(null);
  const formAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const newUsername = formData.get("name") as string;
    return new Promise((resolve) => {
      mutate(
        { id: userid, name: newUsername },
        {
          onSuccess: () => {
            formRef.current?.reset();
            toast.success("プロフィールを変更しました！");
            resolve({ message: "成功", isSuccess: true });
          },
          onError: (err) => {
            const errorMessage = `${(err as Error).message}`;
            toast.error(errorMessage);
            resolve({ message: errorMessage, isSuccess: false });
          },
        }
      );
    });
  };
  const [, submitAction, isPending] = useActionState(formAction, initialState);

  return (
    <div className="relative w-full min-h-screen text-white px-6 py-12 flex flex-col items-center justify-center">
      <BreadcrumbComponent
        child={breadcrumbProps.child}
        noChild={breadcrumbProps.noChild}
      />
      <div className="w-full max-w-4xl space-y-8">
        <Card className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-xl transition hover:shadow-2xl">
          <CardContent className="mt-4 space-y-6">
            <h1 className="text-zinc-400 uppercase text-l mb-1">
              Update Profile
            </h1>
            <form ref={formRef} action={submitAction}>
              <div>
                <label className="text-white text-xs">Name</label>
                <Input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={isPending}
                  className="flex-grow rounded-lg border-none bg-white/10 px-4 py-2 text-white 
                        backdrop-blur-sm placeholder:text-xs placeholder:text-gray-400 focus-visible:shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
                  value={name!}
                />
              </div>
              <Button
                className="mt-4 mr-auto hover:cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "on update..." : "update"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
