# EmailJS Setup Guide for Contact Form

The contact form is now integrated with EmailJS to send emails to **dineshmagizh93@gmail.com** without exposing the email address on the website.

## Quick Setup Steps

### 1. Sign Up for EmailJS (Free)

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

### 2. Add Email Service

1. Go to **Email Services** in EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (dineshmagizh93@gmail.com)
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: {{subject}} - Contact Form from Pixmerge

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This email was sent from the Pixmerge contact form.
```

4. Set **To Email** to: `dineshmagizh93@gmail.com`
5. Set **From Name** to: `{{from_name}}`
6. Set **From Email** to: `{{from_email}}`
7. Copy the **Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

### 5. Configure Environment Variables

Create or update your `.env` file in the project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

Replace the values with your actual IDs from EmailJS.

### 6. Test the Form

1. Start your development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit the form
4. Check your email (dineshmagizh93@gmail.com) for the message

## How It Works

- ✅ **Email Hidden**: The recipient email (dineshmagizh93@gmail.com) is stored in `src/config/email.config.js` and never displayed to users
- ✅ **Secure**: EmailJS handles email sending server-side
- ✅ **Free Tier**: 200 emails/month free, then $15/month for 1,000 emails
- ✅ **No Backend Required**: Everything works from the frontend

## Template Variables

The form sends these variables to EmailJS:
- `from_name`: User's name
- `from_email`: User's email address
- `subject`: Message subject (or "Contact Form Submission" if empty)
- `message`: User's message
- `to_email`: Automatically set to dineshmagizh93@gmail.com (hidden)

## Troubleshooting

### Emails Not Sending?

1. **Check Console**: Open browser console for error messages
2. **Verify IDs**: Double-check Service ID, Template ID, and Public Key
3. **Check EmailJS Dashboard**: Look for errors in EmailJS dashboard
4. **Test Template**: Use EmailJS's "Test" button in template editor

### Rate Limits

- Free tier: 200 emails/month
- If you exceed, upgrade to paid plan or wait for next month

### Security Note

The Public Key is safe to expose in frontend code. EmailJS uses it to verify requests but doesn't expose your email address or allow unauthorized access.

## Alternative: Use Your Own Backend

If you prefer not to use EmailJS, you can:
1. Create a backend API endpoint
2. Update `handleSubmit` in `ContactUs.jsx` to call your API
3. Send emails from your backend using Nodemailer, SendGrid, etc.

The current setup with EmailJS is the easiest and requires no backend infrastructure.

