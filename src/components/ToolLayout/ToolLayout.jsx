import AdSense from '../AdSense/AdSense';
import { ADSENSE_CONFIG } from '../../config/adsense.config';

/**
 * Layout wrapper for tool pages with sidebar ad
 * Wraps tool components that already have their own containers
 */
const ToolLayout = ({ children }) => {
  return (
    <div className="w-full">
      <div className="flex gap-8 justify-center">
        {/* Main Content - tools handle their own container */}
        <div className="flex-1 max-w-6xl">
          {children}
        </div>

        {/* Sidebar with AdSense - Always show space on large screens */}
        <aside className="hidden xl:block w-72 flex-shrink-0 mt-12">
          <div className="sticky top-24">
            <div className="bg-white rounded-lg shadow-sm p-2 mb-2">
              <p className="text-xs text-gray-500 text-center font-semibold">Advertisement</p>
            </div>
            <AdSense 
              slot={ADSENSE_CONFIG.SLOTS.SIDEBAR} 
              format="vertical" 
              responsive={true}
              className="w-full"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ToolLayout;

