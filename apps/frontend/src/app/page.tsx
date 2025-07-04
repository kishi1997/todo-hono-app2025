import { Header } from "@/components/Header";
import { TodoInput } from "@/components/TodoInput";
import { Todos } from "@/components/Todos";

export default function Home() {
  return (
    <div className="p-4 w-full">
      <Header />
      <main className="p-4 w-full max-w-lg mx-auto">
        <div className="space-y-6">
          <h1 className="tracking-wide border-muted/50 scroll-m-20 border-b pb-2 mb-8 text-3xl font-semibold first:mt-0">
            Smash the task together!
          </h1>
          <TodoInput />
          <Todos />
        </div>
      </main>
    </div>
  );
}
