import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../action";
import { TodosGetResponse } from "@/types/api";
import { useTodoStore } from "@/store/todos";

export const useGetTodos = () => {
  const setTodos = useTodoStore((state) => state.setTodos);

  return useQuery<TodosGetResponse, Error>({
    queryKey: ["todos"],
    queryFn: async (): Promise<TodosGetResponse> => {
      const res = await getTodoList();
      setTodos(res.todos);
      return res;
    },
  });
};
