import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - DeFi Builder",
  description: "Admin dashboard for managing the DeFi Builder platform",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

