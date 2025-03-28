import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Zap, Shield, Coins, Users, Settings, BarChart } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Features</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Discover all the powerful features that make DeFi Builder the easiest way to create your own
                cryptocurrency.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="mb-4 p-3 w-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Simple & Fast</CardTitle>
                  <CardDescription>
                    Create your own cryptocurrency in minutes with our intuitive form-based approach.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>No coding required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Simple step-by-step process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Deploy in minutes, not days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Intuitive user interface</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 p-3 w-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Secure Deployment</CardTitle>
                  <CardDescription>Your tokens are deployed with industry-standard security practices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Audited smart contracts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Security best practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Transparent deployment process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Verified contract source code</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 p-3 w-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Coins className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Full Customization</CardTitle>
                  <CardDescription>Configure tokenomics and parameters to match your project needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Customizable token supply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Transaction fee configuration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Optional token features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Multiple blockchain support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="p-3 h-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Reflection Mechanisms</h3>
                  <p className="text-muted-foreground mb-4">
                    Create tokens that automatically redistribute a percentage of each transaction to all holders,
                    rewarding long-term investors.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Configurable reflection percentage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Automatic distribution</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 h-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Liquidity Generation</h3>
                  <p className="text-muted-foreground mb-4">
                    Create tokens that automatically add to liquidity pools with each transaction, helping to maintain
                    price stability.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Automatic liquidity pool contributions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Configurable liquidity fee</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 h-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Token Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Access detailed analytics about your token's performance, holders, and transactions.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Holder statistics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Transaction history</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 h-fit rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Token Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage your token after deployment with features like burning, minting, and transfers.
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Token burning capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Optional minting functionality</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Token?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start building your cryptocurrency today with our easy-to-use platform.
            </p>
            <Link href="/create">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Create Your Token
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

