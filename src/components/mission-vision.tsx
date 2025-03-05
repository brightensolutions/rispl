"use client";

import { motion } from "framer-motion";
import { url } from "inspector";
import Image from "next/image";
import { useRef } from "react";

const GradientNumber = ({ number }: { number: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="text-[80px] md:text-[120px] font-nunito font-bold select-none"
    style={{
      background:
        "linear-gradient(to right, #bda03b, #ecdc77, #e3ca65, #EDC967)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      opacity: 0.2,
    }}
  >
    {number}
  </motion.div>
);

export function MissionVision() {
  const containerRef = useRef(null);

  return (
    <section
  ref={containerRef}
  className="relative min-h-screen overflow-hidden"
  style={{ 
    backgroundImage: `linear-gradient(to bottom, rgba(1, 42, 84, 0.01), rgba(1, 42, 84, 0.85)), url("/images/our-mission-bg.jpg")`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  }}
>
     

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-12 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-nunito font-bold text-white mb-4">
            Our Purpose
          </h2>
          <motion.div
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-gold via-gold-light to-gold mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Content Sections */}
        <div className="max-w-5xl mx-auto">
          {/* Mission Section */}
          <div className="relative mb-24 md:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start gap-8 md:gap-16"
            >
              <GradientNumber number="1" />

              {/* Content */}
              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold font-nunito text-gold mb-4"
                >
                  Our Mission
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/90  font-roboto text-base md:text-lg leading-relaxed"
                >
                  To Develop Innovative, Optimal, Recyclable and Sustainable
                  Packaging Solutions & Supply Chain for our Customer. Always
                  Deliver Products and services to exceed customer expectations.
                </motion.p>
              </div>
            </motion.div>

            {/* Connecting Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute left-10 md:left-14 top-full w-[2px] bg-gradient-to-b from-gold to-transparent"
            />
          </div>

          {/* Vision Section */}
          <div className="relative mb-24 md:mb-32 md:ml-32">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start gap-8 md:gap-16"
            >
              <GradientNumber number="2" />

              {/* Content */}
              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold font-nunito text-gold mb-4"
                >
                  Our Vision
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/90 font-roboto text-base md:text-lg leading-relaxed"
                >
                  Our vision is to work towards Next Generation Packaging and
                  improve current packaging standards of the industry.
                </motion.p>
              </div>
            </motion.div>

            {/* Connecting Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute left-10 md:left-14 top-full w-[2px] bg-gradient-to-b from-gold to-transparent"
            />
          </div>

          {/* Chairman Section */}
          <div className="relative md:ml-64">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start gap-8 md:gap-16"
            >
              <GradientNumber number="3" />

              {/* Content */}
              <div className="flex-1">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div className="order-2 md:order-1">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-2xl md:text-3xl font-bold font-nunito text-gold mb-6"
                    >
                      Chairman's Message
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-white/90 font-roboto text-lg leading-relaxed italic mb-6"
                    >
                      "It is my promise that we will continue to invest and do
                      our part to help the people wherever we operate."
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="border-l-2 border-gold pl-4"
                    >
                      <p className="text-white font-poppins">Mr. Aadil Patel</p>
                      <p className="text-white/60 font-roboto text-sm">
                        Chairman, RISPL Group
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative order-1 md:order-2"
                  >
                    <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden">
                      {/* Decorative Border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-gold-light to-gold rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 blur-sm" />

                      {/* Inner Container */}
                      <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gold/25 shadow-2xl shadow-white p-1">
                        {/* Image Container */}
                        <div className="relative h-full w-full rounded-xl overflow-hidden">
                          <Image
                            src="/images/aadil.jpg"
                            alt="Chairman"
                            fill
                            className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                          />

                          {/* Gradient Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-darker/90 via-blue-darker/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-blue-darker/30" />

                          {/* Decorative Elements */}
                          <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl" />
                          <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl" />
                        </div>
                      </div>
                    </div>

                    {/* Experience Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute -bottom-4 -left-4 bg-gradient-to-r from-gold via-gold-light to-gold text-blue-darker rounded-[5px] shadow-xl p-4 text-center"
                    >
                      <p className="text-2xl md:text-3xl font-bold font-nunito">
                        25+
                      </p>
                      <p className="text-sm font-medium">Years Experience</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
