import { getData } from '@/app/resumeData'
import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getData()
    if (data?.header) {
      const { firstName, lastName } = data.header
      return {
        title: `${firstName} ${lastName} — Resume`,
        description: 'Automated Resume Generator',
      }
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
  }

  return {
    title: 'Loading resume...',
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
      <body>{children}</body>
      <Script src="https://kit.fontawesome.com/123eb529e8.js" />
    </html>
  )
}
