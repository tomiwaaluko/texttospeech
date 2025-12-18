import { useState, useEffect, useCallback, useRef } from "react";

interface UseTTSReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  resetSettings: () => void;
}

export const useTTS = (): UseTTSReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef<string>("");
  const charIndexRef = useRef<number>(0);
  const isRestartingRef = useRef<boolean>(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Set default voice to first English voice or first voice available
        if (availableVoices.length > 0 && !selectedVoice) {
          const englishVoice = availableVoices.find((voice) =>
            voice.lang.startsWith("en")
          );
          setSelectedVoice(englishVoice || availableVoices[0]);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback(
    (text: string, startFromChar: number = 0) => {
      if (!isSupported || !text.trim()) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Store the full text and starting position
      currentTextRef.current = text;
      charIndexRef.current = startFromChar;

      // Get the text portion to speak from the current position
      const textToSpeak = text.substring(startFromChar);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        if (!isRestartingRef.current) {
          setIsSpeaking(true);
          setIsPaused(false);
        }
        isRestartingRef.current = false;
      };

      utterance.onboundary = (event) => {
        // Track character position as speech progresses
        if (event.charIndex !== undefined) {
          charIndexRef.current = startFromChar + event.charIndex;
        }
      };

      utterance.onend = () => {
        if (!isRestartingRef.current) {
          setIsSpeaking(false);
          setIsPaused(false);
          charIndexRef.current = 0;
        }
      };

      utterance.onerror = (event) => {
        // Ignore errors from intentional cancellations
        if (event.error !== "interrupted" && event.error !== "cancelled") {
          setIsSpeaking(false);
          setIsPaused(false);
          charIndexRef.current = 0;
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, rate, pitch, volume, selectedVoice]
  );

  // Effect to restart speech when rate or pitch changes during playback
  // Volume changes are applied directly without restart
  useEffect(() => {
    if (
      isSpeaking &&
      !isPaused &&
      currentTextRef.current &&
      !isRestartingRef.current
    ) {
      // Clear any pending updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Debounce the restart to avoid too many rapid restarts
      updateTimeoutRef.current = setTimeout(() => {
        if (isSpeaking && !isPaused) {
          // Mark that we're restarting to avoid state flickers
          isRestartingRef.current = true;

          // Restart from current position with new settings
          const currentPosition = charIndexRef.current;
          speak(currentTextRef.current, currentPosition);
        }
      }, 150); // 150ms debounce for smoother experience
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [rate, pitch, isSpeaking, isPaused, speak]);

  // Volume can be updated without restarting the utterance
  useEffect(() => {
    if (utteranceRef.current && isSpeaking) {
      utteranceRef.current.volume = volume;
    }
  }, [volume, isSpeaking]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);

  const stop = useCallback(() => {
    if (isSupported) {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      charIndexRef.current = 0;
      currentTextRef.current = "";
      isRestartingRef.current = false;
    }
  }, [isSupported]);

  const resetSettings = useCallback(() => {
    setRate(1);
    setPitch(1);
    setVolume(1);
  }, []);

  return {
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
  };
};
