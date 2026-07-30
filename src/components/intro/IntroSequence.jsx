import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartButton from './StartButton';
import VaultDoors from './VaultDoors';
import LoadingWindow from './LoadingWindow';
import './intro.css';

const IntroSequence = ({ onComplete, enableSkip = true }) => {
  // Stages: 'start' | 'vault' | 'loading' | 'complete'
  const [stage, setStage] = useState('start');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Check localStorage on mount for skipping the intro
  useEffect(() => {
    if (enableSkip) {
      const hasPlayed = localStorage.getItem('introPlayed');
      if (hasPlayed === 'true') {
        onComplete();
      }
    }
  }, [onComplete, enableSkip]);

  // Synchronize audio muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle stage transition from Vault Doors opening to Loading Screen
  useEffect(() => {
    if (stage === 'vault') {
      const timer = setTimeout(() => {
        setStage('loading');
      }, 3500); // Matches the 3.5s vault slide duration
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleStartClick = () => {
    // Play the engine audio
    if (audioRef.current) {
      try {
        audioRef.current.volume = isMuted ? 0 : 0.6;
        audioRef.current.loop = true;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio playback prevented by browser autoplay policy:', err);
          });
        }
      } catch (err) {
        console.warn('HTML5 Audio API failed to load/play car-engine.mp3:', err);
      }
    }
    // Transition to Stage 2: Vault Open
    setStage('vault');
  };

  const handleLoadingFinished = () => {
    // Transition to final Stage 4: Fade Out
    setStage('complete');
    fadeOutAudio();
  };

  const handleSkip = () => {
    if (enableSkip) {
      localStorage.setItem('introPlayed', 'true');
    }
    setStage('complete');
    fadeOutAudio();
  };

  // Gradually reduce audio volume to 0 over 500ms, then pause
  const fadeOutAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const startVolume = audio.volume;
    const fadeDuration = 500; // ms
    const intervalTime = 50; // ms
    const steps = fadeDuration / intervalTime;
    const stepVolume = startVolume / steps;

    const fadeTimer = setInterval(() => {
      if (audio.volume - stepVolume <= 0) {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeTimer);
      } else {
        audio.volume -= stepVolume;
      }
    }, intervalTime);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={stage === 'complete' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (stage === 'complete') {
          // Store completion in localStorage for future visits
          if (enableSkip) {
            localStorage.setItem('introPlayed', 'true');
          }
          onComplete();
        }
      }}
      className="fixed inset-0 w-full h-full z-50 bg-[#050814] intro-container select-none overflow-hidden"
    >
      {/* Hidden Audio element with Graceful Error Fallbacks */}
      <audio
        ref={audioRef}
        src="/sounds/car-engine.mp3"
        preload="auto"
        className="hidden"
        onError={(e) => {
          console.warn('Error loading audio asset: /sounds/car-engine.mp3. Animation will continue without sound.', e);
        }}
      />

      {/* High-Tech Controls Toolbar (Skip Only) */}
      {stage === 'start' && (
        <div className="absolute top-6 right-6 z-50 flex items-center space-x-4 pointer-events-auto">
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="px-4 py-1.5 bg-[#0b1126]/60 hover:bg-[#00d4ff]/10 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 rounded-full text-[#00d4ff] text-[10px] md:text-xs font-black tracking-widest intro-orbitron hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            SKIP INTRO
          </button>
        </div>
      )}

      {/* Stage Views */}
      <AnimatePresence mode="wait">
        {stage === 'start' && (
          <StartButton key="start-btn" onClick={handleStartClick} />
        )}
      </AnimatePresence>

      {/* Keep Vault Doors visible in background during Loading Stage */}
      {(stage === 'vault' || stage === 'loading') && (
        <VaultDoors isOpening={true} />
      )}

      {stage === 'loading' && (
        <LoadingWindow onFinished={handleLoadingFinished} />
      )}
    </motion.div>
  );
};

export default IntroSequence;
