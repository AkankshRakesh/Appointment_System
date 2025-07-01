import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BookHub - Appointment Booking System',
  description: 'A simple and efficient appointment booking system for customers and clients',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
