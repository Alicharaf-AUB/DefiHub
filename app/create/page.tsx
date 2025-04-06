"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreateTokenPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const { toast } = useToast()

  // Form state
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    decimals: 18,
    totalSupply: 1000000,
    description: "",
    network: "ethereum",
    burnable: true,
    mintable: false,
    taxFee: 0,
    reflectionFee: 0,
    liquidityFee: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTokenData({
      ...tokenData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setTokenData({
      ...tokenData,
      [name]: checked,
    })
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setTokenData({
      ...tokenData,
      [name]: value[0],
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setTokenData({
      ...tokenData,
      [name]: value,
    })
  }

  const nextStep = async () => {
    if (currentStep === 1 && !isWalletConnected) {
      // Try to connect wallet automatically
      try {
        // Simulate wallet connection for demo purposes
        setIsWalletConnected(true)
        toast({
          title: "Wallet connected",
          description: "Demo wallet has been connected for testing",
        })
        // Proceed to next step after successful connection
        setCurrentStep(currentStep + 1)
      } catch (error) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to continue",
          variant: "destructive",
        })
      }
      return
    }

    if (currentStep === 2) {
      // Validate required fields
      if (!tokenData.name) {
        toast({
          title: "Missing information",
          description: "Token name is required",
          variant: "destructive",
        })
        return
      }

      if (!tokenData.symbol) {
        toast({
          title: "Missing information",
          description: "Token symbol is required",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const deployToken = async () => {
    toast({
      title: "Token deployment initiated",
      description: "Sending your token data to the backend...",
    })
  
    const token = localStorage.getItem("token")
  
    try {
      const response = await fetch("http://127.0.0.1:5000/create-coin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send the token to Flask
        },
        body: JSON.stringify(tokenData),
      })
  
      const result = await response.json()
  
      if (response.ok) {
        toast({
          title: "Token deployed successfully",
          description: `Token "${result.saved.name}" created!`,
        })
        window.location.href = "/dashboard"
      } else {
        toast({
          title: "Deployment failed",
          description: result.error || "Unknown error",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Unable to reach the backend server",
        variant: "destructive",
      })
    }
  }
  
  

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <WalletConnectButton />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create Your Token</h1>
        <p className="text-muted-foreground mb-8">
          Fill out the form below to create and deploy your own cryptocurrency.
        </p>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step < currentStep
                      ? "bg-purple-600 text-white dark:bg-purple-500"
                      : step === currentStep
                        ? "bg-purple-100 border-2 border-purple-600 text-purple-600 dark:bg-purple-950 dark:border-purple-400 dark:text-purple-400"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                <span className={`text-sm ${step === currentStep ? "font-medium" : "text-muted-foreground"}`}>
                  {step === 1 ? "Connect" : step === 2 ? "Basic Info" : step === 3 ? "Tokenomics" : "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-muted w-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-purple-600 dark:bg-purple-500 transition-all"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Connect Wallet */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>Connect your MetaMask wallet to create and deploy your token</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="mb-8 text-center">
                <p className="text-muted-foreground mb-4">You'll need a connected wallet to:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span>Deploy your token to the blockchain</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span>Pay network transaction fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span>Manage your token after deployment</span>
                  </li>
                </ul>
              </div>
              <WalletConnectButton />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={nextStep}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Basic Token Information */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Token Information</CardTitle>
              <CardDescription>Enter the basic details for your cryptocurrency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    Token Name
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. My Awesome Token"
                    value={tokenData.name}
                    onChange={handleInputChange}
                    required
                    className="border-input focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                  />
                  <p className="text-sm text-muted-foreground">The full name of your token</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol" className="flex items-center">
                    Token Symbol
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="symbol"
                    name="symbol"
                    placeholder="e.g. MAT"
                    value={tokenData.symbol}
                    onChange={handleInputChange}
                    required
                    className="border-input focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                  />
                  <p className="text-sm text-muted-foreground">A short abbreviation (2-6 characters)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalSupply" className="flex items-center">
                    Total Supply
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="totalSupply"
                    name="totalSupply"
                    type="number"
                    placeholder="1000000"
                    value={tokenData.totalSupply}
                    onChange={handleInputChange}
                    required
                    className="border-input focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                  />
                  <p className="text-sm text-muted-foreground">The total number of tokens to create</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decimals" className="flex items-center">
                    Decimals
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="decimals"
                    name="decimals"
                    type="number"
                    placeholder="18"
                    value={tokenData.decimals}
                    onChange={handleInputChange}
                    required
                    className="border-input focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                  />
                  <p className="text-sm text-muted-foreground">Divisibility of your token (usually 18)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="network" className="flex items-center">
                  Blockchain Network
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={tokenData.network} onValueChange={(value) => handleSelectChange("network", value)}>
                  <SelectTrigger className="border-input focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="avalanche">Avalanche</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">The blockchain where your token will be deployed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Token Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your token and its purpose..."
                  value={tokenData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="border-input focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400"
                />
                <p className="text-sm text-muted-foreground">A brief description of your token's purpose</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Tokenomics */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Tokenomics</CardTitle>
              <CardDescription>Configure the economic parameters of your token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="features">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="fees">Transaction Fees</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="space-y-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="burnable">Burnable</Label>
                      <p className="text-sm text-muted-foreground">Allow tokens to be burned (destroyed)</p>
                    </div>
                    <Switch
                      id="burnable"
                      checked={tokenData.burnable}
                      onCheckedChange={(checked) => handleSwitchChange("burnable", checked)}
                      className="data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-purple-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mintable">Mintable</Label>
                      <p className="text-sm text-muted-foreground">Allow new tokens to be created after deployment</p>
                    </div>
                    <Switch
                      id="mintable"
                      checked={tokenData.mintable}
                      onCheckedChange={(checked) => handleSwitchChange("mintable", checked)}
                      className="data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-purple-500"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="fees" className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="taxFee">Transaction Tax ({tokenData.taxFee}%)</Label>
                      <span className="text-sm text-muted-foreground">{tokenData.taxFee}%</span>
                    </div>
                    <Slider
                      id="taxFee"
                      min={0}
                      max={10}
                      step={0.5}
                      value={[tokenData.taxFee]}
                      onValueChange={(value) => handleSliderChange("taxFee", value)}
                      className="[&>span]:bg-purple-600 dark:[&>span]:bg-purple-500"
                    />
                    <p className="text-sm text-muted-foreground">Fee applied to each transaction</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reflectionFee">Reflection Fee ({tokenData.reflectionFee}%)</Label>
                      <span className="text-sm text-muted-foreground">{tokenData.reflectionFee}%</span>
                    </div>
                    <Slider
                      id="reflectionFee"
                      min={0}
                      max={10}
                      step={0.5}
                      value={[tokenData.reflectionFee]}
                      onValueChange={(value) => handleSliderChange("reflectionFee", value)}
                      className="[&>span]:bg-purple-600 dark:[&>span]:bg-purple-500"
                    />
                    <p className="text-sm text-muted-foreground">Fee redistributed to all token holders</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="liquidityFee">Liquidity Fee ({tokenData.liquidityFee}%)</Label>
                      <span className="text-sm text-muted-foreground">{tokenData.liquidityFee}%</span>
                    </div>
                    <Slider
                      id="liquidityFee"
                      min={0}
                      max={10}
                      step={0.5}
                      value={[tokenData.liquidityFee]}
                      onValueChange={(value) => handleSliderChange("liquidityFee", value)}
                      className="[&>span]:bg-purple-600 dark:[&>span]:bg-purple-500"
                    />
                    <p className="text-sm text-muted-foreground">Fee added to liquidity pool</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Review and Deploy */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review and Deploy</CardTitle>
              <CardDescription>Review your token details before deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-muted/50 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Token Name</h3>
                    <p>{tokenData.name || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Token Symbol</h3>
                    <p>{tokenData.symbol || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Supply</h3>
                    <p>{tokenData.totalSupply.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Decimals</h3>
                    <p>{tokenData.decimals}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Network</h3>
                    <p className="capitalize">{tokenData.network}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p>{tokenData.description || "No description provided"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Features</h3>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center gap-1 text-sm">
                        {tokenData.burnable ? (
                          <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <span className="h-4 w-4">-</span>
                        )}
                        Burnable
                      </li>
                      <li className="flex items-center gap-1 text-sm">
                        {tokenData.mintable ? (
                          <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <span className="h-4 w-4">-</span>
                        )}
                        Mintable
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Transaction Fees</h3>
                    <ul className="mt-1 space-y-1">
                      <li className="text-sm">Transaction Tax: {tokenData.taxFee}%</li>
                      <li className="text-sm">Reflection Fee: {tokenData.reflectionFee}%</li>
                      <li className="text-sm">Liquidity Fee: {tokenData.liquidityFee}%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-yellow-50 dark:bg-yellow-950 p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Important Note</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Deploying your token will require a transaction fee paid in the native currency of the selected
                    blockchain. Make sure your wallet has sufficient funds.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={deployToken}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Deploy Token
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

