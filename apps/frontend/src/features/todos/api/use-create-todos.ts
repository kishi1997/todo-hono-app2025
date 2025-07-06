import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../action";
import { TodoPostResponse } from "@/types/api";

// mutationFnに渡す変数の型を定義
// IDはmutationFn内で生成するため、ここではtitleとdescriptionのみ
type CreateTodoVariables = {
  title: string;
  description: string;
};

export const useCreateTodo = () => {
  // const queryClient = useQueryClient();

  return useMutation<TodoPostResponse, Error, CreateTodoVariables>({
    mutationFn: async (variables: { title: string; description: string }) => {
      const id = crypto.randomUUID();
      const newTodoData = { ...variables, id };
      const response = await createTodo(newTodoData);
      return response;
    },
    // zustandで管理するため必要ない
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["todos"] });
    // },
  });
};
