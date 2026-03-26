import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Logo from "../assets/Elomk - Logo PNG2.png";
import { useTheme } from "../context/ThemeContext";

/**
 * Navbar Component
 * 
 * A fixed-position navigation bar that adapts its styling on scroll.
 * Handles:
 * - Dynamic background transparency based on scroll position.
 * - Active section tracking via Intersection Observer (for the Homepage).
 * - Theme toggling (Dark/Light).
 * - Mobile menu with animated transitions.
 * - Scroll-to-top behavior on route changes.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll detection to toggle navbar "compact" mode
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Section Tracking Logic:
   * Uses Intersection Observer to determine which section is currently in view.
   * This is used to highlight the correct link in the Navbar while on the Homepage.
   */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["services", "process", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // Offset to trigger before section fully hits center
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Ensure user is at the top of the page when navigating between routes
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  }, [pathname]);

  // Navigation link configuration
  const navLinks = [
    { name: "Home", href: "/", id: "" },
    { name: "Services", href: "/services", id: "services" },
    { name: "Process", href: "/process", id: "process" },
    { name: "About", href: "/about-projects", id: "about" },
    { name: "Contact", href: "/contact", id: "contact" },
  ];

  /**
   * Helper function to determine if a link is currently active.
   * Handles both route-based and ID-based (hash) links.
   */
  const isLinkActive = (link: any) => {
    if (link.name === "Services") return pathname.startsWith("/services");
    if (link.href.startsWith("/#")) {
      return activeSection === link.id;
    }
    return pathname === link.href;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b bg-white backdrop-blur-xl border-b-[#e2e8f0] ${
        isScrolled ? "py-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)]" : "py-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 flex items-center justify-center rounded transition-all">
            <img src={Logo} alt="ELOMK Projects Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <li key={link.name} className="relative flex items-center">
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      className={`font-rajdhani font-bold text-xs uppercase tracking-[0.2em] transition-all relative block py-2 ${
                        active ? "text-cyan" : "text-[#221177] hover:text-cyan"
                      }`}
                    >
                      {link.name}
                      <span className={`absolute -bottom-1 left-0 h-px bg-cyan transition-all ${active ? "w-full" : "w-0 group-hover/item:w-full"}`} />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`font-rajdhani font-bold text-xs uppercase tracking-[0.2em] transition-all relative block py-2 ${
                        active ? "text-cyan" : "text-[#221177] hover:text-cyan"
                      }`}
                    >
                      {link.name}
                      <span className={`absolute -bottom-1 left-0 h-px bg-cyan transition-all ${active ? "w-full" : "w-0"}`} />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Theme Toggle (Desktop) */}
          <div className="flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 text-[#221177] hover:text-cyan transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Actions: Theme Toggle and Hamburger Menu */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-[#221177] hover:text-cyan transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className={`menu-btn text-[#221177] hover:text-cyan transition-colors z-[110] ${mobileMenuOpen ? 'opened' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Main Menu"
            aria-expanded={mobileMenuOpen}
          >
            {/* Animated SVG Hamburger */}
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className="line line2" d="M 20,50 H 80" />
              <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 h-screen w-screen bg-white z-[90] lg:hidden flex flex-col items-start justify-center"
          >
            <div className="px-12 py-24 flex flex-col gap-10 text-left uppercase w-full max-h-screen overflow-y-auto">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <div key={link.name} className="flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-between w-full">
                      <Link
                        to={link.href}
                        className={`font-rajdhani font-bold text-4xl uppercase tracking-[0.4em] transition-all ${
                          active ? "text-cyan" : "text-[#221177] hover:text-cyan"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </div>
                  </div>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
