import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../action";
import { TodosPatchResponse } from "@/types/api";

type UpdateTodoVariables = {
  id: string;
  title: string;
  description: string | null;
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
};

export const useUpdateTodo = () => {
  return useMutation<TodosPatchResponse, Error, UpdateTodoVariables>({
    mutationFn: async (variables: UpdateTodoVariables) => {
      const newTodoData = { json: { ...variables } };
      const response = await updateTodo(newTodoData);
      return response;
    },
  });
};
