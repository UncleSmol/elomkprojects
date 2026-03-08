import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Other / Quote Request',
    message: ''
  });

  const [callRequestPhone, setCallRequestPhone] = useState('');
  const [ticketId] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [callStatus, setCallStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (initialService) {
      const options = ["Electric Fencing", "CCTV Installations", "Gate Automation", "Plumbing", "Civil Works"];
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

    const cleanData = {
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message),
      _subject: `New Request [Ticket #${ticketId}] - ${formData.service}`,
      _template: "table"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/ntsako.khoza@yahoo.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(cleanData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', service: 'Other / Quote Request', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleCallRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callRequestPhone) return;
    setCallStatus('submitting');

    const cleanData = {
      phone: sanitizeInput(callRequestPhone),
      _subject: `URGENT: Call Back Request [Ticket #${ticketId}]`,
      _template: "box",
      message: `Client requested a call back immediately at: ${callRequestPhone}`
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/ntsako.khoza@yahoo.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(cleanData)
      });

      if (response.ok) {
        setCallStatus('success');
        setCallRequestPhone('');
        setTimeout(() => setCallStatus('idle'), 5000);
      } else {
        setCallStatus('error');
      }
    } catch (error) {
      setCallStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-20 bg-[var(--bg-primary)] min-h-screen text-[var(--text-main)] transition-colors duration-500 overflow-x-hidden">
      <PageHero 
        title="Contact Us" 
        subtitle="Connect with our technical team for reliable installations and maintenance."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80"
      />

      <section className="relative z-20 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 overflow-hidden lg:overflow-visible">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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

            {/* Request a Call Section */}
            <div className="mb-16 p-8 bg-indigo/5 border border-cyan/20 rounded-2xl transition-colors duration-500">
              <div className="flex items-center gap-3 mb-6">
                <PhoneCall className="w-5 h-5 text-cyan animate-bounce" />
                <h4 className="font-rajdhani font-bold text-sm uppercase tracking-widest text-cyan">Request a call back</h4>
              </div>
              
              {callStatus === 'success' ? (
                <p className="text-cyan text-xs font-bold uppercase animate-pulse">Request received. We will call you shortly.</p>
              ) : (
                <form onSubmit={handleCallRequest} className="flex gap-2">
                  <input 
                    required
                    type="tel" 
                    placeholder="YOUR PHONE NUMBER"
                    value={callRequestPhone}
                    onChange={(e) => setCallRequestPhone(e.target.value)}
                    className="flex-grow bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan/30 transition-all text-[var(--text-main)] w-full min-w-0"
                  />
                  <button 
                    type="submit"
                    disabled={callStatus === 'submitting'}
                    className="bg-cyan hover:bg-cyan/80 text-[var(--bg-secondary)] px-6 py-3 rounded-lg font-rajdhani font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 shrink-0"
                  >
                    {callStatus === 'submitting' ? '...' : 'CALL ME'}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-indigo/10 border border-indigo/30 rounded-xl flex items-center justify-center shrink-0 group-hover:border-cyan/50 transition-colors">
                  <MapPin className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-widest mb-2 uppercase">Witbank HQ</h4>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed uppercase">
                    Witbank, Mpumalanga<br />South Africa
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
                    +27 00 000 0000<br />+27 00 000 0000
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
                    info@elomkprojects.co.za
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
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
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-bold tracking-widest uppercase">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Please fill out all fields correctly and try again.
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
                      <option className="bg-[var(--bg-secondary)]" value="Civil Works">Civil Works</option>
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
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
