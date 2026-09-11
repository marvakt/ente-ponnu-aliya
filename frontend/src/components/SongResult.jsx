import { useState } from 'react';
import AudioPlayer from './AudioPlayer';

const SongResult = ({ roastData, onSongComplete }) => {
  const [songEnded, setSongEnded] = useState(false);

  const handleAudioEnded = () => {
    setSongEnded(true);
    onSongComplete(); // Trigger motivation to show
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in-up">
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-400 text-sm font-bold tracking-wider border border-red-500/30 mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              🚨 EMOTIONAL DAMAGE DETECTED
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-2">Your Roasting Song</h2>
            <p className="text-slate-400">"{roastData.title}"</p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700/50 min-h-[250px] flex items-center justify-center font-serif italic shadow-inner">
            <pre className="text-xl md:text-2xl text-center text-slate-200 whitespace-pre-wrap leading-relaxed">
              {roastData.lyrics}
            </pre>
          </div>

          <AudioPlayer
            audioUrl={roastData.audioUrl}
            onEnded={handleAudioEnded}
          />
        </div>
      </div>
    </div>
  );
};

export default SongResult;
