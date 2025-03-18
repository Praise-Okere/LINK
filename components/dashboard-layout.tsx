"use client"
import { Calendar, LinkIcon, Clock, Users, Star, BellRing, Info, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import MeetingRequestsPage from "@/components/pages/meeting-requests"
import NewMeetingPage from "@/components/pages/new-meeting"
import MyDatesPage from "@/components/pages/my-dates"
import ConferencesPage from "@/components/pages/conferences"
import FavoritesPage from "@/components/pages/favorites"
import MyRatingPage from "@/components/pages/my-rating"
import AnalyticsPage from "@/components/pages/analytics"
import HistoryPage from "@/components/pages/history"
import SupportPage from "@/components/pages/support"
import SettingsPage from "@/components/pages/settings"

// Add wallet imports at the top - changed from Suiet to Mysten/Sui
import { useWallet, ConnectButton } from "@suiet/wallet-kit"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  activePage: string
  onPageChange: (page: string) => void
}

// Update the component to include wallet connection state
export default function DashboardLayout({ activePage, onPageChange }: DashboardLayoutProps) {
  const { connected, connecting, account } = useWallet()

  const renderPage = () => {
    // If not connected, show a wallet connection page
    if (!connected) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="max-w-md w-full bg-white rounded-lg border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-8 text-center">
              Connect your Sui wallet to access your dashboard and manage your meetings.
            </p>
            <ConnectButton>
              {({ connecting, connect, connected, account }) => (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-space-grotesk"
                  onClick={connect}
                  disabled={connecting || connected}
                >
                  {connecting ? (
                    <span className="flex items-center gap-2">
                      Connecting
                      <span className="ml-1 flex">
                        <span className="animate-bounce mx-0.5 h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span className="animate-bounce animation-delay-200 mx-0.5 h-1.5 w-1.5 rounded-full bg-white"></span>
                        <span className="animate-bounce animation-delay-400 mx-0.5 h-1.5 w-1.5 rounded-full bg-white"></span>
                      </span>
                    </span>
                  ) : connected ? (
                    <span className="flex items-center gap-2">
                      Connected <span className="ml-1 h-2 w-2 rounded-full bg-green-400"></span>
                    </span>
                  ) : (
                    "Connect to Wallet"
                  )}
                </Button>
              )}
            </ConnectButton>
          </div>
        </div>
      )
    }

    // If connected, show the selected page
    switch (activePage) {
      case "new-meeting":
        return <NewMeetingPage />
      case "meeting-requests":
        return <MeetingRequestsPage />
      case "my-dates":
        return <MyDatesPage />
      case "conferences":
        return <ConferencesPage />
      case "favorites":
        return <FavoritesPage />
      case "my-rating":
        return <MyRatingPage />
      case "analytics":
        return <AnalyticsPage />
      case "history":
        return <HistoryPage />
      case "support":
        return <SupportPage />
      case "settings":
        return <SettingsPage />
      default:
        return <MeetingRequestsPage />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Only show when connected */}
      {connected && (
        <div className="w-[180px] bg-blue-50 border-r flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-500" />
            <span className="font-bold text-blue-500">LINK</span>
          </div>

          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => onPageChange("new-meeting")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "new-meeting" && "bg-blue-100",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  <span>New Meeting</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("meeting-requests")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "meeting-requests" && "bg-blue-100",
                  )}
                >
                  <Users className="h-4 w-4" />
                  <span>Meeting Requests</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("my-dates")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "my-dates" && "bg-blue-100",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Dates</span>
                </button>
              </li>
              <li className="pt-4 mt-4 border-t">
                <button
                  onClick={() => onPageChange("conferences")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "conferences" && "bg-blue-100",
                  )}
                >
                  <Users className="h-4 w-4" />
                  <span>Conferences</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("favorites")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "favorites" && "bg-blue-100",
                  )}
                >
                  <Star className="h-4 w-4" />
                  <span>Favourites</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("my-rating")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "my-rating" && "bg-blue-100",
                  )}
                >
                  <Star className="h-4 w-4" />
                  <span>My Rating</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("analytics")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "analytics" && "bg-blue-100",
                  )}
                >
                  <BellRing className="h-4 w-4" />
                  <span>Analytics</span>
                </button>
              </li>
              <li className="pt-4 mt-4 border-t">
                <button
                  onClick={() => onPageChange("history")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "history" && "bg-blue-100",
                  )}
                >
                  <Clock className="h-4 w-4" />
                  <span>History</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("support")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "support" && "bg-blue-100",
                  )}
                >
                  <Info className="h-4 w-4" />
                  <span>Support</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange("settings")}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 hover:bg-blue-100 text-sm text-left",
                    activePage === "settings" && "bg-blue-100",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderPage()}</div>

      {/* User Avatar - Only show when connected */}
      {connected && (
        <div className="absolute bottom-6 right-6">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium shadow-md">
            {account?.address.slice(0, 1).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  )
}

