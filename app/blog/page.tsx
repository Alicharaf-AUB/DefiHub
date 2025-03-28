import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with DeFi Builder",
    excerpt: "Learn how to create your first cryptocurrency token using DeFi Builder in just a few minutes.",
    date: "March 20, 2025",
    author: "Alex Johnson",
    category: "Tutorial",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Understanding Tokenomics",
    excerpt: "A deep dive into the economic models behind successful cryptocurrency tokens.",
    date: "March 15, 2025",
    author: "Sarah Williams",
    category: "Education",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "The Future of Decentralized Finance",
    excerpt: "Exploring the trends and innovations shaping the future of DeFi and cryptocurrency.",
    date: "March 10, 2025",
    author: "Michael Chen",
    category: "Insights",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Security Best Practices for Token Creators",
    excerpt: "Essential security considerations for anyone creating and managing cryptocurrency tokens.",
    date: "March 5, 2025",
    author: "David Rodriguez",
    category: "Security",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "How to Market Your New Cryptocurrency",
    excerpt: "Strategies and tactics for promoting your newly created token to potential investors and users.",
    date: "February 28, 2025",
    author: "Emma Thompson",
    category: "Marketing",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Case Study: Successful Community Tokens",
    excerpt: "Examining real-world examples of community-driven tokens that achieved their goals.",
    date: "February 20, 2025",
    author: "James Wilson",
    category: "Case Study",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Insights, tutorials, and updates from the DeFi Builder team.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 p-0"
                    >
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

