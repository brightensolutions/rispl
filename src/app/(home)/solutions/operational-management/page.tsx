"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PageTitle } from "@/components/other-page-title";

interface VideoSection {
  title: string;
  videos: { id: string; title: string; url?: string }[];
  photos?: { id: string; title: string; url?: string }[];
}

export default function OperationManagement() {
  const industryData = {
    pageTitle: "Operation Management",
    pageSubtitle: "Explore our advanced operations and manufacturing processes",
    headerImage: "/operation-management-hero.jpg",
  };

  const [videoSections] = useState<VideoSection[]>([
    {
      title: "Garden H1 Solution for Labelling",
      videos: [{ id: "1", title: "Garden H1 Labelling Process" }],
      photos: [
        { id: "p1", title: "Labelling Station 1" },
        { id: "p2", title: "Labelling Station 2" },
        { id: "p3", title: "Quality Check" },
      ],
    },
    {
      title: "Duct Pipe Operations",
      videos: [
        { id: "2", title: "Duct Pipe Manufacturing - Part 1" },
        { id: "3", title: "Duct Pipe Manufacturing - Part 2" },
        { id: "4", title: "Duct Pipe Assembly" },
      ],
    },
  ]);

  const banners = [
    { id: 1, name: "Yohan Industries", image: "/images/operations/yohan.jpg" },
    { id: 2, name: "Atash Industries", image: "/images/operations/atash.jpg" },
    {
      id: 3,
      name: "Eagle Instrumentation",
      image: "/images/operations/eagle.jpg",
    },
  ];

  return (
    <main className="min-h-screen">
      <PageTitle
        title={industryData.pageTitle}
        backgroundImage={industryData.headerImage}
        subtitle={industryData.pageSubtitle}
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-nunito font-bold mb-6 text-blue-dark">
              About Our Operations
            </h2>
            <p className="text-lg text-gray-600 font-roboto leading-relaxed mb-4">
              We operate state-of-the-art manufacturing facilities equipped with
              the latest technology and machinery. Our operational management
              team ensures quality, efficiency, and safety at every stage of
              production.
            </p>
            <p className="text-lg text-gray-600 font-roboto leading-relaxed">
              From precision labelling solutions to complex duct pipe
              manufacturing, we deliver excellence through continuous innovation
              and process optimization.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-lg overflow-hidden border border-gray-200 hover:border-gold/40 transition-all duration-300"
                  >
                    <img
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.name}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <h3 className="text-2xl font-nunito font-bold text-white p-6">
                        {banner.name}
                      </h3>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-gold/40 text-gold hover:bg-gold/10" />
            <CarouselNext className="border-gold/40 text-gold hover:bg-gold/10" />
          </Carousel>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-12" />
    </main>
  );
}
