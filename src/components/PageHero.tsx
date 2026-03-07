import { motion } from 'framer-motion';

const PageHero = ({ title, subtitle, image }: { title: string, subtitle: string, image: string }) => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-[var(--bg-primary)] transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <img 
          src={`${image}&auto=format&fit=crop&q=80&w=1600`} 
          className="w-full h-full object-cover grayscale opacity-30" 
          alt={title} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-[var(--bg-primary)] transition-colors duration-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-cyan/40" />
            <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">ELOMK Projects</span>
            <div className="w-12 h-px bg-cyan/40" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-[var(--text-main)] mb-6 uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-[var(--text-muted)] font-medium text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
