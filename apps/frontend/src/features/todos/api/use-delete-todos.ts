import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../action";
import { TodosDeleteResponse } from "@/types/api";

type DeleteTodoVariables = {
  id: string;
};

export const useDeleteTodo = () => {
  return useMutation<TodosDeleteResponse, Error, DeleteTodoVariables>({
    mutationFn: async (variables: DeleteTodoVariables) => {
      const todosId = { json: { ...variables } };
      const response = await deleteTodo(todosId);
      return response;
    },
  });
};
