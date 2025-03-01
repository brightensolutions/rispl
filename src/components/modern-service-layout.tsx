"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { ServiceData } from "@/lib/services-data"
import { PageTitle } from "./other-page-title"
import Link from "next/link"

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

interface ServiceDetailProps {
  service: ServiceData
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      <PageTitle title={service.title} backgroundImage={service.headerImage} subtitle={service.subtitle} />

      {service.sections.map((section, index) => (
        <motion.section
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-20 bg-white relative"
        >
          {/* Section Container */}
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              variants={itemVariants}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-roboto font-bold text-[#005281] mb-6">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed font-poppins">{section.description}</p>
            </motion.div>

            {/* Features Grid */}
            {section.features && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {section.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    variants={itemVariants}
                    className="group"
                  >
                    {/* Card Content */}
                    <div className="relative bg-white rounded-2xl transition-all duration-500 h-full transform hover:-translate-y-2">
                      {/* Main Shadow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#005281] to-[#EDC967] rounded-2xl opacity-20 group-hover:opacity-100 transition-all duration-500 blur" />

                      {/* Card Content Container */}
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={feature.image || "/placeholder.svg"}
                            alt={feature.title}
                            fill
                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Image Overlay */}
                          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#005281]/50 to-[#005281]/90">
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <button className="px-6 py-3 bg-white rounded-lg font-medium text-[#005281] transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#EDC967] hover:text-white">
                                View Details
                              </button>
                            </div>
                          </div> */}
                        </div>

                        {/* Content Section */}
                        <div className="p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-[#005281]/10 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500">
                                <CheckCircle2 className="w-6 h-6 text-[#005281]" />
                              </div>
                              <div className="absolute -inset-1 border-2 border-[#EDC967]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            </div>
                            <h3 className="text-xl font-roboto font-bold text-[#005281] group-hover:text-[#EDC967] transition-colors duration-300">
                              {feature.title}
                            </h3>
                          </div>

                          <p className="text-gray-600 font-poppins mb-6 line-clamp-3">{feature.description}</p>

                          <Link href="/contact" className="flex items-center gap-2 text-[#005281] font-poppins font-medium group/link">
                            <span className="relative">
                              Learn More
                              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#EDC967] group-hover/link:w-full transition-all duration-500" />
                            </span>
                            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-500" />
                          </Link>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005281] to-[#EDC967] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Image Gallery */}
            {section.images && (
              <motion.div 
                variants={containerVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16"
              >
                {section.images.map((image, imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    variants={itemVariants}
                    className="group relative aspect-video rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#005281] via-[#005281]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {image.alt}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      ))}

      {/* Call to Action */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="bg-gradient-to-r from-[#005281] to-[#012a54] py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-roboto font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 font-poppins">
              Contact us today to learn more about our {service.title.toLowerCase()} solutions and how we can help
              optimize your packaging processes.
            </p>
            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-[#EDC967] to-[#bda03b] text-white rounded-lg font-poppins font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
