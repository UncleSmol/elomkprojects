import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicePageProps {
  title: string;
  subtitle: string;
  image: string;
  features: string[];
  description: string;
}

const ServicePage = ({ title, subtitle, image, features, description }: ServicePageProps) => {
  return (
    <div className="pt-20">
      <PageHero title={title} subtitle={subtitle} image={image} />
      
      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32 uppercase">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Detailed Analysis</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight uppercase">Technical <span className="text-white/30 italic">Specifications</span></h2>
            <p className="text-white/40 font-medium text-lg mb-12 leading-relaxed">
              {description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60">
                  <CheckCircle2 className="w-5 h-5 text-cyan shrink-0" />
                  <span className="text-xs font-rajdhani font-bold tracking-widest">{feature}</span>
                </div>
              ))}
            </div>

            <button className="px-10 py-4 bg-indigo hover:bg-indigo/80 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all shadow-[0_4px_20px_rgba(46,42,160,0.4)] active:scale-95 flex items-center gap-3">
              Request Technical Blueprint <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-indigo/5 blur-3xl" />
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#030617]">
              <img src={`${image}&auto=format&fit=crop&q=80&w=1000`} className="w-full h-full object-cover grayscale opacity-50" alt={title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030617] via-transparent to-transparent" />
              <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 border border-white/10 rounded backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  <span className="text-[8px] font-rajdhani text-white uppercase tracking-[0.3em]">SECURE_LINK: ACTIVE</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ServicePage;
