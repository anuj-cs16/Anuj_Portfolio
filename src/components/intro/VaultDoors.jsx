import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VaultDoors = ({ isOpening }) => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    if (isOpening) {
      const newSparks = [];
      // Generate a rich set of 40 sparks that shoot outwards and upwards when vault splits
      for (let i = 0; i < 45; i++) {
        newSparks.push({
          id: i,
          top: 10 + Math.random() * 80,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 1.5,
          duration: 0.8 + Math.random() * 1.2,
          translateX: (Math.random() - 0.5) * 220,
          translateY: -60 - Math.random() * 120,
        });
      }
      setSparks(newSparks);
    }
  }, [isOpening]);

  const leftDoorVariants = {
    closed: { x: 0 },
    open: {
      x: '-100%',
      transition: { duration: 3.5, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const rightDoorVariants = {
    closed: { x: 0 },
    open: {
      x: '100%',
      transition: { duration: 3.5, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const gearLeftVariants = {
    closed: { rotate: 0 },
    open: {
      rotate: -180,
      transition: { duration: 3.2, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const gearRightVariants = {
    closed: { rotate: 0 },
    open: {
      rotate: 180,
      transition: { duration: 3.2, ease: [0.65, 0, 0.35, 1] },
    },
  };

  // Generate rivets/bolts column
  const renderRivetsColumn = (count = 10) => {
    return [...Array(count)].map((_, i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600/35 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),1px_1px_1px_rgba(255,255,255,0.12)]"
      />
    ));
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-40 ${isOpening ? 'shake-active' : ''}`}>
      {/* Left Door */}
      <motion.div
        variants={leftDoorVariants}
        initial="closed"
        animate={isOpening ? 'open' : 'closed'}
        className="absolute left-0 top-0 w-1/2 h-screen vault-door-left border-r border-[#00d4ff]/40 flex items-center justify-end z-20 pointer-events-auto"
      >
        {/* Fine Panel Accents */}
        <div className="absolute inset-y-0 left-8 right-12 border-l border-r border-slate-700/10 pointer-events-none" />
        <div className="absolute inset-x-12 top-12 bottom-12 border-t border-b border-slate-700/10 pointer-events-none" />

        {/* Decorative mechanical rivets */}
        <div className="absolute left-8 inset-y-0 flex flex-col justify-around py-16 opacity-30 pointer-events-none">
          {renderRivetsColumn(8)}
        </div>
        <div className="absolute right-12 inset-y-0 flex flex-col justify-around py-16 opacity-35 pointer-events-none">
          {renderRivetsColumn(8)}
        </div>

        {/* Cyan Glowing split seam indicator */}
        <div className="absolute right-0 top-0 w-[2px] h-full bg-[#00d4ff] shadow-[0_0_12px_#00d4ff,0_0_4px_#00d4ff] seam-glow-active" />

        {/* Split Hub Mechanism (Left Half) */}
        <div className="relative w-[80px] h-[160px] overflow-hidden flex items-center justify-end mr-[-1px] z-30 select-none pointer-events-none">
          <motion.div
            variants={gearLeftVariants}
            className="w-[160px] h-[160px] rounded-full border-[3px] border-[#00d4ff] bg-[#050814] shadow-[0_0_20px_rgba(0,212,255,0.45),inset_0_0_15px_rgba(0,212,255,0.2)] flex items-center justify-end relative"
            style={{ transformOrigin: '100% 50%', marginRight: '-80px' }}
          >
            {/* Tech details inside Left Hub */}
            <div className="absolute top-1/2 left-4 w-12 h-[2px] bg-[#00d4ff]/50 -translate-y-1/2" />
            <div className="absolute top-8 left-8 w-10 h-[2px] bg-[#00d4ff]/40 rotate-[45deg]" />
            <div className="absolute bottom-8 left-8 w-10 h-[2px] bg-[#00d4ff]/40 rotate-[-45deg]" />
            <div className="w-[110px] h-[110px] rounded-full border border-dashed border-[#a855f7]/30 absolute right-6" />
          </motion.div>
        </div>

        {/* Left Side System Details Display */}
        <div className="absolute top-[25%] left-16 p-4 border border-[#00d4ff]/15 rounded bg-slate-950/50 text-left font-mono text-[9px] text-[#00d4ff]/50 tracking-wider leading-relaxed select-none pointer-events-none">
          <div className="text-white/80 font-bold mb-1 border-b border-[#00d4ff]/20 pb-1">VAULT STATS</div>
          CORE SECURE: 100%<br />
          PRESSURE: DECOMPRESSED<br />
          LOCK_STATUS: RELEASED<br />
          SPLIT_ANGLE: 180deg
        </div>
      </motion.div>

      {/* Right Door */}
      <motion.div
        variants={rightDoorVariants}
        initial="closed"
        animate={isOpening ? 'open' : 'closed'}
        className="absolute right-0 top-0 w-1/2 h-screen vault-door-right border-l border-[#00d4ff]/40 flex items-center justify-start z-20 pointer-events-auto"
      >
        {/* Fine Panel Accents */}
        <div className="absolute inset-y-0 left-12 right-8 border-l border-r border-slate-700/10 pointer-events-none" />
        <div className="absolute inset-x-12 top-12 bottom-12 border-t border-b border-slate-700/10 pointer-events-none" />

        {/* Decorative mechanical rivets */}
        <div className="absolute left-12 inset-y-0 flex flex-col justify-around py-16 opacity-35 pointer-events-none">
          {renderRivetsColumn(8)}
        </div>
        <div className="absolute right-8 inset-y-0 flex flex-col justify-around py-16 opacity-30 pointer-events-none">
          {renderRivetsColumn(8)}
        </div>

        {/* Cyan Glowing split seam indicator */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-[#00d4ff] shadow-[0_0_12px_#00d4ff,0_0_4px_#00d4ff] seam-glow-active" />

        {/* Split Hub Mechanism (Right Half) */}
        <div className="relative w-[80px] h-[160px] overflow-hidden flex items-center justify-start ml-[-1px] z-30 select-none pointer-events-none">
          <motion.div
            variants={gearRightVariants}
            className="w-[160px] h-[160px] rounded-full border-[3px] border-[#00d4ff] bg-[#050814] shadow-[0_0_20px_rgba(0,212,255,0.45),inset_0_0_15px_rgba(0,212,255,0.2)] flex items-center justify-start relative"
            style={{ transformOrigin: '0% 50%', marginLeft: '-80px' }}
          >
            {/* Tech details inside Right Hub */}
            <div className="absolute top-1/2 right-4 w-12 h-[2px] bg-[#00d4ff]/50 -translate-y-1/2" />
            <div className="absolute top-8 right-8 w-10 h-[2px] bg-[#00d4ff]/40 rotate-[-45deg]" />
            <div className="absolute bottom-8 right-8 w-10 h-[2px] bg-[#00d4ff]/40 rotate-[45deg]" />
            <div className="w-[110px] h-[110px] rounded-full border border-dashed border-[#a855f7]/30 absolute left-6" />
          </motion.div>
        </div>

        {/* Right Side System Details Display */}
        <div className="absolute bottom-[25%] right-16 p-4 border border-[#a855f7]/15 rounded bg-slate-950/50 text-left font-mono text-[9px] text-[#a855f7]/50 tracking-wider leading-relaxed select-none pointer-events-none">
          <div className="text-white/80 font-bold mb-1 border-b border-[#a855f7]/20 pb-1">MATRIX CONFIG</div>
          GATEWAY: INCOMING<br />
          HYDRAULICS: SYS_ENGAGED<br />
          TARGET_DIR: /anuj-dubey<br />
          REV_KEY: 0x7E3A9
        </div>
      </motion.div>

      {/* Sparks Eruption Container */}
      {isOpening && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="absolute bg-gradient-to-t from-[#00d4ff] to-[#a855f7] rounded-full shadow-[0_0_8px_rgba(0,212,255,0.9),0_0_15px_rgba(168,85,247,0.7)]"
              style={{
                top: `${spark.top}%`,
                left: '50%',
                width: `${spark.size}px`,
                height: `${spark.size}px`,
              }}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 2, 1.2, 0],
                x: spark.translateX,
                y: spark.translateY,
              }}
              transition={{
                duration: spark.duration,
                delay: spark.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VaultDoors;
