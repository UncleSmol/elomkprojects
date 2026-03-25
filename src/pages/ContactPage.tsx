import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import contactHeroImg from '../assets/contact-hero.jpg';
import Map from '../components/Map';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service');
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yContent = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Other / Quote Request',
    message: ''
  });

  const [ticketId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      const options = ["Electric Fencing", "CCTV Installations", "Gate Automation", "Plumbing"];
      const match = options.find(opt => opt.toLowerCase() === initialService.toLowerCase());
      if (match) {
        setFormData(prev => ({ ...prev, service: match }));
      } else {
        setFormData(prev => ({ ...prev, service: initialService }));
      }
    }
  }, [initialService]);

  const sanitizeInput = (str: string) => {
    return str.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const cleanData = {
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      email: sanitizeInput(formData.email),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message),
      ticketId: ticketId
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: 'Other / Quote Request', message: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(errorData.error || `Server returned ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || "Network error. Please ensure you are running the project via Vercel CLI (vercel dev).");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const WHATSAPP_NUMBER = "+27760113690"; 

  const whatsappTemplates = [
    { label: "General Inquiry", message: "Hi Elomk Projects, I'd like to inquire about your services." },
    { label: "Quote Request", message: "Hello, I would like to request a quote for a new project." },
    { label: "Emergency Repair", message: "URGENT: I need assistance with an emergency repair." }
  ];

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '').replace(/\s/g, '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen text-[var(--text-main)] transition-colors duration-500 overflow-x-hidden">
      <SEO 
        title="Contact Us - ELOMK Projects" 
        description="Get in touch with our technical team in Emalahleni for a quote or direct assistance. Connect with us via WhatsApp, phone, or email." 
      />
      <PageHero 
        tag="Command Center"
        title="Contact" 
        italicTitle="Our Team"
        subtitle="Connect with our technical team for reliable installations and maintenance."
        image={contactHeroImg}
      />

      <section ref={contentRef} className="relative z-20 container mx-auto px-6 py-24 md:py-32">
        <motion.div 
          style={{ y: yContent, opacity }}
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 overflow-hidden lg:overflow-visible"
        >
          
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-cyan/40" />
              <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Command Center</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight uppercase leading-none">
              Get In <br />
              <span className="text-white/30 italic text-3xl md:text-5xl">Touch Directly</span>
            </h2>

            <p className="text-[var(--text-muted)] text-lg mb-12 leading-relaxed max-w-md uppercase">
              Our team is ready to help with your gate repairs, fence installations, or plumbing needs. Reach out for straightforward service.
            </p>

            {/* WhatsApp Conversation Card */}
            <div className="mb-16 p-8 bg-indigo/5 border border-cyan/20 rounded-2xl transition-all duration-500 hover:border-cyan/40 group">
              <div className="flex items-center gap-3 mb-6">
                <FaWhatsapp className="w-6 h-6 text-cyan animate-pulse" />
                <div>
                  <h4 className="font-rajdhani font-bold text-sm uppercase tracking-widest text-cyan">Instant WhatsApp</h4>
                  <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-widest mt-1">Select a template to begin</p>
                </div>
              </div>
              
              <div className="grid gap-3">
                {whatsappTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWhatsAppClick(template.message)}
                    className="w-full text-left p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-cyan/30 rounded-xl transition-all group/btn flex items-center justify-between"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest group-hover/btn:text-cyan transition-colors">{template.label}</span>
                    <Send className="w-3 h-3 text-[var(--text-muted)] group-hover/btn:text-cyan transition-colors" />
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                <button
                  onClick={() => handleWhatsAppClick("Hello Elomk Projects, I have a custom inquiry.")}
                  className="w-full py-4 bg-cyan/10 hover:bg-cyan text-cyan hover:text-[var(--bg-secondary)] border border-cyan/20 rounded-xl font-rajdhani font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Custom Message
                </button>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-indigo/10 border border-indigo/30 rounded-xl flex items-center justify-center shrink-0 group-hover:border-cyan/50 transition-colors">
                  <MapPin className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-widest mb-2 uppercase">Head Office</h4>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed uppercase">
                    84310 Market Street<br />Emalahleni 1035
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-indigo/10 border border-indigo/30 rounded-xl flex items-center justify-center shrink-0 group-hover:border-cyan/50 transition-colors">
                  <Phone className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-widest mb-2 uppercase">Direct Link</h4>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed uppercase">
                    013 001 1983<br />+27 76 011 3690
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-indigo/10 border border-indigo/30 rounded-xl flex items-center justify-center shrink-0 group-hover:border-cyan/50 transition-colors">
                  <Mail className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-widest mb-2 uppercase">Email Channel</h4>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed lowercase">
                    admin@elokprojects.co.za
                  </p>
                </div>
              </div>
            </div>

            {/* Map Integration */}
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-cyan/40" />
                <span className="text-[8px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Location Data</span>
              </div>
              <Map />
            </div>
          </div>

          {/* Form Column */}
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo/5 blur-3xl rounded-full" />
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 md:p-12 shadow-2xl transition-colors duration-500">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold uppercase tracking-tight">Send a message</h3>
                <span className="text-[10px] font-rajdhani font-bold text-cyan tracking-widest">TICKET #{ticketId}</span>
              </div>
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-cyan/10 border border-cyan/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-cyan" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-widest">Request Sent</h4>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                    Ticket #{ticketId} has been logged. Our technical team will review your requirements and contact you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-8 py-3 border border-[var(--border-color)] hover:border-cyan/30 text-[var(--text-main)] text-xs font-rajdhani font-bold tracking-widest uppercase rounded transition-all"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="flex flex-col gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-bold tracking-widest uppercase">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Transmission Failure
                      </div>
                      {errorMessage && (
                        <div className="pl-7 opacity-70 font-mono normal-case tracking-normal">
                          LOG: {errorMessage}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-rajdhani font-bold text-cyan tracking-widest uppercase">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ENTER NAME" 
                        className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-lg px-4 py-4 text-sm text-[var(--text-main)] placeholder:text-white/10 focus:outline-none focus:border-cyan/30 transition-all uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-rajdhani font-bold text-cyan tracking-widest uppercase">Contact Number</label>
                      <input 
                        required
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="ENTER PHONE" 
                        className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-lg px-4 py-4 text-sm text-[var(--text-main)] placeholder:text-white/10 focus:outline-none focus:border-cyan/30 transition-all uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] font-rajdhani font-bold text-cyan tracking-widest uppercase">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ENTER EMAIL ADDRESS" 
                      className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-lg px-4 py-4 text-sm text-[var(--text-main)] placeholder:text-white/10 focus:outline-none focus:border-cyan/30 transition-all uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] font-rajdhani font-bold text-cyan tracking-widest uppercase">Service Required</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-lg px-4 py-4 text-sm text-[var(--text-main)] focus:outline-none focus:border-cyan/30 transition-all uppercase appearance-none"
                    >
                      <option className="bg-[var(--bg-secondary)]" value="Electric Fencing">Electric Fencing</option>
                      <option className="bg-[var(--bg-secondary)]" value="CCTV Installations">CCTV Installations</option>
                      <option className="bg-[var(--bg-secondary)]" value="Gate Automation">Gate Automation</option>
                      <option className="bg-[var(--bg-secondary)]" value="Plumbing">Plumbing</option>
                      <option className="bg-[var(--bg-secondary)]" value="Other / Quote Request">Other / Quote Request</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] font-rajdhani font-bold text-cyan tracking-widest uppercase">Message Hub</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4} 
                      placeholder="DESCRIBE YOUR REQUIREMENTS..." 
                      className="w-full bg-white/[0.03] border border-[var(--border-color)] rounded-lg px-4 py-4 text-sm text-[var(--text-main)] placeholder:text-white/10 focus:outline-none focus:border-cyan/30 transition-all uppercase resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-5 bg-indigo hover:bg-indigo/80 disabled:opacity-50 text-white font-rajdhani font-bold text-xs tracking-[0.3em] uppercase rounded shadow-[0_10px_30px_rgba(34,17,119,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    {status === 'submitting' ? 'Transmitting...' : 'Initiate Transmission'} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
