// app/layout.js --header and footer--
"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Twitter,
  Facebook,
  Instagram,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function RootLayout({ children }) {
  const pathname = usePathname() || "";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Header (only on non-dashboard pages) */}
        {!isDashboard && (
          <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
            <div className="flex w-full items-center px-8 py-4">
              {/* Left: Logo only */}
              <Link href="/" className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-600 font-bold text-white">
                  P
                </div>
                <span className="font-semibold text-lg">Puhana</span>
              </Link>
            </div>
          </header>
        )}

        {/* Page content */}
        {children}

        {/* Footer (only on non-dashboard pages) */}
        {!isDashboard && (
          <footer className="mt-20 border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="grid gap-10 md:grid-cols-4">
                {/* Brand / blurb */}
                <div>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-600 font-bold text-white">
                      P
                    </div>
                    <span className="font-semibold text-lg">Puhana</span>
                  </Link>
                  <p className="mt-4 max-w-xs text-gray-600">
                    The most comprehensive platform for learning Pashto. Connect with culture,
                    connect with heritage.
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-gray-500">
                    <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-700">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-700">
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-gray-700">
                      <Instagram className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                {/* Product */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Product</h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li><Link href="/#features" className="hover:text-gray-900">Features</Link></li>
                    <li><Link href="/lessons" className="hover:text-gray-900">Lesson Library</Link></li>
                    <li><Link href="/app" className="hover:text-gray-900">Mobile App</Link></li>
                    <li><Link href="/culture" className="hover:text-gray-900">Cultural Modules</Link></li>
                    <li><Link href="/speech" className="hover:text-gray-900">Speech Recognition</Link></li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li><Link href="/guide" className="hover:text-gray-900">Learning Guide</Link></li>
                    <li><Link href="/blog" className="hover:text-gray-900">Cultural Blog</Link></li>
                    <li><Link href="/stories" className="hover:text-gray-900">Success Stories</Link></li>
                    <li><Link href="/community" className="hover:text-gray-900">Community Forum</Link></li>
                    <li><Link href="/teachers" className="hover:text-gray-900">Teacher Resources</Link></li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
                    <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
                    <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                    <li><Link href="/support" className="hover:text-gray-900">Support</Link></li>
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-8 border-gray-200" />

              {/* bottom bar */}
              <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
                <p className="flex items-center gap-2">
                  © {new Date().getFullYear()} Puhana. All rights reserved.
                </p>

                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>English</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}