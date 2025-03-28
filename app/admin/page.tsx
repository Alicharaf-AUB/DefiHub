"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  Coins,
  DollarSign,
  Download,
  Filter,
  LineChart,
  Lock,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Sample data for all platform tokens
const allTokens = [
  {
    id: "1",
    name: "DeFi Token",
    symbol: "DFT",
    network: "Ethereum",
    creator: "0x1234...5678",
    supply: "1,000,000",
    holders: 42,
    price: 0.0023,
    marketCap: 2300,
    change24h: 5.2,
    volume24h: 1200,
    createdAt: "2025-03-15",
    status: "active",
  },
  {
    id: "2",
    name: "Community Coin",
    symbol: "COM",
    network: "BSC",
    creator: "0xabcd...efgh",
    supply: "10,000,000",
    holders: 128,
    price: 0.00045,
    marketCap: 4500,
    change24h: -2.8,
    volume24h: 3500,
    createdAt: "2025-03-10",
    status: "active",
  },
  {
    id: "3",
    name: "Project X Token",
    symbol: "PXT",
    network: "Polygon",
    creator: "0x7890...1234",
    supply: "500,000",
    holders: 17,
    price: 0.0075,
    marketCap: 3750,
    change24h: 12.4,
    volume24h: 950,
    createdAt: "2025-03-20",
    status: "active",
  },
  {
    id: "4",
    name: "Metaverse Token",
    symbol: "MVT",
    network: "Ethereum",
    creator: "0x2468...1357",
    supply: "5,000,000",
    holders: 89,
    price: 0.0012,
    marketCap: 6000,
    change24h: -5.7,
    volume24h: 2800,
    createdAt: "2025-03-05",
    status: "active",
  },
  {
    id: "5",
    name: "Gaming Coin",
    symbol: "GMC",
    network: "Avalanche",
    creator: "0x9876...5432",
    supply: "2,500,000",
    holders: 63,
    price: 0.0034,
    marketCap: 8500,
    change24h: 8.9,
    volume24h: 4200,
    createdAt: "2025-03-12",
    status: "active",
  },
  {
    id: "6",
    name: "Finance Protocol",
    symbol: "FNP",
    network: "BSC",
    creator: "0xfedc...ba98",
    supply: "750,000",
    holders: 31,
    price: 0.0095,
    marketCap: 7125,
    change24h: -1.3,
    volume24h: 1850,
    createdAt: "2025-03-18",
    status: "flagged",
  },
  {
    id: "7",
    name: "Art NFT Token",
    symbol: "ANT",
    network: "Polygon",
    creator: "0x1357...2468",
    supply: "100,000",
    holders: 22,
    price: 0.0215,
    marketCap: 2150,
    change24h: 15.6,
    volume24h: 980,
    createdAt: "2025-03-22",
    status: "active",
  },
]

// Platform statistics
const platformStats = {
  totalTokens: allTokens.length,
  totalUsers: 1245,
  totalVolume24h: allTokens.reduce((sum, token) => sum + token.volume24h, 0),
  totalMarketCap: allTokens.reduce((sum, token) => sum + token.marketCap, 0),
  activeTokens: allTokens.filter((token) => token.status === "active").length,
  flaggedTokens: allTokens.filter((token) => token.status === "flagged").length,
}

