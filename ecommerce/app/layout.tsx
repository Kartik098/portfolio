import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShopHub - Premium Products Store',
  description: 'Discover premium physical products with fast shipping and excellent customer service.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
