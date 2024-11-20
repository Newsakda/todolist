'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const { isSignedIn } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  if (!isSignedIn) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Please sign in to use the Todo List
        </h2>
      </div>
    );
  }

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      
      // เรียงลำดับใหม่: รายการที่ยังไม่เสร็จขึ้นก่อน, ตามด้วยรายการที่เสร็จแล้ว
      return [
        ...updatedTodos.filter(todo => !todo.completed),
        ...updatedTodos.filter(todo => todo.completed)
      ];
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="เพิ่มรายการที่ต้องทำ..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          disabled={!inputValue.trim()}
          className={`px-4 py-2 rounded-md text-white transition-colors
            ${inputValue.trim() 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          เพิ่ม
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className="flex items-center gap-2 p-2 border rounded-md"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="w-4 h-4"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 