import { Header } from "@/components/Header";
import { TodoInput } from "@/components/TodoInput";
import { Todos } from "@/components/Todos";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
      <Header />
      <main className="container max-w-2xl mx-auto mt-8 px-4">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            Todo App
          </h1>
          <TodoInput />
          <Todos />
        </div>
      </main>
    </div>
  );
}
