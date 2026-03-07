import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import PageHero from '../components/PageHero';

const ProcessStep = ({ image, title, subtitle, desc, index }: { image: string, title: string, subtitle: string, desc: string, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const imgY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative grid lg:grid-cols-12 gap-12 lg:gap-24 items-center py-24 border-b border-[var(--border-color)] last:border-0 overflow-hidden"
    >
      {/* Numbering Column - Always on left */}
      <div className="lg:col-span-1 flex lg:flex-col items-center gap-4 lg:order-1">
        <span className="font-rajdhani font-bold text-cyan/20 text-5xl leading-none">0{index + 1}</span>
        <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-cyan/20 to-transparent" />
      </div>
      
      {/* Content Side */}
      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-3'}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-cyan/40" />
          <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">{subtitle}</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-8 uppercase tracking-tight leading-none">{title}</h3>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Image Side */}
      <div className={`lg:col-span-6 relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl ${isEven ? 'lg:order-3' : 'lg:order-2'}`}>
        <motion.img 
          style={{ y: imgY }}
          src={`${image}&auto=format&fit=crop&q=60&w=1000`} 
          className="absolute inset-0 w-full h-[120%] object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-70 transition-all duration-700" 
          alt={title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/40 border border-white/10 rounded backdrop-blur-md">
          <span className="text-[8px] font-rajdhani text-white uppercase tracking-[0.3em]">Phase_Log: 0{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessPage = () => {
  const steps = [
    {
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80",
      title: "Planning",
      subtitle: "Site Assessment",
      desc: "We start by looking at your property and listening to your requirements. We provide a clear plan and a straightforward quote so you know exactly what to expect before we start any work."
    },
    {
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80",
      title: "Installation",
      subtitle: "Professional Setup",
      desc: "Our local team handles the manual work. Whether it's digging foundations for a gate, wiring a CCTV system, or installing an electric fence, we focus on durable setup and clean workmanship."
    },
    {
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80",
      title: "Testing",
      subtitle: "Quality Assurance",
      desc: "Once installed, we test every part of the system. We ensure gate motors run smoothly, cameras have clear visibility, and fences provide the correct voltage alerts for your peace of mind."
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010958d684?q=80",
      title: "Support",
      subtitle: "After-Sales Care",
      desc: "We don't just leave after the job is done. If you have a leak, a motor issue, or need a camera adjusted, our team is available for maintenance and repairs to keep your systems running."
    }
  ];

  return (
    <div className="pt-20 bg-[var(--bg-primary)] min-h-screen transition-colors duration-300">
      <PageHero 
        title="Our Process" 
        subtitle="How we handle your security and technical installations from start to finish."
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80"
      />

      <section className="relative z-20 container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto text-[var(--text-main)]">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-cyan/40" />
            <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Step-By-Step Workflow</span>
          </div>

          <div className="">
            {steps.map((step, i) => (
              <ProcessStep key={i} index={i} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-[var(--bg-secondary)] py-32 border-t border-[var(--border-color)]">
        <div className="container mx-auto px-6 text-center text-[var(--text-main)]">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase tracking-tight max-w-3xl mx-auto leading-tight">Reliable Service For Every Installation</h2>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-rajdhani font-bold text-[var(--text-muted)] tracking-[0.4em]">
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_10px_cyan]" /> LOCAL WORKMANSHIP</div>
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_10px_cyan]" /> CLEAR PRICING</div>
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_10px_cyan]" /> DURABLE RESULTS</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;
