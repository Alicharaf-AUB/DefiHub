import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function TermsOfServicePage() {
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
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>Last Updated: March 23, 2025</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using DeFi Builder ("the Service"), you agree to be bound by these Terms of Service.
                  If you do not agree to these Terms, you may not access or use the Service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                  DeFi Builder is a platform that allows users to create and deploy cryptocurrency tokens on various
                  blockchain networks. The Service is provided as a software engineering course project and is intended
                  for educational and demonstration purposes.
                </p>

                <h2>3. User Accounts</h2>
                <p>
                  To use certain features of the Service, you may need to connect your blockchain wallet. You are
                  responsible for maintaining the security of your wallet and for all activities that occur under your
                  account.
                </p>

                <h2>4. User Responsibilities</h2>
                <p>You agree that you will:</p>
                <ul>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Provide accurate information when using the Service</li>
                  <li>Not use the Service for any illegal or unauthorized purpose</li>
                  <li>Not attempt to interfere with or disrupt the Service</li>
                </ul>

                <h2>5. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are owned by DeFi Builder and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property
                  laws.
                </p>

                <h2>6. User Content</h2>
                <p>
                  By creating tokens through our Service, you understand that these tokens will be deployed to public
                  blockchain networks and will be visible to anyone. You are solely responsible for the tokens you
                  create and their compliance with applicable laws.
                </p>

                <h2>7. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
                </p>

                <h2>8. Limitation of Liability</h2>
                <p>
                  IN NO EVENT SHALL DEFI BUILDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                  PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH
                  YOUR ACCESS TO OR USE OF THE SERVICE.
                </p>

                <h2>9. Blockchain Risks</h2>
                <p>
                  You acknowledge that blockchain technology and cryptocurrencies involve significant risks, including
                  but not limited to price volatility, regulatory uncertainty, and technical vulnerabilities. We are not
                  responsible for any losses you may incur as a result of using blockchain networks.
                </p>

                <h2>10. Modifications to the Service</h2>
                <p>
                  We reserve the right to modify or discontinue, temporarily or permanently, the Service or any features
                  or portions thereof without prior notice. You agree that we will not be liable to you or to any third
                  party for any modification, suspension, or discontinuance of the Service.
                </p>

                <h2>11. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United States,
                  without regard to its conflict of law provisions.
                </p>

                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will provide notice of any material changes
                  by posting the new Terms on this page and updating the "Last Updated" date.
                </p>

                <h2>13. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
                <p>
                  Email: legal@defibuilder.com
                  <br />
                  Address: 123 Blockchain Street, San Francisco, CA 94103, United States
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

