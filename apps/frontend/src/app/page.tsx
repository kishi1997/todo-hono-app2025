"use client";
import { Header } from "@/components/Header";
import { TodoInput } from "@/components/TodoInput";
import { Todos } from "@/components/Todos";
import { supabaseSignout } from "@/features/supabase/action";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <button
        className="bg-blue-500 text-white p-2 rounded-md m-auto"
        onClick={() => supabaseSignout()}
      >
        logout
      </button>
      <TodoInput></TodoInput>
      <Todos></Todos>
    </div>
  );
}
