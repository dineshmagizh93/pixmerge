import AdSense from '../components/AdSense/AdSense';
import { ADSENSE_CONFIG } from '../config/adsense.config';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Pixmerge
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for all PDF editing needs. Free, secure, and completely private.
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

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              At Pixmerge, we believe that PDF editing should be accessible, secure, and free for everyone. 
              Our mission is to provide powerful PDF tools that work entirely in your browser, ensuring 
              your documents never leave your device.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We understand the importance of privacy in today's digital world. That's why we've built 
              Pixmerge with a core principle: <strong>your files, your privacy, your control.</strong>
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Privacy</h3>
              <p className="text-gray-600">
                All PDF processing happens in your browser. Your files are never uploaded to any server, 
                ensuring complete privacy and security.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Completely Free</h3>
              <p className="text-gray-600">
                Access all 33 PDF tools without any cost, registration, or hidden fees. 
                Use our tools as much as you need, whenever you need them.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Efficient</h3>
              <p className="text-gray-600">
                Process your PDFs instantly without waiting for uploads or downloads. 
                Everything happens locally in your browser.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Tools</h3>
              <p className="text-gray-600">
                From merging and splitting to converting and editing, we offer 33 professional-grade 
                PDF tools to handle any task.
              </p>
            </div>
          </div>
        </section>

        {/* Our Tools */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Tools</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Pixmerge offers a comprehensive suite of 33 PDF tools organized into six main categories:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Organize PDF:</strong> Merge, split, remove pages, extract pages, and organize your PDFs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Optimize PDF:</strong> Compress, repair, OCR, and extract images or text from PDFs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Convert to PDF:</strong> Convert images, Word, Excel, PowerPoint, and HTML to PDF</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Convert from PDF:</strong> Convert PDFs to images, Word, Excel, PowerPoint, HTML, and PDF/A</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>Edit PDF:</strong> Rotate, add watermarks, page numbers, crop, edit, grayscale, and add margins</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">•</span>
                <span><strong>PDF Security:</strong> Protect, unlock, sign, redact, and compare PDFs</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Technology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Pixmerge is built with modern web technologies to ensure the best user experience:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• React 19 - Modern UI framework</li>
                  <li>• Tailwind CSS - Beautiful, responsive design</li>
                  <li>• Vite - Fast build tool</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">PDF Processing</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• pdf-lib - PDF manipulation</li>
                  <li>• PDF.js - PDF rendering</li>
                  <li>• jsPDF - PDF generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Pixmerge?</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-gray-900">No Registration Required:</strong> Start using our tools immediately 
                  without creating an account or providing personal information.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-gray-900">No File Size Limits:</strong> Process PDFs of any size, 
                  limited only by your browser's memory capacity.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-gray-900">Works Offline:</strong> Once loaded, most tools work without 
                  an internet connection.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-gray-900">Cross-Platform:</strong> Works on Windows, Mac, Linux, 
                  and mobile devices through any modern browser.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <strong className="text-gray-900">Regular Updates:</strong> We continuously add new features 
                  and improve existing tools based on user feedback.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              We're here to help! Visit our <a href="/contact" className="text-blue-600 hover:underline font-semibold">Contact Us</a> page 
              to get in touch with our team.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

