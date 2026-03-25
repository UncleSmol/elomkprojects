import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { FileText, CheckCircle, Shield, Award, Landmark, HardHat } from 'lucide-react';

const CompliancePage = () => {
  const standards = [
    {
      icon: <Award className="w-6 h-6 text-cyan" />,
      title: "SABS Approved",
      content: "All hardware utilized in our security installations—from high-tension fencing to biometric access units—meets the rigorous standards of the South African Bureau of Standards (SABS)."
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan" />,
      title: "POPIA Alignment",
      content: "Our digital systems and data handling procedures are fully audited against the Protection of Personal Information Act, ensuring your project data and personal identifiers are legally protected."
    },
    {
      icon: <FileText className="w-6 h-6 text-cyan" />,
      title: "Regulatory Licensing",
      content: "ELOMK Projects maintains all necessary regional and national technical licenses required for professional security infrastructure and technical building maintenance."
    },
    {
      icon: <HardHat className="w-6 h-6 text-cyan" />,
      title: "Health & Safety",
      content: "We strictly adhere to Occupational Health and Safety (OHS) protocols. Every on-site installation is preceded by a safety assessment to protect both our technicians and your property."
    },
    {
      icon: <Landmark className="w-6 h-6 text-cyan" />,
      title: "Legal Fencing Standards",
      content: "Our electric fencing installations comply with national safety regulations regarding height, signage, and pulse energy levels, ensuring your security is both effective and lawful."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-cyan" />,
      title: "Quality Audits",
      content: "Internal technical audits are conducted post-installation. We ensure that every 'Circuit Complete' status is backed by empirical testing and meets our 'Reliable Results' durability benchmark."
    }
  ];

  return (
    <div className="min-h-screen text-[var(--text-main)] transition-colors duration-300">
      <SEO 
        title="Compliance & Standards - ELOMK Projects" 
        description="ELOMK Projects (PTY) LTD regulatory compliance information. SABS approved materials, POPIA alignment, and national safety standards." 
      />
      
      <PageHero 
        tag="Regulatory Standards"
        title="Technical" 
        italicTitle="Compliance"
        subtitle="Ensuring every installation meets national safety and quality benchmarks."
        image="https://images.unsplash.com/photo-1454165833762-0104b27f6171?q=80&w=1600"
      />

      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Intro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Operational Governance</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tight uppercase leading-none">
              Certified <br />
              <span className="text-[var(--text-muted)] italic text-3xl md:text-6xl">Professionalism</span>
            </h2>
            
            <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-3xl uppercase leading-relaxed font-medium">
              We don't just install; we comply. ELOMK Projects operates within the strict legal and technical frameworks of South Africa, ensuring that your security assets are an asset, not a liability.
            </p>
          </motion.div>

          {/* Compliance Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-cyan/[0.02] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-white">{item.title}</h3>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Verification Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 rounded-3xl border border-cyan/20 bg-gradient-to-br from-indigo/5 to-transparent relative overflow-hidden"
          >
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Shield className="w-12 h-12 text-cyan mx-auto mb-8 animate-pulse" />
              <h4 className="text-2xl font-bold mb-6 uppercase tracking-tight">Technical Integrity Guaranteed</h4>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed uppercase tracking-widest mb-10">
                Every project completed by ELOMK Projects includes a certification of workmanship and complies with the latest industry-specific safety amendments.
              </p>
              <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale contrast-125">
                {/* Visual placeholder for certification marks */}
                <div className="text-[10px] font-bold tracking-[0.5em] border-2 border-white px-4 py-2">SABS</div>
                <div className="text-[10px] font-bold tracking-[0.5em] border-2 border-white px-4 py-2">POPIA</div>
                <div className="text-[10px] font-bold tracking-[0.5em] border-2 border-white px-4 py-2">OHS</div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-3xl rounded-full -mr-32 -mt-32" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CompliancePage;
