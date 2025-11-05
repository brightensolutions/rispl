"use client";

import ModernServiceLayout from "@/components/modern-service-layout";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const yohanData = {
  title: "Yohan Enterprise",
  subtitle:
    "Successfully executing services in Q.C. lab operations and logistics operations since past 25 years.",
  slug: "yohan-enterprise",
  description:
    "We specialize in providing comprehensive solutions for polyester plant operations, covering a wide range of critical processes including CP (Continuous Polymerization), spinning, take-up, chemical handling, material handling, packing, and more. With extensive expertise and industry knowledge, we are equipped to support organizations in optimizing their operations and achieving maximum efficiency and productivity.",
  href: "/services/yohan-enterprise",
  headerImage: "/yohan-enterprise-operational-management.jpg",
  sections: [
    {
      title: "Our Expertise",
      description:
        "Our team of experienced professionals understands the intricacies of polyester plant operations and is committed to delivering excellence at every stage of the process. From managing polymerization to ensuring precision in spinning and take-up operations, we offer tailored solutions that meet each client’s unique needs.",
      features: [
        {
          title: "Safety & Quality",
          description:
            "We adhere to strict safety protocols and quality standards to protect employees and maintain product integrity.",
          image: "/safety-quality.jpg",
        },
        {
          title: "Sustainability Focus",
          description:
            "Our practices prioritize environmental sustainability through efficient resource utilization and waste reduction.",
          image: "/sustainability-practices.jpg",
        },
        {
          title: "Operational Efficiency",
          description:
            "We help clients streamline workflows, improve product quality, and enhance supply chain performance.",
          image: "/operational-efficiency.jpg",
        },
      ],
    },
  ],
};

export default function YohanEnterprise() {
  return (
    <div className="space-y-16">
      {/* Service Info Section */}
      <ModernServiceLayout service={yohanData} />

      {/* 4-Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Operations & Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid 1 - News Image Slider */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src="/news-slider-1.jpg"
              alt="QC Lab Operations"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Q.C. Lab Operations Excellence
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Delivering precision and reliability through advanced lab
                testing and monitoring systems.
              </p>
            </div>
          </motion.div>

          {/* Grid 2 - News Image Slider */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src="/news-slider-2.jpg"
              alt="Polyester Plant Operations"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Polyester Plant Optimization
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Enhancing spinning, take-up, and packing operations for top-tier
                performance.
              </p>
            </div>
          </motion.div>

          {/* Grid 3 - News Image Slider */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src="/news-slider-3.jpg"
              alt="Material Handling"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Material Handling & Safety
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Ensuring smooth material flow and compliance with safety
                standards.
              </p>
            </div>
          </motion.div>

          {/* Grid 4 - Instagram Styled Box */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-white rounded-2xl shadow-md p-8 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500"
          >
            <Instagram size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Follow Us on Instagram
            </h3>
            <p className="text-sm text-center">
              Stay updated with our latest projects, innovations, and team
              highlights. Join our growing community!
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Visit Profile
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
