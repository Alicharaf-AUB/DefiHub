import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, FileText, Rocket, CheckCircle } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Creating your own cryptocurrency has never been easier. Follow these simple steps to launch your token.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StepCard
            number={1}
            icon={<Wallet className="h-8 w-8 text-primary" />}
            title="Connect Wallet"
            description="Connect your MetaMask wallet to get started with the token creation process."
          />
          <StepCard
            number={2}
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Fill the Form"
            description="Provide details about your token including name, symbol, supply, and tokenomics."
          />
          <StepCard
            number={3}
            icon={<Rocket className="h-8 w-8 text-primary" />}
            title="Deploy Token"
            description="Review your token details and deploy it to the blockchain with one click."
          />
          <StepCard
            number={4}
            icon={<CheckCircle className="h-8 w-8 text-primary" />}
            title="Manage Token"
            description="Access your dashboard to manage and monitor your newly created cryptocurrency."
          />
        </div>
      </div>
    </section>
  )
}

interface StepCardProps {
  number: number
  icon: React.ReactNode
  title: string
  description: string
}

function StepCard({ number, icon, title, description }: StepCardProps) {
  return (
    <Card className="relative h-full">
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {number}
      </div>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

