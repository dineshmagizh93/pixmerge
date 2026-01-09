import AdSense from '../components/AdSense/AdSense';
import { ADSENSE_CONFIG } from '../config/adsense.config';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* In-Content Ad */}
        {ADSENSE_CONFIG.ENABLED && (
          <div className="mb-12 py-6">
            <AdSense 
              slot={ADSENSE_CONFIG.SLOTS.IN_CONTENT} 
              format="horizontal" 
              responsive={true}
              className="max-w-full"
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Pixmerge ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website <strong>pixmerge.com</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              By using our website, you consent to the data practices described in this policy. If you do not agree 
              with the practices described in this policy, please do not use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Contact information (name, email address) when you use our contact form</li>
              <li>Feedback, comments, or questions you submit</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device and usage:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns</li>
              <li><strong>IP Address:</strong> Your Internet Protocol address (may be anonymized)</li>
              <li><strong>Cookies and Tracking Technologies:</strong> See our Cookie Policy section below</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 PDF Files</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-green-600">IMPORTANT:</strong> All PDF processing happens 100% client-side in your browser. 
              We do <strong>NOT</strong> collect, store, upload, or transmit your PDF files to any server. Your files never leave 
              your device, ensuring complete privacy and security.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>To provide, maintain, and improve our services</li>
              <li>To respond to your inquiries, comments, or questions</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>
          </section>

          {/* Google AdSense */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services and Advertising</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.1 Google AdSense</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website uses Google AdSense, a service provided by Google LLC ("Google"), to display advertisements. 
              Google AdSense uses cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Display personalized advertisements based on your interests</li>
              <li>Measure the effectiveness of advertisements</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Google may collect and use information about your visits to this and other websites in accordance with 
              Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a> and 
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Advertising Policy</a>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can opt out of personalized advertising by visiting 
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Google's Ad Settings</a> or 
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Your Online Choices</a>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Other Third-Party Services</h3>
            <p className="text-gray-700 leading-relaxed">
              We may use other third-party services for analytics, hosting, and website functionality. These services 
              may collect information about your use of our website in accordance with their own privacy policies.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. 
              Cookies are small data files stored on your device.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Types of cookies we use:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense to deliver relevant advertisements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality 
              of our website. For more information, visit our <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. However, 
              no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Important:</strong> Since all PDF processing happens client-side in your browser, your PDF files 
              are never transmitted to our servers, providing an additional layer of security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of certain data collection and processing</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us through our <a href="/contact" className="text-blue-600 hover:underline">Contact Us</a> page.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this 
              Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700">
                <strong>Website:</strong> <a href="https://pixmerge.com" className="text-blue-600 hover:underline">www.pixmerge.com</a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Contact:</strong> Please use our <a href="/contact" className="text-blue-600 hover:underline font-semibold">Contact Us</a> page to send us a message.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

