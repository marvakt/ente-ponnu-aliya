import React from 'react';
import { RefreshCw } from 'lucide-react';

const MotivationCard = ({ motivationText, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          💪 OKAY, ROAST OVER.
        </h3>
      </div>
      
      <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
        {/* Calmer decorative background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500"></div>
        
        <div className="text-lg text-slate-300 leading-relaxed whitespace-pre-wrap text-center mb-8">
          {motivationText}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <RefreshCw className="w-5 h-5" />
            ROAST ME AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationCard;
