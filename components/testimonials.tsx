import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Thousands of creators have successfully launched their tokens with DeFi Builder.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            content="DeFi Builder made it incredibly easy to launch my community token. The process was smooth and the support was excellent."
            name="Alex Johnson"
            role="Founder, CryptoVerse"
            avatar="A"
          />
          <TestimonialCard
            content="I had no coding experience but was able to create and deploy my token in less than 30 minutes. Highly recommended for beginners!"
            name="Sarah Williams"
            role="NFT Artist"
            avatar="S"
          />
          <TestimonialCard
            content="The customization options are impressive. I was able to configure my tokenomics exactly how I wanted for my DeFi project."
            name="Michael Chen"
            role="DeFi Developer"
            avatar="M"
          />
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  content: string
  name: string
  role: string
  avatar: string
}

function TestimonialCard({ content, name, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="h-4 w-4 fill-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-6">"{content}"</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

