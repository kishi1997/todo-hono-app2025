"use server";
import {
  TodoPostRequest,
  TodoPostResponse,
  TodosGetResponse,
} from "@/types/api";
import { createAuthorizedClient } from "@/utils/client";

// Todo取得
export const getTodoList = async (): Promise<TodosGetResponse> => {
  const client = await createAuthorizedClient();
  const response = await client.todos.$get();
  if (!response.ok) {
    throw new Error("記事の取得に失敗しました");
  }
  return response.json();
};
// Todo作成
export const createTodo = async (
  newTodo: TodoPostRequest
): Promise<TodoPostResponse> => {
  const client = await createAuthorizedClient();
  const response = await client.todos.$post({
    json: newTodo,
  });
  if (!response.ok) {
    throw new Error("記事の取得に失敗しました");
  }
  return response.json();
};
