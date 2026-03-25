import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import electricFencingImg from "../assets/electrical-fencing-service.png";
import plumbingImg from "../assets/plumbing-service.jpg";
import cctvServiceImg from "../assets/cctv-installation-service.png";
import gateServiceImg from "../assets/gate-automation-service.png";
import installProcessImg from "../assets/installation-process.jpg";
import testingProcessImg from "../assets/testing-process.png";
import supportProcessImg from "../assets/support-process.jpg";
import workflowBgImg from "../assets/installation-workflow.jpg";

/* --- SUB-COMPONENTS --- */

/**
 * TrustItem
 * Simple component to display trust-building features with a high-tech dot.
 * Memoized to prevent re-renders when parent state changes.
 */
const TrustItem = React.memo(({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-[var(--text-muted)] whitespace-nowrap uppercase">
    <div className="w-1 h-1 rounded-full bg-cyan" />
    <span className="text-[10px] md:text-xs uppercase tracking-widest font-rajdhani">
      {text}
    </span>
  </div>
));

/**
 * ServiceCard
 * Displays a service with a parallax scroll effect.
 * Uses Framer Motion's useScroll to trigger animations based on the card's position.
 */
const ServiceCard = React.memo(({
  title,
  desc,
  img,
  speed,
  index,
  path,
}: {
  title: string;
  desc: string;
  img: string;
  speed: number;
  index: number;
  path: string;
}) => {
  const cardRef = useRef(null);

  // Track scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress for a high-quality feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate parallax transforms
  const y = useTransform(smoothProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0.8, 1], [1, 0.9]);

  // Handle image src for both external and local images
  const imgSrc = img.includes("unsplash.com") 
    ? `${img}&auto=format&fit=crop&q=60&w=800` 
    : img;

  return (
    <motion.article
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="group relative h-[450px] md:h-[550px] w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] uppercase text-[var(--text-main)] shadow-2xl will-change-transform"       
    >
      {/* Background Image with Hover Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover dark:grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10" />
      </div>

      {/* Card Content Overlay */}
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
        <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed font-medium max-w-xs mb-8 normal-case">
          {desc}
        </p>
        
        <Link 
          to={`/services#${path}`} 
          className="w-fit px-6 py-3 bg-white/5 border border-white/10 hover:border-cyan/50 hover:bg-cyan/5 text-[10px] font-rajdhani font-bold tracking-widest uppercase rounded transition-all active:scale-95 group/btn flex items-center gap-2"
        >
          View Service Details
          <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_10px_cyan] group-hover/btn:scale-125 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
});

/**
 * WorkflowStep
 * Represents a single step in the installation process.
 * Slides in from the right as the user scrolls.
 */
