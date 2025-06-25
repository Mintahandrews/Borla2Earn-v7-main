"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowUpDown, TrendingUp, Info, ExternalLink, Coins, DollarSign } from "lucide-react"

interface SwapRate {
  currency: string
  rate: number
  symbol: string
  icon: string
}

const swapRates: SwapRate[] = [
  { currency: "GHS", rate: 0.85, symbol: "₵", icon: "🇬🇭" },
  { currency: "USD", rate: 0.12, symbol: "$", icon: "🇺🇸" },
  { currency: "EUR", rate: 0.11, symbol: "€", icon: "🇪🇺" },
  { currency: "USDC", rate: 0.12, symbol: "USDC", icon: "💰" },
  { currency: "CELO", rate: 0.15, symbol: "CELO", icon: "🌱" },
]

interface TokenSwapWidgetProps {
  userBalance?: number
  compact?: boolean
}

export function TokenSwapWidget({ userBalance = 156.7, compact = false }: TokenSwapWidgetProps) {
  const [swapAmount, setSwapAmount] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("GHS")
  const [isSwapping, setIsSwapping] = useState(false)

  const selectedRate = swapRates.find((rate) => rate.currency === selectedCurrency)
  const convertedAmount = swapAmount ? (Number.parseFloat(swapAmount) * (selectedRate?.rate || 0)).toFixed(2) : "0.00"
  const maxSwappable = Math.floor(userBalance * 0.9) // Allow swapping 90% of balance

  const handleMaxClick = () => {
    setSwapAmount(maxSwappable.toString())
  }

  const handleSwap = async () => {
    if (!swapAmount || Number.parseFloat(swapAmount) <= 0) return

    setIsSwapping(true)
    // Simulate swap transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSwapping(false)

    // Reset form
    setSwapAmount("")
    alert(`Successfully swapped ${swapAmount} BORLA for ${convertedAmount} ${selectedRate?.symbol}`)
  }

  if (compact) {
    return (
      <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-gray-900">Token Value</span>
            </div>
            <Badge variant="secondary">Live Rate</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Your Balance</span>
              <span className="font-bold text-lg">{userBalance} BORLA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Value</span>
              <span className="font-medium text-green-600">
                ≈ {selectedRate?.symbol}
                {(userBalance * (selectedRate?.rate || 0)).toFixed(2)}
              </span>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-3">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Quick Swap
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-blue-600" />
          Token Swap
        </CardTitle>
        <CardDescription>Convert your BORLA tokens to fiat currency or other cryptocurrencies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Balance */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Available Balance</p>
              <p className="text-2xl font-bold text-green-800">{userBalance} BORLA</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600">Max Swappable</p>
              <p className="text-lg font-medium text-green-700">{maxSwappable} BORLA</p>
            </div>
          </div>
        </div>

        {/* Swap Interface */}
        <div className="space-y-4">
          {/* From */}
          <div>
            <Label htmlFor="swap-amount">From (BORLA)</Label>
            <div className="flex gap-2">
              <Input
                id="swap-amount"
                type="number"
                placeholder="0.00"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                max={maxSwappable}
              />
              <Button variant="outline" onClick={handleMaxClick}>
                Max
              </Button>
            </div>
          </div>

          {/* Swap Direction Indicator */}
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowUpDown className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* To */}
          <div>
            <Label htmlFor="currency-select">To</Label>
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {swapRates.map((rate) => (
                  <SelectItem key={rate.currency} value={rate.currency}>
                    <div className="flex items-center gap-2">
                      <span>{rate.icon}</span>
                      <span>{rate.currency}</span>
                      <span className="text-gray-500">({rate.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Result */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">You will receive:</span>
              <span className="text-xl font-bold text-gray-900">
                {selectedRate?.symbol}
                {convertedAmount}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Exchange Rates */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Current Exchange Rates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {swapRates.map((rate) => (
              <div
                key={rate.currency}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedCurrency === rate.currency
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedCurrency(rate.currency)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{rate.icon}</span>
                    <span className="font-medium">{rate.currency}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    1 BORLA = {rate.symbol}
                    {rate.rate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={
            !swapAmount ||
            Number.parseFloat(swapAmount) <= 0 ||
            Number.parseFloat(swapAmount) > maxSwappable ||
            isSwapping
          }
          className="w-full"
        >
          {isSwapping ? (
            "Processing Swap..."
          ) : (
            <>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap {swapAmount || "0"} BORLA
            </>
          )}
        </Button>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Swap Information:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Minimum swap amount: 10 BORLA</li>
                <li>Transaction fee: 2% (included in rate)</li>
                <li>Processing time: 1-3 business days for fiat</li>
                <li>Instant for cryptocurrency swaps</li>
              </ul>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on DEX
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <DollarSign className="w-4 h-4 mr-2" />
            Price History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
