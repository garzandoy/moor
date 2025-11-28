import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Puhana - Learn Pashto Naturally',
  description: 'Master Pashto through interactive lessons, gamification, and real conversations. Start learning for free today.',
  keywords: 'Pashto, learn Pashto, Pashto lessons, language learning, Pashto app',
  openGraph: {
    title: 'Puhana - Learn Pashto Naturally',
    description: 'Master Pashto through interactive lessons, gamification, and real conversations.',
    url: 'https://puhanah.com',
    siteName: 'Puhana',
    images: [
      {
        url: '/og-image.png', // You'll need to add this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puhana - Learn Pashto Naturally',
    description: 'Master Pashto through interactive lessons, gamification, and real conversations.',
    images: ['/og-image.png'],
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