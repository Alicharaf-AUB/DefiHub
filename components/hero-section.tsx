import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="py-20">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Build Your Own <span className="text-primary">Cryptocurrency</span> in Minutes
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-10">
          DeFi Builder makes it easy to create, deploy, and manage your own cryptocurrency without any coding knowledge.
          Connect your wallet and start building today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/create">
            <Button size="lg" className="gap-2">
              Create Your Token
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline">
              Learn How It Works
            </Button>
          </Link>
        </div>
        <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border shadow-xl">
          <Image
            src="/placeholder.svg?height=720&width=1280"
            alt="DeFi Builder Platform"
            width={1280}
            height={720}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center p-8">
            <p className="text-lg font-medium">Simple, secure, and powerful token creation platform</p>
          </div>
        </div>
      </div>
    </section>
  )
}

