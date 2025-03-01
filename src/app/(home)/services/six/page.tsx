"use client"

import { PageTitle } from "@/components/other-page-title"
import ServiceSection from "@/components/service-section"

function ServiceManufacturing() {
  return (
    <>
      <PageTitle
        title="General Manufacturing & Engineering"
        backgroundImage="/images/aboutTeam.jpg"
        subtitle="Advanced Packaging Solutions for Manufacturing Industries"
      />

      <ServiceSection
        pageTitle="General Manufacturing & Engineering"
        pageSubtitle="Advanced Packaging Solutions for Manufacturing Industries"
        headerImage="/images/General-Manufacturing-and-Engineering.jpg"
        mainTitle="Manufacturing &"
        highlightedTitle="Engineering"
        mainDescription="Our customized packaging system for over-sized appliances and industrial equipment is designed to ensure maximum protection during transit. We design and supply protective packaging solutions that ensure your product reaches the customer in the same condition it left the manufacturing floor."
        cards={[
          {
            image: "/images/Precision-Component-Packaging.avif",
            title: "Precision Component Packaging",
            description:
              "Specialized packaging solutions for sensitive industrial components and machinery parts, ensuring protection during storage and transit.",
          },
          {
            image: "/images/Bulk-Industrial-Storage.avif",
            title: "Bulk Industrial Storage",
            description:
              "Efficient storage and packaging systems for large quantities of industrial components, optimizing space and accessibility.",
          },
          {
            image: "/images/Automated-Packaging-Solutions.avif",
            title: "Automated Packaging Solutions",
            description:
              "State-of-the-art automated packaging systems designed for efficient handling and processing of manufactured goods.",
          },
        ]}
        bottomDescription="Our engineering expertise allows us to develop custom packaging solutions that address the unique challenges of manufacturing industries. From delicate components to heavy machinery, our packaging systems are designed to provide optimal protection while maximizing efficiency in your supply chain operations."
        buttonText="Explore Solutions"
      />
    </>
  )
}


export default ServiceManufacturing;
