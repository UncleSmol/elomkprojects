import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
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
          <p className="text-[var(--text-muted)] text-xs leading-relaxed max-w-xs mb-8 uppercase">
            Professional security and technical services. Serving Emalahleni and surrounding areas with reliable workmanship.
          </p>
          <div className="space-y-2 text-[10px] text-[var(--text-muted)] font-bold tracking-widest uppercase">
            <div className="text-cyan">ELOMK PROJECTS (Pty)Ltd</div>
            <div>REG: 2018/486342/07</div>
            <div>INCOME TAX: 9643583173</div>
            <div>VAT NO: 4590299659</div>
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
            Head Office
          </h3>
          <div className="space-y-6 text-[10px] text-[var(--text-muted)] font-medium tracking-widest uppercase text-[var(--text-main)]">
            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-cyan mt-0.5" />
              <span>
                84310 Market Street
                <br />
                Emalahleni 1035
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-4 h-4 text-cyan" />
              <span>013 001 1983</span>
            </div>
            <div className="flex items-center gap-4">
              <MessageSquare className="w-4 h-4 text-cyan" />
              <span>+27 76 011 3690 (WA)</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-4 h-4 text-cyan" />
              <span>admin@elokprojects.co.za</span>
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
