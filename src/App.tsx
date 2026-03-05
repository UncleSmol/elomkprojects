import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PulseLines from './components/PulseLines';
import Homepage from './pages/Homepage';
import ServicePage from './pages/ServicePage';
import CorporatePage from './pages/CorporatePage';
import { servicesData, corporateData } from './data/pagesData';

function App() {
  return (
    <Router>
      <div className="bg-[#030617] text-white selection:bg-cyan/30 min-h-screen flex flex-col uppercase">
        <PulseLines />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            
            {/* Service Routes */}
            {Object.entries(servicesData).map(([path, data]) => (
              <Route 
                key={path} 
                path={`/services/${path}`} 
                element={<ServicePage {...data} />} 
              />
            ))}

            {/* Corporate Routes */}
            {Object.entries(corporateData).map(([path, data]) => (
              <Route 
                key={path} 
                path={`/${path}`} 
                element={<CorporatePage {...data} />} 
              />
            ))}

            {/* Not Found */}
            <Route path="*" element={<Homepage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
