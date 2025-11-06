"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Instagram, MessageCircle } from "lucide-react";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";

export default function NewsroomPage() {
  const [featureApi, setFeatureApi] = useState<CarouselApi>(undefined);
  const [updatesApi, setUpdatesApi] = useState<CarouselApi>(undefined);

  const handleFeatureApi = useCallback((api: CarouselApi) => {
    setFeatureApi(api);
  }, []);

  const handleUpdatesApi = useCallback((api: CarouselApi) => {
    setUpdatesApi(api);
  }, []);

  useCarouselAutoplay(featureApi, 4000);
  useCarouselAutoplay(updatesApi, 4000);

  const carouselSlides = {
    feature: [
      {
        src: "/images/operations/p1.jpg",
        title: "Milestone Achievement",
        content:
          "Eagle Enterprise celebrates our latest industrial breakthrough with advanced operational excellence.",
      },
      {
        src: "/images/operations/f1.png",
        title: "Team Excellence",
        content:
          "Our dedicated team continues to deliver outstanding results and innovative solutions.",
      },
    ],
    updates: [
      {
        src: "/images/operations/f3.png",
        title: "Latest Updates",
        content:
          "Stay informed with our most recent company updates and announcements.",
      },
    ],
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="w-full bg-gradient-to-r from-[#005281] to-[#003d5c] py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Newsroom</h1>
          <p className="text-xl text-gray-100">
            Updates, Milestones & Achievements
          </p>
        </motion.div>
      </section>

      {/* Section: Introduction */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-left text-[#005281] mb-6">
            Our Latest Highlights
          </h2>

          <div className="text-left space-y-6 text-gray-700 leading-relaxed">
            <p>
              Stay informed with the latest updates, milestones, and industry
              insights from our team. At Eagle Enterprise, we continually push
              boundaries and celebrate the excellence that defines our journey
              in industrial services and operational management.
            </p>
            <p>
              From on-site achievements to strategic collaborations, every story
              reflects our commitment to safety, innovation, and continuous
              improvement.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section: Grid with Auto-rotating Carousels */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid 1 - Feature Carousel with Content */}
          <motion.div
            className="md:col-span-2 flex flex-col md:flex-row items-center justify-between rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-white bg-clip-padding"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Left Image Carousel */}
            <div className="w-full md:w-1/2">
              <Carousel setApi={handleFeatureApi} className="w-full">
                <CarouselContent>
                  {carouselSlides.feature.map((slide, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <img
                          src={slide.src || "/placeholder.svg"}
                          alt={slide.title}
                          className="w-full h-[26rem] object-cover"
                        />
                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                          <h4 className="text-lg font-semibold">
                            {slide.title}
                          </h4>
                        </div> */}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>

            {/* Right Text Content */}
            <div className="w-full md:w-1/2 p-8 text-gray-700">
              <p className="leading-relaxed mb-4">
                2024 Indian general elections reveals significant developments
                following the voting, which took place from April 19 to June 1,
                2024. The results were announced on June 4, 2024, with the
                National Democratic Alliance (NDA), led by the Bharatiya Janata
                Party (BJP), securing a majority in the Lok Sabha but with a
                notable decrease in their seat count compared to previous
                elections.
              </p>
            </div>
          </motion.div>

          {/* Grid 2 - Updates Carousel with Content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(135deg, #005281, #EDC967) 1",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <Carousel setApi={handleUpdatesApi} className="w-full">
              <CarouselContent>
                {carouselSlides.updates.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <img
                        src={slide.src || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-[26rem] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                        <h4 className="text-xl font-semibold mb-2">
                          {slide.title}
                        </h4>
                        <p className="text-sm text-gray-100">{slide.content}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
            </Carousel>
          </motion.div>

          {/* Grid 3 - WhatsApp Section (REPLACES Media Coverage Carousel) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center justify-center text-white rounded-2xl shadow-lg p-8 bg-gradient-to-br from-[#25D366] to-[#128C7E] border-2 border-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#34eb83] to-[#075E54] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg" />
            <div className="relative z-10 text-center">
              <MessageCircle size={48} className="mx-auto mb-4 text-white" />

              <p className="text-sm text-white/90 leading-relaxed mb-4 max-w-xl mx-auto">
                WhatsApp has said that it is testing its large language
                model-powered chatbot Meta AI, with users in India and some
                other markets, in an effort to tap the massive user base to up
                its artificial intelligence (AI) offerings.
              </p>
            </div>
          </motion.div>

          {/* Grid 4 - Instagram Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center text-white rounded-2xl shadow-lg p-8 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] border-2 border-transparent relative overflow-hidden md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FEDA77] via-[#DD2A7B] to-[#8134AF] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg" />
            <div className="relative z-10 text-center">
              <Instagram size={48} className="mx-auto mb-4 text-white" />

              <p className="text-sm text-white/90 leading-relaxed max-w-2xl mx-auto">
                They publish articles, reports, and thought leadership pieces on
                various management and business topics. Industry Trends and
                Insights: Content exploring emerging trends, technologies, and
                best practices in the handling industry, as well as analysis of
                market conditions and competitive intelligence. Resources on
                providing excellent customer service in handling operations,
                including order fulfillment accuracy, on-time delivery, and
                handling customer inquiries and complaints.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
