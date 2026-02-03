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

  // Handle routing based on URL path (path-based routing for SEO)
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      // Check for tool routes (path-based: /merge-pdf, /split-pdf, etc.)
      // List of all valid tool IDs
      const validToolIds = [
        'merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-jpg', 'jpg-to-pdf',
        'word-to-pdf', 'pdf-to-word', 'html-to-pdf', 'pdf-to-html', 'excel-to-pdf',
        'pdf-to-excel', 'powerpoint-to-pdf', 'pdf-to-powerpoint', 'pdf-to-pdfa',
        'rotate-pdf', 'add-watermark', 'add-page-numbers', 'crop-pdf', 'organize-pdf',
        'remove-pages', 'extract-pages', 'extract-images', 'extract-text', 'grayscale-pdf',
        'add-margins', 'repair-pdf', 'ocr-pdf', 'edit-pdf', 'unlock-pdf', 'protect-pdf',
        'sign-pdf', 'redact-pdf', 'compare-pdf'
      ];

      // Check if path is a tool route (e.g., /merge-pdf)
      const pathToolId = path.slice(1); // Remove leading '/'
      if (pathToolId && validToolIds.includes(pathToolId)) {
        setCurrentTool(pathToolId);
        setCurrentPage(null);
        return;
      }

      // Check for page routes (canonical paths only - no redirects)
      if (path === '/about') {
        setCurrentPage('about');
        setCurrentTool(null);
      } else if (path === '/contact') {
        setCurrentPage('contact');
        setCurrentTool(null);
      } else if (path === '/privacy-policy') {
        setCurrentPage('privacy');
        setCurrentTool(null);
      } else if (path === '/terms') {
        setCurrentPage('terms');
        setCurrentTool(null);
      } else if (hash && validToolIds.includes(hash)) {
        // Legacy hash-based routing - redirect to path-based
        window.history.replaceState({}, '', `/${hash}`);
        setCurrentTool(hash);
        setCurrentPage(null);
      } else {
        setCurrentPage(null);
        setCurrentTool(null);
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);

    return () => {
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const handleToolSelect = (toolId) => {
    setCurrentTool(toolId);
    setCurrentPage(null);
    // Update URL path for tool (path-based for SEO)
    if (toolId) {
      window.history.pushState({}, '', `/${toolId}`);
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
