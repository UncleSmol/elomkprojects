import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { ExternalLink, FileText, ArrowRight } from 'lucide-react';

const sections = [
  {
    title: "Main",
    pages: [
      { label: "Home", path: "/", desc: "Overview of our services and process." },
      { label: "Contact Us", path: "/contact", desc: "Get a quote or reach our team directly." },
    ],
  },
  {
    title: "Services",
    pages: [
      { label: "Services Hub", path: "/services", desc: "All security and technical services in one place." },
      { label: "Electric Fencing", path: "/electric-fencing", desc: "SABS-approved perimeter fencing solutions." },
      { label: "CCTV Installations", path: "/cctv-installations", desc: "HD camera systems with remote mobile access." },
      { label: "Gate Automation", path: "/gate-automation", desc: "Gate motors, garage doors, and access control." },
      { label: "Plumbing", path: "/plumbing", desc: "Repairs, maintenance, and new installations." },
      { label: "Service Plans", path: "/service-plans", desc: "Annual maintenance plans for your systems." },
    ],
  },
  {
    title: "Company",
    pages: [
      { label: "Our Process", path: "/process", desc: "Plan, install, test, and support workflow." },
      { label: "About Us", path: "/about-projects", desc: "Who we are and what we stand for." },
    ],
  },
  {
    title: "Legal",
    pages: [
      { label: "Privacy Policy", path: "/privacy-policy", desc: "How we collect, use, and protect your data." },
      { label: "Compliance", path: "/compliance", desc: "Industry standards and certifications we follow." },
    ],
  },
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
        image="https://pixabay.com/images/download/mohamed_hassan-sitemap-4059862_1920.jpg"
      />
      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32 text-[var(--text-main)]">
        <div className="space-y-20">
          {sections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-indigo/40" />
                <span className="text-xs md:text-[10px] uppercase tracking-[0.4em] font-rajdhani font-bold text-cyan">
                  {section.title}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.pages.map((page, i) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      to={page.path}
                      className="group flex flex-col gap-3 p-6 rounded-xl border border-white/10 bg-[var(--bg-overlay)] hover:border-cyan/50 hover:bg-cyan/5 transition-all h-full"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-rajdhani font-bold text-base uppercase tracking-wider text-white group-hover:text-cyan transition-colors">
                          {page.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-white/50 group-hover:text-white/70 leading-relaxed normal-case font-medium transition-colors">
                        {page.desc}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* XML Sitemap Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-8 border-t border-[var(--border-color)]"
          >
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-[var(--bg-overlay)] hover:border-cyan/50 hover:bg-cyan/5 transition-all"
            >
              <FileText className="w-5 h-5 text-cyan" />
              <span className="font-rajdhani font-bold text-sm uppercase tracking-wider text-white group-hover:text-cyan transition-colors">
                View XML Sitemap
              </span>
              <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-cyan transition-colors" />
            </a>
            <p className="mt-3 text-xs text-[var(--text-muted)] font-medium">
              For search engines and automated crawlers.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SitemapPage;
