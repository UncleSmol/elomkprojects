import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';

interface CorporatePageProps {
  title: string;
  subtitle: string;
  description: string;
}

const CorporatePage = ({ title, subtitle, description }: CorporatePageProps) => {
  return (
    <div className="pt-20 bg-[var(--bg-primary)] min-h-screen text-[var(--text-main)] transition-colors duration-300">
      <PageHero 
        title={title} 
        subtitle={subtitle} 
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80"
      />
      
      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Corporate Profile</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight uppercase leading-none">
              Professional <br />
              <span className="text-[var(--text-muted)] italic text-3xl md:text-5xl">Leadership & Vision</span>
            </h2>

            <div className="prose prose-invert max-w-none text-[var(--text-muted)] text-lg leading-relaxed mb-16">
              <p className="mb-8">
                {description}
              </p>
              <p className="mb-8">
                ELOMK Projects (PTY) LTD is a multi-disciplinary services company dedicated to providing high-quality security installations and technical maintenance. We focus on delivering reliable workmanship across a range of technical fields, ensuring that your property and systems are handled with professional care.
              </p>
            </div>

            {/* Leadership Grid */}
            <div className="grid md:grid-cols-2 gap-12 mt-24">
              {/* Leader 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-8 border border-[var(--border-color)] bg-indigo/5 rounded-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan/5 blur-3xl group-hover:bg-cyan/10 transition-all" />
                <span className="text-[10px] font-rajdhani font-bold text-cyan/40 uppercase tracking-widest mb-4 block">Director</span>
                <h3 className="text-2xl font-bold text-[var(--text-main)] uppercase tracking-tight mb-4">Mr. Tumelo James Maabane</h3>
                <a href="mailto:tumelo@elomkprojects.co.za" className="text-[10px] font-rajdhani font-bold text-[var(--text-muted)] hover:text-cyan transition-colors flex items-center gap-2 tracking-widest uppercase">
                  <div className="w-6 h-6 bg-white/5 rounded flex items-center justify-center group-hover:border-cyan/30 border border-transparent transition-all">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  tumelo@elomkprojects.co.za
                </a>
                <div className="w-8 h-0.5 bg-cyan/30 mt-6 group-hover:w-full transition-all duration-700" />
              </motion.div>

              {/* Leader 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-8 border border-[var(--border-color)] bg-indigo/5 rounded-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo/5 blur-3xl group-hover:bg-indigo/10 transition-all" />
                <span className="text-[10px] font-rajdhani font-bold text-cyan/40 uppercase tracking-widest mb-4 block">Director</span>
                <h3 className="text-2xl font-bold text-[var(--text-main)] uppercase tracking-tight mb-4">Mr. Audrey Manage</h3>
                <a href="mailto:audrey@elomkprojects.co.za" className="text-[10px] font-rajdhani font-bold text-[var(--text-muted)] hover:text-cyan transition-colors flex items-center gap-2 tracking-widest uppercase">
                  <div className="w-6 h-6 bg-white/5 rounded flex items-center justify-center group-hover:border-cyan/30 border border-transparent transition-all">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  audrey@elomkprojects.co.za
                </a>
                <div className="w-8 h-0.5 bg-cyan/30 mt-6 group-hover:w-full transition-all duration-700" />
              </motion.div>
            </div>

            {/* Values Section */}
            <div className="mt-32 pt-24 border-t border-[var(--border-color)] grid md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-[var(--text-main)] font-bold mb-4 uppercase tracking-widest text-sm">Reliability</h4>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed">We show up on time and finish the job properly, every time.</p>
              </div>
              <div>
                <h4 className="text-[var(--text-main)] font-bold mb-4 uppercase tracking-widest text-sm">Quality</h4>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed">Our local team uses only SABS-approved materials for all installations.</p>
              </div>
              <div>
                <h4 className="text-[var(--text-main)] font-bold mb-4 uppercase tracking-widest text-sm">Local Pride</h4>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed">Based in Witbank, we are proud to serve our community and beyond.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CorporatePage;
