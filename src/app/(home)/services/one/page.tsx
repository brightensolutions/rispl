"use client"

import { PageTitle } from "@/components/other-page-title"
import ServiceSection from "@/components/service-section"

function ServicesFmcg() {
  return (
    <>
      <PageTitle
        title="FMCG Packaging Solutions"
        backgroundImage="/images/FMCG-Packaging.jpg"
        subtitle="Innovative Solutions for Fast-Moving Consumer Goods"
      />

      <ServiceSection
        pageTitle="FMCG Packaging Solutions"
        pageSubtitle="Innovative Solutions for Fast-Moving Consumer Goods"
        headerImage="/images/FMCG-Packaging-Solutions.jpg"
        mainTitle="FMCG"
        highlightedTitle="Packaging Solutions"
        mainDescription="We specialize in providing high-quality packaging solutions to FMCG industries. With our extensive expertise and state-of-the-art technology, we ensure that your products are packaged securely and efficiently."
        cards={[
          {
            image: "/images/Personal Care Products.jpg",
            title: "Personal Care Products",
            description: "Premium packaging solutions for personal care items",
          },
          {
            image: "/images/Home Care Solutions.jpg",
            title: "Home Care Solutions",
            description: "Efficient packaging for household products",
          },
          {
            image: "/images/about-us.jpg",
            title: "Complete Packaging Systems",
            description: "From inner pack to shipping solutions",
          },
        ]}
        bottomDescription="Our packaging solutions are tailored to meet the unique needs of fast-moving consumer goods industries, ensuring that your products are not only protected during transportation but also visually appealing on store shelves."
        buttonText="Get Started"
      />
    </>
  )
}

export default ServicesFmcg