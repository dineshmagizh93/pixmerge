# Google Search Console Setup Guide for pixmerge.com

This guide will help you add and verify your site in Google Search Console.

## Step 1: Add Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Select **"URL prefix"** (recommended for single-page apps)
4. Enter: `https://pixmerge.com`
5. Click **"Continue"**

## Step 2: Verify Ownership

Google will ask you to verify ownership. Choose one of these methods:

### Method 1: HTML Meta Tag (Recommended - Already Added)

1. Google will provide a verification code like: `abc123xyz789`
2. Open `index.html` in your project
3. Find this line:
   ```html
   <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE" />
   ```
4. Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` with the code Google provided
5. Save and deploy your site
6. Click **"Verify"** in Google Search Console

### Method 2: HTML File Upload

1. Download the HTML verification file from Google
2. Upload it to your `public/` folder
3. Deploy your site
4. Click **"Verify"** in Google Search Console

### Method 3: DNS Record

1. Add a TXT record to your DNS:
   - Name: `@` or `pixmerge.com`
   - Value: (provided by Google)
2. Wait for DNS propagation (can take up to 48 hours)
3. Click **"Verify"** in Google Search Console

## Step 3: Submit Sitemap

After verification:

1. Go to **Sitemaps** in the left sidebar
2. Enter: `sitemap.xml`
3. Click **"Submit"**

The sitemap is already created at `public/sitemap.xml` and will be accessible at:
- `https://pixmerge.com/sitemap.xml`

## Step 4: Verify robots.txt

1. Go to **Settings** → **robots.txt Tester**
2. Check that `https://pixmerge.com/robots.txt` is accessible
3. The robots.txt file is already created at `public/robots.txt`

## Step 5: Request Indexing (Optional)

1. Go to **URL Inspection** tool
2. Enter: `https://pixmerge.com`
3. Click **"Request Indexing"**
4. This helps Google discover your site faster

## Step 6: Monitor Performance

After a few days/weeks, check:

- **Performance**: See search queries, clicks, impressions
- **Coverage**: Check for indexing issues
- **Enhancements**: Monitor structured data
- **Mobile Usability**: Ensure mobile-friendly (already optimized!)

## SEO Features Already Implemented

✅ **Meta Tags**: Title, description, keywords
✅ **Open Graph**: Facebook/LinkedIn sharing
✅ **Twitter Cards**: Twitter sharing
✅ **Structured Data**: JSON-LD schema for better search results
✅ **Sitemap**: XML sitemap with all tool pages
✅ **Robots.txt**: Proper crawl instructions
✅ **Canonical URLs**: Prevents duplicate content
✅ **Mobile Responsive**: Mobile-friendly design

## Important Notes

1. **Update Lastmod Dates**: Update dates in `sitemap.xml` when you make changes
2. **Add OG Image**: Create and upload `og-image.png` (1200×630px) to `public/` folder
3. **Add Logo**: Create and upload `logo.png` to `public/` folder
4. **Monitor Regularly**: Check Search Console weekly for issues
5. **Update Sitemap**: Add new pages/tools to sitemap.xml as you add them

## Troubleshooting

### "Property not verified"
- Double-check the verification code in `index.html`
- Ensure the site is deployed with the verification code
- Try a different verification method

### "Sitemap could not be read"
- Verify `https://pixmerge.com/sitemap.xml` is accessible
- Check XML syntax is valid
- Ensure sitemap is in `public/` folder

### "URL not indexed"
- This is normal for new sites
- Can take days/weeks for Google to index
- Use "Request Indexing" to speed up
- Ensure site is accessible and not blocked by robots.txt

## Next Steps After Verification

1. ✅ Submit sitemap
2. ✅ Monitor indexing status
3. ✅ Check for crawl errors
4. ✅ Optimize based on search performance data
5. ✅ Add more content/pages to improve SEO

Good luck with your SEO! 🚀

