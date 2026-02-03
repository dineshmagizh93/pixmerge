import AdSense from '../AdSense/AdSense';
import { ADSENSE_CONFIG } from '../../config/adsense.config';
import SEO from '../SEO/SEO';
import { TOOLS } from '../../utils/constants';

/**
 * Layout wrapper for tool pages with sidebar ad and SEO
 * Wraps tool components that already have their own containers
 */
const ToolLayout = ({ children, toolId }) => {
  // Get tool info for SEO
  const tool = TOOLS.find(t => t.id === toolId);
  const toolName = tool ? tool.name : 'PDF Tool';
  const toolDescription = tool ? tool.description : 'Free online PDF tool';
  
  // Generate SEO-friendly title and description
  const seoTitle = `${toolName} - Free Online Tool | Pixmerge`;
  const seoDescription = `${toolDescription}. 100% free, secure, and client-side processing. No uploads required.`;
  const canonicalUrl = `https://pixmerge.com/${toolId}`;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        keywords={`${toolName.toLowerCase()}, PDF tool, free PDF, online PDF, ${toolName.toLowerCase()} online, PDF editor`}
      />
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
    </>
  );
};

export default ToolLayout;

