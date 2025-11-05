"use client";

import ModernServiceLayout from "@/components/modern-service-layout";

const egaleData = {
  title: "Eagle Instrumentation",
  subtitle:
    "Precision instrumentation and measurement solution for enterprises requiring exact data acquisition",
  headerImage: "/eagle-instrumentation-precision-measurement.jpg",
  slug: "eagle-instrumentation",
  description:
    "Eagle Instrumentation offers precision-driven measurement and monitoring solutions engineered for industries that demand absolute accuracy and reliability.",
  href: "/services/eagle-instrumentation",
  sections: [
    {
      title: "What is Eagle Instrumentation?",
      description:
        "Eagle Instrumentation provides state-of-the-art measurement and monitoring capabilities with unparalleled precision and accuracy. Designed for industries where exact measurements are critical.",
      features: [
        {
          title: "Precision Measurement",
          description:
            "Highly accurate sensor data acquisition and logging with calibration management",
          image: "/precision-measurement-sensors.jpg",
        },
        {
          title: "Calibration Management",
          description:
            "Automated calibration tracking and compliance certification systems",
          image: "/calibration-management.jpg",
        },
        {
          title: "Data Integration",
          description:
            "Seamless integration with existing systems and enterprise infrastructure",
          image: "/data-integration-concept.png",
        },
      ],
    },
    {
      title: "Instrumentation Capabilities",
      description:
        "Eagle Instrumentation delivers comprehensive measurement solutions for demanding environments",
      features: [
        {
          title: "Alert System",
          description:
            "Real-time notifications and anomaly detection for critical operations",
          image: "/alert-system-monitoring.jpg",
        },
        {
          title: "Compliance Reporting",
          description:
            "Full compliance reporting and audit trails for regulatory requirements",
          image: "/compliance-reporting.jpg",
        },
        {
          title: "Historical Analytics",
          description:
            "Comprehensive historical data analytics and trend analysis capabilities",
          image: "/historical-analytics.jpg",
        },
      ],
    },
  ],
};

export default function EgaleInstrumentation() {
  return <ModernServiceLayout service={egaleData} />;
}
