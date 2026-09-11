import { useState } from 'react';
import CameraPreview from './components/CameraPreview';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import LoadingScreen from './components/LoadingScreen';
import MotivationCard from './components/MotivationCard';
import SongResult from './components/SongResult';
import VoiceRecorder from './components/VoiceRecorder';

function App() {
  const [language, setLanguage] = useState('manglish');
  const [appState, setAppState] = useState('HOME'); // HOME, RECORDING, PROCESSING, RESULT
  const [cameraStream, setCameraStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);

  // Real API state
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleRecordingComplete = async (blob) => {
    setAudioBlob(blob);
    setAppState('PROCESSING');
    setApiError(null);

    try {
      // 1. Get the Lyrics and Motivation from Gemini
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');
      formData.append('language', language);

      const analyzeResponse = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const analyzeData = await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        throw new Error(analyzeData.detail || 'Failed to analyze text with Gemini');
      }

      // 2. Generate the Audio Song from the lyrics
      const songResponse = await fetch('http://127.0.0.1:8000/generate-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lyrics: analyzeData.lyrics,
          language: analyzeData.language
        }),
      });

      const songData = await songResponse.json();

      if (!songResponse.ok) {
        throw new Error(songData.detail || 'Failed to generate song audio');
      }

      setApiResult({
        roast: {
          lyrics: analyzeData.lyrics,
          audioUrl: `http://127.0.0.1:8000${songData.audioUrl}`, // Full URL to the static file
          title: "🚨 Roast Alert"
        },
        motivation: analyzeData.motivation
      });
      setAppState('RESULT');
    } catch (err) {
      console.error(err);
      setApiError(err.message);
      setAppState('HOME');
    }
  };

  const handleReset = () => {
    setAppState('HOME');
    setAudioBlob(null);
    setShowMotivation(false);
    setIsRecording(false);
    setApiResult(null);
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-orange-500/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header language={language} />

        {apiError && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-center text-red-200">
            <p className="font-bold">Error connecting to your best friend:</p>
            <p>{apiError}</p>
          </div>
        )}

        {appState === 'HOME' || appState === 'RECORDING' ? (
          <div className="animate-fade-in-up">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <CameraPreview setCameraStream={setCameraStream} />
            <VoiceRecorder
              onRecordingComplete={handleRecordingComplete}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
          </div>
        ) : null}

        {appState === 'PROCESSING' && (
          <LoadingScreen />
        )}

        {appState === 'RESULT' && apiResult && (
          <div className="py-8">
            <SongResult
              roastData={apiResult.roast}
              onSongComplete={() => setShowMotivation(true)}
            />
            {showMotivation && (
              <MotivationCard
                motivationText={apiResult.motivation}
                onReset={handleReset}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
