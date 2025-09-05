import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
