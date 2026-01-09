import { TOOLS, TOOL_CATEGORIES } from '../utils/constants';
import AdSense from '../components/AdSense/AdSense';
import { ADSENSE_CONFIG } from '../config/adsense.config';

const LandingPage = ({ onToolSelect }) => {
  const toolsByCategory = {
    [TOOL_CATEGORIES.ORGANIZE]: TOOLS.filter((t) => t.category === TOOL_CATEGORIES.ORGANIZE),
    [TOOL_CATEGORIES.OPTIMIZE]: TOOLS.filter((t) => t.category === TOOL_CATEGORIES.OPTIMIZE),
    [TOOL_CATEGORIES.CONVERT_TO_PDF]: TOOLS.filter((t) => t.category === TOOL_CATEGORIES.CONVERT_TO_PDF),
    [TOOL_CATEGORIES.CONVERT_FROM_PDF]: TOOLS.filter((t) => t.category === TOOL_CATEGORIES.CONVERT_FROM_PDF),
    [TOOL_CATEGORIES.EDIT]: TOOLS.filter((t) => t.category === TOOL_CATEGORIES.EDIT),
    [TOOL_CATEGORIES.SECURITY]: TOOLS.filter((t) => t.category === TOOL_CATEGORIES.SECURITY),
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              ✨ 100% Free & Secure
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              All the tools you need to work with PDFs
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Free, easy to use online PDF tools - 100% client-side processing. 
              <span className="block mt-2 text-lg text-gray-500">Your files never leave your device. Privacy guaranteed.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-green-500">✓</span>
                <span>No Upload Required</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-green-500">✓</span>
                <span>Completely Free</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-green-500">✓</span>
                <span>No Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Ad - Always show space */}
      <div className="container mx-auto px-6 py-8">
        <AdSense 
          slot={ADSENSE_CONFIG.SLOTS.LANDING_HERO} 
          format="horizontal" 
          responsive={true}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Tools Section */}
      <div className="container mx-auto px-6 py-16">
        {Object.entries(toolsByCategory).map(([category, tools], categoryIndex) => (
          <div key={category} className="mb-16">
            {/* In-Content Ad between categories - Always show space */}
            {categoryIndex > 0 && categoryIndex % 2 === 0 && (
              <div className="mb-12 py-6">
                <AdSense 
                  slot={ADSENSE_CONFIG.SLOTS.IN_CONTENT} 
                  format="horizontal" 
                  responsive={true}
                  className="max-w-4xl mx-auto"
                />
              </div>
            )}

            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {category}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent ml-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onToolSelect(tool.id)}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 text-left overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-blue-50/50 transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 flex items-center text-blue-600 font-medium text-sm">
                      Get Started <span className="ml-1">→</span>
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-bl-full transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

