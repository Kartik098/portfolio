import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kartik - MERN Stack Developer',
  description: 'Full-stack developer specializing in MongoDB, Express, React, and Node.js. Building modern web applications with a focus on performance and user experience.',
  keywords: 'MERN, React, Node.js, MongoDB, Express, Full-stack Developer, Web Development',
  authors: [{ name: 'Kartik' }],
  creator: 'Kartik',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kartik.dev',
    title: 'Kartik - MERN Stack Developer',
    description: 'Full-stack developer specializing in MongoDB, Express, React, and Node.js',
    images: [
      {
        url: 'https://kartik.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kartik Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kartik - MERN Stack Developer',
    description: 'Full-stack developer specializing in MongoDB, Express, React, and Node.js',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="text-foreground">
        {children}
      </body>
    </html>
  );
}
