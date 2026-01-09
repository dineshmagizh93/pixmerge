import { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG } from '../../config/adsense.config';

/**
 * AdSense Component
 * 
 * Usage:
 * <AdSense slot={ADSENSE_CONFIG.SLOTS.HEADER_BANNER} format="horizontal" />
 * <AdSense slot={ADSENSE_CONFIG.SLOTS.SIDEBAR} format="vertical" responsive={true} />
 * 
 * @param {string} slot - AdSense slot ID
 * @param {string} format - Ad format ('auto', 'horizontal', 'vertical', 'rectangle')
 * @param {boolean} responsive - Enable responsive ads
 * @param {string} layout - Layout style ('in-article', 'in-feed', etc.)
 * @param {number} height - Fixed height (optional, for non-responsive)
 * @param {number} width - Fixed width (optional, for non-responsive)
 */
const AdSense = ({ 
  slot, 
  format = 'auto', 
  responsive = true,
  layout = null,
  height = null,
  width = null,
  className = '',
}) => {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Only load ads in production and if enabled
    if (!ADSENSE_CONFIG.ENABLED || !slot || ADSENSE_CONFIG.PUBLISHER_ID.includes('XXXXXXXXXX')) {
      return;
    }

    // Prevent duplicate ad pushes
    if (pushed.current || !adRef.current) return;

    try {
      // Initialize adsbygoogle if not already done
      if (typeof window !== 'undefined') {
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Push ad initialization
        const initAd = () => {
          if (adRef.current && !pushed.current && window.adsbygoogle) {
            pushed.current = true;
            window.adsbygoogle.push({});
          }
        };

        // Try immediately if adsbygoogle is available
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          initAd();
        } else {
          // Wait for script to load (check every 100ms for up to 5 seconds)
          let attempts = 0;
          const maxAttempts = 50;
          
          const checkInterval = setInterval(() => {
            attempts++;
            if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
              clearInterval(checkInterval);
              initAd();
            } else if (attempts >= maxAttempts) {
              clearInterval(checkInterval);
              console.warn('AdSense script failed to load');
            }
          }, 100);
        }
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [slot]);

  // Always show placeholder if not configured or in development
  // This helps visualize ad placement
  const isDevelopment = import.meta.env.DEV;
  const isConfigured = ADSENSE_CONFIG.PUBLISHER_ID && !ADSENSE_CONFIG.PUBLISHER_ID.includes('XXXXXXXXXX');
  
  // Show placeholder if not configured, in development, or disabled
  if (!ADSENSE_CONFIG.ENABLED || !slot || !isConfigured || isDevelopment) {
    // Determine ad dimensions based on format
    const getAdDimensions = () => {
      if (format === 'vertical') return { minHeight: '600px', width: '300px' };
      if (format === 'horizontal') return { minHeight: '90px', width: '100%' };
      return { minHeight: '250px', width: '100%' };
    };
    
    const dimensions = getAdDimensions();
    
    return (
      <div 
        className={`bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg ${className}`}
        style={{ 
          minHeight: dimensions.minHeight,
          width: dimensions.width,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div className="text-center">
          <div className="text-4xl mb-3">📢</div>
          <p className="text-sm font-bold text-blue-700 mb-2">AdSense Ad Space</p>
          <p className="text-xs text-gray-600 mb-1">Slot ID: <span className="font-mono">{slot}</span></p>
          <p className="text-xs text-gray-500">
            {format === 'vertical' ? '300×600' : format === 'horizontal' ? '728×90' : 'Responsive'}
          </p>
          {isDevelopment && (
            <p className="text-xs text-gray-400 mt-2">Development Mode - Placeholder</p>
          )}
          {!isConfigured && (
            <p className="text-xs text-orange-600 mt-2 font-semibold">
              Configure Publisher ID to show real ads
            </p>
          )}
        </div>
      </div>
    );
  }

  // Build style object
  const adStyle = {
    display: 'block',
    ...(height && width ? { width: `${width}px`, height: `${height}px` } : {}),
  };

  // Build data attributes
  const dataAttrs = {
    className: 'adsbygoogle',
    style: adStyle,
    'data-ad-client': ADSENSE_CONFIG.PUBLISHER_ID,
    'data-ad-slot': slot,
  };

  if (layout) {
    dataAttrs['data-ad-layout'] = layout;
  }

  if (format === 'auto') {
    dataAttrs['data-full-width-responsive'] = responsive ? 'true' : 'false';
  } else {
    dataAttrs['data-ad-format'] = format;
    if (responsive) {
      dataAttrs['data-full-width-responsive'] = 'true';
    }
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins ref={adRef} {...dataAttrs} />
    </div>
  );
};

export default AdSense;

