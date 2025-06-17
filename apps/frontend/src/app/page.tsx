"use client";
import { Header } from "@/components/Header";
import { TodoInput } from "@/components/TodoInput";
import { Todos } from "@/components/Todos";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <TodoInput></TodoInput>
      <Todos></Todos>
    </div>
  );
}
