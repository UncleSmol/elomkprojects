import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen text-[var(--text-main)] transition-colors duration-300">
      <SEO 
        title="Privacy Policy - ELOMK Projects" 
        description="Learn how ELOMK Projects (PTY) LTD collects, uses, and protects your personal data in accordance with POPIA and standard privacy practices." 
      />
      
      <PageHero 
        tag="Legal Framework"
        title="Privacy" 
        italicTitle="Policy"
        subtitle="Our commitment to protecting your personal information and technical data."
        image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600"
      />

      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-cyan/40" />
            <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Data Governance</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight uppercase leading-none text-[var(--text-main)]">
            Information <br />
            <span className="text-[var(--text-muted)] italic text-3xl md:text-5xl">Management Standards</span>
          </h2>

          <div className="prose prose-invert max-w-none text-[var(--text-muted)] text-lg leading-relaxed space-y-12 uppercase">
            
            {/* Introduction */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-widest border-b border-white/10 pb-4">1. Overview</h3>
              <p className="text-sm">
                ELOMK Projects (PTY) LTD ("we", "our", or "us") is committed to protecting the privacy of our clients and website visitors. This policy outlines our practices regarding the collection and usage of data through our digital command center.
              </p>
            </div>

            {/* Data Collection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-widest border-b border-white/10 pb-4">2. Data Acquisition</h3>
              <p className="text-sm">We collect specific personal identifiers when you engage with our contact systems, including:</p>
              <ul className="list-disc pl-6 text-xs space-y-2 text-cyan/80">
                <li>Full Identity (Name)</li>
                <li>Telecommunication Links (Phone Numbers)</li>
                <li>Digital Correspondence Addresses (Email)</li>
                <li>Technical Requirements (Service Interests)</li>
                <li>Project Location Data</li>
              </ul>
            </div>

            {/* Usage */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-widest border-b border-white/10 pb-4">3. Utilization Strategy</h3>
              <p className="text-sm">Captured data is used exclusively for operational purposes:</p>
              <ul className="list-disc pl-6 text-xs space-y-2 text-cyan/80">
                <li>Generation of itemized technical quotations.</li>
                <li>Logistics planning for on-site assessments.</li>
                <li>Direct technical support communication.</li>
                <li>Compliance with South African safety and industry regulations.</li>
              </ul>
            </div>

            {/* Protection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-widest border-b border-white/10 pb-4">4. Security Protocols</h3>
              <p className="text-sm">
                We implement industry-standard encryption and secure serverless transmission (via SendGrid API) to ensure your data is protected from unauthorized access or interception during transit.
              </p>
            </div>

            {/* Third Parties */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-widest border-b border-white/10 pb-4">5. Third-Party Integration</h3>
              <p className="text-sm">
                We do not sell or trade your personal information. Data is only shared with verified technical partners if required to complete your installation or maintenance project.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4 pt-12">
              <p className="text-xs italic text-cyan/60">
                For inquiries regarding your personal data status, contact our administration at admin@elomkprojects.co.za
              </p>
              <p className="text-[10px] tracking-widest text-[var(--text-muted)]">
                Last Updated: March 25, 2026
              </p>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPage;
