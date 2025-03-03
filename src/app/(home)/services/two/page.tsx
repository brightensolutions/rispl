"use client"

import { PageTitle } from "@/components/other-page-title"
import ServiceSection from "@/components/service-section"

function ServiceFoodAndBeverages() {
  return (
    <div className="overflow-hidden">
      <PageTitle
        title="Food and Beverages"
        backgroundImage="/images/aboutTeam.jpg"
        subtitle="Comprehensive Packaging Solutions for Food & Beverage Industry"
      />

      <ServiceSection
        pageTitle="Food and Beverages"
        pageSubtitle="Comprehensive Packaging Solutions for Food & Beverage Industry"
        headerImage="/images/food-and-beverages.jpg"
        mainTitle="Food and"
        highlightedTitle="Beverages"
        mainDescription="We offer a comprehensive range of packaging solutions for the food and beverage industries, including shrink wrap options. Our packaging is designed to ensure the safety and freshness of your products, while also providing an attractive and eye-catching display."
        cards={[
          {
            image: "/images/Beverage-Packaging.jpg",
            title: "Beverage Packaging",
            description:
              "Specialized packaging solutions for bottles and beverage containers, ensuring product protection and attractive presentation.",
          },
          {
            image: "/images/Shrink-Wrap-Solutions.jpg",
            title: "Shrink Wrap Solutions",
            description:
              "From shrink wrap sleeves to shrink bags, our packaging options are versatile and customizable to meet your specific requirements.",
          },
          {
            image: "/images/Food-Packaging.png",
            title: "Food Packaging",
            description:
              "Custom packaging solutions for food products, maintaining freshness and ensuring appealing presentation on store shelves.",
          },
        ]}
        bottomDescription="We understand the importance of packaging in the food and beverage industries, where quality and presentation play a crucial role in consumer satisfaction. Our team of experts will work closely with you to find the perfect packaging solution that not only meets your requirements but also enhances the overall appeal of your products."
        buttonText="Get Started"
      />
    </div>
  )
}

export default  ServiceFoodAndBeverages