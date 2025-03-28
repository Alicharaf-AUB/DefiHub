import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md fixed top-0 left-0 w-full z-50">
      <div className="container max-w-screen-xl mx-auto py-4 px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            My App
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/documentation" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Documentation
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Blog
            </Link>
            <Link href="/faq" className="text-sm font-medium transition-colors hover:text-foreground/80">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

