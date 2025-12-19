'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            {/* Cookie Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-[#8B1538]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                We use cookies
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We use cookies to enhance your learning experience, analyze site traffic, and personalize content. 
                By clicking "Accept", you consent to our use of cookies. You can manage your preferences anytime in your account settings.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="px-6 py-2.5 bg-[#8B1538] text-white rounded-lg font-medium hover:bg-[#660C21] transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    Decline
                  </button>
                </div>
                
                <Link 
                  href="/privacy"
                  className="text-sm text-[#8B1538] hover:text-[#660C21] font-medium"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDecline}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}