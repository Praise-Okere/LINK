"use client"

import { WalletProvider as MyStenWalletProvider } from "@suiet/wallet-kit"
import "@suiet/wallet-kit/style.css"
import type { ReactNode } from "react"

interface WalletProviderProps {
  children: ReactNode
}

export default function WalletProvider({ children }: WalletProviderProps) {
  return <MyStenWalletProvider>{children}</MyStenWalletProvider>
}

