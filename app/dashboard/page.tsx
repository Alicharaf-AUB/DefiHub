"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import {
  AlertCircle,
  ArrowLeft,
  BarChart,
  Coins,
  Copy,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  Info,
  LineChart,
  Plus,
  RefreshCw,
  Send,
  Settings,
  Trash,
  Users,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample data for the dashboard - this would come from the backend in a real app
const userTokens = [
  {
    id: "1",
    name: "DeFi Token",
    symbol: "DFT",
    network: "Ethereum",
    address: "0x1234...5678",
    supply: "1,000,000",
    holders: 42,
    price: 0.0023,
    marketCap: 2300,
    change24h: 5.2,
    createdAt: "2025-03-15",
    transactions: 156,
  },
  {
    id: "2",
    name: "Community Coin",
    symbol: "COM",
    network: "BSC",
    address: "0xabcd...efgh",
    supply: "10,000,000",
    holders: 128,
    price: 0.00045,
    marketCap: 4500,
    change24h: -2.8,
    createdAt: "2025-03-10",
    transactions: 342,
  },
  {
    id: "3",
    name: "Project X Token",
    symbol: "PXT",
    network: "Polygon",
    address: "0x7890...1234",
    supply: "500,000",
    holders: 17,
    price: 0.0075,
    marketCap: 3750,
    change24h: 12.4,
    createdAt: "2025-03-20",
    transactions: 89,
  },
]

// Sample transaction data
const recentTransactions = [
  {
    id: "tx1",
    type: "Transfer",
    amount: "5,000 DFT",
    from: "0x1234...5678",
    to: "0x8765...4321",
    time: "2 hours ago",
    status: "Completed",
    hash: "0xabc...123",
  },
  {
    id: "tx2",
    type: "Liquidity Add",
    amount: "2,500 COM",
    from: "0xabcd...efgh",
    to: "PancakeSwap",
    time: "5 hours ago",
    status: "Completed",
    hash: "0xdef...456",
  },
  {
    id: "tx3",
    type: "Burn",
    amount: "1,000 PXT",
    from: "0x7890...1234",
    to: "0x0000...0000",
    time: "1 day ago",
    status: "Completed",
    hash: "0xghi...789",
  },
  {
    id: "tx4",
    type: "Transfer",
    amount: "10,000 DFT",
    from: "0x1234...5678",
    to: "0x2468...1357",
    time: "2 days ago",
    status: "Completed",
    hash: "0xjkl...012",
  },
]

