'use client';
import { useState, useRef } from 'react';
import { generateHeadlines } from '@/services/difyApi';
import Image from 'next/image';

interface Headline {
  id: number;
  text: string;
}

export default function PropertyForm() {
  const [propertyDetails, setPropertyDetails] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [selectedTone, setSelectedTone] = useState('ผลประโยชน์');
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const toneOptions = [
    'ผลประโยชน์',
    'ปัญหา',
    'ความกลัว',
    'เร่งการตัดสินใจ',
    'ชวนสงสัย'
  ];

  const generateHeadlinesFromDify = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await generateHeadlines(
        propertyDetails,
        propertyLocation,
        selectedTone
      );
      
      // Split the response into separate headlines and format them
      const generatedHeadlines = response
        .split('\n')
        .filter((line: string) => line.trim())
        .map((text: string, index: number) => ({
          id: Date.now() + index,
          text: text.trim()
        }));

      setHeadlines(generatedHeadlines);
      
      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Error generating headlines:', error);
      setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสร้างคำพาดหัว');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, id: number) => {
    try {
      const cleanText = text.replace(/^\d+\.\s*/, '');
      await navigator.clipboard.writeText(cleanText);
      setCopiedId(id);
      // Reset copied status after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      setError('ไม่สามารถคัดลอกข้อความได้');
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          1. ใส่รายละเอียดอสังหาฯ
        </label>
        <textarea
          value={propertyDetails}
          onChange={(e) => setPropertyDetails(e.target.value)}
          placeholder="Preview: บ้านเดี่ยว 2 ชั้น 3 ห้องนอน 2 ห้องน้ำ พื้นที่ใช้สอย 150 ตร.ม. พร้อมสระว่ายน้ำส่วนตัว เฟอร์นิเจอร์ครบ ราคา 5.9 ล้านบาท"
          className="w-full p-4 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 text-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          2. กรอกพิกัดทรัพย์
        </label>
        <textarea
          value={propertyLocation}
          onChange={(e) => setPropertyLocation(e.target.value)}
          placeholder="Preview: ถนนพระราม 9 ใกล้ MRT พระราม 9 เพียง 300 เมตร ใกล้ Central Rama 9, Fortune Town, The Nine"
          className="w-full p-4 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 text-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          3. โทนการเขียนที่ต้องการใช้
        </label>
        <select
          value={selectedTone}
          onChange={(e) => setSelectedTone(e.target.value)}
          className="w-full p-4 border rounded-lg bg-white text-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {toneOptions.map((tone) => (
            <option key={tone} value={tone} className="py-2">
              {tone}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <button
        onClick={generateHeadlinesFromDify}
        disabled={isLoading || !propertyDetails || !propertyLocation}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
      >
        {isLoading ? 'กำลังสร้างคำพาดหัว...' : 'สร้างคำพาดหัว'}
      </button>

      {headlines.length > 0 && (
        <div ref={resultRef} className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="/course.png"
              alt="Course Banner"
              width={600}
              height={338}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">ผลลัพธ์คำพาดหัว</h2>
            <div className="space-y-4">
              {headlines.map((headline) => (
                <div
                  key={headline.id}
                  className="p-5 bg-white rounded-lg border hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-800 text-lg">{headline.text}</p>
                  <button 
                    className={`mt-3 text-base transition-colors flex items-center gap-2
                      ${copiedId === headline.id 
                        ? 'text-green-500 hover:text-green-600' 
                        : 'text-blue-500 hover:text-blue-600'
                      }`}
                    onClick={() => handleCopy(headline.text, headline.id)}
                  >
                    {copiedId === headline.id ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        คัดลอกแล้ว
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        คลิกเพื่อคัดลอก
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 