export default function AdminPage() {
  const [selectedToken, setSelectedToken] = useState(allTokens[0])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [buyDialogOpen, setBuyDialogOpen] = useState(false)
  const [sellDialogOpen, setSellDialogOpen] = useState(false)
  const [flagDialogOpen, setFlagDialogOpen] = useState(false)
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [flagReason, setFlagReason] = useState("suspicious")
  const [flagNotes, setFlagNotes] = useState("")
  const [sortColumn, setSortColumn] = useState("marketCap")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterNetwork, setFilterNetwork] = useState("all")
  const { toast } = useToast()
  const router = useRouter()
  const [modifiedTokens, setModifiedTokens] = useState<Record<string, any>>({})

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data refreshed",
        description: "Platform data has been updated",
      })
    }, 1500)
  }

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!buyAmount || Number.parseFloat(buyAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to buy",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Purchase initiated",
      description: `${buyAmount} ${selectedToken.symbol} will be purchased`,
    })

    // Update the token data to simulate the purchase
    const updatedTokens = { ...modifiedTokens }
    updatedTokens[selectedToken.id] = {
      ...(modifiedTokens[selectedToken.id] || selectedToken),
      holders: (Number.parseInt(selectedToken.holders.toString()) + 1).toString(),
      volume24h: selectedToken.volume24h + Number.parseFloat(buyAmount) * selectedToken.price,
    }
    setModifiedTokens(updatedTokens)

    setBuyAmount("")
    setBuyDialogOpen(false)
  }

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!sellAmount || Number.parseFloat(sellAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to sell",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Sale initiated",
      description: `${sellAmount} ${selectedToken.symbol} will be sold`,
    })

    // Update the token data to simulate the sale
    const updatedTokens = { ...modifiedTokens }
    updatedTokens[selectedToken.id] = {
      ...(modifiedTokens[selectedToken.id] || selectedToken),
      volume24h: selectedToken.volume24h + Number.parseFloat(sellAmount) * selectedToken.price,
    }
    setModifiedTokens(updatedTokens)

    setSellAmount("")
    setSellDialogOpen(false)
  }

  const handleFlagToken = (e: React.FormEvent) => {
    e.preventDefault()

    // Update the token status to flagged
    const updatedTokens = { ...modifiedTokens }
    updatedTokens[selectedToken.id] = {
      ...(modifiedTokens[selectedToken.id] || selectedToken),
      status: "flagged",
    }
    setModifiedTokens(updatedTokens)

    toast({
      title: "Token flagged",
      description: `${selectedToken.name} has been flagged for review`,
      variant: "destructive",
    })

    setFlagReason("suspicious")
    setFlagNotes("")
    setFlagDialogOpen(false)
  }

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Platform data is being exported to CSV",
    })

    // Create a simple CSV string with token data
    const headers = "Token Name,Symbol,Network,Supply,Holders,Price,Market Cap,24h Change,Volume 24h,Status\n"
    const rows = allTokens
      .map(
        (token) =>
          `${token.name},${token.symbol},${token.network},${token.supply},${token.holders},${token.price},${token.marketCap},${token.change24h}%,${token.volume24h},${token.status}`,
      )
      .join("\n")

    const csvContent = headers + rows

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `platform_tokens_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get the current token data, either from modifiedTokens or the original data
  const getTokenData = (token: (typeof allTokens)[0]) => {
    return modifiedTokens[token.id] || token
  }

  // Sort and filter tokens
  const filteredTokens = allTokens
    .filter((token) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.creator.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((token) => {
      // Apply network filter
      if (filterNetwork !== "all") {
        return token.network.toLowerCase() === filterNetwork.toLowerCase()
      }
      return true
    })
    .map((token) => {
      // Apply any modifications
      return getTokenData(token)
    })
    .sort((a, b) => {
      // Apply sorting with proper type checking
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      // Convert to string to ensure consistent comparison
      const aStr = String(aValue)
      const bStr = String(bValue)
      return sortDirection === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // New column, default to descending for most metrics
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null

    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
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
            <Badge
              variant="outline"
              className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            >
              Admin
            </Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-sm font-medium hover:text-primary">
              Users
            </Link>
            <Link href="/admin/settings" className="text-sm font-medium hover:text-primary">
              Settings
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
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage platform tokens and performance</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <Alert className="mb-6">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Admin Access</AlertTitle>
            <AlertDescription>
              You have administrative privileges. Changes made here will affect the entire platform.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Tokens</CardDescription>
                <CardTitle className="text-3xl">{platformStats.totalTokens}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {platformStats.activeTokens} active, {platformStats.flaggedTokens} flagged
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">{platformStats.totalUsers.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Across all platform services</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>24h Volume</CardDescription>
                <CardTitle className="text-3xl">${platformStats.totalVolume24h.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Updated 5 minutes ago</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Market Cap</CardDescription>
                <CardTitle className="text-3xl">${platformStats.totalMarketCap.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Across all platform tokens</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tokens" className="w-full mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="tokens">All Tokens</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="tokens" className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tokens..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterNetwork} onValueChange={setFilterNetwork}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{filterNetwork === "all" ? "All Networks" : filterNetwork}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Networks</SelectItem>
                      <SelectItem value="Ethereum">Ethereum</SelectItem>
                      <SelectItem value="BSC">BSC</SelectItem>
                      <SelectItem value="Polygon">Polygon</SelectItem>
                      <SelectItem value="Avalanche">Avalanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTokens.length} of {allTokens.length} tokens
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center">Token {getSortIcon("name")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("network")}>
                        <div className="flex items-center">Network {getSortIcon("network")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                        <div className="flex items-center">Price {getSortIcon("price")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("marketCap")}>
                        <div className="flex items-center">Market Cap {getSortIcon("marketCap")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("change24h")}>
                        <div className="flex items-center">24h Change {getSortIcon("change24h")}</div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("volume24h")}>
                        <div className="flex items-center">Volume {getSortIcon("volume24h")}</div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.map((token) => (
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
                        <TableCell>${token.price.toFixed(6)}</TableCell>
                        <TableCell>${token.marketCap.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={token.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                            {token.change24h >= 0 ? "+" : ""}
                            {token.change24h}%
                          </span>
                        </TableCell>
                        <TableCell>${token.volume24h.toLocaleString()}</TableCell>
                        <TableCell>
                          {token.status === "active" ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            >
                              Flagged
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedToken(token)
                                setBuyDialogOpen(true)
                              }}
                            >
                              Buy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedToken(token)
                                setSellDialogOpen(true)
                              }}
                            >
                              Sell
                            </Button>
                            {token.status === "active" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                onClick={() => {
                                  setSelectedToken(token)
                                  setFlagDialogOpen(true)
                                }}
                              >
                                Flag
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performing Tokens</CardTitle>
                    <CardDescription>Tokens with highest 24h gains</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>24h Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allTokens
                          .sort((a, b) => b.change24h - a.change24h)
                          .slice(0, 5)
                          .map((token) => (
                            <TableRow key={token.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                      {token.symbol.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{token.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>${token.price.toFixed(6)}</TableCell>
                              <TableCell>
                                <span className="text-green-600">+{token.change24h}%</span>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Underperforming Tokens</CardTitle>
                    <CardDescription>Tokens with lowest 24h performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>24h Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allTokens
                          .sort((a, b) => a.change24h - b.change24h)
                          .slice(0, 5)
                          .map((token) => (
                            <TableRow key={token.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                      {token.symbol.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{token.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>${token.price.toFixed(6)}</TableCell>
                              <TableCell>
                                <span className="text-red-600">{token.change24h}%</span>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Volume Distribution</CardTitle>
                    <CardDescription>24h trading volume by network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Volume chart will be available after backend integration
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Growth</CardTitle>
                    <CardDescription>Token and user growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Growth chart will be available after backend integration
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Token Distribution</CardTitle>
                    <CardDescription>Distribution by network and type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                      <div className="text-center">
                        <PieChart className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Distribution chart will be available after backend integration
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Security</CardTitle>
                    <CardDescription>Security metrics and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-green-600" />
                          <span>Platform Security Status</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Secure
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-amber-600" />
                          <span>Admin Access Events</span>
                        </div>
                        <span>12 in last 24h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-red-600" />
                          <span>Flagged Tokens</span>
                        </div>
                        <span>{platformStats.flaggedTokens} tokens</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-blue-600" />
                          <span>System Health</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Optimal
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Token Management</CardTitle>
                  <CardDescription>Manage platform tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      toast({
                        title: "Adding new token",
                        description: "Redirecting to token creation interface",
                      })
                      router.push("/create")
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add New Token
                  </Button>
                  <Link href="/admin/token-management" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Manage Token Settings
                    </Button>
                  </Link>
                  <Link href="/admin/token-management?tab=token-approval" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-100"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      Review Flagged Tokens
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Management</CardTitle>
                  <CardDescription>Manage platform users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/admin/users" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users className="h-4 w-4" />
                      View All Users
                    </Button>
                  </Link>
                  <Link href="/admin/user-management" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Lock className="h-4 w-4" />
                      Manage Permissions
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      toast({
                        title: "Support tickets",
                        description: "Viewing user support tickets",
                      })
                    }}
                  >
                    <AlertCircle className="h-4 w-4" />
                    User Support Tickets
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Settings</CardTitle>
                  <CardDescription>Configure platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/admin/settings" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      General Settings
                    </Button>
                  </Link>
                  <Link href="/admin/settings?tab=fees" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <DollarSign className="h-4 w-4" />
                      Fee Configuration
                    </Button>
                  </Link>
                  <Link href="/admin/settings?tab=api" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Analytics Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Buy Dialog */}
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy {selectedToken.symbol} Tokens</DialogTitle>
            <DialogDescription>Purchase tokens for the platform treasury</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBuySubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="buyAmount">Amount to Buy</Label>
                <div className="flex">
                  <Input
                    id="buyAmount"
                    type="number"
                    placeholder="0.0"
                    className="rounded-r-none"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    required
                  />
                  <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted">
                    {selectedToken.symbol}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Token Information</Label>
                <div className="rounded-md border p-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Current Price:</span>
                    <span>${selectedToken.price.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">24h Change:</span>
                    <span className={selectedToken.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                      {selectedToken.change24h >= 0 ? "+" : ""}
                      {selectedToken.change24h}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span>{selectedToken.network}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Note: This is a demo. No actual tokens will be purchased.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Buy Tokens</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sell Dialog */}
      <Dialog open={sellDialogOpen} onOpenChange={setSellDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sell {selectedToken.symbol} Tokens</DialogTitle>
            <DialogDescription>Sell tokens from the platform treasury</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSellSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="sellAmount">Amount to Sell</Label>
                <div className="flex">
                  <Input
                    id="sellAmount"
                    type="number"
                    placeholder="0.0"
                    className="rounded-r-none"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    required
                  />
                  <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted">
                    {selectedToken.symbol}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Token Information</Label>
                <div className="rounded-md border p-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Current Price:</span>
                    <span>${selectedToken.price.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">24h Change:</span>
                    <span className={selectedToken.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                      {selectedToken.change24h >= 0 ? "+" : ""}
                      {selectedToken.change24h}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span>{selectedToken.network}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Note: This is a demo. No actual tokens will be sold.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Sell Tokens</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Flag Dialog */}
      <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flag {selectedToken.name}</DialogTitle>
            <DialogDescription>Flag this token for review or potential issues</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFlagToken}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="flagReason">Reason for Flagging</Label>
                <Select value={flagReason} onValueChange={setFlagReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                    <SelectItem value="compliance">Compliance Issues</SelectItem>
                    <SelectItem value="scam">Potential Scam</SelectItem>
                    <SelectItem value="manipulation">Market Manipulation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flagNotes">Additional Notes</Label>
                <Textarea
                  id="flagNotes"
                  placeholder="Provide details about the issue..."
                  rows={3}
                  value={flagNotes}
                  onChange={(e) => setFlagNotes(e.target.value)}
                />
              </div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Flagging a token will mark it for review and may affect its visibility on the platform.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button type="submit" variant="destructive">
                Flag Token
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

