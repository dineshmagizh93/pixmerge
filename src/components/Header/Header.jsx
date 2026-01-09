import { useState, useEffect, useRef } from 'react';
import { TOOLS, NAVIGATION_ITEMS } from '../../utils/constants';

const Header = ({ onToolSelect, currentTool, onPageSelect }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleNavClick = (item) => {
    if (item.dropdown) {
      setActiveDropdown(activeDropdown === item.id ? null : item.id);
    } else if (item.toolId) {
      onToolSelect(item.toolId);
      setActiveDropdown(null);
    }
  };

  const handleToolSelect = (toolId) => {
    onToolSelect(toolId);
    setActiveDropdown(null);
  };

  const getToolById = (toolId) => TOOLS.find((t) => t.id === toolId);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6">
        <div className="flex items-center h-24 md:h-28">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => {
                onToolSelect(null);
                if (onPageSelect) onPageSelect(null);
                window.history.pushState({}, '', '/');
              }}
              className="transition-all duration-300 flex items-center hover:opacity-80 focus:outline-none"
            >
              <img 
                src="/pixmerge.png" 
                alt="Pixmerge Logo" 
                className="h-24 md:h-28 w-auto object-contain"
                style={{ minHeight: '80px', maxHeight: '112px' }}
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  e.target.style.display = 'none';
                }}
              />
            </button>
          </div>

          {/* Navigation Items */}
          <div ref={dropdownRef} className="hidden md:flex items-center space-x-2 relative ml-24">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`px-5 py-2.5 text-sm font-bold uppercase transition-all duration-200 rounded-lg ${
                    currentTool === item.toolId
                      ? 'text-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <span className="ml-2 text-xs">
                      {activeDropdown === item.id ? '▲' : '▼'}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.id && (
                  <div 
                    className={`absolute ${item.id === 'all-pdf-tools' ? 'right-0' : 'left-0'} top-full mt-2 w-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-120px)] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-y-auto overscroll-contain scroll-smooth`}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {item.dropdown.map((section, idx) => (
                        <div key={idx} className="min-w-0">
                          <h3 className="text-xs font-extrabold text-gray-400 uppercase mb-3 tracking-wider sticky top-0 bg-white py-2 z-10 border-b border-gray-100 -mx-6 px-6">
                            {section.category}
                          </h3>
                          <ul className="space-y-1">
                            {section.tools.map((toolId) => {
                              const tool = getToolById(toolId);
                              return tool ? (
                                <li key={toolId}>
                                  <button
                                    onClick={() => handleToolSelect(toolId)}
                                    className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-lg transition-all duration-200 flex items-center space-x-2 group"
                                  >
                                    <span className="text-lg group-hover:scale-110 transition-transform flex-shrink-0">{tool.icon}</span>
                                    <span className="font-medium truncate">{tool.name}</span>
                                  </button>
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
        <div className="px-4 py-3">
          <select
            value={currentTool || ''}
            onChange={(e) => onToolSelect(e.target.value || null)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm hover:border-gray-300"
          >
            <option value="">Select a tool</option>
            {TOOLS.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;

