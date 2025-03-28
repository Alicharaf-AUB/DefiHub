import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Award, Clock, Globe } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About DeFi Builder</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                We're on a mission to democratize cryptocurrency creation and make blockchain technology accessible to
                everyone.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p>
                  DeFi Builder was created as a software engineering course project with the goal of simplifying the
                  process of creating and deploying cryptocurrencies on various blockchain networks.
                </p>
                <p>
                  Our team of passionate blockchain enthusiasts and developers recognized that while blockchain
                  technology has enormous potential, the technical barriers to entry remain high for many people.
                  Creating a cryptocurrency traditionally required deep knowledge of smart contract development,
                  blockchain architecture, and programming languages like Solidity.
                </p>
                <p>
                  We set out to change that by building a user-friendly platform that abstracts away the complexity and
                  allows anyone to create their own token in minutes, without writing a single line of code.
                </p>
                <p>
                  What started as an academic project has evolved into a comprehensive platform that empowers
                  entrepreneurs, communities, and creators to launch their own tokens and participate in the
                  decentralized finance ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe blockchain technology should be accessible to everyone, regardless of technical background.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We're committed to creating secure, reliable, and well-tested smart contracts for our users.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Efficiency</h3>
                <p className="text-muted-foreground">
                  We streamline complex processes to save our users time and resources.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster an inclusive community of creators and innovators in the blockchain space.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us on Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We're just getting started, and we're excited to see what our users will create with DeFi Builder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Start Building
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

