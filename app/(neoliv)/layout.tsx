import type { ReactNode } from "react"
import {Montserrat } from "next/font/google"


// Add Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export default function NeolivLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${montserrat.variable} bg-white text-slate-900`}
    >
      {children}
    </div>
  )
}
