import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';

interface CorporatePageProps {
  title: string;
  subtitle: string;
  description: string;
}

const CorporatePage = ({ title, subtitle, description }: CorporatePageProps) => {
  return (
    <div className="pt-20">
      <PageHero title={title} subtitle={subtitle} image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80" />
      
      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32 uppercase text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Information Protocol</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight uppercase">{title}</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/60 font-medium text-lg leading-relaxed mb-8 uppercase">
                {description}
              </p>
              <div className="h-px w-full bg-white/5 my-12" />
              <div className="grid md:grid-cols-2 gap-12 text-white/40 text-sm font-medium leading-relaxed">
                <p>ELOMK PROJECTS OPERATES UNDER RIGOROUS TECHNICAL STANDARDS TO ENSURE SYSTEM INTEGRITY AND CLIENT SECURITY. OUR WITBANK HQ COORDINATES NATIONWIDE DEPLOYMENTS ACROSS MULTIPLE SECTORS.</p>
                <p>FOR FURTHER TECHNICAL CLARIFICATION OR CUSTOM BLUEPRINTS, PLEASE INITIATE A FORMAL REQUEST PROTOCOL VIA OUR CONTACT CHANNELS.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CorporatePage;
