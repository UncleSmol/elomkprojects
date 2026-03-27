import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { ExternalLink } from 'lucide-react';

const pages = [
  { label: "Home", path: "/" },
  { label: "Services Hub", path: "/services" },
  { label: "Electric Fencing", path: "/services#electric-fencing" },
  { label: "CCTV Installations", path: "/services#cctv-installations" },
  { label: "Gate Automation", path: "/services#gate-automation" },
  { label: "Plumbing", path: "/services#plumbing" },
  { label: "Our Process", path: "/process" },
  { label: "Service Plans", path: "/service-plans" },
  { label: "About Us", path: "/about-projects" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Compliance", path: "/compliance" },
];

const SitemapPage = () => {
  return (
    <>
      <SEO
        title="Sitemap | ELOMK Projects"
        description="Complete sitemap of ELOMK Projects website. Find all pages and services we offer."
        url="https://www.elomkprojects.co.za/sitemap"
      />
      <PageHero
        title="Sitemap"
        subtitle="A complete overview of every page on our website."
        tag="Navigation"
      />
      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32 text-[var(--text-main)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-indigo/40" />
            <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-rajdhani font-bold text-cyan">
              All Pages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page, i) => (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={page.path}
                  className="group flex items-center justify-between p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-overlay)] hover:border-cyan/50 hover:bg-cyan/5 transition-all"
                >
                  <span className="font-rajdhani font-bold text-sm md:text-base uppercase tracking-wider text-[var(--text-main)] group-hover:text-cyan transition-colors">
                    {page.label}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-cyan transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default SitemapPage;
