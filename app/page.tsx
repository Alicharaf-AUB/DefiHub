"use client"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coins, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { FeatureCard } from "@/components/feature-card"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { set } from "date-fns"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const router = useRouter()
  const handleStartBuilding = () => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }
  


  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DeFi Builder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnectButton />
            <Button
  variant="outline"
  size="sm"
  onClick={() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }}
>
  Dashboard
</Button>

              <Button size="sm" onClick={handleStartBuilding}>Start Building</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/20 dark:from-purple-900/10 dark:to-black/10 z-0"></div>

          {/* Add decorative images */}
          <div className="absolute top-1/4 right-[5%] w-40 h-40 md:w-64 md:h-64 opacity-30 animate-float z-0">
            <img src="/images/bitcoin-crystal.svg" alt="" className="w-full h-full" />
          </div>
          <div className="absolute bottom-1/4 left-[5%] w-32 h-32 md:w-48 md:h-48 opacity-20 animate-float-delay z-0">
            <img src="/images/crypto-crystal.svg" alt="" className="w-full h-full" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Create Your Own Cryptocurrency in Minutes
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10">
                No coding required. Deploy your token on multiple blockchains with just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                    onClick={handleStartBuilding}
                  >
                    Start Building
                  </Button>
                
                <Link href="/documentation">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose DeFi Builder?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Simple & Fast"
                description="Create your own cryptocurrency in minutes with our intuitive form-based approach. No coding required."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Secure Deployment"
                description="Your tokens are deployed with industry-standard security practices and audited smart contracts."
              />
              <FeatureCard
                icon={<Coins className="h-10 w-10 text-primary" />}
                title="Full Customization"
                description="Configure tokenomics, supply, name, symbol and other parameters to match your project needs."
              />
            </div>
          </div>
        </section>

        <HowItWorks />
        <Testimonials />
        <FAQ />

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Cryptocurrency?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of creators who have successfully launched their tokens with DeFi Builder.
            </p>
            <Link href="/create">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Building Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

