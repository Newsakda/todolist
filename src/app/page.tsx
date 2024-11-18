import Image from "next/image";
import PropertyForm from "@/components/PropertyForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-white">
      <main className="w-full max-w-2xl flex flex-col items-center gap-6">
        <div className="animate-[bounce_2s_ease-in-out_infinite]">
          <Image
            src="/logo.svg"
            alt="AI Real Estate Assistant"
            width={80}
            height={80}
            priority
            className="hover:scale-110 transition-transform"
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI ช่วยคิดคำพาดหัวขายบ้านเงินล้าน
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            พัฒนาโปรแกรมโดยอาจารย์นิว
          </p>
        </div>
        <PropertyForm />
      </main>
    </div>
  );
}
