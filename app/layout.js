import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Puhanah - Learn Pashto Naturally | Knowledge is Light',
  description: 'Master Pashto through interactive lessons, gamification, and real conversations. Knowledge is Light - Start learning for free today.',
  keywords: 'Pashto, learn Pashto, Pashto lessons, language learning, Pashto app, Puhanah',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.png',
    },
  },
  openGraph: {
    title: 'Puhanah - Learn Pashto Naturally',
    description: 'Master Pashto through interactive lessons, gamification, and real conversations. Knowledge is Light.',
    url: 'https://puhanah.com',
    siteName: 'Puhanah',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puhanah - Learn Pashto Naturally',
    description: 'Master Pashto through interactive lessons, gamification, and real conversations. Knowledge is Light.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}