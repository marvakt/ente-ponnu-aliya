import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const AudioPlayer = ({ audioUrl, onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // For mock purposes: if no real audioUrl is provided, we simulate playback
    if (!audioUrl || audioUrl === '/assets/sounds/mock-song.mp3') {
      let interval;
      if (isPlaying) {
        interval = setInterval(() => {
          setProgress(p => {
            if (p >= 100) {
              setIsPlaying(false);
              if (onEnded) onEnded();
              return 0;
            }
            return p + 2; // Simulate 50 seconds song
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [isPlaying, audioUrl, onEnded]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current && audioUrl && audioUrl !== '/assets/sounds/mock-song.mp3') {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (onEnded) onEnded();
  };

  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 mt-6 shadow-inner">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="hidden"
      />
      
      <div className="flex items-center gap-4">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 text-slate-900 transition-colors shadow-lg shadow-orange-500/20"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>{isPlaying ? 'Playing Roast...' : 'Paused'}</span>
            <span className="flex items-center gap-1"><Volume2 className="w-3 h-3" /> AI Generated</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
