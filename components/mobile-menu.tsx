"use client"

import type React from "react"

import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold">Menu</span>
        <button onClick={onClose} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="mt-4">
        <div className="grid gap-2 p-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            Home
          </Link>
          <Link href="/features" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            Features
          </Link>
          <Link href="/pricing" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            Pricing
          </Link>
          <Link
            href="/documentation"
            className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md"
          >
            Documentation
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            Blog
          </Link>
          <Link href="/faq" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            FAQ
          </Link>
          <Link href="/about" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            About
          </Link>
          <Link href="/contact" className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md">
            Contact
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default MobileMenu

