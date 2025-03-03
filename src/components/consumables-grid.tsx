"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Package2, Box, Combine, Forklift } from 'lucide-react'

const equipmentCategories = [
  {
    id: "pet-strap",
    title: "PET Strap",
    icon: Package2,
    description: "Complete range of shrink wrap machines and systems",
    image: "/images/PET-Strap.jpg",
    products: [
      {
        id: "pet-strap",
        name: "SHRINK BUNDLER WITH SEALING BAR",
        description: "High speed Automatic Shrink Wrap Machine",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "pp-strap",
    title: "PP STRAP",
    icon: Box,
    description: "Advanced stretch wrapping solutions",
    image: "/images/Contrax-pp.jpg",
  },
  {
    id: "stretch-film",
    title: "Stretch Film",
    icon: Combine,
    description: "Automated case packing systems",
    image: "/images/stretch-film.jpg",
  },
  {
    id: "pof-film",
    title: "POF Film",
    icon: Combine,
    description: "Automated case packing systems",
    image: "/images/pof-shrink-film-roll.webp",
  },
  {
    id: "bubble-guard-sheet",
    title: "Bubble Guard Packaging",
    icon: Forklift,
    description: "Complete packaging automation solutions",
    image: "/images/bgp1.avif",
  },
  {
    id: "edge-protector",
    title: "Edge and Angle Protector",
    icon: Forklift,
    description: "Complete packaging automation solutions",
    image: "/images/Edge-and-Angle-Protector.jpg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ConsumablesGrids() {
  return (
    <section className="py-20">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  lg:grid-cols-4 gap-8">
          {equipmentCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants} className="group relative">
              <Link href={`/Products/consumables/${category.id}/${category.products?.[0]?.id || category.id}`}>
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {/* Multiple Overlay Layers for Depth */}
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#bda03b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Main Content Container */}
                  <div className="relative p-8 min-h-[400px] flex flex-col">
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-[#EDC967]/30 rounded-tr-2xl" />
                    <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-[#EDC967]/30 rounded-bl-2xl" />

                    {/* Icon */}
                    {/* <motion.div className="relative mb-6 inline-block">
                      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-[#bda03b] to-[#EDC967] p-0.5">
                        <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <category.icon className="w-8 h-8 text-[#EDC967]" />
                        </div>
                      </div>
                    </motion.div> */}

                    {/* Content */}
                    <div className="relative space-y-4 flex-1">
                      <motion.h3
                        className="text-3xl font-bold font-roboto"
                        style={{
                          background: "linear-gradient(to right, #bda03b, #EDC967)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {category.title}
                      </motion.h3>
                      <p className="text-white/90 text-lg max-w-md leading-relaxed font-poppins">{category.description}</p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="relative mt-8">
                      <motion.div className="inline-flex items-center gap-2 group/btn" whileHover={{ x: 10 }}>
                        <span className="text-[#EDC967] font-medium font-roboto">View Details</span>
                        <div className="relative w-8 h-8">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#bda03b] to-[#EDC967] rounded-full blur-sm opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                          <div className="relative w-full h-full rounded-full border border-[#EDC967]/30 flex items-center justify-center">
                            <motion.span
                              className="text-[#EDC967]"
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            >
                              →
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Dot Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: "radial-gradient(circle at 2px 2px, #EDC967 1px, transparent 0)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                    </div>
                  </div>
                  {/* Bottom Border Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bda03b] via-[#EDC967] to-[#bda03b] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
