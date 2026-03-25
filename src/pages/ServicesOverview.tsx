import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/pagesData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import servicesHeroImg from '../assets/cctv-tech2.png';

const ServiceStrip = ({ service, index }: { service: any, index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yImage = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
  const yText = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const isEven = index % 2 === 0;

  return (
    <div id={service.path} ref={containerRef} className="relative min-h-screen w-full overflow-hidden py-24 md:py-0 flex items-center">
      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto h-full px-6"
      >
        <div className={`grid lg:grid-cols-12 gap-12 items-center w-full`}>
          
          <motion.div 
            style={{ y: yText }}
            className={`lg:col-span-6 z-20 ${isEven ? 'lg:order-1' : 'lg:order-2 lg:col-start-7'}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Service Unit 0{index + 1}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-main)] mb-8 tracking-tight uppercase leading-none">
              {service.title.split(' ')[0]} <br />
              <span className="text-[var(--text-muted)] italic">{service.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            
            <p className="text-[var(--text-muted)] font-medium text-base md:text-lg mb-8 leading-relaxed">
              {service.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {service.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-[var(--text-muted)] group/feat">
                  <CheckCircle2 className="w-4 h-4 text-cyan transition-transform group-hover/feat:scale-110" />
                  <span className="text-[10px] font-rajdhani font-bold tracking-widest uppercase">{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-4 px-8 py-4 bg-indigo/10 border border-indigo/30 hover:border-cyan/50 hover:bg-cyan/5 text-[var(--text-main)] font-rajdhani font-bold text-xs tracking-widest uppercase rounded transition-all active:scale-95 group"
            >
              Request Quote For This Service
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className={`lg:col-span-6 relative h-[400px] md:h-[500px] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <motion.div 
              style={{ y: yImage }}
              className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl z-0"
            >
              <img 
                src={service.image.includes('unsplash.com') ? `${service.image}&auto=format&fit=crop&q=60&w=1200` : service.image}
                className="w-full h-full object-cover dark:grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                alt={service.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
            </motion.div>

            {/* Background Number moved to front with higher z-index */}
            <motion.span 
              style={{ y: useTransform(smoothProgress, [0, 1], ["20%", "-20%"]) }}
              className={`absolute bottom-0 ${isEven ? '-right-12' : '-left-12'} text-[12rem] md:text-[18rem] font-bold text-white/[0.07] leading-none select-none z-20 hidden md:block pointer-events-none drop-shadow-2xl`}
            >
              0{index + 1}
            </motion.span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

const ServicesOverview = () => {
  return (
    <div className="pb-24 overflow-x-hidden text-[var(--text-main)] transition-colors duration-500">
      <SEO 
        title="Services Hub - ELOMK Projects" 
        description="Explore our catalog of professional technical services including electric fencing, CCTV installations, gate automation, and plumbing." 
      />
      <PageHero 
        tag="Work Catalog"
        title="Technical"
        italicTitle="Services Hub"
        subtitle="Reliable installations and local workmanship. We handle your security and maintenance needs with a focus on quality and durability."
        image={servicesHeroImg}
      />

      <section className="relative z-30 container mx-auto px-6 py-24 md:py-32">
        <div className="space-y-32 md:space-y-0">
          {Object.entries(servicesData).map(([path, service], i) => (
            <ServiceStrip key={path} service={{ ...service, path }} index={i} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] p-12 md:p-24 text-center transition-colors duration-500"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tight">Ready to start?</h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed font-medium">
            Contact us today for an assessment. We provide clear pricing and professional service for all our listed technical solutions.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-4 px-12 py-5 bg-indigo hover:bg-indigo/80 text-white font-rajdhani font-bold tracking-[0.3em] uppercase rounded shadow-[0_10px_40px_rgba(34,17,119,0.4)] active:scale-95 transition-all"
          >
            Get A Quote Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesOverview;
