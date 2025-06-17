import { client } from "@/utils/client";
import { InferResponseType, InferRequestType } from "hono";

// 例：Todo作成APIのレスポンスボディの型
export type TodoPostResponse = InferResponseType<typeof client.todos.$post>;

// 例：Todo作成APIのリクエストボディ（`json`）の型
export type TodoPostRequest = InferRequestType<
  typeof client.todos.$post
>["json"];

// 例：全Todo取得APIのレスポンスボディの型
export type TodosGetResponse = InferResponseType<typeof client.todos.$get>;
