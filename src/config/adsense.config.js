// AdSense Configuration
// Replace with your actual AdSense Publisher ID
// You can get this from: https://www.google.com/adsense

// Load publisher ID from environment or use default
// Note: In Vite, use import.meta.env instead of process.env
const PUBLISHER_ID = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-3067164624147107';

export const ADSENSE_CONFIG = {
  // Your AdSense Publisher ID (format: ca-pub-XXXXXXXXXX)
  // Replace this with your actual publisher ID or set VITE_ADSENSE_PUBLISHER_ID env variable
  PUBLISHER_ID: PUBLISHER_ID,
  
  // Enable/disable ads (useful for development)
  // Set to false in .env: VITE_ADSENSE_ENABLED=false
  ENABLED: import.meta.env.PROD && 
           import.meta.env.VITE_ADSENSE_ENABLED !== 'false' &&
           PUBLISHER_ID,
  
  // Ad slot IDs (you'll create these in AdSense dashboard)
  // Set these via environment variables or replace defaults
  SLOTS: {
    // Banner ad at the top (728x90 or responsive)
    HEADER_BANNER: import.meta.env.VITE_ADSENSE_SLOT_HEADER || '1234567890',
    
    // Sidebar ad (shown on tool pages, 300x600 or responsive)
    SIDEBAR: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '0987654321',
    
    // In-content ad (between sections, 728x90 or responsive)
    IN_CONTENT: import.meta.env.VITE_ADSENSE_SLOT_CONTENT || '1122334455',
    
    // Footer ad (728x90 or responsive)
    FOOTER: import.meta.env.VITE_ADSENSE_SLOT_FOOTER || '5566778899',
    
    // Landing page hero section (728x90 or responsive)
    LANDING_HERO: import.meta.env.VITE_ADSENSE_SLOT_LANDING || '2233445566',
  },
};

