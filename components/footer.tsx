import { Coins, Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="text-xl font-bold">DeFi Builder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The easiest way to create and deploy your own cryptocurrency without coding.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="mailto:contact@defibuilder.com" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Create Token
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/documentation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} DeFi Builder. All rights reserved. Software Engineering Course Project.
          </p>
        </div>
      </div>
    </footer>
  )
}

