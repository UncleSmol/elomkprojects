import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { ShieldCheck, Lock, Eye, Database, Globe, UserCheck } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-cyan" />,
      title: "Data Acquisition",
      content: "We collect specific personal identifiers when you engage with our digital infrastructure. This includes your full identity, telecommunication links, and digital correspondence addresses. This data is captured primarily through our secure contact forms and direct project inquiries."
    },
    {
      icon: <Database className="w-6 h-6 text-cyan" />,
      title: "Utilization Strategy",
      content: "Your information is used exclusively for operational execution: generating itemized technical quotations, logistics planning for on-site assessments, and maintaining direct communication for technical support. We do not use your data for unsolicited marketing."
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan" />,
      title: "Security Protocols",
      content: "We implement rigorous digital safeguards. All transmissions are processed via encrypted serverless architecture (SendGrid SSL/TLS). Your data is stored in secured environments with restricted access, preventing unauthorized interception or disclosure."
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan" />,
      title: "Third-Party Disclosure",
      content: "ELOMK Projects operates a strict non-disclosure policy. We do not sell or trade user data. Information is only shared with verified technical partners or law enforcement when strictly necessary for project completion or legal compliance."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-cyan" />,
      title: "User Control & Rights",
      content: "In alignment with POPIA and international standards, you retain full rights over your data. You may request a complete digital record of your stored information, ask for immediate rectification of errors, or demand permanent deletion from our records."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan" />,
      title: "Governance & Compliance",
      content: "Our data practices are governed by the laws of South Africa. We continuously audit our systems to ensure ongoing compliance with the Protection of Personal Information Act (POPIA) and evolving digital privacy standards."
    }
  ];

  return (
    <div className="min-h-screen text-[var(--text-main)] transition-colors duration-300">
      <SEO 
        title="Privacy Policy - ELOMK Projects" 
        description="Comprehensive privacy and data protection policy for ELOMK Projects. Learn about our secure information management and POPIA compliance." 
      />
      
      <PageHero 
        tag="Security Protocol"
        title="Privacy" 
        italicTitle="Framework"
        subtitle="Our commitment to the integrity and protection of your project data and personal identifiers."
        image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600"
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
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Data Governance v2.0</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tight uppercase leading-none">
              Information <br />
              <span className="text-[var(--text-muted)] italic text-3xl md:text-6xl">Integrity Standards</span>
            </h2>
            
            <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-3xl uppercase leading-relaxed font-medium">
              ELOMK Projects (PTY) LTD operates with a 'Security-First' mindset. This document outlines our end-to-end data lifecycle management, ensuring your privacy remains uncompromised during every technical engagement.
            </p>
          </motion.div>

          {/* Detailed Sections Grid */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-cyan/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-white">{section.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
          >
            <div className="max-w-md">
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-4">Request Data Access</h4>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest leading-relaxed">
                For formal inquiries regarding your data footprint or to exercise your rights of deletion, contact our Data Privacy Officer.
              </p>
            </div>
            
            <a 
              href="mailto:admin@elomkprojects.co.za"
              className="px-10 py-4 border border-cyan/20 hover:border-cyan hover:bg-cyan/5 text-cyan text-[10px] font-bold tracking-[0.4em] uppercase rounded-xl transition-all"
            >
              admin@elomkprojects.co.za
            </a>
          </motion.div>

          <div className="mt-12 text-[8px] tracking-[0.5em] text-[var(--text-muted)] uppercase">
            Official Document Code: ELOMK-PRV-2026 | Last Sync: March 25, 2026
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
