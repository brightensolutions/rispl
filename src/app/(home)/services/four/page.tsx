"use client"

import { PageTitle } from "@/components/other-page-title"
import ServiceSection from "@/components/service-section"

function ServiceLogisticsWarehousing() {
  return (
    <>
      <PageTitle
        title="Logistics & Warehousing"
        backgroundImage="/images/aboutTeam.jpg"
        subtitle="Comprehensive Solutions for Modern Logistics & Warehousing"
      />

      <ServiceSection
        pageTitle="Logistics & Warehousing"
        pageSubtitle="Comprehensive Solutions for Modern Logistics & Warehousing"
        headerImage="/images/logistics-and-warehousing-industry.jpg"
        mainTitle="Logistics &"
        highlightedTitle="Warehousing"
        mainDescription="In the logistics and warehousing industry, there are various challenges when it comes to handling different types of packages and materials. From packages and boxes in different shapes and sizes to heavy materials, it is important to find effective solutions. Material handling is a crucial aspect, ensuring that items are properly transferred and stored."
        cards={[
          {
            image: "/images/Warehouse-Management.webp",
            title: "Warehouse Management",
            description:
              "State-of-the-art warehouse management systems with efficient storage and retrieval solutions, optimizing space utilization and inventory control.",
          },
          {
            image:  "/images/Automated-Systems.avif",
            title: "Automated Systems",
            description:
              "Advanced automated packaging and unitizing systems that streamline operations and ensure consistent handling of materials.",
          },
          {
            image:  "/images/Storage-Solutions2.avif",
            title: "Storage Solutions",
            description:
              "Optimized storage solutions with proper identification and communication methods for efficient inventory management and retrieval.",
          },
        ]}
        bottomDescription="Packaging and unitizing techniques play a vital role in ensuring the safe transportation of goods. Optimizing truck utilization helps to maximize efficiency and reduce costs. Internal transport within the warehouse is also a key consideration, ensuring smooth operations and timely retrieval of items. Storage retrieval systems and proper identification and communication methods are essential for efficient management of inventory. Overall, these solutions are critical to the success of the logistics and warehousing industry."
        buttonText="Explore Solutions"
      />
    </>
  )
}

export default ServiceLogisticsWarehousing