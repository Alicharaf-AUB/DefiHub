"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Coins, Globe, Info, Mail, ServerCog } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "DeFi Builder",
    supportEmail: "support@defibuilder.com",
    maintenanceMode: false,
    maxTokensPerUser: "10",
    defaultNetwork: "Ethereum",
  })

  const [feeSettings, setFeeSettings] = useState({
    basicFee: "0",
    proFee: "49",
    enterpriseFee: "199",
    transactionFee: "0.5",
  })

  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    rateLimit: "100",
    webhookUrl: "",
  })

  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: "General settings have been updated",
      })
    }, 1000)
  }

  const handleSaveFeeSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Fee settings saved",
        description: "Platform fee settings have been updated",
      })
    }, 1000)
  }

  const handleSaveApiSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "API settings saved",
        description: "API configuration has been updated",
      })
    }, 1000)
  }

  const clearCache = () => {
    toast({
      title: "Cache cleared",
      description: "System cache has been cleared successfully",
    })
  }

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
            <Link href="/admin/settings" className="text-sm font-medium text-primary">
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
              <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
              <p className="text-muted-foreground">Configure and manage platform settings</p>
            </div>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Administrator Access</AlertTitle>
            <AlertDescription>
              Changes made here will affect the entire platform. Please be careful when modifying these settings.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="fees">Fees & Pricing</TabsTrigger>
              <TabsTrigger value="api">API & Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage basic platform configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="general-form" onSubmit={handleSaveGeneralSettings}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input
                          id="platform-name"
                          value={generalSettings.platformName}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input
                          id="support-email"
                          type="email"
                          value={generalSettings.supportEmail}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="max-tokens">Maximum Tokens Per User</Label>
                        <Input
                          id="max-tokens"
                          type="number"
                          value={generalSettings.maxTokensPerUser}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, maxTokensPerUser: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">
                          Maximum number of tokens a standard user can create (0 for unlimited)
                        </p>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="default-network">Default Network</Label>
                        <Select
                          value={generalSettings.defaultNetwork}
                          onValueChange={(value) => setGeneralSettings({ ...generalSettings, defaultNetwork: value })}
                        >
                          <SelectTrigger id="default-network">
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ethereum">Ethereum</SelectItem>
                            <SelectItem value="BSC">Binance Smart Chain</SelectItem>
                            <SelectItem value="Polygon">Polygon</SelectItem>
                            <SelectItem value="Avalanche">Avalanche</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable to put the platform into maintenance mode
                          </p>
                        </div>
                        <Switch
                          id="maintenance-mode"
                          checked={generalSettings.maintenanceMode}
                          onCheckedChange={(checked) =>
                            setGeneralSettings({ ...generalSettings, maintenanceMode: checked })
                          }
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" form="general-form" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure platform security options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for admin actions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Token Approval</Label>
                        <p className="text-sm text-muted-foreground">Require admin approval for new tokens</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Suspicious Activity Detection</Label>
                        <p className="text-sm text-muted-foreground">Automatically flag suspicious user actions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="grid gap-3">
                      <Label>System Cache</Label>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Clear system cache to refresh platform data</p>
                        <Button variant="outline" onClick={clearCache}>
                          Clear Cache
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Plans</CardTitle>
                  <CardDescription>Configure platform subscription pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="fee-form" onSubmit={handleSaveFeeSettings}>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="basic-fee">Basic Plan ($)</Label>
                        <Input
                          id="basic-fee"
                          type="number"
                          value={feeSettings.basicFee}
                          onChange={(e) => setFeeSettings({ ...feeSettings, basicFee: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">Price for the Basic plan (0 for free)</p>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="pro-fee">Pro Plan ($)</Label>
                        <Input
                          id="pro-fee"
                          type="number"
                          value={feeSettings.proFee}
                          onChange={(e) => setFeeSettings({ ...feeSettings, proFee: e.target.value })}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="enterprise-fee">Enterprise Plan ($)</Label>
                        <Input
                          id="enterprise-fee"
                          type="number"
                          value={feeSettings.enterpriseFee}
                          onChange={(e) => setFeeSettings({ ...feeSettings, enterpriseFee: e.target.value })}
                        />
                      </div>

                      <Separator />

                      <div className="grid gap-3">
                        <Label htmlFor="transaction-fee">Platform Transaction Fee (%)</Label>
                        <Input
                          id="transaction-fee"
                          type="number"
                          step="0.1"
                          value={feeSettings.transactionFee}
                          onChange={(e) => setFeeSettings({ ...feeSettings, transactionFee: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">Platform fee applied to token transactions</p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" form="fee-form" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateways</CardTitle>
                  <CardDescription>Configure platform payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Credit Card Payments</Label>
                        <p className="text-sm text-muted-foreground">Accept credit card payments through Stripe</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cryptocurrency Payments</Label>
                        <p className="text-sm text-muted-foreground">Accept payments in ETH, BNB, and stablecoins</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>PayPal Payments</Label>
                        <p className="text-sm text-muted-foreground">Accept payments through PayPal</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Configure API access and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="api-form" onSubmit={handleSaveApiSettings}>
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>API Access</Label>
                          <p className="text-sm text-muted-foreground">Enable or disable platform API access</p>
                        </div>
                        <Switch
                          checked={apiSettings.apiEnabled}
                          onCheckedChange={(checked) => setApiSettings({ ...apiSettings, apiEnabled: checked })}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                        <Input
                          id="rate-limit"
                          type="number"
                          value={apiSettings.rateLimit}
                          onChange={(e) => setApiSettings({ ...apiSettings, rateLimit: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">Maximum API requests per minute per user</p>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://your-webhook.com/endpoint"
                          value={apiSettings.webhookUrl}
                          onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">URL to receive platform event notifications</p>
                      </div>

                      <Separator />

                      <div>
                        <Label>API Key Management</Label>
                        <div className="mt-3 p-4 border rounded-md">
                          <p className="text-sm">Your API Key</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Input readOnly value="dfi_a1b2c3d4e5f6g7h8i9j0" type="password" />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "API key regenerated",
                                  description: "Your new API key has been generated",
                                })
                              }}
                            >
                              Regenerate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" form="api-form" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Settings</CardTitle>
                  <CardDescription>Configure third-party service integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Blockchain Explorer</p>
                          <p className="text-sm text-muted-foreground">Integration with Etherscan, BSCScan, etc.</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Integration configured",
                            description: "Blockchain explorer integration updated",
                          })
                        }}
                      >
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ServerCog className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Node Providers</p>
                          <p className="text-sm text-muted-foreground">Configure RPC endpoints for each network</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Integration configured",
                            description: "Node provider settings updated",
                          })
                        }}
                      >
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Email Service</p>
                          <p className="text-sm text-muted-foreground">Configure email service for notifications</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Integration configured",
                            description: "Email service settings updated",
                          })
                        }}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

