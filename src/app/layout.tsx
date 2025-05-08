import { getData } from '@/app/resumeData'
import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'

export function generateMetadata(): Metadata {
  const {
    header: { firstName, lastName },
  } = getData()
  return {
    title: `${firstName} ${lastName} — Resume`,
    description: 'Automated Resume Generator',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
      <Script src="https://kit.fontawesome.com/123eb529e8.js" />
    </html>
  )
}
