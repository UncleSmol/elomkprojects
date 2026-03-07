import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const Page404 = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 uppercase">
      <div className="relative max-w-2xl w-full text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo/10 blur-[100px] rounded-full z-0" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-indigo/10 border border-indigo/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,17,119,0.2)]">
              <AlertTriangle className="w-10 h-10 text-cyan animate-pulse" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
            404
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-cyan/40" />
            <span className="text-[10px] uppercase font-rajdhani font-bold text-cyan tracking-[0.4em]">Protocol Error</span>
            <div className="w-12 h-px bg-cyan/40" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-tight">
            Page Not <span className="text-white/30 italic">Found</span>
          </h2>
          
          <p className="text-white/40 font-medium text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed uppercase">
            The requested technical data could not be retrieved. The link may be broken or the page has been relocated.
          </p>

          <Link 
            to="/"
            className="inline-flex items-center gap-3 px-10 py-4 bg-indigo hover:bg-indigo/80 text-white font-rajdhani font-bold tracking-widest uppercase rounded transition-all shadow-[0_4px_20px_rgba(34,119,170,0.3)] active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return To Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Page404;
