import AdSense from '../components/AdSense/AdSense';
import { ADSENSE_CONFIG } from '../config/adsense.config';

const TermsConditions = () => {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Terms & Conditions
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Pixmerge ("the Service"), you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              These Terms & Conditions ("Terms") govern your access to and use of the Pixmerge website located at 
              <strong> pixmerge.com</strong> and all related services provided by Pixmerge.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pixmerge is a web-based platform that provides PDF manipulation tools. Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Merging, splitting, and organizing PDF files</li>
              <li>Compressing and optimizing PDF files</li>
              <li>Converting PDFs to and from various formats</li>
              <li>Editing PDF documents (rotating, cropping, adding watermarks, etc.)</li>
              <li>PDF security features (protecting, unlocking, signing, etc.)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              All processing is performed client-side in your web browser. No files are uploaded to our servers.
            </p>
          </section>

          {/* Use of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Service</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Permitted Use</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may use our Service for lawful purposes only. You agree to use the Service:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>In compliance with all applicable laws and regulations</li>
              <li>For personal or commercial purposes</li>
              <li>In a manner that does not infringe upon the rights of others</li>
              <li>Without attempting to reverse engineer or decompile the Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Prohibited Use</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree NOT to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Transmit malicious code, viruses, or harmful software</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems to access the Service (scraping, bots, etc.)</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Process illegal or copyrighted content without authorization</li>
            </ul>
          </section>

          {/* Free Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Free Service</h2>
            <p className="text-gray-700 leading-relaxed">
              Pixmerge is provided free of charge. We reserve the right to display advertisements on our website 
              as a means of supporting the free service. By using our Service, you acknowledge that you may see 
              advertisements from third-party providers, including Google AdSense.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.1 Our Rights</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service, including its original content, features, and functionality, is owned by Pixmerge and 
              is protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Your Content</h3>
            <p className="text-gray-700 leading-relaxed">
              You retain all rights to any PDF files or content you process using our Service. We do not claim 
              ownership of your files. Since all processing happens client-side, your files never leave your device, 
              and we have no access to them.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.1 Service Availability</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service is provided "as is" and "as available" without warranties of any kind, either express or 
              implied. We do not guarantee that the Service will be uninterrupted, error-free, or completely secure.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 No Warranties</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We disclaim all warranties, express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or completeness of results</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.3 Browser Compatibility</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service requires a modern web browser with JavaScript enabled. We are not responsible for 
              compatibility issues with outdated browsers or disabled JavaScript.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.4 File Processing</h3>
            <p className="text-gray-700 leading-relaxed">
              While we strive to provide accurate PDF processing, we cannot guarantee that all PDF files will 
              process correctly. Some files may have compatibility issues, corruption, or other problems that 
              prevent successful processing.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, Pixmerge shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
              directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li>Your use or inability to use the Service</li>
              <li>Any errors or omissions in the Service</li>
              <li>Any unauthorized access to or use of your device</li>
              <li>Any bugs, viruses, or other harmful code</li>
              <li>Any third-party conduct or content</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our total liability for any claims arising from or related to the Service shall not exceed the amount 
              you paid to us (which is $0, as the Service is free).
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Pixmerge, its officers, directors, employees, 
              and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, 
              and expenses (including attorney's fees) arising from:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you process using the Service</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service may contain links to third-party websites or services, including Google AdSense for 
              advertising. We are not responsible for the content, privacy policies, or practices of any 
              third-party services. Your interactions with third-party services are solely between you and the 
              third party.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Service</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any 
              time, with or without notice. We shall not be liable to you or any third party for any modification, 
              suspension, or discontinuation of the Service.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes 
              by updating the "Last Updated" date at the top of this page. Your continued use of the Service after 
              any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your access to the Service immediately, without prior notice, for any 
              reason, including if you breach these Terms. Upon termination, your right to use the Service will 
              cease immediately.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in 
              which Pixmerge operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
              limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain 
              in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
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

export default TermsConditions;

