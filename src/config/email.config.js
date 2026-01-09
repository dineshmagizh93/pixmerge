// Email Configuration
// This file contains the recipient email address
// The email is not exposed in the frontend code

export const EMAIL_CONFIG = {
  // Recipient email address (hidden from frontend)
  // Emails from contact form will be sent to this address
  RECIPIENT_EMAIL: 'dineshmagizh93@gmail.com',
  
  // EmailJS Service ID (you'll get this from EmailJS dashboard)
  // Sign up at https://www.emailjs.com (free tier available)
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mhc03um',
  
  // EmailJS Template ID
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_1nm07ax',
  
  // EmailJS Public Key
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '1oekKC3zqJL7BWTGz',
};

