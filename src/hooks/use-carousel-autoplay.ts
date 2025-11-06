"use client";

import { useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export function useCarouselAutoplay(
  api: CarouselApi | undefined,
  delay = 4000
) {
  useEffect(() => {
    if (!api) return;

    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, delay);

    return () => clearInterval(autoplayInterval);
  }, [api, delay]);
}
