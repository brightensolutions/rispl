"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ChevronRight, Download, Mail } from "lucide-react"
import type { Product } from "@/lib/equipment-data"
import { FaWhatsappSquare } from "react-icons/fa"

interface ProductDetailProps {
  product: Product
  type: string
}

  


export function ProductDetail({ product,type }: ProductDetailProps) {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919818879945`, "_blank")
  }

  return (
    <div className="min-h-screen ">
      {/* Decorative Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #0072a3 2px, transparent 75),
            radial-gradient(circle at 75px 75px, #bda03b 2px, transparent 75)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        {/* Back Link with Enhanced Design */}
        <div className="mb-12">
          <Link
            href={`/Products/${type}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#bda03b]/10 to-[#EDC967]/10 hover:from-[#bda03b]/20 hover:to-[#EDC967]/20 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 text-[#bda03b] group-hover:-translate-x-1 transition-transform" />
            <span className="text-[#bda03b] font-medium font-nunito">
              Back to {type === 'equipment' ? 'Equipment' : 'Consumables'} {/* Dynamic text based on type */}
            </span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
            {/* Decorative Corner */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#bda03b]/30 rounded-tl-xl" />

            <div className="relative z-10 p-6">
              <h1
                className="text-5xl font-bold mb-8 font-roboto leading-tight"
                style={{
                  background: "linear-gradient(135deg, #bda03b, #EDC967, #bda03b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shine 3s linear infinite",
                }}
              >
                {product.name}
              </h1>

              <div className="prose prose-lg mb-10">
                <p className="text-gray-700 font-poppins leading-relaxed">{product.description}</p>
              </div>

              {/* Key Features Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-[#bda03b] font-roboto">Key Features</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#bda03b]/20 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#bda03b]/5 to-[#EDC967]/5 rounded-xl transform transition-transform group-hover:scale-105" />
                      <div className="relative p-6 rounded-xl border border-[#bda03b]/20 hover:border-[#bda03b]/40 transition-colors">
                        <Star className="w-6 h-6 text-[#bda03b] mb-4" />
                        <h3 className="font-semibold text-[#bda03b] font-roboto mb-2">Premium Feature {index + 1}</h3>
                        <p className="text-gray-600 font-poppins">Advanced capability description with technical specifications.</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              {/* <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-semibold text-[#bda03b] font-roboto">Technical Specs</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#bda03b]/20 to-transparent" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Power: 380V/3Ph/50Hz",
                    "Speed: Up to 25 PPM",
                    "Air Pressure: 6 Bar",
                    "Machine Size: 2500×1200×1600mm",
                  ].map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 font-poppins text-gray-700">
                      <ChevronRight className="w-4 h-4 text-[#bda03b]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </motion.div>

          {/* Right Column - Images and Actions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Main Image with Enhanced Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#bda03b]/10 to-[#EDC967]/10 rounded-2xl transform -rotate-1" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3]">
                  <Image
                    src={product.gallery[0] || "/placeholder.svg?height=600&width=800"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Thumbnail Grid with Enhanced Design */}
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#bda03b]/10 to-[#EDC967]/10 rounded-xl transform group-hover:scale-105 transition-transform" />
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={image || `/placeholder.svg?height=300&width=300`}
                      alt={`${product.name} - View ${index + 2}`}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button onClick={handleWhatsAppClick} className="w-full py-4 bg-gradient-to-r from-[#bda03b] to-[#EDC967] text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                <FaWhatsappSquare className="bg-transparent text-[15px]"  />
                Request Insights
              </button>

             
            </div>

         
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  )
}

