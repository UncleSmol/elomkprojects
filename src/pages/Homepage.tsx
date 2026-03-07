import React, { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* --- SUB-COMPONENTS --- */

const TrustItem = React.memo(({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-[var(--text-muted)] whitespace-nowrap uppercase">
    <div className="w-1 h-1 rounded-full bg-cyan" />
    <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-rajdhani">
      {text}
    </span>
  </div>
));

const ServiceCard = React.memo(({
  title,
  desc,
  img,
  speed,
  index,
}: {
  title: string;
  desc: string;
  img: string;
  speed: number;
  index: number;
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const y = useTransform(smoothProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0.8, 1], [1, 0.9]);

  return (
    <motion.article
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="group relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] uppercase text-[var(--text-main)] shadow-2xl will-change-transform"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={`${img}&auto=format&fit=crop&q=60&w=800`}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10" />
      </div>
      <div className="relative z-20 h-full flex flex-col justify-end p-8 text-left text-[var(--text-main)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-cyan/50" />
          <span className="text-[10px] uppercase font-rajdhani text-cyan font-bold">
            0{index + 1}
          </span>
        </div>
        <h3 className="font-rajdhani font-bold text-2xl md:text-3xl mb-3 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-medium max-w-xs normal-case">
          {desc}
        </p>
      </div>
    </motion.article>
  );
});

const WorkflowStep = React.memo(({ step, index, scrollYProgress }: { step: any, index: number, scrollYProgress: any }) => {
  const start = (index + 1) * 0.2;
  const end = start + 0.2;
  
  const x = useTransform(
    scrollYProgress,
    [start, end],
    ["100%", "0%"]
  );
  const shadow = useTransform(
    scrollYProgress,
    [start, start + 0.1],
    ["0px 0px 0px rgba(0,0,0,0)", "-50px 0px 100px rgba(0,0,0,0.9)"]
  );

  return (
    <motion.div
      style={{ x, boxShadow: shadow, zIndex: 20 + index }}
      className="absolute inset-0 h-screen w-screen overflow-hidden bg-[var(--bg-primary)] border-l border-[var(--border-color)] text-[var(--text-main)] will-change-transform"
    >
      <div className="absolute inset-0 opacity-30">
        <img src={`${step.images[0]}&auto=format&fit=crop&q=60&w=1200`} className="w-full h-full object-cover grayscale" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
      </div>
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-4xl">
          <span className="text-[10px] md:text-xs font-rajdhani font-bold text-cyan uppercase mb-4 block">
            {step.tag}
          </span>
          <h3 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight uppercase">
            {step.title}
          </h3>
          <p className="text-base md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const WorkflowSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = useMemo(() => [
    {
      title: "Plan",
      desc: "We assess your needs and plan the best setup for your property.",
      images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80"],
      tag: "PHASE 01",
    },
    {
      title: "Install",
      desc: "Our team handles the professional installation of all equipment.",
      images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80"],
      tag: "PHASE 02",
    },
    {
      title: "Test",
      desc: "We thoroughly test every system to ensure it works perfectly.",
      images: ["https://plus.unsplash.com/premium_photo-1682126180093-1ebe1a04075a?q=80"],
      tag: "PHASE 03",
    },
    {
      title: "Support",
      desc: "We provide ongoing support and maintenance when you need it.",
      images: ["https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80"],
      tag: "PHASE 04",
    },
  ], []);

  const introOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]);
  const introScale = useTransform(smoothProgress, [0.15, 0.25], [1, 0.95]);

  return (
    <section
      id="process"
      ref={targetRef}
      className="relative h-[600vh] bg-[var(--bg-primary)] z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] transition-colors duration-500"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden text-[var(--text-main)]">
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          {[0, 1, 2, 3, 4].map((i) => {
            const startRange = i * 0.2;
            const endRange = (i + 1) * 0.2;
            const fillWidth = useTransform(smoothProgress, [startRange, endRange], ["0%", "100%"]);
            const isActive = useTransform(smoothProgress, [startRange - 0.05, startRange, endRange, endRange + 0.05], [0.3, 1, 1, 0.3]);
            return (
              <div key={i} className="flex flex-col items-center gap-2 uppercase">
                <motion.div style={{ opacity: isActive }} className="h-1 w-12 bg-white/10 rounded-full relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-cyan shadow-[0_0_10px_cyan]" style={{ width: fillWidth }} />
                </motion.div>
                <motion.span style={{ opacity: isActive }} className="text-[8px] font-rajdhani font-bold text-cyan tracking-tighter">
                  {i === 0 ? "START" : `0${i}`}
                </motion.span>
              </div>
            );
          })}
        </div>
        
        <motion.div 
          style={{ opacity: introOpacity, scale: introScale }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 overflow-hidden bg-[var(--bg-primary)] z-10 text-[var(--text-main)] will-change-transform transition-colors duration-500"
        >
          <div className="relative z-20 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-indigo/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase">
              Installation <span className="text-[var(--text-muted)] italic">Workflow</span>
            </h2>
            <p className="text-[var(--text-muted)] font-medium leading-relaxed max-w-xl text-lg text-left">
              A simple and reliable way to get your property secured.
            </p>
            <div className="mt-12 flex items-center gap-4 text-[10px] font-rajdhani uppercase text-cyan/60 font-bold">
              <ArrowRight className="w-4 h-4 animate-pulse" /> Scroll To See How We Work
            </div>
          </div>
        </motion.div>

        {steps.map((step, index) => (
          <WorkflowStep 
            key={index} 
            step={step} 
            index={index} 
            scrollYProgress={smoothProgress} 
          />
        ))}
      </div>
    </section>
  );
};

const Homepage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const textX = useTransform(smoothProgress, [0, 0.9], ["0%", "80%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  const services = useMemo(
    () => [
      {
        title: "Electric Fencing",
        desc: "Secure perimeter fencing for your home.",
        img: "https://images.unsplash.com/photo-1549109926-9620d1b9bfa2?q=80",
        speed: 1.2,
      },
      {
        title: "CCTV Systems",
        desc: "Reliable camera installations and setup.",
        img: "https://images.unsplash.com/photo-1600069620961-8bee77c2e28a?q=80",
        speed: 0.8,
      },
      {
        title: "Gate Automation",
        desc: "Gate motors and garage door repairs.",
        img: "https://images.unsplash.com/photo-1588362951121-3ee319b018b2?q=80",
        speed: 1.5,
      },
      {
        title: "Plumbing",
        desc: "Professional plumbing repairs and services.",
        img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80",
        speed: 1.0,
      },
      {
        title: "Maintenance",
        desc: "Regular upkeep for all your systems.",
        img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80",
        speed: 0.9,
      },
    ],
    []
  );

  return (
    <>
      <div
        ref={heroRef}
        className="relative h-[130vh] z-10 text-[var(--text-main)]"
      >
        <main className="sticky top-0 h-screen w-full overflow-hidden flex flex-row">
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="relative w-[65%] lg:w-1/2 h-full z-10 flex flex-col justify-center items-start px-6 lg:px-20 text-left will-change-transform"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight uppercase">
              Quality Security <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-cyan">
                & Technical Services
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 uppercase">
              <Link to="/contact" className="px-10 py-4 bg-indigo hover:bg-indigo/80 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all shadow-[0_4px_20px_rgba(46,42,160,0.4)] active:scale-95 text-center">
                Get A Quote
              </Link>
              <button className="px-10 py-4 border border-[var(--border-color)] hover:bg-[var(--text-main)] hover:text-[var(--bg-primary)] text-[var(--text-main)] font-rajdhani font-bold tracking-widest uppercase rounded transition-all active:scale-95">
                Call Us
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[var(--text-main)]">
              <TrustItem text="Professional Installers" />
              <TrustItem text="Reliable Service" />
              <TrustItem text="Quality Workmanship" />
              <TrustItem text="Home & Business" />
            </div>
          </motion.div>
          <div className="relative w-[35%] lg:w-1/2 h-full z-20 border-l border-[var(--border-color)] overflow-hidden bg-[var(--bg-primary)] shadow-[-20px_0_40px_rgba(3,6,23,0.3)] transition-colors duration-500">
            <motion.img
              style={{ scale: imageScale }}
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover grayscale opacity-50 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--bg-primary)] via-transparent to-transparent transition-colors duration-500" />
          </div>
        </main>
      </div>

      <section id="services" className="relative z-20 container mx-auto px-6 py-24 md:py-32 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-main)] transition-colors duration-500">
        <header className="max-w-3xl mb-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-indigo/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-rajdhani font-bold text-cyan">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-left uppercase">
            Quality <span className="text-[var(--text-muted)] italic text-3xl md:text-5xl">Technical</span>{" "}
            Services
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-left">
          {services.map((s, i) => (
            <ServiceCard key={s.title} index={i} {...s} />
          ))}
        </div>
      </section>

      <WorkflowSection />
    </>
  );
};

export default Homepage;
