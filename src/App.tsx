import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PulsingBackground from './components/PulsingBackground';
import { corporateData } from './data/pagesData';
import { ThemeProvider } from './context/ThemeContext';

/**
 * Performance: Lazy load pages to ensure efficient code splitting and faster initial load.
 * Each lazy-loaded component will be fetched only when its route is visited.
 */
const Homepage = lazy(() => import('./pages/Homepage'));
const ServicesOverview = lazy(() => import('./pages/ServicesOverview'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const CorporatePage = lazy(() => import('./pages/CorporatePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const Page404 = lazy(() => import('./pages/Page404'));

/**
 * Loading Component
 * Displays a high-tech spinning indicator while lazy-loaded pages are being fetched.
 */
const Loading = () => (
  <div className="fixed inset-0 bg-[#030617] dark:bg-[#030617] light:bg-[#f8fafc] flex items-center justify-center z-[200]">
    <div className="w-12 h-12 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
  </div>
);

/**
 * Main Application Component
 * Sets up the ThemeProvider, Routing, and Global Layout structure.
 * 
 * Features:
 * - Theme-aware styling using CSS variables.
 * - Dynamic route generation for corporate/service pages.
 * - Accessibility support (skip-to-content link).
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-[var(--bg-primary)] text-[var(--text-main)] selection:bg-cyan/30 min-h-screen flex flex-col uppercase antialiased transition-colors duration-300">

          {/* Accessibility landmark: Allows screen readers and keyboard users to bypass navigation */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-cyan focus:text-[#030617] focus:font-bold focus:rounded">
            Skip to main content
          </a>

          {/* Unified High-Tech Background: Animates across all pages */}
          <PulsingBackground />

          {/* Sticky Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main id="main-content" className="flex-grow relative z-10">
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Core Static Routes */}
                <Route path="/" element={<Homepage />} />
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPage />} />

                {/* 
                  Dynamic Corporate Routes: 
                  Iterates through pagesData to automatically register service-specific routes. 
                */}
                {Object.entries(corporateData).map(([path, data]) => (
                  <Route
                    key={path}
                    path={`/${path}`}
                    element={<CorporatePage {...data} />}
                  />
                ))}

                {/* Fallback to 404: Catches any undefined routes */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>

          {/* Shared Footer component */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