export default function DashboardPage() {
  const [selectedToken, setSelectedToken] = useState(userTokens[0])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferAddress, setTransferAddress] = useState("")
  const [burnAmount, setBurnAmount] = useState("")
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [burnDialogOpen, setBurnDialogOpen] = useState(false)
  const [analyticsDialogOpen, setAnalyticsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Dashboard refreshed",
        description: "Token data has been updated",
      })
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The token address has been copied",
    })
  }

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Transfer initiated",
      description: `${transferAmount} ${selectedToken.symbol} will be sent to ${transferAddress}`,
    })
    setTransferAmount("")
    setTransferAddress("")
    setTransferDialogOpen(false)
  }

  const handleBurnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Burn initiated",
      description: `${burnAmount} ${selectedToken.symbol} will be permanently removed from circulation`,
    })
    setBurnAmount("")
    setBurnDialogOpen(false)
  }

  const handleAddLiquidity = () => {
    toast({
      title: "Add Liquidity",
      description: "This would connect to a DEX in the production version",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Token data would be downloaded in the production version",
    })

    // Create a simple CSV string with token data
    const csvContent = `Token Name,Symbol,Network,Supply,Holders,Price,Market Cap,24h Change
${selectedToken.name},${selectedToken.symbol},${selectedToken.network},${selectedToken.supply},${selectedToken.holders},${selectedToken.price},${selectedToken.marketCap},${selectedToken.change24h}%`

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${selectedToken.symbol}_data.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const viewOnExplorer = (address: string) => {
    const explorerUrls: { [key: string]: string } = {
      Ethereum: "https://etherscan.io/address/",
      BSC: "https://bscscan.com/address/",
      Polygon: "https://polygonscan.com/address/",
    }

    const baseUrl = explorerUrls[selectedToken.network] || "https://etherscan.io/address/"
    window.open(baseUrl + address.replace("...", ""), "_blank")

    toast({
      title: "Viewing on Explorer",
      description: `Opening ${selectedToken.network} explorer in a new tab`,
    })
  }

  const viewTransaction = (hash: string) => {
    const explorerUrls: { [key: string]: string } = {
      Ethereum: "https://etherscan.io/tx/",
      BSC: "https://bscscan.com/tx/",
      Polygon: "https://polygonscan.com/tx/",
    }

    const baseUrl = explorerUrls[selectedToken.network] || "https://etherscan.io/tx/"
    window.open(baseUrl + hash.replace("...", ""), "_blank")

    toast({
      title: "Viewing Transaction",
      description: `Opening transaction details in a new tab`,
    })
  }

  // Fix analytics dialog to prevent conditional rendering issues
  const viewAnalytics = () => {
    if (selectedToken) {
      setAnalyticsDialogOpen(true)
    } else {
      toast({
        title: "No token selected",
        description: "Please select a token to view analytics",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <Coins className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DeFi Builder</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/create" className="text-sm font-medium hover:text-primary">
              Create Token
            </Link>
            <Link href="/documentation" className="text-sm font-medium hover:text-primary">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your tokens and track their performance</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Link href="/create">
                <Button
                  size="sm"
                  className="gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  <Plus className="h-4 w-4" />
                  Create Token
                </Button>
              </Link>
            </div>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Frontend Demo Mode</AlertTitle>
            <AlertDescription>
              This dashboard is currently in frontend demo mode. Backend integration will be implemented in the next
              phase.
            </AlertDescription>
          </Alert>

          {userTokens.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Tokens</CardDescription>
                    <CardTitle className="text-3xl">{userTokens.length}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Across {new Set(userTokens.map((token) => token.network)).size} networks
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Market Cap</CardDescription>
                    <CardTitle className="text-3xl">
                      ${userTokens.reduce((sum, token) => sum + token.marketCap, 0).toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">Updated 5 minutes ago</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Holders</CardDescription>
                    <CardTitle className="text-3xl">
                      {userTokens.reduce((sum, token) => sum + token.holders, 0).toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">Across all your tokens</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Transactions</CardDescription>
                    <CardTitle className="text-3xl">
                      {userTokens.reduce((sum, token) => sum + token.transactions, 0).toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">Lifetime transactions</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Your Tokens</h2>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Network</TableHead>
                        <TableHead>Supply</TableHead>
                        <TableHead>Holders</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>24h Change</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userTokens.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {token.symbol.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{token.name}</div>
                                <div className="text-xs text-muted-foreground">{token.symbol}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{token.network}</TableCell>
                          <TableCell>{token.supply}</TableCell>
                          <TableCell>{token.holders}</TableCell>
                          <TableCell>${token.price.toFixed(6)}</TableCell>
                          <TableCell>${token.marketCap.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={token.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                              {token.change24h >= 0 ? "+" : ""}
                              {token.change24h}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setSelectedToken(token)}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(token.address)}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy Address</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => viewOnExplorer(token.address)}>
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View on Explorer</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Token Details: {selectedToken.name}</h2>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Token Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-medium">{selectedToken.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Symbol:</span>
                            <span className="font-medium">{selectedToken.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Network:</span>
                            <span className="font-medium">{selectedToken.network}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Supply:</span>
                            <span className="font-medium">{selectedToken.supply}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span className="font-medium">{selectedToken.createdAt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Contract Address:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium font-mono text-sm">{selectedToken.address}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(selectedToken.address)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Market Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-medium">${selectedToken.price.toFixed(6)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Market Cap:</span>
                            <span className="font-medium">${selectedToken.marketCap.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">24h Change:</span>
                            <span
                              className={`font-medium ${selectedToken.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {selectedToken.change24h >= 0 ? "+" : ""}
                              {selectedToken.change24h}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Holders:</span>
                            <span className="font-medium">{selectedToken.holders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Transactions:</span>
                            <span className="font-medium">{selectedToken.transactions}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Price History</CardTitle>
                        <div className="text-sm text-muted-foreground">Last 30 days</div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                          <div className="text-center">
                            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              Price chart will be available after backend integration
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="transactions" className="pt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Transactions</CardTitle>
                        <CardDescription>View the latest transactions for {selectedToken.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>From</TableHead>
                              <TableHead>To</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Hash</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentTransactions.map((tx) => (
                              <TableRow key={tx.id}>
                                <TableCell>{tx.type}</TableCell>
                                <TableCell>{tx.amount}</TableCell>
                                <TableCell className="font-mono text-xs">{tx.from}</TableCell>
                                <TableCell className="font-mono text-xs">{tx.to}</TableCell>
                                <TableCell>{tx.time}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400">
                                    {tx.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <span className="font-mono text-xs">{tx.hash}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => viewTransaction(tx.hash)}
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "All Transactions",
                              description: `Viewing all transactions for ${selectedToken.name}`,
                            })
                          }}
                        >
                          View All Transactions
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="actions" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Token Management</CardTitle>
                          <CardDescription>Manage your token with these actions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={() => setTransferDialogOpen(true)}
                          >
                            <Send className="h-4 w-4" />
                            Transfer Tokens
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={() => setBurnDialogOpen(true)}
                          >
                            <Trash className="h-4 w-4" />
                            Burn Tokens
                          </Button>

                          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExportData}>
                            <Download className="h-4 w-4" />
                            Export Token Data
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Market Actions</CardTitle>
                          <CardDescription>Interact with exchanges and markets</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleAddLiquidity}>
                            <DollarSign className="h-4 w-4" />
                            Add Liquidity
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={() => viewAnalytics()}
                          >
                            <BarChart className="h-4 w-4" />
                            View Analytics
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={() => viewOnExplorer(selectedToken.address)}
                          >
                            <ExternalLink className="h-4 w-4" />
                            View on {selectedToken.network} Explorer
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-primary/10 p-6 mb-6">
                <Coins className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No tokens found</h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                You haven't created any tokens yet. Start building your first cryptocurrency token now.
              </p>
              <Link href="/create">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                  <Plus className="h-4 w-4" />
                  Create Your First Token
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Transfer Dialog */}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer {selectedToken.symbol} Tokens</DialogTitle>
            <DialogDescription>Send tokens to another wallet address</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTransferSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    className="rounded-r-none"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    required
                  />
                  <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted">
                    {selectedToken.symbol}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  Available Balance: {selectedToken.supply} {selectedToken.symbol}
                </p>
                <p className="mt-1">Note: This is a demo. No actual tokens will be transferred.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Transfer Tokens</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Burn Dialog */}
      <Dialog open={burnDialogOpen} onOpenChange={setBurnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Burn {selectedToken.symbol} Tokens</DialogTitle>
            <DialogDescription>Permanently remove tokens from circulation</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBurnSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="burnAmount">Amount to Burn</Label>
                <div className="flex">
                  <Input
                    id="burnAmount"
                    type="number"
                    placeholder="0.0"
                    className="rounded-r-none"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    required
                  />
                  <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted">
                    {selectedToken.symbol}
                  </div>
                </div>
              </div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Burning tokens is irreversible. Tokens will be permanently removed from circulation.
                </AlertDescription>
              </Alert>
              <div className="text-sm text-muted-foreground">
                <p>
                  Available Balance: {selectedToken.supply} {selectedToken.symbol}
                </p>
                <p className="mt-1">Note: This is a demo. No actual tokens will be burned.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant="destructive">
                Burn Tokens
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={analyticsDialogOpen} onOpenChange={setAnalyticsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedToken.name} Analytics</DialogTitle>
            <DialogDescription>Token performance and market data</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="h-[200px] flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <LineChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Price History</p>
              </div>
            </div>
            <div className="h-[200px] flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <BarChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Volume History</p>
              </div>
            </div>
            <div className="h-[200px] flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Holder Distribution</p>
              </div>
            </div>
            <div className="h-[200px] flex items-center justify-center bg-muted/40 rounded-md">
              <div className="text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Token Metrics</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Note: This is a demo. Real analytics would be available in the production version.
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

