import type React from "react"
import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono, Nunito, Poppins, Roboto } from "next/font/google"
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
})

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "RELIANT INDUSTRIAL SOLUTIONS PVT. LTD. ",
  description: "BUILDING A STRONGER BUSINESS TOGETHER",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${poppins.variable} ${roboto.variable} antialiased`}
      >
         <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}

