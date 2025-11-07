"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface OperationPlant {
  id: number;
  title: string;
  description: string;
}

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

export function OperationPlant() {
  const containerRef = useRef(null);
  const [operations, setOperations] = useState<OperationPlant[]>([
    {
      id: 1,
      title: "Production Management",
      description:
        "State-of-the-art production facilities with advanced technology and optimized workflows to maximize efficiency and output quality.",
    },
    {
      id: 2,
      title: "Supply Chain",
      description:
        "Comprehensive supply chain solutions ensuring timely delivery, cost optimization, and seamless logistics operations.",
    },
    {
      id: 3,
      title: "Quality Assurance",
      description:
        "Rigorous quality control standards and testing procedures to maintain excellence in every product and service.",
    },
    {
      id: 4,
      title: "Plant Maintenance",
      description:
        "Preventive and predictive maintenance programs ensuring optimal equipment performance and minimal downtime.",
    },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('images/operations/plant.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Primary Gradient Overlay (dark fade effect) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/50 via-blue-dark/30 to-blue-dark/60 z-0" />

      {/* Additional Color Overlay (optional tint for visibility) */}
      <div className="absolute inset-0 bg-orange/10 mix-blend-overlay z-0" />

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10">
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
            Our Operations & Plant
          </h2>
          <motion.div
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-gold via-gold-light to-gold mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-white/90 font-roboto text-md md:text-lg max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Our modern facilities and operational excellence ensure we deliver
          superior products and services with precision and reliability at every
          stage.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-7xl mx-auto mb-16">
          {operations.map((operation, index) => (
            <motion.div
              key={operation.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group flex-1 min-w-xs"
            >
              {/* Card Background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 via-gold-light/20 to-gold/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

              {/* Card Content */}
              <div className="relative bg-blue-dark/50 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 hover:border-gold/40 transition-all duration-300 h-full">
                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-lg md:text-xl font-bold font-nunito text-gold mb-4"
                >
                  {operation.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-white/80 font-roboto text-md leading-relaxed"
                >
                  {operation.description}
                </motion.p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-gold-light rounded-b-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-gold via-gold-light to-gold text-blue-darker font-bold rounded-lg hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 transform hover:scale-105">
            Learn About Our Operations
          </button>
        </motion.div>
      </div>
    </section>
  );
}
