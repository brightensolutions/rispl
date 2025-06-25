"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { FaWhatsappSquare } from "react-icons/fa"

interface ProductFeature {
  name: string
  value: string
}

interface Product {
  id: string
  title: string
  name: string
  description: string
  image: string
  gallery: string[]
  features: string[]
  specifications: ProductFeature[]
  type: string
}

interface ProductDetailPageProps {
  product: Product
  type: string
}

export function ProductDetailPage({ product, type }: ProductDetailPageProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRequestInsights = () => {
    window.open(`https://wa.me/919818879945`, "_blank")
  }

  // Format the product name for display
  const formattedName = product.name || product.title

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/Products/${type}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-4xl font-bold text-[#bda03b] mb-6 leading-tight">{formattedName}</h1>

            <div className="prose prose-lg mb-8">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Key Features Section */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#bda03b] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-[#bda03b] mt-1" />
                        <div>
                          <h3 className="font-medium text-[#bda03b]">Premium Feature {index + 1}</h3>
                          <p className="text-gray-600 text-sm mt-1">{feature}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium">{spec.name}:</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Images and Actions */}
          <div>
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.gallery?.[0] || product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail Grid */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {product.gallery.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} - View ${index + 2}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleRequestInsights}
              className="w-full py-3 bg-[#bda03b] text-white rounded-lg font-medium hover:bg-[#a38a33] transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsappSquare className="text-lg" />
              Request Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

