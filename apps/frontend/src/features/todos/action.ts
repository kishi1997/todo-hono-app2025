"use server";
import {
  TodoPostRequest,
  TodoPostResponse,
  TodosDeleteRequest,
  TodosDeleteResponse,
  TodosGetResponse,
  TodosPatchRequest,
  TodosPatchResponse,
} from "@/types/api";
import { createAuthorizedClient } from "@/utils/client";

// Todo取得
export const getTodoList = async (): Promise<TodosGetResponse> => {
  const client = await createAuthorizedClient();
  const response = await client.todos.$get();
  if (!response.ok) {
    throw new Error("Todoの取得に失敗しました");
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
    throw new Error("Todoの追加に失敗しました");
  }
  return response.json();
};
// Todo編集
export const updateTodo = async (
  todo: TodosPatchRequest
): Promise<TodosPatchResponse> => {
  const client = await createAuthorizedClient();
  const response = await client.todos.$patch(todo);
  if (!response.ok) {
    throw new Error("Todoの更新に失敗しました");
  }
  return response.json();
};
// Todo削除
export const deleteTodo = async (
  id: TodosDeleteRequest
): Promise<TodosDeleteResponse> => {
  const client = await createAuthorizedClient();
  const response = await client.todos.$delete(id);
  if (!response.ok) {
    throw new Error("Todoの削除に失敗しました");
  }
  return response.json();
};
