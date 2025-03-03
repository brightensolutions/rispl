"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const logoRows = [
  // Top row
  [
    { name: "RISPL", width: 120 },
    { name: "Hazira", width: 140 },
    { name: "Yohan", width: 100 },
  ],
  // Middle row (Aadil Group)
  [{ name: "Aadil Group", width: 200 }],
  // Third row
  [
    { name: "HR", width: 120 },
    { name: "Atash", width: 100 },
    { name: "Arzaan", width: 130 },
  ],
  // Bottom row
  [{ name: "Fuego", width: 120 }],
]

export function LogoTree() {
  return (
    <div className="relative h-full w-full p-8">
      {/* Stats Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-8 bg-white rounded-lg shadow-md p-4 z-20"
      >
        <div className="text-3xl font-nunito font-bold text-blue">500+</div>
        <div className="text-sm font-poppins text-gray-600">Projects Completed</div>
      </motion.div>

      {/* Logo Tree */}
      <div className="flex flex-col items-center gap-12 mt-20">
        {logoRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex justify-center gap-16 w-full ${
              row.length === 1 ? "justify-center" : "justify-between px-12"
            }`}
          >
            {row.map((logo, logoIndex) => (
              <motion.div
                key={logoIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: rowIndex * 0.2 + logoIndex * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <Image
                  src={`/placeholder.svg?height=${logo.width * 0.6}&width=${logo.width}`}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.width * 0.6}
                  className="object-contain"
                />
                <span className="mt-2 text-sm font-poppins text-blue opacity-0">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Stats Bottom */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-0 right-8 bg-white rounded-lg shadow-md p-4 z-20"
      >
        <div className="text-3xl font-nunito font-bold text-blue">98%</div>
        <div className="text-sm font-poppins text-gray-600">Client Satisfaction</div>
      </motion.div>
    </div>
  )
}

