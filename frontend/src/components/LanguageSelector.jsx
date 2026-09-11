import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-slate-800/80 p-1 rounded-full flex gap-1 shadow-inner border border-slate-700/50 backdrop-blur-md">
        <button
          onClick={() => setLanguage('malayalam')}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            language === 'malayalam'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md transform scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🇮🇳 മലയാളം
        </button>
        <button
          onClick={() => setLanguage('manglish')}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            language === 'manglish'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md transform scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🔥 Manglish
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
