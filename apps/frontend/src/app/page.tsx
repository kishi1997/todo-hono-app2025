"use client";
import { TodoInput } from "@/components/TodoInput";
import { Todos } from "@/components/Todos";

export default function Home() {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-center">Todo</h1>
      <TodoInput></TodoInput>
      <Todos></Todos>
    </div>
  );
}
