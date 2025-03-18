"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Info, Video, Users, LinkIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ConnectButton } from "@suiet/wallet-kit"

export default function NewMeetingPage() {
  const [meetingType, setMeetingType] = useState("30-min")
  const [location, setLocation] = useState("video")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">New Meeting</h1>
          <Info className="h-4 w-4 text-gray-400" />
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

      {/* Content */}
      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-6">Create a new meeting</h2>

          <div className="space-y-6">
            {/* Meeting Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Title</label>
              <Input placeholder="e.g., Project Discussion" className="h-12" />
            </div>

            {/* Meeting Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Type</label>
              <div className="grid grid-cols-3 gap-3">
                {["15-min", "30-min", "60-min"].map((type) => (
                  <button
                    key={type}
                    className={cn(
                      "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                      meetingType === type ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                    )}
                    onClick={() => setMeetingType(type)}
                  >
                    <Clock className={cn("h-6 w-6", meetingType === type ? "text-blue-500" : "text-gray-500")} />
                    <span
                      className={cn("text-sm font-medium", meetingType === type ? "text-blue-500" : "text-gray-700")}
                    >
                      {type} Meeting
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    location === "video" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                  )}
                  onClick={() => setLocation("video")}
                >
                  <Video className={cn("h-6 w-6", location === "video" ? "text-blue-500" : "text-gray-500")} />
                  <span className={cn("text-sm font-medium", location === "video" ? "text-blue-500" : "text-gray-700")}>
                    Sui Video
                  </span>
                </button>

                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    location === "in-person" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                  )}
                  onClick={() => setLocation("in-person")}
                >
                  <Users className={cn("h-6 w-6", location === "in-person" ? "text-blue-500" : "text-gray-500")} />
                  <span
                    className={cn("text-sm font-medium", location === "in-person" ? "text-blue-500" : "text-gray-700")}
                  >
                    In Person
                  </span>
                </button>

                <button
                  className={cn(
                    "border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors",
                    location === "custom" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50",
                  )}
                  onClick={() => setLocation("custom")}
                >
                  <LinkIcon className={cn("h-6 w-6", location === "custom" ? "text-blue-500" : "text-gray-500")} />
                  <span
                    className={cn("text-sm font-medium", location === "custom" ? "text-blue-500" : "text-gray-700")}
                  >
                    Custom Link
                  </span>
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>Next 60 days</span>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>

            {/* Meeting Fee */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Fee (Optional)</label>
              <div className="relative">
                <Input placeholder="0.00" className="h-12 pl-8" />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <select className="border-none bg-transparent text-gray-500 focus:outline-none">
                    <option>USD</option>
                    <option>SUI</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <textarea
                className="w-full border rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add details about this meeting..."
              />
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">Create Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

