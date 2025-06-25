"use client"

import { useEffect, useState } from "react"
import { Marquee } from "./magicui/marquee"
import Image from "next/image"

// Static fallback data
const staticClients = [
  { name: "AMNS", image: "/client/AMNS.png" },
  { name: "Reliance", image: "/client/reliance.png" },
  { name: "Bhilosa", image: "/client/bhilosa.png" },
  { name: "Garden", image: "/client/Garden-logo-1.jpg" },
  { name: "Shree Durga", image: "/client/shree-durga.png" },
  { name: "Jiwarajka", image: "/client/jiwarajka_textile_industries_logo.jpeg" },
  { name: "Snowman", image: "/client/snowman.png" },
  { name: "Wellknown", image: "/client/wellknown.avif" },
  { name: "Alok", image: "/client/alok.png" },
  { name: "Sanathan", image: "/client/sanathan.png" },
]

interface Client {
  _id: string
  name: string
  image: string
}

const ClientCard = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="mx-4 h-64 flex flex-col justify-center items-center">
      <Image
        className="w-auto object-contain"
        width={150}
        height={150}
        alt={`${name} logo`}
        src={image || "/placeholder.svg"}
      />
    </div>
  )
}

export function Ourclient() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/clients")
        const data = await res.json()

        if (data.success && data.data.length > 0) {
          setClients(data.data)
        } else {
          // Use static data if API returns no data
          setClients(
            staticClients.map((client, index) => ({
              _id: `static-${index}`,
              ...client,
            })),
          )
        }
      } catch (error) {
        console.error("Error fetching clients:", error)
        setError(true)
        // Use static data on error
        setClients(
          staticClients.map((client, index) => ({
            _id: `static-${index}`,
            ...client,
          })),
        )
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  // Use static data while loading
  const displayClients =
    loading || error || clients.length === 0
      ? staticClients.map((client, index) => ({
          _id: `static-${index}`,
          ...client,
        }))
      : clients

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
      <div className="mb-9">
        <h2 className="text-4xl md:text-5xl font-nunito font-bold text-blue mb-4">Our Clients</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-gold via-gold-light to-gold mx-auto" />
      </div>
      <Marquee pauseOnHover className="[--duration:40s]">
        {displayClients.map((client) => (
          <ClientCard key={client._id} name={client.name} image={client.image} />
        ))}
      </Marquee>
    </div>
  )
}

