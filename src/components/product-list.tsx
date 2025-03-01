"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Product {
  name: string
  description: string
  image: string
}

interface ProductListProps {
  products: Product[]
}

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

export function ProductList({ products }: ProductListProps) {
  return (
    <section className="py-20">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#005281]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#005281] mb-2 group-hover:text-[#EDC967] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {/* Request Quote Button */}
                  <button className="w-full py-2 bg-gradient-to-r from-[#bda03b] to-[#EDC967] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    Request Quote
                  </button>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005281] to-[#EDC967] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

