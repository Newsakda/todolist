import Image from "next/image";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-white">
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
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">AI ช่วยคิดคำพาดหัวขายบ้านเงินล้าน</h1>
          <p className="text-gray-600">พัฒนาโปรแกรมโดยอาจารย์นิว</p>
        </div>
        <TodoList />
      </main>
    </div>
  );
}
