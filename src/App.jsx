import { useState } from 'react';
import Header from './components/Header/Header';
import ToolRouter from './components/ToolRouter';
import LandingPage from './pages/LandingPage';
import AdSense from './components/AdSense/AdSense';
import { ADSENSE_CONFIG } from './config/adsense.config';
import './App.css';

function App() {
  const [currentTool, setCurrentTool] = useState(null);

  const handleToolSelect = (toolId) => {
    setCurrentTool(toolId);
    // Scroll to top when tool is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header onToolSelect={handleToolSelect} currentTool={currentTool} />
      
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
        {currentTool ? (
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
              <div className="flex gap-6 text-sm">
                <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
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
