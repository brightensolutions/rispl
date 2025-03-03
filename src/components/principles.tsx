"use client"

import { motion } from "framer-motion"
import { Lightbulb, Award, Users } from "lucide-react"

const principles = [
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "We constantly strive to innovate and develop cutting-edge packaging solutions that meet the evolving needs of our clients. Our team of technocrats is dedicated to pushing the boundaries of packaging technology.",
    gradient: "from-[#021c45] to-[#005281]",
    delay: 0,
  },
  {
    title: "Quality",
    icon: Award,
    description:
      "At RISPL, we prioritize quality in every aspect of our business. From the materials we use to the design and manufacturing processes, we ensure that our packaging solutions meet the highest standards of quality and reliability.",
    gradient: "from-[#005281] to-[#0072a3]",
    delay: 0.2,
  },
  {
    title: "Customer Satisfaction",
    icon: Users,
    description:
      "Our ultimate goal is to exceed customer expectations and provide exceptional service. We work closely with our clients to understand their unique packaging requirements and deliver customized solutions that drive their success.",
    gradient: "from-[#0072a3] to-[#bda03b]",
    delay: 0.4,
  },
]

export default function PrinciplesSection() {
  return (
    <div className="bg-white ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#021c45] mb-6">Our Principles</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#bda03b] to-[#EDC967] mx-auto" />
        </motion.div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: principle.delay }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-50 rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-xl">
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#bda03b] to-[#EDC967] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Icon */}
                <div className="mb-6 relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${principle.gradient} p-0.5 transform group-hover:rotate-6 transition-transform duration-500`}
                  >
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                      <principle.icon className="w-8 h-8 text-[#005281] transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-lg bg-[#EDC967]/10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-[#021c45] mb-4 group-hover:text-[#005281] transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-[#bda03b] to-[#EDC967] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>

              {/* Background Pattern */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#bda03b]/5 to-[#EDC967]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Decorative Dots */}
              <div className="absolute -right-2 -top-2 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                <div className="relative w-full h-full">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-[#EDC967]"
                      style={{
                        top: `${Math.floor(i / 3) * 6}px`,
                        left: `${(i % 3) * 6}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

