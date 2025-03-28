import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationPage() {
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

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-8">
        <aside className="fixed top-24 z-30 -ml-2 hidden h-[calc(100vh-6rem)] w-full shrink-0 md:sticky md:block">
          <nav className="h-full overflow-y-auto py-6 pr-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="#getting-started"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="#connecting-wallet"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  Connecting Your Wallet
                </Link>
              </li>
              <li>
                <Link
                  href="#creating-token"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  Creating a Token
                </Link>
              </li>
              <li>
                <Link
                  href="#token-types"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  Token Types
                </Link>
              </li>
              <li>
                <Link
                  href="#tokenomics"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link
                  href="#managing-tokens"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  Managing Your Tokens
                </Link>
              </li>
              <li>
                <Link href="#faq" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Documentation</h1>
              <p className="text-muted-foreground">
                Learn how to use DeFi Builder to create and manage your own cryptocurrency.
              </p>
            </div>

            <div className="space-y-12">
              <section id="getting-started">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <p className="mb-4">
                  DeFi Builder is a platform that allows you to create and deploy your own cryptocurrency without any
                  coding knowledge. This documentation will guide you through the process of creating and managing your
                  tokens.
                </p>
                <p>Before you begin, you'll need:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2 mb-4">
                  <li>A MetaMask wallet or compatible Web3 wallet</li>
                  <li>Some cryptocurrency (ETH, BNB, MATIC, or AVAX) to pay for transaction fees</li>
                  <li>A basic understanding of blockchain concepts</li>
                </ul>
              </section>

              <section id="connecting-wallet">
                <h2 className="text-2xl font-bold mb-4">Connecting Your Wallet</h2>
                <p className="mb-4">
                  To use DeFi Builder, you'll need to connect your cryptocurrency wallet. We currently support MetaMask
                  and other Web3-compatible wallets.
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  <li>Click the "Connect Wallet" button in the top right corner of the page</li>
                  <li>Select your wallet provider from the available options</li>
                  <li>Approve the connection request in your wallet</li>
                  <li>Once connected, you'll see your wallet address displayed in the header</li>
                </ol>
                <p>
                  Your wallet connection is required to deploy tokens to the blockchain and pay for transaction fees.
                </p>
              </section>

              <section id="creating-token">
                <h2 className="text-2xl font-bold mb-4">Creating a Token</h2>
                <p className="mb-4">
                  Creating a token with DeFi Builder is a simple process that involves filling out a form with your
                  token's details.
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  <li>Navigate to the "Create Token" page</li>
                  <li>Connect your wallet if you haven't already</li>
                  <li>Fill out the basic information for your token (name, symbol, supply, etc.)</li>
                  <li>Configure the tokenomics and features of your token</li>
                  <li>Review your token details</li>
                  <li>Click "Deploy Token" to create your token on the blockchain</li>
                  <li>Approve the transaction in your wallet</li>
                  <li>Wait for the transaction to be confirmed</li>
                </ol>
                <p>
                  After your token is deployed, you'll be redirected to your dashboard where you can manage your token.
                </p>
              </section>

              <section id="token-types">
                <h2 className="text-2xl font-bold mb-4">Token Types</h2>
                <p className="mb-4">
                  DeFi Builder supports several types of tokens, each with different features and use cases.
                </p>

                <Tabs defaultValue="standard">
                  <TabsList>
                    <TabsTrigger value="standard">Standard Token</TabsTrigger>
                    <TabsTrigger value="reflection">Reflection Token</TabsTrigger>
                    <TabsTrigger value="liquidity">Liquidity Token</TabsTrigger>
                  </TabsList>
                  <TabsContent value="standard" className="p-4 border rounded-md mt-2">
                    <h3 className="text-lg font-bold mb-2">Standard Token</h3>
                    <p className="mb-2">A basic ERC-20/BEP-20 compatible token with standard transfer functionality.</p>
                    <p className="mb-2">
                      <strong>Features:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Transfer tokens between addresses</li>
                      <li>Approve spending allowances for other addresses</li>
                      <li>Optional burnable and mintable functionality</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="reflection" className="p-4 border rounded-md mt-2">
                    <h3 className="text-lg font-bold mb-2">Reflection Token</h3>
                    <p className="mb-2">
                      A token that redistributes a percentage of each transaction to all token holders.
                    </p>
                    <p className="mb-2">
                      <strong>Features:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Automatic redistribution of transaction fees to holders</li>
                      <li>Configurable reflection percentage</li>
                      <li>Rewards proportional to holdings</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="liquidity" className="p-4 border rounded-md mt-2">
                    <h3 className="text-lg font-bold mb-2">Liquidity Token</h3>
                    <p className="mb-2">A token that automatically adds to liquidity pools with each transaction.</p>
                    <p className="mb-2">
                      <strong>Features:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Automatic liquidity generation</li>
                      <li>Configurable liquidity fee percentage</li>
                      <li>Helps maintain price stability</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </section>

              <section id="tokenomics">
                <h2 className="text-2xl font-bold mb-4">Tokenomics</h2>
                <p className="mb-4">
                  Tokenomics refers to the economic model of your token. DeFi Builder allows you to configure various
                  aspects of your token's economics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-bold mb-2">Supply</h3>
                    <p>
                      The total number of tokens that will exist. You can choose to make your token mintable (allowing
                      new tokens to be created later) or non-mintable (fixed supply).
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-bold mb-2">Transaction Fees</h3>
                    <p>
                      You can set fees that are applied to each transaction. These fees can be used for reflection
                      (redistribution to holders), liquidity generation, or other purposes.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-bold mb-2">Burning</h3>
                    <p>
                      Burning refers to permanently removing tokens from circulation. You can enable or disable the
                      ability to burn tokens.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-bold mb-2">Decimals</h3>
                    <p>
                      The number of decimal places your token supports. Most tokens use 18 decimals, which allows for
                      very small fractions of a token to be transferred.
                    </p>
                  </div>
                </div>
              </section>

              <section id="managing-tokens">
                <h2 className="text-2xl font-bold mb-4">Managing Your Tokens</h2>
                <p className="mb-4">
                  After creating your token, you can manage it from your dashboard. Here are some common management
                  tasks:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Transferring Tokens:</strong> You can send your tokens to other addresses directly from your
                    dashboard.
                  </li>
                  <li>
                    <strong>Adding Liquidity:</strong> To make your token tradable on decentralized exchanges, you'll
                    need to add liquidity.
                  </li>
                  <li>
                    <strong>Burning Tokens:</strong> If your token is burnable, you can permanently remove tokens from
                    circulation.
                  </li>
                  <li>
                    <strong>Minting Tokens:</strong> If your token is mintable, you can create additional tokens.
                  </li>
                  <li>
                    <strong>Monitoring Holders:</strong> You can view the number of addresses holding your token.
                  </li>
                </ul>
              </section>

              <section id="faq">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">How much does it cost to create a token?</h3>
                    <p>
                      The cost of creating a token varies depending on the blockchain network you choose and the current
                      gas prices. You'll need to pay the network's transaction fee to deploy your smart contract.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Can I modify my token after it's deployed?</h3>
                    <p>
                      Most aspects of your token cannot be changed after deployment due to the immutable nature of
                      blockchain. However, if you enabled certain features like minting, you can still perform those
                      actions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">How do I list my token on exchanges?</h3>
                    <p>
                      For decentralized exchanges (DEXs), you typically need to add liquidity to create a trading pair.
                      For centralized exchanges, you'll need to apply directly to the exchange for listing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Is my token secure?</h3>
                    <p>
                      DeFi Builder uses audited smart contract templates that follow industry best practices for
                      security. However, we recommend conducting your own audit for additional security.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

