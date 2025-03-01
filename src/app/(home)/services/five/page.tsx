"use client"

import { PageTitle } from "@/components/other-page-title"
import ServiceSection from "@/components/service-section"

export default function ServiceAutomobile() {
  return (
    <>
      <PageTitle
        title="Automobile"
        backgroundImage="/images/aboutTeam.jpg"
        subtitle="Specialized Packaging Solutions for Automotive Parts"
      />

      <ServiceSection
        pageTitle="Automobile"
        pageSubtitle="Specialized Packaging Solutions for Automotive Parts"
        headerImage="/images/Automotive-reusable-packaging.webp"
        mainTitle="Automotive"
        highlightedTitle="Packaging"
        mainDescription="Shipping automotive parts requires specialized packaging solutions, with two main types: Expendable and Returnable. Expendable packaging is disposable, made from materials like paper, plywood, wood, or corrugated cardboard. Returnable packaging includes reusable racks, pallets, bulk containers, dunnage, and hand-held containers, along with plywood and plastic containers."
        cards={[
          {
            image: "/images/Bulk-Parts-Packaging.avif",
            title: "Bulk Parts Packaging",
            description:
              "Specialized solutions for large automotive parts using both expendable and returnable packaging systems, ensuring safe handling and transportation.",
          },
          {
            image: "/images/Specialized-Components.avif",
            title: "Specialized Components",
            description:
              "Custom packaging solutions for delicate automotive components like wheels and specialized parts, with protective wrapping and secure containment.",
          },
          {
            image: "/images/Small-Parts-Management.avif",
            title: "Small Parts Management",
            description:
              "Organized packaging systems for small automotive parts, featuring efficient storage solutions and protective packaging materials.",
          },
        ]}
        bottomDescription="Our comprehensive automotive packaging solutions are designed to meet the diverse needs of the automotive industry. Whether you need expendable packaging for one-time shipments or returnable packaging for ongoing supply chain operations, we provide efficient and cost-effective solutions that protect your automotive parts throughout the transportation and storage process."
        buttonText="Discover Solutions"
      />
    </>
  )
}

