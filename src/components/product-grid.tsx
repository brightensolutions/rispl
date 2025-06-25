"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string
  title: string
  description: string
  image: string
  type: string
}

interface ProductsGridProps {
  type: string
}

export function ProductsGrid({ type }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?type=${type}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && Array.isArray(data.data)) {
            setProducts(data.data)
          } else {
            setProducts(data) // Fallback if data structure is different
          }
        } else {
          console.error(`Failed to fetch ${type} products`)
        }
      } catch (error) {
        console.error(`Error fetching ${type} products:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [type])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-dark"></div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">No products found</h2>
          <p className="mt-4 text-gray-500">Please check back later or try another category.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/Products/${type}/${product.id}`}>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  {/* Product Image */}
                  <div className="relative h-64">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 bg-white">
                    <h3 className="text-xl font-bold text-[#bda03b] mb-2 group-hover:text-gold transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>

                    {isClient ? (
                      <motion.div
                        className="flex items-center text-gold font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>View Details</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    ) : (
                      <div className="flex items-center text-gold font-medium">
                        <span>View Details</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

