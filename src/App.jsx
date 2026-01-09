import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ToolRouter from './components/ToolRouter';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AdSense from './components/AdSense/AdSense';
import { ADSENSE_CONFIG } from './config/adsense.config';
import './App.css';

function App() {
  const [currentTool, setCurrentTool] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  // Handle routing based on URL hash or path
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname;

      // Check for tool routes (hash-based)
      if (hash && hash.startsWith('tool-')) {
        const toolId = hash.replace('tool-', '');
        setCurrentTool(toolId);
        setCurrentPage(null);
        return;
      }

      // Check for page routes
      if (path === '/about' || path === '/about-us') {
        setCurrentPage('about');
        setCurrentTool(null);
      } else if (path === '/contact' || path === '/contact-us') {
        setCurrentPage('contact');
        setCurrentTool(null);
      } else if (path === '/privacy-policy' || path === '/privacy') {
        setCurrentPage('privacy');
        setCurrentTool(null);
      } else if (path === '/terms' || path === '/terms-conditions' || path === '/terms-and-conditions') {
        setCurrentPage('terms');
        setCurrentTool(null);
      } else if (hash && !hash.startsWith('tool-')) {
        // Legacy tool routing via hash
        setCurrentTool(hash);
        setCurrentPage(null);
      } else {
        setCurrentPage(null);
        setCurrentTool(null);
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);

    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, []);

  const handleToolSelect = (toolId) => {
    setCurrentTool(toolId);
    setCurrentPage(null);
    // Update URL hash for tool
    if (toolId) {
      window.history.pushState({}, '', `#${toolId}`);
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSelect = (page) => {
    if (!page) {
      setCurrentPage(null);
      setCurrentTool(null);
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    setCurrentTool(null);
    // Update URL for page
    const pagePaths = {
      about: '/about',
      contact: '/contact',
      privacy: '/privacy-policy',
      terms: '/terms',
    };
    window.history.pushState({}, '', pagePaths[page] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header 
        onToolSelect={handleToolSelect} 
        currentTool={currentTool} 
        onPageSelect={handlePageSelect}
      />
      
      {/* Header Banner Ad - Always show space */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <AdSense 
            slot={ADSENSE_CONFIG.SLOTS.HEADER_BANNER} 
            format="horizontal" 
            responsive={true}
            className="max-w-full"
          />
        </div>
      </div>

      <main>
        {currentPage === 'about' ? (
          <AboutUs />
        ) : currentPage === 'contact' ? (
          <ContactUs />
        ) : currentPage === 'privacy' ? (
          <PrivacyPolicy />
        ) : currentPage === 'terms' ? (
          <TermsConditions />
        ) : currentTool ? (
          <ToolRouter toolId={currentTool} />
        ) : (
          <LandingPage onToolSelect={handleToolSelect} />
        )}
      </main>

      {/* Footer Banner Ad - Always show space */}
      <div className="bg-gray-50 border-t border-gray-200 py-4 mt-12">
        <div className="container mx-auto px-4">
          <AdSense 
            slot={ADSENSE_CONFIG.SLOTS.FOOTER} 
            format="horizontal" 
            responsive={true}
            className="max-w-full"
          />
        </div>
      </div>

      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-8 border-t border-gray-700">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pixmerge
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your all-in-one PDF solution. Free, secure, and completely client-side processing.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• 100% Client-Side Processing</li>
                <li>• No File Uploads Required</li>
                <li>• Complete Privacy Protection</li>
                <li>• Free Forever</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Security</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Files Never Leave Your Device</li>
                <li>• No Server Storage</li>
                <li>• No Registration Required</li>
                <li>• Open Source</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Pixmerge ® - Your PDF Editor - All processing happens client-side for your privacy
              </p>
              <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
                <a 
                  href="/about" 
                  onClick={(e) => { e.preventDefault(); handlePageSelect('about'); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); handlePageSelect('contact'); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
                <a 
                  href="/privacy-policy" 
                  onClick={(e) => { e.preventDefault(); handlePageSelect('privacy'); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms" 
                  onClick={(e) => { e.preventDefault(); handlePageSelect('terms'); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
