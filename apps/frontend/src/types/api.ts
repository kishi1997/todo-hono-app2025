import { client } from "@/utils/client";
import { InferResponseType, InferRequestType } from "hono";

export type Todo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  profileId: string;
  title: string;
  description: string | null;
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
};

//----------- Todo作成API -----------
export type TodoPostResponse = InferResponseType<typeof client.todos.$post>;
export type TodoPostRequest = InferRequestType<
  typeof client.todos.$post
>["json"];

//----------- Todo取得API -----------
export type TodosGetResponse = InferResponseType<typeof client.todos.$get>;

//----------- Todo更新API -----------
export type TodosPatchRequest = InferRequestType<typeof client.todos.$patch>;
export type TodosPatchResponse = InferResponseType<typeof client.todos.$patch>;

//----------- Todo削除API -----------
export type TodosDeleteRequest = InferRequestType<typeof client.todos.$delete>;
export type TodosDeleteResponse = InferResponseType<
  typeof client.todos.$delete
>;

//----------- profile取得API -----------
export type ProfileGetResponse = InferResponseType<typeof client.profile.$get>;
export type ProfilePatchRequest = InferRequestType<
  typeof client.profile.$patch
>;
