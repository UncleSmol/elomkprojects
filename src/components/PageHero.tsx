import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface PageHeroProps {
  title: string;
  italicTitle?: string;
  subtitle: string;
  tag: string;
  image?: string;
}

const PageHero = ({ title, italicTitle, subtitle, tag, image }: PageHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms
  const yImage = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(smoothProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden text-[var(--text-main)] transition-colors duration-500 bg-[var(--bg-primary)] z-20 flex items-center"
    >
      {image && (
        <motion.div 
          style={{ y: yImage }}
          className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        >
          <img 
            src={image.includes('unsplash.com') ? `${image}&auto=format&fit=crop&q=60&w=1600` : image} 
            className="w-full h-[120%] object-cover scale-110" 
            alt={title} 
          />
          {/* Stronger overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)] z-20" />
        </motion.div>
      )}

      <div className="container mx-auto px-6 relative z-30">
        <div className="max-w-4xl">
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-indigo/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.5em]">{tag}</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter leading-none uppercase">
              {title} <br />
              {italicTitle && (
                <span className="text-[var(--text-muted)] italic text-4xl md:text-7xl">{italicTitle}</span>
              )}
            </h1>
            
            <p className="text-[var(--text-muted)] text-lg md:text-xl font-medium max-w-2xl leading-relaxed uppercase">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        style={{ opacity: opacityText }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[8px] font-rajdhani font-bold text-cyan/40 uppercase tracking-[0.3em]">      
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-cyan/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PageHero;
