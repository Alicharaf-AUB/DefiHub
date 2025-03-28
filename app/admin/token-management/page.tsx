"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ArrowLeft, Coins, Plus, ShieldAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

// Filter to only flagged tokens from the previous data
const flaggedTokens = [
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
]

export default function TokenManagementPage() {
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("token-approval")
  const [processedTokens, setProcessedTokens] = useState<string[]>([])

  // Settings states
  const [tokenSettings, setTokenSettings] = useState({
    requireApproval: true,
    maxSupply: "1000000000",
    maxSymbolLength: "6",
    enableBurning: true,
    enableMinting: true,
  })

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: "Token settings have been updated",
      })
    }, 1000)
  }

  const approveToken = (token: (typeof flaggedTokens)[0]) => {
    // Add token ID to processed tokens to remove it from the list
    setProcessedTokens([...processedTokens, token.id])

    toast({
      title: "Token approved",
      description: `${token.name} has been approved and is now active`,
    })
  }

  const rejectToken = (token: (typeof flaggedTokens)[0]) => {
    // Add token ID to processed tokens to remove it from the list
    setProcessedTokens([...processedTokens, token.id])

    toast({
      title: "Token rejected",
      description: `${token.name} has been rejected and marked as inactive`,
      variant: "destructive",
    })
  }

  // Filter out processed tokens
  const displayedTokens = flaggedTokens.filter((token) => !processedTokens.includes(token.id))

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center gap-2">
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
            <Link href="/admin" className="text-sm font-medium hover:text-primary">
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
              <h1 className="text-3xl font-bold tracking-tight">Token Management</h1>
              <p className="text-muted-foreground">Manage platform tokens and configure token settings</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/admin")}>
              Back to Dashboard
            </Button>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="token-approval">Token Approval</TabsTrigger>
              <TabsTrigger value="token-settings">Token Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="token-approval" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flagged Tokens</CardTitle>
                  <CardDescription>Review and approve or reject flagged tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  {displayedTokens.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Token</TableHead>
                          <TableHead>Creator</TableHead>
                          <TableHead>Network</TableHead>
                          <TableHead>Supply</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayedTokens.map((token) => (
                          <TableRow key={token.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{token.name}</p>
                                <p className="text-xs text-muted-foreground">{token.symbol}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{token.creator}</TableCell>
                            <TableCell>{token.network}</TableCell>
                            <TableCell>{token.supply}</TableCell>
                            <TableCell>${token.price.toFixed(6)}</TableCell>
                            <TableCell>{token.createdAt}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => approveToken(token)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => rejectToken(token)}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">No Flagged Tokens</h3>
                      <p className="text-muted-foreground">There are currently no tokens requiring review</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token Template</CardTitle>
                  <CardDescription>Create and manage token templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      className="gap-2"
                      onClick={() => {
                        toast({
                          title: "Template created",
                          description: "New token template has been created",
                        })
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Create New Template
                    </Button>
                  </div>
                  <div className="border rounded-md">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Available Templates</h3>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Standard ERC-20</p>
                            <p className="text-sm text-muted-foreground">Basic token with standard functionality</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Template edited",
                                description: "Standard ERC-20 template has been edited",
                              })
                            }}
                          >
                            Edit
                          </Button>
                        </li>
                        <li className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Reflection Token</p>
                            <p className="text-sm text-muted-foreground">
                              Token with automatic distribution to holders
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Template edited",
                                description: "Reflection Token template has been edited",
                              })
                            }}
                          >
                            Edit
                          </Button>
                        </li>
                        <li className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Liquidity Generator</p>
                            <p className="text-sm text-muted-foreground">Token with automatic liquidity generation</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Template edited",
                                description: "Liquidity Generator template has been edited",
                              })
                            }}
                          >
                            Edit
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="token-settings" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Creation Settings</CardTitle>
                  <CardDescription>Configure global token creation parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="token-settings-form" onSubmit={handleSaveSettings}>
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="require-approval">Require Token Approval</Label>
                          <p className="text-sm text-muted-foreground">Require admin approval before tokens go live</p>
                        </div>
                        <Switch
                          id="require-approval"
                          checked={tokenSettings.requireApproval}
                          onCheckedChange={(checked) =>
                            setTokenSettings({ ...tokenSettings, requireApproval: checked })
                          }
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="max-supply">Maximum Token Supply</Label>
                        <Input
                          id="max-supply"
                          type="number"
                          value={tokenSettings.maxSupply}
                          onChange={(e) => setTokenSettings({ ...tokenSettings, maxSupply: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">
                          Maximum supply limit for new tokens (0 for no limit)
                        </p>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="max-symbol">Maximum Symbol Length</Label>
                        <Input
                          id="max-symbol"
                          type="number"
                          value={tokenSettings.maxSymbolLength}
                          onChange={(e) => setTokenSettings({ ...tokenSettings, maxSymbolLength: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">Maximum length for token symbols</p>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-burning">Enable Token Burning</Label>
                          <p className="text-sm text-muted-foreground">Allow users to burn tokens</p>
                        </div>
                        <Switch
                          id="enable-burning"
                          checked={tokenSettings.enableBurning}
                          onCheckedChange={(checked) => setTokenSettings({ ...tokenSettings, enableBurning: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-minting">Enable Token Minting</Label>
                          <p className="text-sm text-muted-foreground">Allow users to mint new tokens after creation</p>
                        </div>
                        <Switch
                          id="enable-minting"
                          checked={tokenSettings.enableMinting}
                          onCheckedChange={(checked) => setTokenSettings({ ...tokenSettings, enableMinting: checked })}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" form="token-settings-form" disabled={saving}>
                    {saving ? "Saving..." : "Save Settings"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contract Security</CardTitle>
                  <CardDescription>Configure security settings for token contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Anti-Bot Protection</Label>
                        <p className="text-sm text-muted-foreground">Add anti-bot measures to token contracts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Ownership Renounce Option</Label>
                        <p className="text-sm text-muted-foreground">Allow users to renounce contract ownership</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="default-taxes">Default Maximum Tax</Label>
                      <Input id="default-taxes" type="number" defaultValue="10" />
                      <p className="text-sm text-muted-foreground">Maximum transaction tax percentage allowed</p>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="blacklist-template">Default Blacklist Addresses</Label>
                      <Textarea id="blacklist-template" placeholder="0x1234...&#10;0xabcd..." rows={3} />
                      <p className="text-sm text-muted-foreground">
                        Addresses to blacklist by default in new tokens (one per line)
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Security settings saved",
                        description: "Contract security settings have been updated",
                      })
                    }}
                  >
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

