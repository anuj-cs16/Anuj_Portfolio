import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingWindow from './LoadingWindow';
import './intro.css';

const IntroSequence = ({ onComplete }) => {
  // Stages: 'loading' | 'complete'
  const [stage, setStage] = useState('loading');

  const handleLoadingFinished = () => {
    // Transition to final Stage: Fade Out
    setStage('complete');
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={stage === 'complete' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (stage === 'complete') {
          onComplete();
        }
      }}
      className="fixed inset-0 w-full h-full z-50 bg-[#050814] intro-container select-none overflow-hidden"
    >
      {stage === 'loading' && (
        <LoadingWindow onFinished={handleLoadingFinished} />
      )}
    </motion.div>
  );
};

export default IntroSequence;

