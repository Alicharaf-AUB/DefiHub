import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Find answers to common questions about creating and managing your cryptocurrency.
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do I need coding knowledge to create a token?</AccordionTrigger>
              <AccordionContent>
                No, DeFi Builder is designed to be user-friendly and requires no coding knowledge. Our simple form-based
                approach guides you through the entire process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Which blockchain networks are supported?</AccordionTrigger>
              <AccordionContent>
                Currently, DeFi Builder supports Ethereum, Binance Smart Chain, Polygon, and Avalanche. We're constantly
                working to add more networks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How much does it cost to create a token?</AccordionTrigger>
              <AccordionContent>
                The cost varies depending on the blockchain network you choose and the current gas prices. You'll need
                to pay the network's transaction fee to deploy your smart contract.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I customize the tokenomics?</AccordionTrigger>
              <AccordionContent>
                Yes, DeFi Builder offers extensive customization options for your token's economics, including supply,
                transaction fees, distribution, and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I connect my MetaMask wallet?</AccordionTrigger>
              <AccordionContent>
                Simply click the "Connect Wallet" button at the top of the page, and select MetaMask from the available
                options. Make sure you have the MetaMask extension installed in your browser.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Is my token secure?</AccordionTrigger>
              <AccordionContent>
                Yes, all tokens created with DeFi Builder use audited smart contract templates that follow industry best
                practices for security. However, we recommend conducting your own audit for additional security.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

