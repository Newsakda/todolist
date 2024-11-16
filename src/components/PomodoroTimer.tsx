'use client';

import { useEffect, useState } from 'react';

interface PomodoroTimerProps {
  task: string;
  onClose: () => void;
}

export default function PomodoroTimer({ task, onClose }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close timer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            {task}
          </h2>
          <div className="font-mono text-7xl font-bold mb-8 text-gray-900 tracking-wider">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? 'Stop' : 'Resume'}
          </button>
        </div>
      </div>
    </div>
  );
} 