import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Phone, Mail, Clock } from 'lucide-react';

/* --- SUB-COMPONENTS --- */

const TrustItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-white/50 whitespace-nowrap uppercase">
    <div className="w-1 h-1 rounded-full bg-cyan" />
    <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-rajdhani">{text}</span>
  </div>
);

const ServiceCard = ({ title, desc, img, speed, index }: { title: string, desc: string, img: string, speed: number, index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(smoothProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0.8, 1], [1, 0.9]);

  return (
    <motion.article ref={cardRef} style={{ y, opacity, scale }} className="group relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden border border-white/5 bg-[#030617] uppercase text-white shadow-2xl">
      <div className="absolute inset-0 z-0">
        <img src={`${img}&auto=format&fit=crop&q=60&w=800`} alt={title} loading="lazy" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030617] via-[#030617]/40 to-transparent z-10" />
      </div>
      <div className="relative z-20 h-full flex flex-col justify-end p-8 text-left uppercase text-white">
        <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-cyan/50" /><span className="text-[10px] uppercase font-rajdhani text-cyan font-bold">0{index + 1}</span></div>
        <h3 className="font-rajdhani font-bold text-2xl md:text-3xl mb-3 uppercase tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium max-w-xs">{desc}</p>
      </div>
    </motion.article>
  );
};

const ImageCarousel = ({ images, interval }: { images: string[], interval: number }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % images.length), interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);
  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.img key={images[index]} src={`${images[index]}&auto=format&fit=crop&q=60&w=1200`} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.3, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 2, ease: "easeInOut" }} className="h-full w-full object-cover grayscale" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030617] via-transparent to-[#030617] z-10" />
      <div className="absolute inset-0 bg-[#030617]/50 z-10" />
    </div>
  );
};

const WorkflowSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const steps = [
    { title: "Analyze", desc: "Risk assessment and technical requirement analysis.", images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80"], tag: "PHASE 01" },
    { title: "Engineer", desc: "Precision blueprinting and custom security architecture design.", images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80", "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80"], tag: "PHASE 02" },
    { title: "Deploy", desc: "Professional implementation by certified technical specialists.", images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80", "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80"], tag: "PHASE 03" },
    { title: "Secure", desc: "Ongoing monitoring, maintenance, and 24/7 technical support.", images: ["https://images.unsplash.com/photo-1558494949-ef010958d684?q=80", "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80"], tag: "PHASE 04" }
  ];
  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#030617] z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] uppercase">
      <div className="sticky top-0 h-screen w-full overflow-hidden uppercase text-white">
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          {[0, 1, 2, 3, 4].map((i) => {
            const startRange = i * 0.2;
            const endRange = (i + 1) * 0.2;
            const fillWidth = useTransform(scrollYProgress, [startRange, endRange], ["0%", "100%"]);
            const isActive = useTransform(scrollYProgress, [startRange - 0.05, startRange, endRange, endRange + 0.05], [0.3, 1, 1, 0.3]);
            return (
              <div key={i} className="flex flex-col items-center gap-2 uppercase">
                <motion.div style={{ opacity: isActive }} className="h-1 w-12 bg-white/10 rounded-full relative overflow-hidden uppercase"><motion.div className="absolute inset-0 bg-cyan shadow-[0_0_10px_cyan]" style={{ width: fillWidth }} /></motion.div>
                <motion.span style={{ opacity: isActive }} className="text-[8px] font-rajdhani font-bold text-cyan uppercase tracking-tighter">{i === 0 ? 'START' : `0${i}`}</motion.span>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 overflow-hidden bg-[#030617] z-10 uppercase text-white uppercase">
          <ImageCarousel images={["https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80"]} interval={5000} />
          <div className="relative z-20 max-w-3xl uppercase">
            <div className="flex items-center gap-4 mb-4 uppercase"><div className="w-12 h-px bg-indigo/40" /><span className="text-[10px] uppercase font-rajdhani font-bold text-cyan uppercase">Proven Methodology</span></div>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight uppercase">Strategic <span className="text-white/30 italic">Workflow</span></h2>
            <p className="text-white/40 font-medium leading-relaxed max-w-xl text-lg text-left uppercase">Our systematic approach ensures mission-critical resilience.</p>
            <div className="mt-12 flex items-center gap-4 text-[10px] font-rajdhani uppercase text-cyan/60 font-bold uppercase uppercase"><ArrowRight className="w-4 h-4 animate-pulse" /> Scroll To Explore Process</div>
          </div>
        </div>
        {steps.map((step, index) => {
          const start = (index + 1) * 0.2;
          const x = useTransform(scrollYProgress, [start - 0.15, start], ["100%", "0%"]);
          const shadow = useTransform(scrollYProgress, [start - 0.15, start], ["0px 0px 0px rgba(0,0,0,0)", "-50px 0px 100px rgba(0,0,0,0.9)"]);
          return (
            <motion.div key={index} style={{ x, boxShadow: shadow, zIndex: 20 + index }} className="absolute inset-0 h-screen w-screen overflow-hidden bg-[#030617] border-l border-white/5 uppercase text-white">
              <ImageCarousel images={step.images} interval={5000 + (index * 500)} />
              <div className="relative z-20 h-full w-full flex flex-col justify-center items-center px-6 text-center uppercase">
                <div className="max-w-4xl uppercase">
                  <span className="text-[10px] md:text-xs font-rajdhani font-bold text-cyan uppercase mb-4 block">{step.tag}</span>
                  <h3 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight uppercase">{step.title}</h3>
                  <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed uppercase">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Mirrored Parallax: Text on RIGHT slides LEFT under the image on the LEFT
  const textX = useTransform(scrollYProgress, [0, 0.9], ["0%", "-80%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[130vh] bg-[#030617] z-40 uppercase text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-row uppercase text-white">
        
        {/* IMAGE ON LEFT (Mirrors Hero's right-side image position) */}
        <div className="relative w-[35%] lg:w-1/2 h-full z-20 border-r border-white/10 overflow-hidden bg-[#030617] shadow-[20px_0_40px_rgba(3,6,23,1)]">
          <motion.img 
            style={{ scale: imageScale }} 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover grayscale opacity-50 uppercase" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030617] via-transparent to-transparent uppercase" />
          <div className="absolute bottom-12 left-12 flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 rounded backdrop-blur-md uppercase text-white">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_10px_cyan]" />
            <span className="text-[10px] font-rajdhani text-white uppercase tracking-[0.3em]">HQ Status: Operational</span>
          </div>
        </div>

        {/* TEXT ON RIGHT (Mirrors Hero's left-side text position) */}
        <motion.div 
          style={{ x: textX, opacity: textOpacity }} 
          className="relative w-[65%] lg:w-1/2 h-full z-10 flex flex-col justify-center items-start px-6 lg:px-20 text-left uppercase text-white"
        >
          <div className="max-w-xl uppercase">
            <div className="flex items-center gap-4 mb-6 uppercase">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Connect With Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight uppercase text-left">Ready to <span className="text-white/30 italic">Secure</span> Your Property?</h2>
            <p className="text-white/40 font-medium text-sm lg:text-base mb-12 leading-relaxed text-left uppercase max-w-md">Connect with our specialized technical team for nationwide security engineering and infrastructure maintenance.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 uppercase">
              <button className="px-10 py-4 bg-indigo hover:bg-indigo/80 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all shadow-[0_4px_20px_rgba(46,42,160,0.4)] active:scale-95 uppercase">Request A Quote</button>
              <button className="px-10 py-4 border border-white/10 hover:bg-white/5 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all active:scale-95 uppercase">Call Us Today</button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

/* --- MAIN PAGE COMPONENT --- */

const Homepage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });

  const textX = useTransform(scrollYProgress, [0, 0.9], ["0%", "80%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const services = useMemo(() => [
    { title: "Electric Fencing", desc: "SABS perimeter security with monitoring.", img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80", speed: 1.2 },
    { title: "CCTV Systems", desc: "HD surveillance with remote AI analytics.", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80", speed: 0.8 },
    { title: "Access Control", desc: "Gate automation and biometric entry.", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80", speed: 1.5 },
    { title: "Plumbing", desc: "Industrial system maintenance.", img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80", speed: 1.0 },
    { title: "Civil Works", desc: "Infrastructure tailored to security.", img: "https://images.unsplash.com/photo-1541888941259-7927ad9a4c28?q=80", speed: 1.3 },
    { title: "Maintenance", desc: "24/7 reliability service plans.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80", speed: 0.9 },
  ], []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <div ref={heroRef} className="relative h-[130vh] z-10 uppercase text-white">
        <main className="sticky top-0 h-screen w-full overflow-hidden flex flex-row uppercase text-white">
          <motion.div style={{ x: textX, opacity: textOpacity }} className="relative w-[65%] lg:w-1/2 h-full z-10 flex flex-col justify-center items-start px-6 lg:px-20 text-left uppercase text-white">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight uppercase text-left">Security <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-cyan">Installations</span> <br /> You Can Trust</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 uppercase">
              <button className="px-10 py-4 bg-indigo hover:bg-indigo/80 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all shadow-[0_4px_20px_rgba(46,42,160,0.4)] active:scale-95 uppercase">Get A Quote</button>
              <button className="px-10 py-4 border border-white/10 hover:bg-white/5 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all active:scale-95 uppercase">Call Us</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 uppercase text-white"><TrustItem text="Qualified Installers" /><TrustItem text="Nationwide Service" /><TrustItem text="Guaranteed Quality" /><TrustItem text="Residential & Commercial" /></div>
          </motion.div>
          <div className="relative w-[35%] lg:w-1/2 h-full z-20 border-l border-white/10 overflow-hidden bg-[#030617] shadow-[-20px_0_40px_rgba(3,6,23,1)]"><motion.img style={{ scale: imageScale }} src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-50 uppercase" /><div className="absolute inset-0 bg-gradient-to-l from-[#030617] via-transparent to-transparent uppercase" /></div>
        </main>
      </div>

      {/* 2. SERVICES SECTION */}
      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32 overflow-hidden bg-[#030617] uppercase text-white shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <header className="max-w-3xl mb-32 uppercase"><div className="flex items-center gap-4 mb-4"><div className="w-12 h-px bg-indigo/40" /><span className="text-[10px] uppercase tracking-[0.4em] font-rajdhani font-bold text-cyan uppercase">Our Expertise</span></div><h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight text-left uppercase">Specialized <span className="text-white/30 italic">Technical</span> Solutions</h2></header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-left uppercase text-white">{services.map((s, i) => (<ServiceCard key={s.title} index={i} {...s} />))}</div>
      </section>

      {/* 3. WORKFLOW SECTION */}
      <WorkflowSection />

      {/* 4. CONTACT SECTION (MIRRORED HERO) */}
      <ContactSection />
    </>
  );
};

export default Homepage;
