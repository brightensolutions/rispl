"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  _id: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
  order: number;
  active: boolean;
}

export function HeroSlider() {
  const [slides, setSlides] = React.useState<Slide[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [slideDirection, setSlideDirection] = React.useState(1);
  const autoPlayRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/sliders");
        const data = await res.json();

        if (data.success && data.data.length > 0) {
          setSlides(data.data);
        } else {
          setSlides([]);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = React.useCallback(() => {
    if (slides.length === 0) return;
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    if (slides.length === 0) return;
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    if (isAutoPlaying && slides.length > 0) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide, slides.length]);

  if (!mounted) return null;

  if (loading || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-screen -top-14 w-full bg-blue-dark overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{
            opacity: 0,
            scale: slideDirection === 1 ? 1.1 : 0.9,
            x: slideDirection === 1 ? 120 : -120,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            scale: slideDirection === 1 ? 0.9 : 1.1,
            x: slideDirection === 1 ? -120 : 120,
          }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-darker/25 via-blue-darker/30 to-blue-darker/20" />

          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content with better layout */}
      <div className="relative h-full">
        <div className="container mx-auto h-full px-4 lg:px-8">
          <div className="flex h-full items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-[650px] lg:max-w-[800px] text-white"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block rounded-full bg-gold px-6 py-2 text-sm font-medium shadow-lg"
                >
                  {slides[currentSlide].highlight}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 font-nunito text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 font-roboto text-xl text-white/90 md:text-2xl max-w-[90%]"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation with better positioning */}
        <div className="absolute bottom-12 left-0 right-0">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSlideDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                    }}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentSlide === index
                        ? "w-12 bg-gold"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-blue-darker"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-blue-darker"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
