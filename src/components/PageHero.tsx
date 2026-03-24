import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  italicTitle?: string;
  subtitle: string;
  tag: string;
  image?: string;
}

const PageHero = ({ title, italicTitle, subtitle, tag, image }: PageHeroProps) => {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden text-[var(--text-main)] transition-colors duration-500 bg-[var(--bg-primary)] z-20">
      {image && (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
          <img 
            src={image.includes('unsplash.com') ? `${image}&auto=format&fit=crop&q=60&w=1600` : image} 
            className="w-full h-full object-cover" 
            alt={title} 
          />
          {/* Stronger overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)] z-20" />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-30">
        <div className="max-w-4xl">
          <motion.div
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
    </section>
  );
};

export default PageHero;
