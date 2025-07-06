import { Todo } from "@/types/api";
import { create } from "zustand";

type TodoStore = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  totalCount: 0,
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      return { todos: newTodos };
    }),
  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((t) => t.id !== id);
      return { todos: newTodos };
    }),
}));
