# Google AdSense Setup Guide for Pixmerge

This guide will help you integrate Google AdSense into your Pixmerge PDF tools application.

## Prerequisites

1. **Google AdSense Account**: Sign up at https://www.google.com/adsense
2. **Approved Website**: Your domain must be approved by AdSense
3. **Publisher ID**: You'll get this from your AdSense dashboard (format: `ca-pub-XXXXXXXXXX`)

## Setup Steps

### Step 1: Get Your AdSense Publisher ID

1. Log in to your [Google AdSense account](https://www.google.com/adsense)
2. Go to **Account** → **Account information**
3. Copy your **Publisher ID** (starts with `ca-pub-`)

### Step 2: Create Ad Units in AdSense

You need to create 5 ad units for optimal placement:

1. **Header Banner Ad** (728x90 or responsive)
   - Name: "Header Banner"
   - Format: Display ads → Responsive
   - Copy the **Ad unit ID** (numeric, e.g., `1234567890`)

2. **Sidebar Ad** (300x600 or responsive)
   - Name: "Sidebar"
   - Format: Display ads → Responsive
   - Copy the **Ad unit ID**

3. **In-Content Ad** (728x90 or responsive)
   - Name: "In-Content"
   - Format: Display ads → Responsive
   - Copy the **Ad unit ID**

4. **Footer Ad** (728x90 or responsive)
   - Name: "Footer"
   - Format: Display ads → Responsive
   - Copy the **Ad unit ID**

5. **Landing Page Hero Ad** (728x90 or responsive)
   - Name: "Landing Hero"
   - Format: Display ads → Responsive
   - Copy the **Ad unit ID**

### Step 3: Configure Environment Variables

Create a `.env` file in your project root (or `.env.local` for local development):

```env
# Your AdSense Publisher ID
VITE_ADSENSE_PUBLISHER_ID=ca-pub-YOUR_PUBLISHER_ID_HERE

# Enable AdSense (set to 'false' to disable)
VITE_ADSENSE_ENABLED=true

# Ad Slot IDs (replace with your actual slot IDs from Step 2)
VITE_ADSENSE_SLOT_HEADER=YOUR_HEADER_SLOT_ID
VITE_ADSENSE_SLOT_SIDEBAR=YOUR_SIDEBAR_SLOT_ID
VITE_ADSENSE_SLOT_CONTENT=YOUR_CONTENT_SLOT_ID
VITE_ADSENSE_SLOT_FOOTER=YOUR_FOOTER_SLOT_ID
VITE_ADSENSE_SLOT_LANDING=YOUR_LANDING_SLOT_ID
```

### Step 4: Update index.html

Edit `index.html` and replace `ca-pub-XXXXXXXXXX` with your actual Publisher ID:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID_HERE"
 crossorigin="anonymous"></script>
```

### Step 5: Alternative - Direct Configuration

If you prefer to configure directly in code (not recommended for production):

Edit `src/config/adsense.config.js`:

```javascript
export const ADSENSE_CONFIG = {
  PUBLISHER_ID: 'ca-pub-YOUR_PUBLISHER_ID_HERE',
  ENABLED: true, // Set to false to disable ads
  SLOTS: {
    HEADER_BANNER: 'YOUR_HEADER_SLOT_ID',
    SIDEBAR: 'YOUR_SIDEBAR_SLOT_ID',
    IN_CONTENT: 'YOUR_CONTENT_SLOT_ID',
    FOOTER: 'YOUR_FOOTER_SLOT_ID',
    LANDING_HERO: 'YOUR_LANDING_SLOT_ID',
  },
};
```

### Step 6: Test Your Implementation

1. **Development Mode**: Ads will show as placeholders with slot information
2. **Production Build**: Run `npm run build` and test with `npm run preview`
3. **Verify in AdSense**: Check your AdSense dashboard → **Ads** → **Ad units** to see impressions

## Ad Placement Strategy

The following ad placements are implemented for optimal revenue:

1. **Header Banner** - Above the main content (728x90 responsive)
2. **Sidebar** - Right side on tool pages (300x600, desktop only)
3. **In-Content** - Between tool categories on landing page (728x90 responsive)
4. **Footer** - Above footer section (728x90 responsive)
5. **Landing Hero** - Below hero section on homepage (728x90 responsive)

## AdSense Policy Compliance

### Required Pages

1. **Privacy Policy**: Create `/privacy-policy` page
   - Include cookie usage
   - Mention AdSense and Google services
   - Link from footer

2. **Cookie Policy**: Create `/cookie-policy` page
   - Explain cookie usage
   - Mention third-party cookies (AdSense)
   - Link from footer

3. **Terms of Service**: Create `/terms` page
   - User agreements
   - Service limitations
   - Link from footer

### Content Requirements

✅ **DO:**
- Original, valuable content (33 tools provide this!)
- User-friendly design (you have this!)
- Clear navigation
- Privacy-focused messaging (100% client-side is a plus!)

❌ **DON'T:**
- Click on your own ads
- Ask users to click ads
- Place ads too close to clickable elements
- Deceive users with fake content

### Best Practices

1. **User Experience First**: Ads shouldn't interfere with tool functionality
2. **Mobile Responsive**: All ads are responsive and mobile-friendly
3. **Loading Performance**: Ads load asynchronously and don't block content
4. **Placement**: Ads are clearly marked and separated from content

## Troubleshooting

### Ads Not Showing?

1. **Check Environment Variables**: Ensure `.env` file is loaded
2. **Verify Publisher ID**: Must start with `ca-pub-`
3. **Check Slot IDs**: Must be numeric (no dashes or letters)
4. **Browser Console**: Check for AdSense errors
5. **AdSense Dashboard**: Verify ad units are active

### Development Mode

In development, ads show as placeholders. To test real ads:
```bash
npm run build
npm run preview
```

### Common Errors

- **"Invalid Publisher ID"**: Check format (ca-pub-XXXXXXXXXX)
- **"Invalid Slot ID"**: Must be numeric only
- **"AdSense script not loaded"**: Check network tab, verify script URL

## Revenue Optimization Tips

1. **High-Traffic Tools**: Focus on popular tools (Merge, Split, Compress)
2. **Above the Fold**: Header banner is always visible
3. **Content Density**: Landing page has multiple ad placements
4. **User Engagement**: Keep users on site longer = more ad views

## Support

- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Ad Placement Policies](https://support.google.com/adsense/answer/1346295)

## Notes

- ⚠️ **Never click your own ads** - This will get you banned
- ✅ Ads automatically adapt to screen size (responsive)
- ✅ Ads don't interfere with PDF processing (async loading)
- ✅ Placeholder ads shown in development mode for testing layout

Good luck with your AdSense integration! 🚀

