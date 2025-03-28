"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WalletConnectButton() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  // Check if MetaMask is installed and connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          // Check if already connected
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    const handleAccountsChanged = (newAccounts: string[]) => {
      if (newAccounts.length === 0) {
        setAccount(null)
        toast({
          title: "Wallet disconnected",
          description: "Your wallet has been disconnected",
        })
      } else {
        setAccount(newAccounts[0])
      }
    }

    const handleChainChanged = () => {
      window.location.reload()
    }

    checkConnection()

    // Only add event listeners if ethereum exists
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      // Cleanup function
      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [toast])

  const connectWallet = async () => {
    if (typeof window === "undefined") return

    // Check if MetaMask is installed
    if (!window.ethereum) {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive",
      })
      // Open MetaMask website in a new tab
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    try {
      setIsConnecting(true)

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        toast({
          title: "Wallet connected",
          description: "Your MetaMask wallet has been connected successfully",
        })

        // Return the connected account for external use
        return accounts[0]
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to your MetaMask wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }

    return null
  }

  const disconnectWallet = () => {
    // Note: MetaMask doesn't support programmatic disconnection
    // We can only clear our local state
    setAccount(null)
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected from this site",
    })
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return account ? (
    <Button variant="outline" size="sm" className="gap-2" onClick={disconnectWallet}>
      <Wallet className="h-4 w-4" />
      {formatAddress(account)}
    </Button>
  ) : (
    <Button variant="outline" size="sm" className="gap-2" onClick={connectWallet} disabled={isConnecting}>
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}

