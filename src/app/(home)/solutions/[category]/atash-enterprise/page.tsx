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

export default function AtashPage() {
  const service: ServiceData = {
    title: "Atash Enterprise",
    subtitle:
      "Empowering Industries with Skilled Workforce & Technical Support",
    headerImage: "/images/atash-cover.jpg",
  };

  const carouselSlides = {
    recruitment: [
      { src: "/images/operations/atc1.jpg" },
      { src: "/images/operations/atc2.jpg" },
      { src: "/images/operations/atc3.jpg" },
    ],
    workforce: [
      { src: "/images/operations/atc4.jpg" },
      { src: "/images/operations/atc5.jpg" },
      { src: "/images/operations/atc6.jpg" },
    ],
    technical: [
      { src: "/images/operations/atc6.jpg" },
      { src: "/images/operations/atc7.jpg" },
    ],
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <ModernOperationLayout service={service} />

      {/* Our Expertise Section */}
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
              Atash Enterprise is a trusted partner for industrial staffing,
              recruitment, and technical manpower solutions. We specialize in
              connecting industries with skilled professionals and providing
              reliable, tailored staffing services to meet dynamic operational
              demands.
            </p>
            <p>
              Our expertise spans across multiple industrial sectors, including
              polyester, chemical, and process plants. We pride ourselves on our
              ability to deliver quality manpower solutions—whether for
              long-term assignments, short-term contracts, or critical emergency
              operations.
            </p>
            <p>
              We provide specialized workforce management services for skilled,
              semi-skilled, and unskilled labor. Our recruitment process ensures
              the right candidate for the right job, improving operational
              productivity while maintaining high safety and compliance
              standards.
            </p>
            <p>
              In addition, Atash Enterprise offers on-demand technical
              assistance during plant shutdowns and maintenance. Our experienced
              technical teams ensure minimal downtime, optimized resource use,
              and adherence to safety protocols.
            </p>
            <p>
              Every service we offer is driven by our commitment to excellence,
              reliability, and precision — ensuring industries can operate
              seamlessly and focus on their core strengths.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Careers Section */}
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

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Industrial Recruitment */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding group"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.recruitment.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Recruitment Slide ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 -translate-y-1/2 top-1/2" />
              <CarouselNext className="right-2 -translate-y-1/2 top-1/2" />
            </Carousel>
          </motion.div>

          {/* Workforce Management */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding group"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.workforce.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Workforce Slide ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 -translate-y-1/2 top-1/2" />
              <CarouselNext className="right-2 -translate-y-1/2 top-1/2" />
            </Carousel>
          </motion.div>

          {/* Technical Emergency Support */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding group"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {carouselSlides.technical.map((slide, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={slide.src}
                      alt={`Technical Slide ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 -translate-y-1/2 top-1/2" />
              <CarouselNext className="right-2 -translate-y-1/2 top-1/2" />
            </Carousel>
          </motion.div>

          {/* Vision / Instagram Styled Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-white rounded-2xl shadow-lg p-8 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] border-2 border-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FEDA77] via-[#DD2A7B] to-[#8134AF] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg" />
            <div className="relative z-10 text-center space-y-4">
              <Instagram size={48} className="mx-auto mb-2 text-white" />
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-sm text-white/90 leading-relaxed">
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

      {/* Cover Image Section (larger height) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full mt-12"
      >
        <img
          src="/images/operations/bil1.jpg"
          alt="Atash Enterprise Operations Cover"
          className="w-full h-[40rem] object-cover"
        />
      </motion.section>
    </div>
  );
}
