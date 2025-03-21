"use client"

import { Button } from "@/components/ui/button"
import { Check, Info, Plus, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Import the ConnectButton from Mysten/Sui
import { ConnectButton } from "@suiet/wallet-kit"

export default function MeetingRequestsPage() {
  const meetingRequests = [
    {
      id: 1,
      name: "Alex Johnson",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "30-min Meeting",
      date: "Tomorrow, 10:00 AM",
      status: "pending",
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "60-min Strategy",
      date: "Mar 25, 2:30 PM",
      status: "confirmed",
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Blockchain Labs",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "15-min Check-in",
      date: "Mar 27, 11:15 AM",
      status: "pending",
    },
  ]

  return (
    <div className="flex flex-col h-full">
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

      {/* Profile Section */}
      <div className="border-b p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              S
            </div>
            <div>
              <h2 className="font-medium">smbrian.sui</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Meetings Requested</span>
                <Check className="h-4 w-4" />
              </div>
            </div>
          </div>
          <Button variant="outline" className="rounded-full">
            Request Meeting <Plus className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Meeting Requests */}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Meeting Requests</h3>

        {meetingRequests.length > 0 ? (
          <div className="space-y-4">
            {meetingRequests.map((request) => (
              <div key={request.id} className="border rounded-lg bg-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={request.avatar || "/placeholder.svg"}
                    width={40}
                    height={40}
                    alt={request.name}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{request.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{request.type}</span>
                    </div>
                  </div>

                  {request.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        Decline
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                        Accept
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      <span>Confirmed</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] border rounded-lg bg-white">
            <div className="text-center text-gray-500">
              <p>No meeting requests yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

