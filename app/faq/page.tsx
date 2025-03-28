import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
              <p className="mt-6 text-lg text-muted-foreground">Find answers to common questions about DeFi Builder.</p>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container max-w-3xl">
            <div className="relative mb-12">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-10 focus-visible:ring-purple-500 focus-visible:border-purple-500"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">General Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is DeFi Builder?</AccordionTrigger>
                    <AccordionContent>
                      DeFi Builder is a platform that allows you to create and deploy your own cryptocurrency tokens
                      without any coding knowledge. Our user-friendly interface guides you through the process of
                      configuring and deploying smart contracts on various blockchain networks.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Do I need technical knowledge to use DeFi Builder?</AccordionTrigger>
                    <AccordionContent>
                      No, DeFi Builder is designed to be accessible to everyone, regardless of technical background. Our
                      step-by-step form guides you through the process, and you don't need to write any code. However, a
                      basic understanding of blockchain concepts and tokenomics is helpful.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Which blockchain networks are supported?</AccordionTrigger>
                    <AccordionContent>
                      DeFi Builder currently supports Ethereum, Binance Smart Chain (BSC), Polygon, and Avalanche. We
                      plan to add support for more networks in the future based on user demand.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Token Creation</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How long does it take to create a token?</AccordionTrigger>
                    <AccordionContent>
                      The token creation process itself takes only a few minutes to complete the form and deploy the
                      smart contract. However, the actual deployment time depends on the blockchain network's congestion
                      and the gas price you set. Typically, the entire process can be completed in under 15 minutes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I modify my token after it's deployed?</AccordionTrigger>
                    <AccordionContent>
                      Due to the immutable nature of blockchain, most aspects of your token cannot be changed after
                      deployment. However, if you enabled certain features like minting or burning, you can still
                      perform those actions after deployment. We recommend thoroughly reviewing your token configuration
                      before deployment.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>What token features can I customize?</AccordionTrigger>
                    <AccordionContent>
                      DeFi Builder allows you to customize various aspects of your token, including:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Token name and symbol</li>
                        <li>Total supply</li>
                        <li>Decimals</li>
                        <li>Transaction fees and redistribution mechanisms</li>
                        <li>Burning and minting capabilities</li>
                        <li>Liquidity generation features</li>
                        <li>Transfer limits and anti-whale mechanisms</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Costs and Fees</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-7">
                    <AccordionTrigger>How much does it cost to create a token?</AccordionTrigger>
                    <AccordionContent>
                      DeFi Builder offers different pricing tiers, starting with a free option for basic tokens. For
                      more advanced features, we offer Pro and Enterprise plans. In addition to our platform fee (if
                      applicable), you'll need to pay the gas fees required by the blockchain network you choose for
                      deployment. Gas fees vary depending on network congestion and the complexity of your token.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept credit/debit cards, PayPal, and various cryptocurrencies including ETH, BNB, and USDT.
                      For Enterprise plans, we also offer invoice-based payment options.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
                    <AccordionContent>
                      Due to the nature of blockchain deployments, we cannot offer refunds once a token has been
                      deployed. However, if you encounter issues before deployment, please contact our support team, and
                      we'll work with you to resolve the issue or provide a refund if appropriate.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Token Management</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-10">
                    <AccordionTrigger>How do I list my token on exchanges?</AccordionTrigger>
                    <AccordionContent>
                      For decentralized exchanges (DEXs) like Uniswap or PancakeSwap, you typically need to add
                      liquidity to create a trading pair. This can be done directly from your DeFi Builder dashboard.
                      For centralized exchanges, you'll need to apply directly to the exchange for listing, which
                      usually involves a separate application process and may require additional fees.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-11">
                    <AccordionTrigger>Can I transfer ownership of my token?</AccordionTrigger>
                    <AccordionContent>
                      Yes, if you've enabled the ownership transfer feature during token creation, you can transfer
                      ownership of your token to another wallet address. This is useful for projects that want to
                      transition to community governance or multi-signature wallets for enhanced security.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-12">
                    <AccordionTrigger>How do I monitor my token's performance?</AccordionTrigger>
                    <AccordionContent>
                      DeFi Builder provides a dashboard where you can monitor your token's basic metrics, such as total
                      supply, holder count, and recent transactions. For more detailed analytics, you can use blockchain
                      explorers like Etherscan or BscScan, or third-party analytics platforms.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Security</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-13">
                    <AccordionTrigger>Are the smart contracts secure?</AccordionTrigger>
                    <AccordionContent>
                      DeFi Builder uses audited smart contract templates that follow industry best practices for
                      security. Our contracts are based on established standards like OpenZeppelin, which are widely
                      used and tested in the industry. However, we recommend conducting your own audit for additional
                      security, especially for high-value projects.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-14">
                    <AccordionTrigger>How can I ensure my token is safe from exploits?</AccordionTrigger>
                    <AccordionContent>
                      While we take security seriously, no smart contract is completely immune to exploits. To enhance
                      security:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Consider getting a professional audit from a reputable security firm</li>
                        <li>Start with a smaller supply or limited functionality for testing</li>
                        <li>Implement multi-signature wallets for critical functions</li>
                        <li>Regularly monitor your token for unusual activity</li>
                        <li>Consider timelock mechanisms for major changes</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-6">Still have questions?</h2>
            <p className="text-muted-foreground mb-8">
              If you couldn't find the answer to your question, feel free to contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Contact Support
                </Button>
              </Link>
              <Link href="/documentation">
                <Button size="lg" variant="outline">
                  View Documentation
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

