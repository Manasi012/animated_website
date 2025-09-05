import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

// ✅ Import SmoothScroll
import SmoothScroll from "@/components/ui/SmoothScroll"

export const metadata: Metadata = {
  title: "NeoLiv — Building Communities, Creating Value",
  description: "Modern corporate website for NeoLiv with smooth animations.",
  generator: "v0.app",
}

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground overflow-x-hidden">
        {/* ✅ Wrap all children in SmoothScroll */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
