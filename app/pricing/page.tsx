import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, X } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Simple, transparent pricing for creating your own cryptocurrency.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-muted">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    Free
                    <span className="ml-1 text-sm font-medium text-muted-foreground">+ gas fees</span>
                  </div>
                  <CardDescription className="mt-4">Perfect for beginners and educational projects.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Standard token creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Basic customization options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Deploy to Ethereum or BSC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Basic token management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5" />
                      <span className="text-muted-foreground">Advanced tokenomics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5" />
                      <span className="text-muted-foreground">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/create" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border-purple-600 dark:border-purple-400 relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-purple-600 dark:bg-purple-500 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $49
                    <span className="ml-1 text-sm font-medium text-muted-foreground">+ gas fees</span>
                  </div>
                  <CardDescription className="mt-4">For serious projects and entrepreneurs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>All Basic features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Advanced tokenomics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Deploy to any supported network</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Reflection and liquidity features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5" />
                      <span className="text-muted-foreground">Custom branding</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/create" className="w-full">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border-muted">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $199
                    <span className="ml-1 text-sm font-medium text-muted-foreground">+ gas fees</span>
                  </div>
                  <CardDescription className="mt-4">For businesses and large-scale projects.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>All Pro features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Custom branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Custom smart contract features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>24/7 priority support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <span>Security audit included</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
                <h3 className="text-xl font-bold mb-2">Do I need to pay for gas fees?</h3>
                <p className="text-muted-foreground">
                  Yes, in addition to our platform fee (if applicable), you'll need to pay the gas fees required by the
                  blockchain network you choose for deployment.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Can I upgrade my plan later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade your plan at any time. The additional features will be available for your future
                  token deployments.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept credit/debit cards, PayPal, and various cryptocurrencies including ETH, BNB, and USDT.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Is there a refund policy?</h3>
                <p className="text-muted-foreground">
                  Due to the nature of blockchain deployments, we cannot offer refunds once a token has been deployed.
                  However, if you encounter issues before deployment, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that's right for you and start building your cryptocurrency today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Create Your Token
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Sales
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

