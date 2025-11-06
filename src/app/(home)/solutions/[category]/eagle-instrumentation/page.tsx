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

export default function EaglePage() {
  const service: ServiceData = {
    title: "Eagle Instrumentation",
    subtitle: "Specialized Lance Management & Temperature Monitoring Services",
    headerImage: "/images/eagle-cover.jpg",
  };

  const carouselSlides = {
    lance: [
      { src: "/images/operations/egc1.jpg" },
      { src: "/images/operations/egc2.jpg" },
      { src: "/images/operations/egc3.jpg" },
    ],
    temperature: [
      { src: "/images/operations/egc4.jpg" },
      { src: "/images/operations/egc5.jpg" },
    ],
    monitoring: [{ src: "/images/operations/egc6.jpg" }],
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <ModernOperationLayout service={service} />

      {/* Section: Our Expertise */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-4">
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
              We take pride in supplying highly skilled operators for{" "}
              <strong>lance management services</strong>, particularly for
              temperature reading at <strong>AM/NS Hazira</strong>. Our
              commitment to excellence and dedication to precision ensure that
              our operators deliver accurate and reliable temperature readings,
              crucial for maintaining operational efficiency and safety
              standards.
            </p>

            <p>
              Our team is thoroughly trained in high-temperature industrial
              operations, ensuring accuracy and safety in every task. From
              monitoring temperature variations to managing lance operations
              with precision, our operators ensure smooth and efficient plant
              performance.
            </p>

            <p>
              We emphasize continuous improvement, adherence to safety
              protocols, and implementation of industrial best practices to
              deliver high-quality, reliable results for our clients.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section: Careers */}
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

      {/* Section: 2x2 Grid with Carousels and Instagram */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1 - Lance Management */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.lance.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Lance Management Slide ${index + 1}`}
                      className="w-full h-[26rem] object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
            </Carousel>
          </motion.div>

          {/* 2 - Temperature Reading */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.temperature.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Temperature Slide ${index + 1}`}
                      className="w-full h-[26rem] object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
            </Carousel>
          </motion.div>

          {/* 3 - Monitoring Operations */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.monitoring.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Monitoring Slide ${index + 1}`}
                      className="w-full h-[26rem] object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
            </Carousel>
          </motion.div>

          {/* 4 - Instagram Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-white rounded-2xl shadow-lg p-8 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] border-2 border-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FEDA77] via-[#DD2A7B] to-[#8134AF] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg" />
            <div className="relative z-10 text-center">
              <Instagram size={48} className="mx-auto mb-4 text-white" />

              <p className="text-sm text-white/90 leading-relaxed max-w-2xl mx-auto">
                At every step of the way, we adhere to industry best practices
                and quality standards to deliver packaging solutions that meet
                the needs of our clients, including Reliance Jio. By partnering
                with us, clients can rest assured that their packaging
                requirements will be handled efficiently and effectively,
                enabling them to focus on their core business objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: Cover Image (Bigger) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full mt-10"
      >
        <img
          src="/images/operations/eagle1.jpg"
          alt="Eagle Enterprise Operations Cover"
          className="w-full h-[42rem] object-cover"
        />
      </motion.section>
    </div>
  );
}
