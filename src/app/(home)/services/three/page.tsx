"use client"

import { PageTitle } from "@/components/other-page-title"
import ServiceSection from "@/components/service-section"

function ServiceFiberTextile() {
  return (
    <div className="overflow-hidden">
      <PageTitle
        title="Fiber & Textile"
        backgroundImage="/images/aboutTeam.jpg"
        subtitle="Advanced Packaging Solutions for Fiber & Textile Industry"
      />

      <ServiceSection
        pageTitle="Fiber & Textile"
        pageSubtitle="Advanced Packaging Solutions for Fiber & Textile Industry"
        headerImage="/images/fibre-and-textile.webp"
        mainTitle="Fiber &"
        highlightedTitle="Textile"
        mainDescription="Packaging in the fiber and textiles industry plays a crucial role in simplifying the transportation and handling of products. The use of specific line equipment and packaging materials helps to ensure that the products are protected and avoid any damage during the supply chain process."
        cards={[
          {
            image: "/images/Manufacturing-Equipment.avif",
            title: "Manufacturing Equipment",
            description:
              "State-of-the-art packaging machinery designed specifically for textile products, ensuring efficient and precise packaging processes.",
          },
          {
            image: "/images/Storage-Solutions.avif",
            title: "Storage Solutions",
            description:
              "Industrial-grade storage and packaging solutions that maintain product integrity throughout the supply chain.",
          },
          {
            image: "/images/Protective-Packaging.avif",
            title: "Protective Packaging",
            description:
              "Specialized protective packaging materials and methods to safeguard textile products during transportation and storage.",
          },
        ]}
        bottomDescription="This is important as it ensures that the fiber and textiles maintain their quality and integrity from production to delivery. By utilizing effective packaging techniques, companies can minimize the risk of product damage and costly mishaps. The packaging not only provides a convenient way to transport the products but also acts as a protective barrier against external elements. Overall, packaging in the fiber and textiles industry is essential in maintaining the value and quality of the products throughout the supply chain."
        buttonText="Learn More"
      />
    </div>
  )
}

export default ServiceFiberTextile