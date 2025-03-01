"use client"

import { motion } from "framer-motion"
import { Globe2, FileCheck, PackageCheck, Building2, Truck, UserCheck } from "lucide-react"

const steps = [
  {
    icon: FileCheck,
    title: "Operation Contract",
    description: "Prepare necessary documentation, including contracts and service agreements",
    step: "01",
    color: "from-[#021c45] to-[#012a54]",
  },
  {
    icon: Globe2,
    title: "Integrated Automation",
    description: "Implement automated solutions across borders using reliable methods",
    step: "02",
    color: "from-[#012a54] to-[#005281]",
  },
  {
    icon: Building2,
    title: "24/7 Support",
    description: "Ensure continuous support and monitoring of all operations",
    step: "03",
    color: "from-[#005281] to-[#0072a3]",
  },
  {
    icon: PackageCheck,
    title: "Application Development",
    description: "Develop and deploy custom applications for process optimization",
    step: "04",
    color: "from-[#0072a3] to-[#bda03b]",
  },
  {
    icon: Truck,
    title: "Local Distribution",
    description: "Manage local distribution and service delivery networks",
    step: "05",
    color: "from-[#bda03b] to-[#ecdc77]",
  },
  {
    icon: UserCheck,
    title: "Customer Success",
    description: "Ensure complete customer satisfaction and service delivery",
    step: "06",
    color: "from-[#ecdc77] to-[#EDC967]",
  },
]

export default function ValueServicesTimeline() {
  return (
    <div className="relative inline-block w-[100%]  bg-gradient-to-br from-[#021c45] to-[#012a54] py-20 my-20 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at center, #bda03b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Value Added Services</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#bda03b] to-[#EDC967] mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-7xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#021c45] via-[#0072a3] to-[#EDC967] transform -translate-y-1/2" />

          {/* Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Step Card */}
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 h-[150px]">
                  {/* Icon */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} p-0.5 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <div className="w-full h-full rounded-full bg-[#021c45] flex items-center justify-center relative">
                        <step.icon className="w-8 h-8 text-[#EDC967]" />
                        {/* Step Number */}
                        <div className="absolute -right-2 -bottom-2 w-6 h-6 rounded-full bg-[#EDC967] flex items-center justify-center">
                          <span className="text-xs font-bold text-[#021c45]">{step.step}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#EDC967] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#bda03b] to-[#EDC967] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#EDC967]"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

