"use client";

import { motion } from "framer-motion";
import { PageTitle } from "./other-page-title";

export interface ServiceData {
  title: string;
  subtitle?: string;
  description?: string;
  headerImage?: string;
  sections?: {
    description: string;
  }[];
}

interface ModernOperationLayoutProps {
  service: ServiceData;
}

const container = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ModernOperationLayout({
  service,
}: ModernOperationLayoutProps) {
  return (
    <section className="w-full bg-white">
      {/* ✅ Page Header */}
      <PageTitle
        title={service.title || ""}
        subtitle={service.subtitle}
        backgroundImage={service.headerImage}
      />

      {/* ✅ Text content section */}
    </section>
  );
}
