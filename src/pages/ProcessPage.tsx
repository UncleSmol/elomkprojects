import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import installImg from '../assets/installation-process.jpg';
import testingImg from '../assets/testing-process.png';
import supportImg from '../assets/support-process.jpg';

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

  const imgY = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const isEven = index % 2 === 0;

  const imgSrc = image.includes('unsplash.com') 
    ? `${image}&auto=format&fit=crop&q=60&w=1000` 
    : image;

  return (
    <div ref={ref} className="relative min-h-[80vh] flex items-center py-24 overflow-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-center"
      >
        {/* Content Side */}
        <motion.div 
          style={{ y: textY }}
          className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-8'}`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-cyan/40" />
            <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">{subtitle}</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold text-[var(--text-main)] mb-8 uppercase tracking-tight leading-none">
            {title}
          </h3>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            {desc}
          </p>
        </motion.div>

        {/* Image Side */}
        <div className={`lg:col-span-6 relative h-[400px] md:h-[500px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <motion.div 
            style={{ y: imgY }}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl z-10"
          >
            <img 
              src={imgSrc} 
              className="w-full h-full object-cover dark:grayscale opacity-40 hover:grayscale-0 transition-all duration-1000" 
              alt={title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
          </motion.div>

          {/* Decorative Number */}
          <motion.span 
            style={{ y: useTransform(smoothProgress, [0, 1], ["20%", "-20%"]) }}
            className={`absolute bottom-0 ${isEven ? '-right-12' : '-left-12'} text-[12rem] md:text-[18rem] font-bold text-white/[0.05] leading-none select-none z-0 hidden md:block pointer-events-none`}
          >
            0{index + 1}
          </motion.span>
        </div>
      </motion.div>
    </div>
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
      image: installImg,
      title: "Installation",
      subtitle: "Professional Setup",
      desc: "Our local team handles the manual work. Whether it's digging foundations for a gate, wiring a CCTV system, or installing an electric fence, we focus on durable setup and clean workmanship."
    },
    {
      image: testingImg,
      title: "Testing",
      subtitle: "Quality Assurance",
      desc: "Once installed, we test every part of the system. We ensure gate motors run smoothly, cameras have clear visibility, and fences provide the correct voltage alerts for your peace of mind."
    },
    {
      image: supportImg,
      title: "Support",
      subtitle: "After-Sales Care",
      desc: "We don't just leave after the job is done. If you have a leak, a motor issue, or need a camera adjusted, our team is available for maintenance and repairs to keep your systems running."
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <SEO 
        title="Our Workflow - ELOMK Projects" 
        description="Discover our reliable 4-step installation workflow: Plan, Install, Test, and Support. Delivering professional technical services and security solutions." 
      />
      <PageHero 
        tag="Step-By-Step Workflow"
        title="Our" 
        italicTitle="Technical Process"
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
