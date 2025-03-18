"use client"

import { Button } from "@/components/ui/button"
import { Info, Users, Calendar, Plus } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Conferences</h1>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Connected <span className="ml-1 h-2 w-2 rounded-full bg-green-400"></span>
        </Button>
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
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

