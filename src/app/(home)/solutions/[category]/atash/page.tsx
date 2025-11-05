"use client";

import ModernServiceLayout from "@/components/modern-service-layout";
import type { ServiceData } from "@/lib/services-data";

const atashData: ServiceData = {
  slug: "atash-enterprise",
  title: "Atash Enterprise",
  subtitle:
    "Advanced enterprise solution focused on performance optimization and operational excellence",
  description:
    "Atash Enterprise is an advanced enterprise-grade solution designed for optimizing performance, reliability, and predictive maintenance across industrial operations.",
  href: "/services/atash-enterprise",
  headerImage: "/atash-enterprise-performance-optimization.jpg",
  sections: [
    {
      title: "What is Atash Enterprise?",
      description:
        "Atash Enterprise is engineered for organizations that demand peak performance and reliability. It delivers advanced monitoring, predictive maintenance, and performance optimization capabilities.",
      features: [
        {
          title: "Performance Optimization",
          description:
            "Maximize throughput and operational efficiency with advanced optimization algorithms.",
          image: "/performance-optimization.png",
        },
        {
          title: "Predictive Maintenance",
          description:
            "Anticipate issues before they happen with intelligent predictive analytics.",
          image: "/predictive-maintenance-concept.png",
        },
        {
          title: "Real-time Monitoring",
          description:
            "Continuous monitoring with immediate alerts for any anomalies.",
          image: "/real-time-monitoring.jpg",
        },
      ],
    },
    {
      title: "Advanced Features",
      description:
        "Atash Enterprise combines cutting-edge technology with practical operational needs to ensure business excellence.",
      features: [
        {
          title: "Advanced Analytics",
          description:
            "Comprehensive dashboards and KPI tracking for informed decision-making.",
          image: "/advanced-analytics.jpg",
        },
        {
          title: "Maintenance Management",
          description:
            "Proactive maintenance scheduling and automated alert systems.",
          image: "/maintenance-management.jpg",
        },
        {
          title: "Team Coordination",
          description:
            "Unified platform for seamless team collaboration and communication.",
          image: "/team-coordination.jpg",
        },
      ],
    },
  ],
};

export default function AtashEnterprise() {
  return <ModernServiceLayout service={atashData} />;
}
