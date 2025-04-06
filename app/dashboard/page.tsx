"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Coins, Plus, RefreshCw, Info, Copy, ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Toast } from "@/components/ui/toast"
export default function DashboardPage() {
  const [tokens, setTokens] = useState<any[]>([])
  const [selectedToken, setSelectedToken] = useState<any | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  // Fetch tokens from backend
  const fetchTokens = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/coins")
      const data = await res.json()
      if (Array.isArray(data)) {
        setTokens(data)
        if (data.length > 0) setSelectedToken(data[0])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your tokens.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchTokens()

    const url = new URL(window.location.href)
    if (url.searchParams.get("created") === "true") {
      toast({
        title: "Token Created",
        description: "Your token was successfully created and added to your dashboard.",
      })
    }
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      fetchTokens()
      setIsRefreshing(false)
      toast({
        title: "Refreshed",
        description: "Token data has been updated.",
      })
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Token address copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DeFi Builder</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link href="/create" className="text-sm font-medium hover:text-primary">Create Token</Link>
            <Link href="/documentation" className="text-sm font-medium hover:text-primary">Docs</Link>
          </nav>
          <div className="flex items-center gap-4">
  <ThemeToggle />
  <WalletConnectButton />
  <Button
    variant="outline"
    size="sm"
    onClick={() => {
      localStorage.removeItem("token")
      localStorage.removeItem("isAdmin")
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      })
      setTimeout(() => {
      window.location.href = "/"
      }, 800)
    }}
  >
    Logout
  </Button>
</div>

        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your tokens and track their performance</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Link href="/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Token
                </Button>
              </Link>
            </div>
          </div>

          {tokens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-full bg-primary/10 p-6 mb-6">
                <Coins className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No tokens found</h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                You haven't created any tokens yet. Start building your first cryptocurrency token now.
              </p>
              <Link href="/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Your First Token
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Live Data</AlertTitle>
                  <AlertDescription>This dashboard reflects tokens you've actually created.</AlertDescription>
                </Alert>
              </div>

              <div className="rounded-md border mb-8 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Total Supply</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokens.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {token.symbol?.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.description || "No description"}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{token.symbol}</TableCell>
                        <TableCell className="capitalize">{token.network}</TableCell>
                        <TableCell>{Number(token.total_supply).toLocaleString()}</TableCell>
                        <TableCell>
                        {typeof token.created_at === "string"
                        ? token.created_at.split(" ")[0]
                         : "N/A"}
                        </TableCell>

                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setSelectedToken(token)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => copyToClipboard(token.name + "_" + token.symbol)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                toast({
                                  title: "Open Explorer",
                                  description: "Explorer link is a placeholder in demo.",
                                })
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {selectedToken && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Token Details: {selectedToken.name}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Token Info</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span className="font-medium">{selectedToken.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Symbol:</span>
                          <span className="font-medium">{selectedToken.symbol}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Network:</span>
                          <span className="font-medium">{selectedToken.network}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Supply:</span>
                          <span className="font-medium">{selectedToken.total_supply.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Decimals:</span>
                          <span className="font-medium">{selectedToken.decimals}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Burnable:</span>
                          <span className="font-medium">{selectedToken.burnable ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mintable:</span>
                          <span className="font-medium">{selectedToken.mintable ? "Yes" : "No"}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Fees & Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tax Fee:</span>
                          <span className="font-medium">{selectedToken.tax_fee}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reflection Fee:</span>
                          <span className="font-medium">{selectedToken.reflection_fee}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Liquidity Fee:</span>
                          <span className="font-medium">{selectedToken.liquidity_fee}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Description:</span>
                          <span className="text-right text-muted-foreground">{selectedToken.description || "N/A"}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
