import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/Elomk - Logo PNG2.png";

const Footer = () => (
  <footer className="relative z-50 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-24 pb-12 overflow-hidden font-rajdhani text-[var(--text-main)] transition-colors duration-500">
    <div className="container mx-auto px-6 text-[var(--text-main)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 text-[var(--text-main)]">
        {/* Brand Column */}
        <div className="lg:col-span-1 text-[var(--text-main)]">
          <Link
            to="/"
            className="flex items-center gap-3 mb-8 uppercase cursor-pointer group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded transition-all">
              <img src={Logo} alt="ELOMK Projects Logo" className="w-full h-full object-contain" />
            </div>
          </Link>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed max-w-xs mb-8">
            Professional security and technical services. Serving Witbank and surrounding areas with reliable workmanship since our inception.
          </p>
          <div className="flex gap-4">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-white/[0.03] border border-[var(--border-color)] rounded flex items-center justify-center text-[var(--text-muted)] hover:text-cyan hover:border-cyan/30 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="text-[var(--text-main)] text-xs font-bold tracking-[0.4em] mb-8 uppercase">
            Quick Links
          </h3>
          <ul className="space-y-4 text-[10px] text-[var(--text-muted)] font-medium tracking-widest uppercase">
            <li>
              <Link to="/" className="hover:text-cyan transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-cyan transition-colors">Services Hub</Link>
            </li>
            <li>
              <Link to="/process" className="hover:text-cyan transition-colors">Our Process</Link>
            </li>
            <li>
              <Link to="/about-projects" className="hover:text-cyan transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Corporate Column */}
        <div>
          <h3 className="text-[var(--text-main)] text-xs font-bold tracking-[0.4em] mb-8 uppercase">
            Support
          </h3>
          <ul className="space-y-4 text-[10px] text-[var(--text-muted)] font-medium tracking-widest uppercase">
            <li>
              <Link to="/contact" className="hover:text-cyan transition-colors">Request A Quote</Link>
            </li>
            <li>
              <Link to="/service-plans" className="hover:text-cyan transition-colors">Service Plans</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-cyan transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/compliance" className="hover:text-cyan transition-colors">Compliance</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-[var(--text-main)] text-xs font-bold tracking-[0.4em] mb-8 uppercase text-[var(--text-main)]">
            Witbank HQ
          </h3>
          <div className="space-y-6 text-[10px] text-[var(--text-muted)] font-medium tracking-widest uppercase text-[var(--text-main)]">
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-cyan mt-0.5" />
              <span>
                Witbank, Mpumalanga
                <br />
                South Africa
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-4 h-4 text-cyan" />
              <span>+27 00 000 0000</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-4 h-4 text-cyan" />
              <span>info@elomkprojects.co.za</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-8 text-[var(--text-main)]">
        <div className="text-[8px] tracking-[0.4em] text-[var(--text-muted)] uppercase">
          &copy; {new Date().getFullYear()} ELOMK Projects (PTY) LTD. ALL RIGHTS
          RESERVED.
        </div>
        <div className="flex items-center gap-8 text-[8px] tracking-[0.4em] text-[var(--text-muted)] uppercase">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-cyan animate-pulse" />{" "}
            SYSTEM: ONLINE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-cyan animate-pulse" />{" "}
            REGION: LOCAL
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
