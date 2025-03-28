import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DeFi Builder - Create Your Own Cryptocurrency",
  description: "Build your own cryptocurrency in minutes without coding knowledge",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'