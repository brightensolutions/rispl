"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FlipText } from "./magicui/flip-text";

interface PageTitleProps {
  title: string;
  backgroundImage?: string;
  subtitle?: string;
}

export function PageTitle({
  title,
  backgroundImage = "/images/Consultancy Services.jpg",
  subtitle,
}: PageTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] z-20 w-full overflow-hidden"
    >
      {/* Background Image with Zoom Effect */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Simple Dark Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-darker/95 via-blue-darker/85 to-blue-darker/70" />

      </motion.div>

      {/* Content */}
      <motion.div
        className="relative h-full container mx-auto px-4"
        style={{ opacity }}
      >
        <div className="h-full flex flex-col items-center justify-center text-center">
          <FlipText
           style={{
            background: "linear-gradient(to right, #bda03b, #ecdc77, #e3ca65, #EDC967)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
            className="text-4xl font-extrabold font-nunito  text-black dark:text-white md:text-7xl"
          >
            {title}
          </FlipText>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl font-roboto text-white/90 max-w-3xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Simple Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[150px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
}
