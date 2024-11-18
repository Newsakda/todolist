'use client';

import { useState } from 'react';
import { TodoItem } from '@/types';

type EmotionalTone = 'benefit' | 'problem' | 'fear' | 'urgency' | 'curiosity';

const toneLabels: Record<EmotionalTone, string> = {
  benefit: 'ผลประโยชน์',
  problem: 'ปัญหา',
  fear: 'ความกลัว',
  urgency: 'เร่งการตัดสินใจ',
  curiosity: 'ชวนสงสัย'
};

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [propertyDetails, setPropertyDetails] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [selectedTone, setSelectedTone] = useState<EmotionalTone>('benefit');
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleAddTodo = () => {
    if (propertyDetails.trim() && propertyLocation.trim()) {
      const newTodos = Array.from({ length: 5 }, (_, index) => ({
        id: Date.now() + index,
        text: `คำพาดหัวที่ ${index + 1}:\n\nรายละเอียด: ${propertyDetails}\nพิกัด: ${propertyLocation}`,
        completed: false
      }));
      
      setTodos(newTodos);
      setHasGenerated(true);
    }
  };

  const handleReset = () => {
    setPropertyDetails('');
    setPropertyLocation('');
    setSelectedTone('benefit');
    setHasGenerated(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">1. ใส่รายละเอียดอสังหาฯ</label>
          <textarea
            value={propertyDetails}
            onChange={(e) => setPropertyDetails(e.target.value)}
            placeholder="Preview: บ้านเดี่ยว 2 ชั้น 3 ห้องนอน 2 ห้องน้ำ พื้นที่ใช้สอย 150 ตร.ม. พร้อมสระว่ายน้ำส่วนตัว เฟอร์นิเจอร์ครบ ราคา 5.9 ล้านบาท"
            className="w-full p-2 border rounded min-h-[100px] resize-y"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">2. กรอกพิกัดทรัพย์</label>
          <textarea
            value={propertyLocation}
            onChange={(e) => setPropertyLocation(e.target.value)}
            placeholder="Preview: ถนนพระราม 9 ใกล้ MRT พระราม 9 เพียง 300 เมตร ใกล้ Central Rama 9, Fortune Town, The Nine"
            className="w-full p-2 border rounded min-h-[100px] resize-y"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">3. โทนอารมณ์ที่ต้องการใช้</label>
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value as EmotionalTone)}
            className="w-full p-2 border rounded bg-white"
          >
            {Object.entries(toneLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleAddTodo}
            disabled={!propertyDetails.trim() || !propertyLocation.trim()}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              propertyDetails.trim() && propertyLocation.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            สร้างคำพาดหัวหยุดนิ้วลูกค้า
          </button>

          {hasGenerated && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-red-500 hover:text-red-600 font-medium flex items-center gap-2 justify-center border border-red-500 rounded hover:bg-red-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset ข้อมูล
            </button>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className="p-4 border rounded bg-gray-50 flex justify-between items-start gap-4"
          >
            <span className="whitespace-pre-line flex-grow">
              {todo.text}
            </span>
            <button
              onClick={() => handleCopy(todo.text)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 whitespace-nowrap"
            >
              คัดลอก
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 