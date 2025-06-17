"use client";
import { useGetTodos } from "@/features/todos/api/use-get-todos";

export const Todos = () => {
  const { data, isLoading } = useGetTodos();

  if (isLoading) {
    return (
      <div className="w-full mt-72 flex justify-center items-center">
        loading...
      </div>
    );
  }
  if (!data) {
    return (
      <div className="w-full mt-64 flex justify-center items-center">
        todoが見つかりません
      </div>
    );
  }
  return (
    <div className="pb-10">
      {data.todos.map((todo) => (
        <div
          key={todo.id}
          className="max-w-[600px] mx-auto mt-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
          {todo.description && (
            <p className="mt-2 text-gray-600">{todo.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};
