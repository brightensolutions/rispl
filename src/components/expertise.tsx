"use client"

import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import Image from "next/image"

const services = [
  {
    category: "Unitisation & Bundling",
    title: "Unitisation & Bundling",
    description: "Efficient bundling and unitization solutions for your products",
    bgColor: "bg-blue-50/80",
    number: "01",
    image: "/images/Unitisation-Bundling.jpg",
  },
  {
    category: "Warehouse Solutions",
    title: "Warehouse Solutions",
    description: "Advanced storage and warehouse management systems",
    bgColor: "bg-[#fff8e1]",
    number: "02",
    image: "/images/Warehouse Solutions.jpg",
  },
  {
    category: "Contract Packaging",
    title: "Contract Packaging",
    description: "Professional packaging services for all your needs",
    bgColor: "bg-blue-50/80",
    number: "03",
    image: "/images/Contract Packaging.jpg",
  },
  {
    category: "Consultancy Services",
    title: "Consultancy Services",
    description: "Expert guidance for optimal packaging solutions",
    bgColor: "bg-[#fff8e1]",
    number: "04",
    image: "/images/Consultancy Services.jpg",
  },
  {
    category: "Customized Automation",
    title: "Customized Automation",
    description: "Tailored automation solutions for your business",
    bgColor: "bg-blue-50/80",
    number: "05",
    image: "/images/Customized Automation.jpg",
  },
  {
    category: "Packaging Optimization",
    title: "Packaging Optimization",
    description: "Optimize your packaging for efficiency and cost",
    bgColor: "bg-[#fff8e1]",
    number: "06",
    image: "/images/Packaging Optimization.jpg",
  },
]

export default function Expertise() {
  const handleWhatsAppClick = (category: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in your ${category} services.`)
    window.open(`https://wa.me/919818879945?text=${message}`, '_blank')
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-dark/30">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, #bda03b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-nunito font-bold text-black mb-6">OUR EXPERTISE</h2>
          <p className="text-black text-[18px] font-roboto">
            Our Packaging Solution protects your Product to scale up to Next Level. With our rich Experience and
            Expertise behind us, thus offering a Safe and Effective Products and Solutions to our customers.
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden transition-all duration-500">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay that changes on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                {/* Content Container */}
                <div className="relative h-full p-8 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-2">
                  {/* Category Tag */}
                  <div className="absolute top-6 left-6">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="inline-block px-3 py-1 rounded-full text-sm font-poppins bg-white text-black font-bold backdrop-blur-sm border border-[#EDC967]/30"
                    >
                      {service.category}
                    </motion.span>
                  </div>

                  {/* Number Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    className="absolute top-6 right-6"
                  >
                    <span className="text-lg font-medium border-[#EDC967] border-[1px] bg-black/30 text-[#EDC967] w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm">
                      {service.number}
                    </span>
                  </motion.div>

                  {/* Title and Description */}
                  <div className="space-y-4">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                      className="text-2xl font-poppins font-bold text-white group-hover:text-[#EDC967] transition-colors duration-300"
                    >
                      {service.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="text-gray-300 font-roboto group-hover:text-white transition-colors duration-300"
                    >
                      {service.description}
                    </motion.p>

                    {/* Connect Now Button with WhatsApp Integration */}
                    <motion.button
                      onClick={() => handleWhatsAppClick(service.category)}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-[#EDC967] font-poppins group/btn mt-4"
                    >
                      Tap to Begin
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>

                  {/* Bottom Highlight */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: "linear-gradient(to right, #bda03b, #ecdc77, #e3ca65, #EDC967)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
