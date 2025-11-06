"use client";

import ModernOperationLayout, {
  type ServiceData,
} from "@/components/modern-operation-layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function YohanPage() {
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const service: ServiceData = {
    title: "Yohan Enterprise",
    subtitle: "Delivering Excellence in Industrial Process Management",
    headerImage: "/images/yohan-cover.jpg",
  };

  const carouselSlides = {
    qcLab: [
      { src: "/images/operations/yohanc-1.jpg" },
      { src: "/images/operations/yohanc1.jpg" },
      { src: "/images/operations/yohanc2.webp" },
    ],
    polyester: [
      { src: "/images/operations/yohanc4.jpg" },
      { src: "/images/operations/yohanc6.jpg" },
      { src: "/images/operations/yohanc5.jpg" },
    ],
    material: [{ src: "/images/operations/ser.jpg" }],
  };

  return (
    <div className="bg-white">
      <ModernOperationLayout service={service} />

      {/* Section: Our Expertise Heading */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        {/* Reduced top padding from 16 → 10 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-roboto font-bold text-left text-[#005281] mb-6">
            Our Expertise
          </h2>

          <div className="text-left space-y-6 text-gray-700 leading-relaxed">
            <p>
              Successfully executing services in Q.C. lab operations and
              logistics operations since past 25 years.
            </p>
            <p>
              We specialize in providing comprehensive solutions for polyester
              plant operations, covering a wide range of critical processes
              including CP (Continuous Polymerization), spinning, take-up,
              chemical handling, material handling, packing, and more. With
              extensive expertise and industry knowledge, we are equipped to
              support organizations in optimizing their operations and achieving
              maximum efficiency and productivity.
            </p>
            <p>
              Our team of experienced professionals understands the intricacies
              of polyester Plant Operations and is committed to delivering
              excellence at every stage of the process. From managing
              polymerization processes to ensuring precision in spinning and
              take-up operations, we offer tailored solutions that meet the
              unique needs of each client.
            </p>
            <p>
              In addition to our technical expertise, we place a strong emphasis
              on safety, quality, and environmental sustainability. We adhere to
              stringent safety protocols and quality standards to ensure the
              well-being of our employees and the integrity of our products.
              Furthermore, we implement best practices in chemical handling and
              material management to minimize waste and maximize resource
              utilization.
            </p>
            <p>
              With our comprehensive approach to polyester Plant Operations, we
              help our clients streamline their processes, reduce costs, and
              stay competitive in today's dynamic marketplace. Whether it's
              optimizing production workflows, enhancing product quality, or
              improving supply chain efficiency, we are committed to delivering
              results that drive long-term success for our clients.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section: Careers Heading (moved above grid) */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-roboto font-bold text-left text-[#005281] mb-8"
        >
          Careers
        </motion.h2>
      </section>

      {/* Section: Grid with Carousels */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid 1 - Q.C. Lab Operations */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding group"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.qcLab.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Q.C. Lab Slide ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 -translate-y-1/2 top-1/2" />
              <CarouselNext className="right-2 -translate-y-1/2 top-1/2" />
            </Carousel>
          </motion.div>

          {/* Grid 2 - Polyester Plant */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding group"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.polyester.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Polyester Slide ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 -translate-y-1/2 top-1/2" />
              <CarouselNext className="right-2 -translate-y-1/2 top-1/2" />
            </Carousel>
          </motion.div>

          {/* Grid 3 - Material Handling */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding group"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.material.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Material Slide ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 -translate-y-1/2 top-1/2" />
              <CarouselNext className="right-2 -translate-y-1/2 top-1/2" />
            </Carousel>
          </motion.div>

          {/* Grid 4 - Vision Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-white rounded-2xl shadow-lg p-8 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] border-2 border-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FEDA77] via-[#DD2A7B] to-[#8134AF] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg" />
            <div className="relative z-10 text-center space-y-4">
              <Instagram size={48} className="mx-auto mb-2 text-white" />
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Managing the incoming and outgoing material with precision and
                efficiency. Ensuring meticulous documentation of Gate Entry,
                PCS, and GRN processes. We are committed to delivering the best
                quality, customized, and innovative services and solutions to
                our clients in the field of industrial services supply.
              </p>
              <p className="text-sm text-white/90 leading-relaxed">
                Managing continuous supply to line production to achieve zero
                stoppages, improving efficiency, and maintaining high-quality
                standards throughout the entire supply chain — all while
                optimizing manpower, storage space, and logistics costs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: Cover Image (height increased) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full mt-12"
      >
        <img
          src="/images/operations/cami1.jpg"
          alt="Yohan Enterprise Operations Cover"
          className="w-full h-[40rem] object-cover" // Increased height from 30rem → 40rem
        />
      </motion.section>
    </div>
  );
}
