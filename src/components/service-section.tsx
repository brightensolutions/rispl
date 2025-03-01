"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { FaArrowRight } from "react-icons/fa";

interface ServiceCard {
  image: string
  title: string
  description: string
}

interface ServiceSectionProps {
  pageTitle: string
  pageSubtitle: string
  headerImage: string
  mainTitle: string
  highlightedTitle: string
  mainDescription: string
  cards: ServiceCard[]
  bottomDescription: string
  buttonText: string
}

export default function ServiceSection({
  pageTitle,
  pageSubtitle,
  headerImage,
  mainTitle,
  highlightedTitle,
  mainDescription,
  cards,
  bottomDescription,
  buttonText,
}: ServiceSectionProps) {
  // Function to handle WhatsApp click
  const handleWhatsAppClick = (title: string, description: string) => {
    const message = encodeURIComponent(
      `*Inquiry about: ${title}*%0A%0A` +
        `Service Details:%0A${description}%0A%0A` +
        `I would like to know more about this service.`,
    )
    window.open(`https://wa.me/919818879945?text=${message}`, "_blank")
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, #005281 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Main Card */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="relative h-[300px] overflow-hidden">
              <Image src={headerImage || "/placeholder.svg"} alt={pageTitle} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-12 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
                  {mainTitle} <span className="text-[#EDC967]">{highlightedTitle}</span>
                </h2>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-8 right-8 w-24 h-24">
                <div className="absolute inset-0 border-t-4 border-r-4 border-white/30 rounded-tr-3xl" />
              </div>
              <div className="absolute bottom-8 left-8 w-24 h-24">
                <div className="absolute inset-0 border-b-4 border-l-4 border-white/30 rounded-bl-3xl" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-12">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-gray-600 font-roboto leading-relaxed">{mainDescription}</p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {cards.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full">
                      {/* Card Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                        {/* WhatsApp Button Overlay */}
                        {/* <div className="absolute inset-0 bg-[#005281]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWhatsAppClick(item.title, item.description)}
                            className="px-6 py-3 rounded-full bg-[#25D366] text-white font-medium shadow-lg flex items-center gap-2 hover:bg-[#128C7E] transition-colors duration-300"
                          >
                            <MessageCircle className="w-5 h-5" />
                            Chat Now
                          </motion.button>
                        </div> */}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-[#005281] mb-2 font-roboto group-hover:text-[#bda03b] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 font-roboto text-sm flex-1 mb-4">{item.description}</p>

                        {/* Bottom WhatsApp Button */}
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={() => handleWhatsAppClick(item.title, item.description)}
                          className="mt-auto flex items-center gap-2 text-[#005281] hover:text-gold transition-colors duration-300"
                        >
                          <span className="font-medium flex gap-2 font-poppins items-center">Let’s Connect <span><FaArrowRight /></span></span>
                          {/* <Image
                            src="/images/whatsapp-icon.png"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                            className="transform group-hover:scale-110 transition-transform duration-300"
                          /> */}
                        </motion.button>
                      </div>

                      {/* Bottom Gradient Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005281] to-[#bda03b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Content */}
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-600 font-roboto leading-relaxed mb-8 text-center">{bottomDescription}</p>
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsAppClick("General Service Inquiry", bottomDescription)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#005281] to-[#bda03b] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                  >
                    <span>{buttonText}</span>
                    <Image
                      src="/images/whatsapp-icon.png"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="filter brightness-0 invert"
                    />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom Decorative Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005281] via-[#bda03b] to-[#EDC967]" />
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#005281] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#bda03b] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-48 left-1/4 w-96 h-96 bg-[#EDC967] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

