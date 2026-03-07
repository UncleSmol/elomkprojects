import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PulsingBackground from './components/PulsingBackground';
import { corporateData } from './data/pagesData';
import { ThemeProvider } from './context/ThemeContext';

// Performance: Lazy load pages for efficient chunking
const Homepage = lazy(() => import('./pages/Homepage'));
const ServicesOverview = lazy(() => import('./pages/ServicesOverview'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const CorporatePage = lazy(() => import('./pages/CorporatePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Page404 = lazy(() => import('./pages/Page404'));

// High-tech Loading Indicator
const Loading = () => (
  <div className="fixed inset-0 bg-[#030617] dark:bg-[#030617] light:bg-[#f8fafc] flex items-center justify-center z-[200]">
    <div className="w-12 h-12 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-[var(--bg-primary)] text-[var(--text-main)] selection:bg-cyan/30 min-h-screen flex flex-col uppercase antialiased transition-colors duration-300">
          {/* Accessibility landmark */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-cyan focus:text-[#030617] focus:font-bold focus:rounded">
            Skip to main content
          </a>
          
          {/* Unified High-Tech Background */}
          <PulsingBackground />
          
          <Navbar />
          
          <main id="main-content" className="flex-grow relative z-10">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                
                {/* Main Sections */}
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Dynamic Corporate Routes */}
                {Object.entries(corporateData).map(([path, data]) => (
                  <Route 
                    key={path} 
                    path={`/${path}`} 
                    element={<CorporatePage {...data} />} 
                  />
                ))}

                {/* Fallback to 404 */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
