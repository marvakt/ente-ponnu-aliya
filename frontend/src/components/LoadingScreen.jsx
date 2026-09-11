import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    "🧠 Analyzing your life choices...",
    "👀 Checking your emotional damage...",
    "🤨 Consulting your Malayali best friend...",
    "🔥 Preparing your destruction...",
    "🎵 Turning your problems into a song...",
    "💀 Almost ready to roast you..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full w-32 h-32 animate-pulse"></div>
        <Loader2 className="w-20 h-20 text-orange-500 animate-spin relative z-10" />
      </div>
      
      <div className="h-20 flex items-center justify-center text-center">
        <p 
          key={messageIndex}
          className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 animate-fade-in-up"
        >
          {messages[messageIndex]}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default LoadingScreen;
