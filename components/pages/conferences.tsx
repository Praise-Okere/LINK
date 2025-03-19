"use client"

import { Button } from "@/components/ui/button"
import { Info, Users, Calendar, Plus, X, Video } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import CustomConnectButton from "@/components/custom-connect-button"
import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

export default function ConferencesPage() {
  const conferences = [
    {
      id: 1,
      title: "Blockchain Summit 2025",
      date: "Apr 15-17, 2025",
      attendees: 120,
      image: "/placeholder.svg?height=200&width=400",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Sui Developer Conference",
      date: "May 22-24, 2025",
      attendees: 85,
      image: "/placeholder.svg?height=200&width=400",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Web3 Innovation Forum",
      date: "Feb 10-12, 2025",
      attendees: 150,
      image: "/placeholder.svg?height=200&width=400",
      status: "past",
    },
  ]

  const [showNewConference, setShowNewConference] = useState(false)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Conferences</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <CustomConnectButton />
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Your Conferences</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Create Conference
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((conference) => (
            <div key={conference.id} className="border rounded-lg bg-white overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={conference.image || "/placeholder.svg"}
                  alt={conference.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      conference.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {conference.status === "upcoming" ? "Upcoming" : "Past"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{conference.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{conference.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{conference.attendees} Attendees</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Details
                  </Button>
                  {conference.status === "upcoming" && (
                    <Button className="bg-blue-600 hover:bg-blue-700 flex-1">Join</Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Conference Card */}
          <div className="border rounded-lg bg-white overflow-hidden border-dashed flex flex-col items-center justify-center p-8 h-[280px]">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-lg mb-2">Create New Conference</h3>
            <p className="text-sm text-gray-500 text-center mb-4">Set up a new conference for your community</p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNewConference(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
      {showNewConference && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-medium">Create New Conference</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowNewConference(false)} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="max-h-[60vh] overflow-auto">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Conference Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conference Title</label>
                    <Input placeholder="e.g., Sui Blockchain Summit 2025" className="h-12" />
                  </div>

                  {/* Conference Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <div className="relative">
                        <Input type="date" className="h-12 pl-10" />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <div className="relative">
                        <Input type="date" className="h-12 pl-10" />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors border-blue-500 bg-blue-50">
                        <Video className="h-6 w-6 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">Sui Video Conference</span>
                      </button>

                      <button className="border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors hover:bg-gray-50">
                        <Users className="h-6 w-6 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">In Person</span>
                      </button>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Capacity</label>
                    <div className="relative">
                      <Input type="number" placeholder="100" className="h-12 pl-10" />
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                  </div>

                  {/* Conference Fee */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conference Fee (Optional)</label>
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
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      className="w-full border rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add details about this conference..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewConference(false)}>
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // In a real app, this would save the conference
                  setShowNewConference(false)
                  // Show success message
                  toast.success("Conference created successfully!")
                }}
              >
                Create Conference
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

