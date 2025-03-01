"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function WhatsappButton() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919818879945`, "_blank")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="fixed bottom-6 right-6 z-50 cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWhatsAppClick}
          >
            {/* Pulse Effect */}
            <div className="absolute -inset-2 bg-green-500 rounded-full opacity-30 animate-ping" />

            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-40 blur-sm group-hover:opacity-75 transition-opacity duration-300" />

            {/* Main Icon */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/whatsapp-icon.png"
                alt="Chat with us on WhatsApp"
                width={60}
                height={60}
                className="relative transform transition-transform duration-300 hover:rotate-12"
              />
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-green-50 border border-green-200">
          <p className="text-green-800 font-medium">Chat with us on WhatsApp!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

