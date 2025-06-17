import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../action";
import { TodosGetResponse } from "@/types/api";

export const useGetTodos = () => {
  const query = useQuery<TodosGetResponse, Error>({
    queryKey: ["todos"],
    queryFn: async () => {
      const todos = await getTodoList();
      return todos;
    },
  });
  return query;
};
