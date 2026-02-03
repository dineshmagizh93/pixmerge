import { useEffect } from 'react';

/**
 * SEO Component - Dynamically updates meta tags and canonical URL
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Canonical URL (full URL)
 * @param {string} props.keywords - Meta keywords (optional)
 * @param {string} props.ogImage - Open Graph image URL (optional)
 */
const SEO = ({ 
  title, 
  description, 
  canonical, 
  keywords = 'PDF tools, merge PDF, split PDF, compress PDF, PDF converter, free PDF tools, online PDF editor',
  ogImage = 'https://pixmerge.com/pixmerge.png'
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, 'property');
      updateMetaTag('twitter:description', description, 'property');
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, 'property');
      updateMetaTag('twitter:title', title, 'property');
    }

    if (canonical) {
      updateMetaTag('og:url', canonical, 'property');
      updateMetaTag('twitter:url', canonical, 'property');
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
      updateMetaTag('twitter:image', ogImage, 'property');
    }

  }, [title, description, canonical, keywords, ogImage]);

  return null; // This component doesn't render anything
};

export default SEO;
