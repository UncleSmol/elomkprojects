import { Shield, MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="relative z-50 bg-[#010208] border-t border-white/5 pt-24 pb-12 overflow-hidden uppercase font-rajdhani text-white">
    <div className="container mx-auto px-6 uppercase text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 uppercase text-white">
        
        {/* Brand Column */}
        <div className="lg:col-span-1 uppercase text-white">
          <Link to="/" className="flex items-center gap-3 mb-8 uppercase cursor-pointer group">
            <div className="w-10 h-10 bg-indigo/10 border border-indigo/30 flex items-center justify-center rounded transition-all group-hover:border-cyan/50">
              <Shield className="w-6 h-6 text-cyan shadow-[0_0_10px_cyan]" />
            </div>
            <h2 className="font-bold text-xl tracking-[0.3em] text-white">ELOMK <span className="text-cyan">Projects</span></h2>
          </Link>
          <p className="text-white/30 text-xs leading-relaxed max-w-xs mb-8 uppercase">
            Specialized security engineering and infrastructure technical services. Serving nationwide with mission-critical precision since our inception.
          </p>
          <div className="flex gap-4">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-white/[0.03] border border-white/5 rounded flex items-center justify-center text-white/40 hover:text-cyan hover:border-cyan/30 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h3 className="text-white/80 text-xs font-bold tracking-[0.4em] mb-8 uppercase">Specialized Services</h3>
          <ul className="space-y-4 text-[10px] text-white/30 font-medium tracking-widest uppercase">
            <li><Link to="/services/electric-fencing" className="hover:text-cyan transition-colors">Electric Fencing</Link></li>
            <li><Link to="/services/cctv-surveillance" className="hover:text-cyan transition-colors">CCTV Surveillance</Link></li>
            <li><Link to="/services/access-control" className="hover:text-cyan transition-colors">Access Control Systems</Link></li>
            <li><Link to="/services/industrial-plumbing" className="hover:text-cyan transition-colors">Industrial Plumbing</Link></li>
            <li><Link to="/services/civil-infrastructure" className="hover:text-cyan transition-colors">Civil Infrastructure</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="text-white/80 text-xs font-bold tracking-[0.4em] mb-8 uppercase">Corporate</h3>
          <ul className="space-y-4 text-[10px] text-white/30 font-medium tracking-widest uppercase">
            <li><Link to="/about-projects" className="hover:text-cyan transition-colors">About Projects</Link></li>
            <li><Link to="/request-blueprint" className="hover:text-cyan transition-colors">Request Blueprint</Link></li>
            <li><Link to="/maintenance-plans" className="hover:text-cyan transition-colors">Maintenance Plans</Link></li>
            <li><Link to="/privacy-protocol" className="hover:text-cyan transition-colors">Privacy Protocol</Link></li>
            <li><Link to="/compliance" className="hover:text-cyan transition-colors">Compliance</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white/80 text-xs font-bold tracking-[0.4em] mb-8 uppercase text-white">Witbank HQ</h3>
          <div className="space-y-6 text-[10px] text-white/30 font-medium tracking-widest uppercase text-white">
            <div className="flex items-start gap-4 uppercase">
              <MapPin className="w-4 h-4 text-cyan mt-0.5" />
              <span>Witbank, Mpumalanga<br />South Africa</span>
            </div>
            <div className="flex items-center gap-4 uppercase">
              <Phone className="w-4 h-4 text-cyan" />
              <span>+27 00 000 0000</span>
            </div>
            <div className="flex items-center gap-4 uppercase">
              <Mail className="w-4 h-4 text-cyan" />
              <span>info@elomkprojects.co.za</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 uppercase text-white">
        <div className="text-[8px] tracking-[0.4em] text-white/20 uppercase">
          &copy; {new Date().getFullYear()} ELOMK Projects (PTY) LTD. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-8 text-[8px] tracking-[0.4em] text-white/20 uppercase">
          <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-cyan animate-pulse" /> SYSTEM: STABLE</div>
          <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-cyan animate-pulse" /> REGION: GLOBAL</div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
