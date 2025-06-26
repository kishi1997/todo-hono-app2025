import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../action";
import { TodosDeleteResponse } from "@/types/api";

type DeleteTodoVariables = {
  id: string;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<TodosDeleteResponse, Error, DeleteTodoVariables>({
    mutationFn: async (variables: DeleteTodoVariables) => {
      const todosId = { json: { ...variables } };
      const response = await deleteTodo(todosId);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
