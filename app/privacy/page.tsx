import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function PrivacyPolicyPage() {
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
              <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>Last Updated: March 23, 2025</p>

                <h2>Introduction</h2>
                <p>
                  DeFi Builder ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you visit our website and
                  use our services.
                </p>

                <h2>Information We Collect</h2>
                <p>We may collect information about you in various ways, including:</p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> When you create an account or use our services, we may
                    collect your name, email address, and blockchain wallet address.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> We automatically collect information about how you interact with our
                    website, including your IP address, browser type, pages viewed, and time spent on the site.
                  </li>
                  <li>
                    <strong>Blockchain Data:</strong> When you create or interact with tokens through our platform, we
                    collect information about these transactions that are recorded on the blockchain.
                  </li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We may use the information we collect for various purposes, including to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, such as updates or security alerts</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>

                <h2>Disclosure of Your Information</h2>
                <p>We may share your information in the following situations:</p>
                <ul>
                  <li>
                    <strong>With Service Providers:</strong> We may share your information with third-party vendors who
                    provide services on our behalf.
                  </li>
                  <li>
                    <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or
                    in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> We may share or transfer your information in connection with a
                    merger, acquisition, or sale of all or a portion of our assets.
                  </li>
                </ul>

                <h2>Security of Your Information</h2>
                <p>
                  We use administrative, technical, and physical security measures to protect your personal information.
                  However, no method of transmission over the Internet or electronic storage is 100% secure, so we
                  cannot guarantee absolute security.
                </p>

                <h2>Your Choices</h2>
                <p>You have certain rights regarding your personal information:</p>
                <ul>
                  <li>
                    <strong>Access and Update:</strong> You can review and update your account information at any time
                    by logging into your account.
                  </li>
                  <li>
                    <strong>Opt-Out:</strong> You can opt-out of receiving promotional emails by following the
                    instructions in those emails.
                  </li>
                  <li>
                    <strong>Delete:</strong> You can request deletion of your personal information, subject to certain
                    exceptions.
                  </li>
                </ul>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date.
                </p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p>
                  Email: privacy@defibuilder.com
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

