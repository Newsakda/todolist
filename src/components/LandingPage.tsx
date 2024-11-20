'use client';

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/ai-headline');
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI. ช่วยคิดคำพาดหัวขายบ้านเงินล้าน
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            เครื่องมือที่จะช่วยให้คุณสร้างคำพาดหัวที่น่าสนใจ ดึงดูดผู้ซื้อ และเพิ่มโอกาสในการขายอสังหาริมทรัพย์ของคุณ
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">ตรงเป้าหมาย</h3>
              <p className="text-gray-600">สร้างคำพาดหัวที่ตรงใจผู้ซื้อ เน้นจุดเด่นของทรัพย์</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-blue-600 text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold mb-2">รวดเร็ว</h3>
              <p className="text-gray-600">ประหยัดเวลาในการคิดคำพาดหัว ได้ผลลัพธ์ภายในไม่กี่วินาที</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-blue-600 text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">หลากหลาย</h3>
              <p className="text-gray-600">มีรูปแบบการเขียนให้เลือกหลากหลาย เหมาะกับทุกสถานการณ์</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                เริ่มต้นใช้งานฟรี
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                เข้าสู่ระบบ
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
} 