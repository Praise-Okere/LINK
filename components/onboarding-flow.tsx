"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useWallet } from "@suiet/wallet-kit"
import { toast } from "sonner"

// Import the ConnectButton from Mysten/Sui
import { ConnectButton } from "@suiet/wallet-kit"

interface OnboardingFlowProps {
  onComplete: () => void
  walletAddress: string
}

export default function OnboardingFlow({ onComplete, walletAddress }: OnboardingFlowProps) {
  const { connected, account } = useWallet()
  const [step, setStep] = useState(1)
  const [suiNames, setSuiNames] = useState<string[]>([])
  const [selectedSuiName, setSelectedSuiName] = useState<string>("")
  const [isLoadingNames, setIsLoadingNames] = useState(false)
  const [showNameDropdown, setShowNameDropdown] = useState(false)
  const [meetingFee, setMeetingFee] = useState("135.5")
  const [currency, setCurrency] = useState<"SUI" | "USD">("SUI")

  const totalSteps = 3

  useEffect(() => {
    if (connected && account?.address) {
      fetchSuiNames(account.address)
    }
  }, [connected, account])

  const fetchSuiNames = async (address: string) => {
    setIsLoadingNames(true)
    try {
      // In a real implementation, this would call the Sui RPC to get names
      // For this demo, we'll simulate with mock data
      setTimeout(() => {
        const mockNames = ["smbrian.sui", "samb.sui", "sambrian.sui"]
        setSuiNames(mockNames)
        setSelectedSuiName(mockNames[0])
        setIsLoadingNames(false)
      }, 1500)
    } catch (error) {
      console.error("Error fetching Sui names:", error)
      toast.error("Failed to fetch Sui names")
      setIsLoadingNames(false)
    }
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">1-on-1 Meeting</h1>
          <Info className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-blue-500 ml-2">
            click{" "}
            <Link href="#" className="underline">
              here
            </Link>{" "}
            to change meeting type
          </span>
        </div>
        <ConnectButton>
          {({ connecting, connect, connected, account }) => (
            <Button
              className="bg-blue-600 hover:bg-blue-700 font-space-grotesk"
              onClick={connect}
              disabled={connecting || connected}
            >
              {connecting ? (
                <span className="flex items-center gap-2">Connecting...</span>
              ) : connected ? (
                <span className="flex items-center gap-2">
                  Connected <span className="ml-1 h-2 w-2 rounded-full bg-green-400"></span>
                </span>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          )}
        </ConnectButton>
      </header>

      {/* Progress indicator */}
      <div className="border-b py-6 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">Complete your account setup</h2>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-lg font-medium">
            ({step}/{totalSteps})
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto w-full">
        {step === 1 && (
          <div className="w-full">
            <h3 className="text-xl font-medium text-center mb-10">Link your Sui NS</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-4">
                {isLoadingNames ? (
                  <div className="h-12 px-4 rounded-full border flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                      <span>Loading Sui names...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Input
                      value={selectedSuiName}
                      onChange={(e) => setSelectedSuiName(e.target.value)}
                      className="h-12 px-4 rounded-full"
                      onClick={() => setShowNameDropdown(true)}
                      readOnly
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white px-2">
                      <button
                        className="flex items-center gap-1 text-sm text-gray-500 border rounded-full px-2 py-1"
                        onClick={() => setShowNameDropdown(!showNameDropdown)}
                      >
                        <span>View all names</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {showNameDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                        {suiNames.map((name) => (
                          <button
                            key={name}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center justify-between"
                            onClick={() => {
                              setSelectedSuiName(name)
                              setShowNameDropdown(false)
                            }}
                          >
                            <span>{name}</span>
                            {name === selectedSuiName && <Check className="h-4 w-4 text-blue-500" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-2 h-12 w-full max-w-md"
                disabled={isLoadingNames || !selectedSuiName}
              >
                Use as Profile Name
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full">
            <h3 className="text-xl font-medium text-center mb-10">Set your availability</h3>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">Working hours</h4>
                <div className="space-y-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <span>{day}</span>
                      <div className="flex items-center gap-2">
                        <select className="border rounded p-2 text-sm">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <option key={`start-${i}`} value={i} selected={i === 9}>
                              {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                            </option>
                          ))}
                        </select>
                        <span>to</span>
                        <select className="border rounded p-2 text-sm">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <option key={`end-${i}`} value={i} selected={i === 17}>
                              {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                            </option>
                          ))}
                        </select>
                        <div className="h-5 w-10 rounded-full bg-blue-500 flex items-center p-1">
                          <div className="h-3 w-3 rounded-full bg-white ml-auto"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {["Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <span>{day}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Unavailable</span>
                        <div className="h-5 w-10 rounded-full bg-gray-200 flex items-center p-1">
                          <div className="h-3 w-3 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-2 h-12 w-full">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full">
            <h3 className="text-xl font-medium text-center mb-10">Set your meeting fee</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-6">
                <Input
                  type="number"
                  value={meetingFee}
                  onChange={(e) => setMeetingFee(e.target.value)}
                  className="h-12 px-4 rounded-full"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      className={cn(
                        "px-4 py-1 text-sm",
                        currency === "SUI" ? "bg-black text-white" : "bg-white text-black",
                      )}
                      onClick={() => setCurrency("SUI")}
                    >
                      SUI
                    </button>
                    <button
                      className={cn(
                        "px-4 py-1 text-sm",
                        currency === "USD" ? "bg-black text-white" : "bg-white text-black",
                      )}
                      onClick={() => setCurrency("USD")}
                    >
                      USD
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-6 text-center">
                All payments are processed on the Sui blockchain.
                {currency === "USD" && " USD values will be converted to SUI at the current exchange rate."}
              </div>
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-2 h-12 w-full max-w-md"
              >
                Set Meeting Fee
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="border-t p-4 flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("h-2 w-2 rounded-full", step === i + 1 ? "bg-blue-600" : "bg-gray-300")} />
          ))}
        </div>
      </div>
    </div>
  )
}

