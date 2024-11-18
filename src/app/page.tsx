import Image from "next/image";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <main className="w-full max-w-2xl flex flex-col items-center gap-6">
        <div className="animate-bounce">
          <Image
            src="/logo.svg"
            alt="Todo List Logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold">To-Do-List</h1>
        <TodoList />
      </main>
    </div>
  );
}
