'use client';

import { useState } from 'react';
import { TodoItem } from '@/types';
import PomodoroTimer from './PomodoroTimer';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [activePomodoro, setActivePomodoro] = useState<string | null>(null);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ).sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    }));
  };

  const startPomodoro = (text: string) => {
    setActivePomodoro(text);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAddTodo}
          disabled={!newTodo.trim()}
          className={`px-4 py-2 rounded ${
            newTodo.trim() 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {todos.map(todo => (
          <li 
            key={todo.id}
            className="flex items-center gap-2 p-2 border rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="w-5 h-5"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.text}
            </span>
            {!todo.completed && (
              <button
                onClick={() => startPomodoro(todo.text)}
                className="ml-auto p-2 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                aria-label="Start Pomodoro timer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>

      {activePomodoro && (
        <PomodoroTimer
          task={activePomodoro}
          onClose={() => setActivePomodoro(null)}
        />
      )}
    </div>
  );
} 