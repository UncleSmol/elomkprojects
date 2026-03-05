import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Process', href: '/#process' },
    { name: 'About', href: '/about-projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${isScrolled ? 'bg-[#010208]/80 backdrop-blur-xl border-white/5 py-4 shadow-2xl' : 'bg-transparent border-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo/10 border border-indigo/30 flex items-center justify-center rounded transition-all group-hover:border-cyan/50 group-hover:shadow-[0_0_15px_rgba(70,179,211,0.3)]">
            <Shield className="w-6 h-6 text-cyan transition-transform group-hover:scale-110" />
          </div>
          <h1 className="font-rajdhani font-bold text-xl tracking-[0.3em] uppercase text-white transition-all group-hover:text-cyan">
            ELOMK <span className="text-cyan group-hover:text-white transition-colors">Projects</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/#') ? (
                  <a href={link.href} className="font-rajdhani font-bold text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-cyan transition-all relative group">
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan transition-all group-hover:w-full" />
                  </a>
                ) : (
                  <Link to={link.href} className="font-rajdhani font-bold text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-cyan transition-all relative group">
                    {link.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan transition-all group-hover:w-full" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button className="px-6 py-2 border border-cyan/30 bg-cyan/5 hover:bg-cyan hover:text-[#010208] text-cyan font-rajdhani font-bold text-[10px] tracking-[0.3em] uppercase rounded transition-all shadow-[0_0_20px_rgba(70,179,211,0.1)] active:scale-95">
            Get A Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white hover:text-cyan transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#010208] border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col gap-8 text-center uppercase">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <a key={link.name} href={link.href} className="font-rajdhani font-bold text-lg uppercase tracking-[0.4em] text-white hover:text-cyan" onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                ) : (
                  <Link key={link.name} to={link.href} className="font-rajdhani font-bold text-lg uppercase tracking-[0.4em] text-white hover:text-cyan" onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                )
              ))}
              <button className="w-full py-4 bg-indigo text-white font-rajdhani font-bold tracking-[0.3em] uppercase rounded shadow-2xl">
                Get A Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
