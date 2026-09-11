import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

const CameraPreview = ({ setCameraStream }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraStream(stream);
        setIsReady(true);
      } catch (err) {
        console.error("Camera error:", err);
        setError("📷 Camera permission venam mone! Please allow camera access.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [setCameraStream]);

  return (
    <div className="relative w-full max-w-lg mx-auto mb-8">
      <div className="relative rounded-2xl overflow-hidden bg-slate-800 border-4 border-slate-700 shadow-2xl aspect-video flex items-center justify-center">
        {error ? (
          <div className="text-center p-6 flex flex-col items-center">
            <CameraOff className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-300 font-medium">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
              </div>
            )}
            {/* Visual Frame Effect */}
            <div className="absolute inset-0 border-2 border-orange-500/30 rounded-2xl pointer-events-none"></div>
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-orange-500/70 rounded-tl-lg pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-orange-500/70 rounded-tr-lg pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-orange-500/70 rounded-bl-lg pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-orange-500/70 rounded-br-lg pointer-events-none"></div>
            
            {isReady && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-white tracking-wider">READY</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CameraPreview;
