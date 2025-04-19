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
import { useEffect } from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar, 
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import dayjs from "dayjs"



export default function AdminPage() {
  const [tokens, setTokens] = useState<any[]>([])
  const [selectedToken, setSelectedToken] = useState<any | null>(null)
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
  const [authorized, setAuthorized] = useState(false)
  const [modifiedTokens, setModifiedTokens] = useState<Record<string, any>>({})

  
// Platform statistics
const platformStats = {
  totalTokens: tokens.length,
  totalUsers: 1245, // you can fetch this later via /admin/users
  totalVolume24h: tokens.reduce((sum, t) => sum + (t.volume24h || 0), 0),
  totalMarketCap: tokens.reduce((sum, t) => sum + (t.marketCap || 0), 0),
  activeTokens: tokens.filter((t) => t.status === "active").length,
  flaggedTokens: tokens.filter((t) => t.status === "flagged").length,
}

const volumeByNetwork = Object.entries(
  tokens.reduce((acc: Record<string, number>, token) => {
    const net = token.network || "Unknown"
    acc[net] = (acc[net] || 0) + (token.volume24h || 0)
    return acc
  }, {})
).map(([network, volume]) => ({ network, volume }))

const statusCounts = tokens.reduce((acc: Record<string, number>, token) => {
  const status = token.status || "unknown"
  acc[status] = (acc[status] || 0) + 1
  return acc
}, {})

const statusData = Object.entries(statusCounts).map(([status, value]) => ({
  name: status.charAt(0).toUpperCase() + status.slice(1),
  value,
}))

const COLORS = ["#a855f7", "#c084fc", "#d8b4fe", "#ede9fe"]

const tokenCreationStats = tokens.reduce((acc: Record<string, number>, token) => {
  const createdDate = token.created_at?.split("T")[0] || token.created_at?.split(" ")[0] || "Unknown"
  const date = dayjs(createdDate).format("YYYY-MM-DD")
  acc[date] = (acc[date] || 0) + 1
  return acc
}, {})

const creationData = Object.entries(tokenCreationStats)
  .sort(([a], [b]) => a.localeCompare(b)) // sort by date ascending
  .map(([date, count]) => ({ date, count }))




useEffect(() => {
  const mockEnrichTokens = (tokens: any[]) => {
    return tokens.map((t) => {
      const price = Number((Math.random() * 0.01).toFixed(6)) // $0.000001 to $0.01
      const volume24h = Math.floor(Math.random() * 10000)
      const change24h = Number(((Math.random() - 0.5) * 20).toFixed(2)) // -10% to +10%
      const marketCap = Math.floor(price * (t.total_supply || 1000000))
      const status = Math.random() < 0.1 ? "flagged" : "active"

      return {
        ...t,
        price,
        volume24h,
        change24h,
        marketCap,
        status,
      }
    })
  }

  const fetchTokens = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:5000/coins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      const enriched = mockEnrichTokens(data)
      setTokens(enriched)
      if (enriched.length > 0) setSelectedToken(enriched[0])
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load tokens",
        variant: "destructive",
      })
    }
  }

  fetchTokens()
}, [])

  

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
      holders: ((parseInt(selectedToken.holders ?? "0") || 0) + 1).toString(),
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
    const rows = tokens
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
  const getTokenData = (token: (typeof tokens)[0]) => {
    return modifiedTokens[token.id] || token
  }

  // Sort and filter tokens
  const filteredTokens = tokens
    .filter((token) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          token.name?.toLowerCase().includes(query) ||
          token.symbol?.toLowerCase().includes(query) ||
          token.creator?.toLowerCase().includes(query)
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("isAdmin") === "true"

    if (!token || !isAdmin) {
      router.push("/admin-login") // redirect if not admin
    } else {
      setAuthorized(true)
    }
  }, [])

  if (!authorized) return null

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
                  Showing {filteredTokens.length} of {tokens.length} tokens
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
                        <TableCell>
                          {typeof token.price === "number" ? `$${token.price.toFixed(6)}` : "N/A"}
                        </TableCell>
                        <TableCell>
                          {typeof token.marketCap === "number" ? `$${token.marketCap.toLocaleString()}` : "N/A"}
                        </TableCell>

                        <TableCell>
                          <span className={token.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                            {token.change24h >= 0 ? "+" : ""}
                            {token.change24h}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {typeof token.volume24h === "number" ? `$${token.volume24h.toLocaleString()}` : "N/A"}
                        </TableCell>

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
                        {tokens
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
                              <TableCell>
                          {typeof token.price === "number" ? `$${token.price.toFixed(6)}` : "N/A"}
                        </TableCell>
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
                        {tokens
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
                              <TableCell>
                          {typeof token.price === "number" ? `$${token.price.toFixed(6)}` : "N/A"}
                        </TableCell>
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
      {volumeByNetwork.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={volumeByNetwork}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="network" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="volume" fill="#6b46c1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
      ) : (
        <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">No data to show</p>
          </div>
        </div>
      )}
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
                    {creationData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={creationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                  </RechartsLineChart>
                  </ResponsiveContainer>
                      ) : (
                     <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                      <p className="text-muted-foreground">No tokens created yet</p>
                    </div>
                    )}
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Token Status Breakdown</CardTitle>
                    <CardDescription>Highlights active vs flagged tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
  {statusData.length > 0 ? (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  ) : (
    <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
      <p className="text-muted-foreground">No data to display</p>
    </div>
  )}
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
      {selectedToken && (
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
                <span>${selectedToken.price?.toFixed(6)}</span>
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
)}


      {/* Sell Dialog */}
      {selectedToken && (
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
                    <span>
                      {typeof selectedToken.price === "number"
                      ? `$${selectedToken.price.toFixed(6)}`
                     : "N/A"}
                    </span>
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
      )}

      {/* Flag Dialog */}
      {selectedToken && (
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
      )}

      <Footer />
    </div>
  )
}

