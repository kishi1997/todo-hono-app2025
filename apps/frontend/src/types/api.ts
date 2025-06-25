import { client } from "@/utils/client";
import { InferResponseType, InferRequestType } from "hono";

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "DONE" | undefined;
};

// 例：Todo作成APIのレスポンスボディの型
export type TodoPostResponse = InferResponseType<typeof client.todos.$post>;

// 例：Todo作成APIのリクエストボディ（`json`）の型
export type TodoPostRequest = InferRequestType<
  typeof client.todos.$post
>["json"];

// 例：全Todo取得APIのレスポンスボディの型
export type TodosGetResponse = InferResponseType<typeof client.todos.$get>;

// 例：Todo更新APIの型
export type TodosPatchRequest = InferRequestType<typeof client.todos.$patch>;
export type TodosPatchResponse = InferResponseType<typeof client.todos.$patch>;

// profile取得APIのレスポンスボディの型
export type ProfileGetResponse = InferResponseType<typeof client.profile.$get>;
