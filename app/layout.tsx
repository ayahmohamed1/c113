import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'هدية خاصة لك 🎁',
  description: 'رسالة عيد ميلاد خاصة من القلب لك.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Caveat:wght@400;600;700&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