const WorkflowStep = React.memo(({ step, index, scrollYProgress }: { step: any, index: number, scrollYProgress: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define active range for this step based on its index
  const start = (index + 1) * 0.2;
  const end = start + 0.2;

  // Transform X position from 100% to 0% based on scroll
  const x = useTransform(
    scrollYProgress,
    [start, end],
    ["100%", "0%"]
  );

  // Add a deep shadow as the step slides in for visual depth
  const shadow = useTransform(
    scrollYProgress,
    [start, start + 0.1],
    ["0px 0px 0px rgba(0,0,0,0)", "-50px 0px 100px rgba(0,0,0,0.9)"]
  );

  // Local Carousel logic for steps that have multiple demonstration images
  const [currentImg, setCurrentImg] = useState(0);
  useEffect(() => {
    if (step.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % step.images.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [step.images.length]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.div
        style={{ x, boxShadow: shadow, zIndex: 20 + index }}
        className="absolute inset-0 h-screen w-screen overflow-hidden bg-[var(--bg-primary)] border-l border-[var(--border-color)] text-[var(--text-main)] will-change-transform"
      >
        {/* Dynamic Background Image with AnimatePresence for smooth swapping */}
        <div className="absolute inset-0 opacity-30">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImg}
              src={step.images[currentImg].includes("unsplash.com") ? `${step.images[currentImg]}&auto=format&fit=crop&q=60&w=1200` : step.images[currentImg]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover dark:grayscale"
              alt=""
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-transparent" />
        </div>

        {/* Step Text Content */}
        <div className="relative z-20 h-full w-full flex flex-col justify-center items-center px-6 text-center">  
          <div className="max-w-4xl">
            <span className="text-[10px] md:text-xs font-rajdhani font-bold text-cyan uppercase mb-4 block">      
              {step.tag}
            </span>
            <h3 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight uppercase">
              {step.title}
            </h3>
            <p className="text-base md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              {step.desc}
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-white/5 border border-white/10 hover:border-cyan/50 hover:bg-cyan/5 text-[10px] font-rajdhani font-bold tracking-widest uppercase rounded transition-all active:scale-95 flex items-center gap-3 mx-auto group/btn"
            >
              System Deep Dive
              <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_cyan] group-hover/btn:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] font-rajdhani font-bold text-cyan uppercase tracking-widest mb-2 block">{step.tag} Detail</span>
                  <h4 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">{step.title} Strategy</h4>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[var(--text-main)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-6">
                {step.details.map((detail: string, i: number) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0 shadow-[0_0_10px_cyan] group-hover:scale-125 transition-transform" />
                    <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed uppercase tracking-wide">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

/**
 * WorkflowSection
 * A sticky-scroll section that demonstrates the "Plan -> Install -> Test -> Support" process.
 * The section is h-[600vh] to provide enough "scroll distance" for the sticky effects.
 */
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

  const [currentBg, setCurrentBg] = useState(0);

  const bgImages = [
    workflowBgImg
  ];

  // Auto-cycle background images for a dynamic look
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 19000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  // Define steps data
  const steps = useMemo(() => [
    {
      title: "Plan",
      desc: "We assess your needs and plan the best setup for your property.",
      images: ["https://images.unsplash.com/photo-1590402494756-10c265b9d736?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      tag: "PHASE 01",
      details: [
        "On-site site assessment to identify security vulnerabilities.",
        "Custom technical drawing of the proposed installation layout.",
        "Clear, itemized quotation with SABS-approved materials.",
        "Consultation on legal compliance for fencing and CCTV."
      ]
    },
    {
      title: "Install",
      desc: "Our team handles the professional installation of all equipment.",
      images: [installProcessImg],
      tag: "PHASE 02",
      details: [
        "Professional wiring and bracket mounting by local experts.",
        "System configuration including mobile app setup where applicable.",
        "Structural reinforcement for gate motors and fence posts.",
        "Clean and tidy site management throughout the process."
      ]
    },
    {
      title: "Test",
      desc: "We thoroughly test every system to ensure it works perfectly.",
      images: [testingProcessImg],
      tag: "PHASE 03",
      details: [
        "Live stress testing of gate motors and sensors.",
        "High-voltage pulse check for electric fencing integrity.",
        "Camera angle optimization and night-vision verification.",
        "Full client handover with system operation tutorial."
      ]
    },
    {
      title: "Support",
      desc: "We provide ongoing support and maintenance when you need it.",
      images: [supportProcessImg],
      tag: "PHASE 04",
      details: [
        "Fast-response technical support for system issues.",
        "Regular maintenance plans to prevent hardware failure.",
        "Equipment warranty management and SABS compliance checks.",
        "Local standby team for emergency repairs in Emalahleni."
      ]
    },
  ], []);

  // Fades out the intro text as the first step arrives
  const introOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]);
  const introScale = useTransform(smoothProgress, [0.15, 0.25], [1, 0.95]);

  return (
    <section
      id="process"
      ref={targetRef}
      className="relative h-[600vh] bg-[var(--bg-primary)] z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] transition-colors duration-500"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden text-[var(--text-main)]">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentBg}
              src={bgImages[currentBg]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover dark:grayscale"
              alt=""
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
        </div>

        {/* Dynamic Progress Indicator at Bottom */}
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

        {/* Scroll Indicator Icon */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-cyan" />
          </motion.div>
        </motion.div>

        {/* Initial "Installation Workflow" Text */}
        <motion.div
          style={{ opacity: introOpacity, scale: introScale }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 overflow-hidden z-10 text-[var(--text-main)] will-change-transform transition-colors duration-500"
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
              <ChevronDown className="w-4 h-4 animate-pulse" /> Scroll To See How We Work
            </div>
          </div>
        </motion.div>

        {/* Map through and render each step as a full-screen sliding panel */}
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

/**
 * Homepage Component
 * The main landing page of the application.
 * Features a dynamic Hero section, a Services grid, and the sticky Workflow section.
 */
const Homepage = () => {
  const heroRef = useRef(null);

  // Track scroll progress of the hero section for parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform hero elements based on scroll
  const textX = useTransform(smoothProgress, [0, 0.9], ["0%", "80%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  // Memoized services data to prevent unnecessary re-renders
  const services = useMemo(
    () => [
      {
        path: "electric-fencing",
        title: "Electric Fencing",
        desc: "Secure perimeter fencing for your home.",
        img: electricFencingImg,
        speed: 1.2,
      },
      {
        path: "cctv-installations",
        title: "CCTV Systems",
        desc: "Reliable camera installations and setup.",
        img: cctvServiceImg,
        speed: 0.8,
      },
      {
        path: "gate-automation",
        title: "Gate Automation",
        desc: "Gate motors and garage door repairs.",
        img: gateServiceImg,
        speed: 1.5,
      },
      {
        path: "plumbing",
        title: "Plumbing",
        desc: "Professional plumbing repairs and services.",
        img: plumbingImg,
        speed: 1.0,
      }
    ],
    []
  );

  return (
    <>
      <SEO 
        title="ELOMK Projects | Quality Security & Technical Services" 
        description="Professional security installations, CCTV systems, electric fencing, and technical maintenance services based in Emalahleni." 
      />
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[130vh] z-10 text-[var(--text-main)]"
      >
        <main className="sticky top-0 h-screen w-full overflow-hidden flex flex-row">
          {/* Left Side: Text and CTA */}
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="relative w-[65%] lg:w-1/2 h-full z-10 flex flex-col justify-center items-start px-6 lg:px-20 text-left"
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
              <a href="tel:0130011983" className="px-10 py-4 border border-[var(--border-color)] hover:bg-[var(--text-main)] hover:text-[var(--bg-primary)] text-[var(--text-main)] font-rajdhani font-bold tracking-widest uppercase rounded transition-all active:scale-95 text-center">
                Call: 013 001 1983
              </a>
            </div>
            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[var(--text-main)]">
              <TrustItem text="Professional Installers" />
              <TrustItem text="Reliable Service" />
              <TrustItem text="Quality Workmanship" />
              <TrustItem text="Home & Business" />
            </div>
          </motion.div>

          {/* Right Side: Hero Image with Parallax Scale */}
          <div className="relative w-[35%] lg:w-1/2 h-full z-20 border-l border-[var(--border-color)] overflow-hidden bg-[var(--bg-primary)] shadow-[-20px_0_40px_rgba(3,6,23,0.3)] transition-colors duration-500 group">      
            <motion.img
              style={{ scale: imageScale }}
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200"  
              className="w-full h-full object-cover group-hover:scale-110 opacity-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--bg-primary)]/40 via-transparent to-transparent transition-colors duration-500" />
          </div>

          {/* Animated Scroll Indicator */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-rajdhani font-bold text-cyan/40 uppercase tracking-[0.3em]">      
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-cyan/40 to-transparent relative overflow-hidden">
              <motion.div
                animate={{ top: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-full bg-cyan shadow-[0_0_10px_cyan]"
              />
            </div>
          </motion.div>
        </main>
      </div>

      {/* Services Section Grid */}
      <section id="services" className="relative z-20 container mx-auto px-6 py-24 md:py-32 overflow-hidden text-[var(--text-main)] transition-colors duration-500">
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

      {/* Workflow Sticky-Scroll Section */}
      <WorkflowSection />
    </>
  );
};

export default Homepage;
