import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PulseLine = React.memo(({ index }: { index: number }) => {
  const left = useMemo(() => `${(index * 12.5) + Math.random() * 5}%`, [index]);
  const duration = useMemo(() => 3 + Math.random() * 4, []);
  const delay = useMemo(() => Math.random() * 5, []);

  return (
    <motion.div
      initial={{ top: "-20%", opacity: 0 }}
      animate={{ top: "120%", opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
      className="absolute w-[1px] h-32 z-0 pointer-events-none"
      style={{ 
        left,
        background: 'linear-gradient(to bottom, transparent, #2277aa, transparent)',
        boxShadow: '0 0 20px rgba(34, 119, 170, 0.5)'
      }}
    />
  );
});

const BackgroundBlock = React.memo(() => {
  const size = useMemo(() => Math.random() * 180 + 80, []);
  const top = useMemo(() => Math.random() * 100, []);
  const left = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => 8 + Math.random() * 8, []);
  const delay = useMemo(() => Math.random() * -20, []);

  return (
    <motion.div
      animate={{ 
        opacity: [0, 0.3, 0],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className="absolute border border-cyan/30 rounded-lg z-[0] will-change-transform pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: size,
        height: size,
        background: 'linear-gradient(135deg, rgba(34, 119, 170, 0.1) 0%, transparent 100%)',
      }}
    />
  );
});

const PulsingBackground = () => {
  const pulseLines = useMemo(() => Array.from({ length: 12 }), []);
  const blocks = useMemo(() => Array.from({ length: 24 }), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Base Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      
      {/* 2. Global Ambient Glows */}
      <div className="absolute inset-0 glow-primary opacity-50" />
      <div className="absolute inset-0 glow-secondary opacity-40" />
      
      {/* 3. Pulsing Tech Blocks */}
      {blocks.map((_, i) => (
        <BackgroundBlock key={`block-${i}`} />
      ))}

      {/* 4. Falling Pulse Lines (The "Stripes") */}
      {pulseLines.map((_, i) => (
        <PulseLine key={`pulse-${i}`} index={i} />
      ))}

      {/* 5. Depth Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none opacity-40" />
    </div>
  );
};

export default React.memo(PulsingBackground);
