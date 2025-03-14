"use client"

import { useState } from "react"

export default function TokenCreationForm() {
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [totalSupply, setTotalSupply] = useState("")
  const [decimals, setDecimals] = useState("")
  const [tokenType, setTokenType] = useState("")
  const [error, setError] = useState("")

  // Network-specific options
  const networkOptions = {
    ethereum: {
      tokenTypes: ["ERC20", "ERC721", "ERC1155"],
      defaultDecimals: "18",
      maxDecimals: "18",
    },
    solana: {
      tokenTypes: ["SPL", "Metaplex NFT"],
      defaultDecimals: "9",
      maxDecimals: "9",
    },
    bitcoin: {
      tokenTypes: ["Ordinals", "RGB", "BRC-20"],
      defaultDecimals: "8",
      maxDecimals: "8",
    },
  }

  // Set default values when network changes
  const handleNetworkChange = (network) => {
    setSelectedNetwork(network)
    setTokenType(networkOptions[network].tokenTypes[0])
    setDecimals(networkOptions[network].defaultDecimals)
  }

  const handleCreateToken = async (e) => {
    e.preventDefault()
    setError("")

    try {
      // Here you would implement the token creation logic
      console.log({
        network: selectedNetwork,
        tokenName,
        tokenSymbol,
        totalSupply,
        decimals,
        tokenType,
      })
      // Redirect or show success message
    } catch (err) {
      setError("Failed to create token. Please try again.")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Crystals */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute crystal-bg"
            style={{
              "--scale": `${0.5 + Math.random() * 1.5}`,
              "--rotation": `${Math.random() * 360}deg`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 5}s`,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="crystal-svg">
              <path
                d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z"
                fill="url(#crystalGradient)"
                className="crystal-path"
              />
              <defs>
                <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                  <stop offset="50%" stopColor="rgba(124, 58, 237, 0.2)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="absolute inset-0 grid-overlay">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{
              "--index": i,
              "--total": 20,
            }}
          />
        ))}
      </div>

      {/* Token Creation Form */}
      <div className="relative z-10 w-full max-w-2xl mx-auto p-8 rounded-2xl bg-purple-900/20 border border-purple-500/30 backdrop-blur-md">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400">
          Create Your Token
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">{error}</div>
        )}

        {/* Network Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {["ethereum", "solana", "bitcoin"].map((network) => (
            <button
              key={network}
              type="button"
              onClick={() => handleNetworkChange(network)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                selectedNetwork === network
                  ? "bg-purple-600 border-2 border-purple-400"
                  : "bg-purple-900/30 border border-purple-500/30 hover:bg-purple-900/50"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-xl mb-2">{network === "ethereum" ? "⟠" : network === "solana" ? "◎" : "₿"}</span>
                <span className="capitalize">{network}</span>
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={handleCreateToken} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tokenName" className="block text-purple-300 mb-2">
                Token Name
              </label>
              <input
                id="tokenName"
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder="e.g. My Awesome Token"
                required
              />
            </div>
            <div>
              <label htmlFor="tokenSymbol" className="block text-purple-300 mb-2">
                Token Symbol
              </label>
              <input
                id="tokenSymbol"
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder="e.g. MAT"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="totalSupply" className="block text-purple-300 mb-2">
                Total Supply
              </label>
              <input
                id="totalSupply"
                type="text"
                value={totalSupply}
                onChange={(e) => setTotalSupply(e.target.value)}
                className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                placeholder="e.g. 1000000"
                required
              />
            </div>
            <div>
              <label htmlFor="decimals" className="block text-purple-300 mb-2">
                Decimals
              </label>
              <select
                id="decimals"
                value={decimals}
                onChange={(e) => setDecimals(e.target.value)}
                className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                required
              >
                {Array.from({ length: Number.parseInt(networkOptions[selectedNetwork].maxDecimals) + 1 }, (_, i) => (
                  <option key={i} value={i}>
                    {i} {i === Number.parseInt(networkOptions[selectedNetwork].defaultDecimals) && "(Standard)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tokenType" className="block text-purple-300 mb-2">
              Token Type
            </label>
            <select
              id="tokenType"
              value={tokenType}
              onChange={(e) => setTokenType(e.target.value)}
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
              required
            >
              <option value="" disabled>
                Select Token Type
              </option>
              {networkOptions[selectedNetwork].tokenTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-purple-600 rounded-lg group hover:bg-purple-500 transition-all duration-500"
          >
            <span className="relative inline-flex items-center">
              <span className="animate-pulse-slow absolute inset-0 rounded-lg bg-purple-400/30 group-hover:bg-purple-400/50 transition-all duration-500"></span>
              <span className="relative">Create Token</span>
            </span>
          </button>
        </form>
      </div>

      {/* Animations */}
      <style jsx>{`
        /* Crystal Animations */
        .crystal-bg {
          position: absolute;
          left: var(--x);
          top: var(--y);
          transform: scale(var(--scale)) rotate(var(--rotation)) translateZ(0);
          transform-origin: center;
          animation: float-crystal 8s ease-in-out infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }

        .crystal-svg {
          filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
        }

        .crystal-path {
          animation: crystal-pulse 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes float-crystal {
          0%, 100% {
            transform: scale(var(--scale)) rotate(var(--rotation)) translateZ(0) translateY(0);
          }
          50% {
            transform: scale(var(--scale)) rotate(calc(var(--rotation) + 10deg)) translateZ(0) translateY(-30px);
          }
        }

        @keyframes crystal-pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        /* Grid Overlay */
        .grid-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1) 20%, rgba(139, 92, 246, 0.1) 80%, transparent);
          height: 1px;
          width: 100%;
          top: calc(var(--index) / var(--total) * 100%);
          animation: grid-fade 2s ease-out forwards;
          opacity: 0;
          animation-delay: calc(var(--index) * 0.1s);
        }

        @keyframes grid-fade {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 0.5;
            transform: translateX(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

