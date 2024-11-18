'use client';
import { useState } from 'react';

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

  const toneOptions = [
    'ผลประโยชน์',
    'ปัญหา',
    'ความกลัว',
    'เร่งการตัดสินใจ',
    'ชวนสงสัย'
  ];

  const generateHeadlines = () => {
    setIsLoading(true);
    // จำลองการเรียก API (สามารถแทนที่ด้วยการเรียก API จริงในภายหลัง)
    setTimeout(() => {
      const demoHeadlines = [
        { id: 1, text: '🏠 บ้านสวยพร้อมสระ ใกล้ MRT พระราม 9 เพียง 5.9 ล้าน คุ้มค่าน่า���งทุน!' },
        { id: 2, text: '⭐ โอกาสทองมาถึงแล้ว! บ้านเดี่ยว 2 ชั้น ทำเลทอง ใกล้ Central Rama 9' },
        { id: 3, text: '💎 Luxury Home ใจกลางพระราม 9 พร้อมสระว่ายน้ำส่วนตัว ราคาเริ่มต้น 5.9 ล้าน' },
        { id: 4, text: '🌟 ห้ามพลาด! บ้านหรูย่านธุรกิจ ครบครันทุกฟังก์ชัน ราคาจับต้องได้' },
        { id: 5, text: '✨ ดีที่สุดในพระราม 9! บ้านสไตล์โมเดิร์น พร้อมอยู่ ใกล้ทุกความสะดวก' }
      ];
      setHeadlines(demoHeadlines);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          1. ใส่รายละเอียดอสังหาฯ
        </label>
        <textarea
          value={propertyDetails}
          onChange={(e) => setPropertyDetails(e.target.value)}
          placeholder="Preview: บ้านเดี่ยว 2 ชั้น 3 ห้องนอน 2 ห้องน้ำ พื้นที่ใช้สอย 150 ตร.ม. พร้อมสระว่ายน้ำส่วนตัว เฟอร์นิเจอร์ครบ ราคา 5.9 ล้านบาท"
          className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          2. กรอกพิกัดทรัพย์
        </label>
        <textarea
          value={propertyLocation}
          onChange={(e) => setPropertyLocation(e.target.value)}
          placeholder="Preview: ถนนพระราม 9 ใกล้ MRT พระราม 9 เพียง 300 เมตร ใกล้ Central Rama 9, Fortune Town, The Nine"
          className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          3. โทนการเขียนที่ต้องการใช้
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`p-2 rounded-lg transition-colors ${
                selectedTone === tone
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateHeadlines}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isLoading ? 'กำลังสร้างคำพาดหัว...' : 'สร้างคำพาดหัว'}
      </button>

      {/* ส่วนแสดงผลลัพธ์ */}
      {headlines.length > 0 && (
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">ผลลัพธ์คำพาดหัว</h2>
          <div className="space-y-3">
            {headlines.map((headline) => (
              <div
                key={headline.id}
                className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer group"
              >
                <p className="text-gray-800">{headline.text}</p>
                <button 
                  className="mt-2 text-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => navigator.clipboard.writeText(headline.text)}
                >
                  คลิกเพื่อคัดลอก
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 