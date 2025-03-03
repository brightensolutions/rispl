"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Globe, MapPin, Send, Loader2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useState } from "react"
import { toast } from "sonner"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create the message with proper line breaks
      const whatsappMessage = 
        `*New Contact Form Submission*%0A%0A` +
        `*Name:* ${formData.firstName} ${formData.lastName}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Subject:* ${formData.subject}%0A%0A` +
        `*Message:*%0A${formData.message}`

      // Open WhatsApp with the formatted message
      window.open(`https://wa.me/919818879945?text=${whatsappMessage}`, '_blank')
      
      toast.success("Opening WhatsApp...")
      
      // Reset form after small delay
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        })
        setIsLoading(false)
      }, 1000)

    } catch  {
      toast.error("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  // Rest of the component code remains exactly the same...
  return (
    <section className="relative py-24 bg-gradient-to-br from-white to-gray-50">
      {/* All existing JSX remains exactly the same... */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40V20L20 40H0zm0-40h20L0 20V0zm40 40V20L20 40h20zm0-40H20L40 20V0z" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-nunito font-bold text-blue mb-4">Reach Out</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold via-gold-light to-gold mx-auto" />
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-[730px] bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-3xl font-nunito font-bold text-blue mb-8">Contact Information</h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      value: "info@rispl.co",
                      href: "mailto:info@rispl.co",
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      value: "+91 123 456 7890",
                      href: "tel:+911234567890",
                    },
                    {
                      icon: Globe,
                      title: "Website",
                      value: "www.rispl.co",
                      href: "https://www.rispl.com",
                    },
                    {
                      icon: MapPin,
                      title: "Registered Office",
                      value: "PLOT 47-50, BHATPORE GIDC, NR. GAIL COLONY, BHATPORE, SURAT-394510.",
                      href: "https://maps.google.com",
                    },
              
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-blue-dark p-0.5 rotate-3 group-hover:rotate-6 transition-transform duration-300">
                        <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-blue group-hover:text-gold transition-colors" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">{item.title}</div>
                        <div className="text-blue font-medium group-hover:text-gold transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12">
                  <div className="text-sm text-gray-500 font-medium mb-4">Follow Us</div>
                  <div className="flex gap-4">
                    {[{ icon: Facebook }, { icon: Twitter }, { icon: Linkedin }, { icon: Instagram }].map(
                      ({ icon: Icon }, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold via-[#ecdc77] to-[#EDC967] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:translate-y-[-4px] group-hover:rotate-6">
                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors" />
                          </div>
                        </motion.a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="md:h-[720px] h-full bg-white rounded-3xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                  <div className="flex-grow space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 outline-none rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 outline-none rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 outline-none rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 outline-none rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full outline-none px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="relative w-full h-14 rounded-xl overflow-hidden group mt-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold via-[#ecdc77] to-[#EDC967] transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gold via-[#ecdc77] to-[#EDC967] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                    <div className="relative flex items-center justify-center gap-2 text-black font-medium">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Send via WhatsApp
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
