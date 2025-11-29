export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-blue-100">Last updated: November 28, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-700">
              Cookies help us understand how you use our Service, remember your preferences, and improve your overall experience.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Essential Cookies (Required)</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the Service to function properly. They enable core functionality such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Authentication:</strong> Keep you logged into your account</li>
              <li><strong>Security:</strong> Protect against fraudulent activity</li>
              <li><strong>Session Management:</strong> Maintain your session state</li>
              <li><strong>Cookie Consent:</strong> Remember your cookie preferences</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Can you decline?</strong> No. These cookies are essential for the Service to work.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Analytics Cookies (Optional)</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us understand how visitors interact with our Service by collecting and reporting information anonymously:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Pages visited and time spent on each page</li>
              <li>Lessons completed and learning progress</li>
              <li>Features used and user engagement</li>
              <li>Error messages and technical issues</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Can you decline?</strong> Yes. You can opt-out of analytics cookies.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Functional Cookies (Optional)</h3>
            <p className="text-gray-700 mb-4">
              These cookies enable enhanced functionality and personalization:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Language preferences</li>
              <li>Theme settings (light/dark mode)</li>
              <li>Lesson preferences and customization</li>
              <li>Progress tracking preferences</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Can you decline?</strong> Yes. However, some features may not work as well.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.4 Performance Cookies (Optional)</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us improve the performance of our Service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Load times and page performance</li>
              <li>Error tracking and bug detection</li>
              <li>Service reliability monitoring</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Can you decline?</strong> Yes.
            </p>
          </section>

          {/* Specific Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Specific Cookies We Use</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">sb-access-token</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Authentication</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Essential</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">sb-refresh-token</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Authentication</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Essential</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">cookie-consent</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Cookie preferences</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Essential</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">_ga</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Google Analytics</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Analytics</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that set cookies on your device:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Supabase:</strong> Authentication and database services</li>
              <li><strong>Google Analytics:</strong> Website analytics (if enabled)</li>
              <li><strong>Vercel:</strong> Hosting and performance monitoring</li>
            </ul>
            <p className="text-gray-700">
              These third parties have their own privacy policies and cookie policies.
            </p>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. How to Manage Cookies</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Through Our Service</h3>
            <p className="text-gray-700 mb-4">
              You can manage your cookie preferences at any time through:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>The cookie consent banner when you first visit</li>
              <li>Your account settings (under Privacy Preferences)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Through Your Browser</h3>
            <p className="text-gray-700 mb-4">
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies after each session</li>
              <li>Accept cookies but delete them manually</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Here's how to manage cookies in popular browsers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Impact of Blocking Cookies</h3>
            <p className="text-gray-700">
              If you block or delete cookies, some features of the Service may not work properly. Specifically:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>You may be logged out frequently</li>
              <li>Your preferences may not be saved</li>
              <li>Some features may be unavailable</li>
            </ul>
          </section>

          {/* Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to This Cookie Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li><strong>Email:</strong> privacy@puhanah.com</li>
              <li><strong>Website:</strong> puhanah.com</li>
            </ul>
          </section>

        </div>

        {/* Back to Home */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}