// Script to generate sitemap.xml from tools list
// Run with: node scripts/generate-sitemap.js

import { TOOLS } from '../src/utils/constants.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://pixmerge.com';
const currentDate = new Date().toISOString().split('T')[0];

// Priority mapping based on tool popularity
const getPriority = (toolId) => {
  const highPriority = ['merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-jpg', 'jpg-to-pdf'];
  const mediumPriority = ['rotate-pdf', 'word-to-pdf', 'pdf-to-word', 'html-to-pdf', 'pdf-to-html'];
  
  if (highPriority.includes(toolId)) return '0.9';
  if (mediumPriority.includes(toolId)) return '0.8';
  return '0.7';
};

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- PDF Tools Pages -->`;

// Add all tools to sitemap
TOOLS.forEach(tool => {
  sitemap += `
  <url>
    <loc>${baseUrl}/#${tool.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${getPriority(tool.id)}</priority>
  </url>`;
});

sitemap += `
</urlset>`;

// Write to public folder
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📄 Location: ${sitemapPath}`);
console.log(`🔗 URL: ${baseUrl}/sitemap.xml`);
console.log(`📊 Total URLs: ${TOOLS.length + 1}`);

