import { useState } from "react";
import Head from "next/head";
import { useTTS } from "@/hooks/useTTS";

export default function Home() {
  const [text, setText] = useState("");
  const {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    resetSettings,
  } = useTTS();

  const handleSpeak = () => {
    if (text.trim()) {
      speak(text);
    }
  };

  const handleClear = () => {
    setText("");
    stop();
  };

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Welcome to the text-to-speech application. This is a demonstration of natural speech synthesis.",
    "In a world increasingly dominated by technology, the ability to convert written text into spoken words has become an essential tool for accessibility and convenience.",
  ];

  const loadSample = (sampleText: string) => {
    setText(sampleText);
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Browser Not Supported</h1>
          <p>Your browser does not support the Web Speech API.</p>
          <p className="text-sm mt-2">Please use Chrome, Edge, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Text to Speech - Free TTS App</title>
        <meta
          name="description"
          content="Convert text to speech with adjustable speed and voice options"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">
              Text to Speech
            </h1>
            <p className="text-purple-200 text-lg">
              Paste text and listen to natural speech synthesis
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
            {/* Text Input Area */}
            <div className="mb-6">
              <label
                htmlFor="text-input"
                className="block text-white font-semibold mb-2 text-lg"
              >
                Enter Your Text
              </label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-48 px-4 py-3 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 resize-none font-sans"
                disabled={isSpeaking && !isPaused}
              />
              <div className="flex justify-between items-center mt-2 text-sm text-purple-200">
                <span>{text.length} characters</span>
                <div className="space-x-2">
                  {sampleTexts.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadSample(sample)}
                      className="text-purple-300 hover:text-white underline text-xs"
                    >
                      Sample {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Voice Selection */}
            <div className="mb-6">
              <label
                htmlFor="voice-select"
                className="block text-white font-semibold mb-2"
              >
                Voice
              </label>
              <select
                id="voice-select"
                value={selectedVoice?.name || ""}
                onChange={(e) => {
                  const voice = voices.find((v) => v.name === e.target.value);
                  setSelectedVoice(voice || null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                disabled={isSpeaking && !isPaused}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="rate-slider"
                  className="text-white font-semibold"
                >
                  Speed
                </label>
                <span className="text-purple-200 text-sm">
                  {rate.toFixed(1)}x
                </span>
              </div>
              <input
                id="rate-slider"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-purple-200 mt-1">
                <span>0.5x (Slow)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x (Fast)</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="pitch-slider"
                  className="text-white font-semibold"
                >
                  Pitch
                </label>
                <span className="text-purple-200 text-sm">
                  {pitch.toFixed(1)}
                </span>
              </div>
              <input
                id="pitch-slider"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-purple-200 mt-1">
                <span>Low</span>
                <span>Normal</span>
                <span>High</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="volume-slider"
                  className="text-white font-semibold"
                >
                  Volume
                </label>
                <span className="text-purple-200 text-sm">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                id="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Reset Button */}
            <div className="mb-8 flex justify-center">
              <button
                onClick={resetSettings}
                className="px-6 py-2 bg-white/10 text-purple-200 text-sm font-medium rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                ↺ Reset to Defaults
              </button>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleSpeak}
                disabled={!text.trim() || (isSpeaking && !isPaused)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                🔊 Speak
              </button>

              {isSpeaking && !isPaused && (
                <button
                  onClick={pause}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                >
                  ⏸️ Pause
                </button>
              )}

              {isPaused && (
                <button
                  onClick={resume}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  ▶️ Resume
                </button>
              )}

              {isSpeaking && (
                <button
                  onClick={stop}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                >
                  ⏹️ Stop
                </button>
              )}

              <button
                onClick={handleClear}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30"
              >
                🗑️ Clear
              </button>
            </div>

            {/* Status Indicator */}
            {isSpeaking && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-purple-500/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">
                    {isPaused ? "Paused" : "Speaking..."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-purple-200 text-sm">
            <p>
              💡 This app uses the Web Speech API built into your browser -
              completely free and works offline!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
