export interface ServiceData {
  slug: string
  title: string
  subtitle: string
  description: string
  href: string
  headerImage: string
  sections: Array<{
    title: string
    description: string
    features?: Array<{
      title: string
      description: string
      image: string
    }>
    images?: Array<{
      src: string
      alt: string
    }>
  }>
}

export const servicesData: ServiceData[] = [
  {
    slug: "unitization-bundling",
    title: "Unitization and Bundling",
    subtitle: "Efficient bundling solutions for optimal packaging",
    description: "Efficient bundling solutions",
    href: "/solutions/unitization-bundling",
    headerImage: "/images/Unitisation-and-Bundling.jpg",
    sections: [
      {
        title: "Our Bundling Solutions",
        description:
          "Our packaging Solutions can help you safe long transit journey. Utilizing our incomparable extent of packaging components, we can design a solution for your pack-out challenges.",
        features: [
          {
            title: "Product Bundling",
            description:
              "The Product that can't be shipped easily, we design packaging that involves cartons or boxes to stacks easily on a pallet.",
            image: "/images/Product-Bundling.avif",
          },
          {
            title: "Secure Transport",
            description:
              "Unitizing solutions help create secure pallets and protect products during transport and storage.",
            image: "/images/Secure-Transport.avif",
          },
          {
            title: "Efficient Solutions",
            description:
              "Our bundling solutions help consolidate your products for palletizing or shipping with maximum efficiency.",
            image: "/images/Efficient-Solutions.avif",
          },
        ],
      },
    ],
  },
  {
    slug: "warehouse-solutions",
    title: "Warehouse Solutions",
    subtitle: "Advanced storage and management systems",
    description:
      "We bring to you products which help increase the value of your products by preventing damage during transportation and internal warehousing. We have the ability to design the right pack-out for your products thus can provide the solutions that will help protect your products throughout the end-of-line transit journey",
    href: "/solutions/warehouse-solutions",
    headerImage: "/images/aboutTeam.jpg",
    sections: [
      {
        title: "Our Warehouse Solutions",
        description:
          "We provide comprehensive warehouse solutions categorized under specific areas of expertise to ensure maximum protection and efficiency in your warehouse operations.",
        features: [
          {
            title: "Protective Packaging",
            description:
              "Our protective packaging solutions include paper-based packaging, corner protectors, and custom protective solutions designed to prevent damage during transportation and warehousing. We focus on providing cost-effective and environmentally friendly options.",
            image: "/images/Protective-Packaging2.avif",
          },
          {
            title: "Transit Protection Solutions",
            description:
              "Comprehensive transit protection including edge protectors, strapping solutions, and advanced securing methods. Our solutions ensure your products remain stable and protected throughout the entire logistics chain.",
            image: "/images/Transit-Protection-Solutions.avif",
          },
          {
            title: "Pallet Stability Solutions",
            description:
              "Advanced pallet stability technology that makes the difference. Our solutions include anti-slip sheets, interlocking mechanisms, and specialized stacking techniques to maximize stability and safety.",
            image: "/images/Pallet-Stability-Solutions.avif",
          },
          {
            title: "Paper Based Packaging",
            description:
              "Environmentally friendly paper-based packaging solutions including corner protectors, edge protectors, and custom-designed protective elements for your specific needs.",
            image: "/images/Paper-Based-Packaging.avif",
          },
          {
            title: "Pallet Replacement Options",
            description:
              "Innovative pallet replacement solutions including plastic pallets, paper pallets, and slip sheets. We provide cost-effective alternatives that maintain strength and durability while reducing weight and cost.",
            image: "/images/Pallet-Replacement-Options.avif",
          },
          {
            title: "Custom Warehouse Solutions",
            description:
              "Tailored warehouse solutions designed specifically for your products and operations. We analyze your needs and provide comprehensive solutions that optimize space and enhance protection.",
            image: "/images/Warehouse-Management.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "contract-packaging",
    title: "Contract Packaging",
    subtitle: "Professional Packaging Services & Solutions",
    description:
      "RISPL are specialist in offering a Contract for Complete Packaging line and fulfillment services. We maximize efficiency through single point responsibility and comprehensive end-to-end solutions.",
    href: "/solutions/contract-packaging",
    headerImage: "/images/aboutTeam.jpg",
    sections: [
      {
        title: "Complete Packaging Solutions",
        description:
          "The Objective of providing Contract packaging is to maximize efficiency by having a single point responsibility at customer end. This allows customers to focus on their core activities, benefiting from process simplification, single point contact and zero packaging inventories.",
        features: [
          {
            title: "End-to-End Service",
            description:
              "The Contract packaging includes total material supply, equipment, packaging labor, and supervision as per best business practices.",
            image: "/images/End-to-End-Service.jpg",
          },
          {
            title: "Single Point Responsibility",
            description:
              "We provide complete ownership and responsibility for your packaging operations, simplifying management and improving efficiency.",
            image: "/images/Single-Point-Responsibility.jpg",
          },
          {
            title: "Zero Inventory Management",
            description:
              "Our service includes management of consumables and spares, ensuring zero packaging inventories for optimal operations.",
            image: "/images/Zero-Inventory-Management.jpg",
          },
        ],
      },
      {
        title: "Benefits of Contract Packaging",
        description:
          "Our contract packaging services offer multiple advantages that enhance your operational efficiency and reduce costs:",
        features: [
          {
            title: "Cost-Effective Operations",
            description:
              "Optimize your packaging costs through efficient operations and maintenance, reducing overall operational expenses.",
            image: "/images/Cost-Effective-Operations.jpg",
          },
          {
            title: "Timely Material Dispatch",
            description: "Ensure prompt and efficient dispatch of materials with our streamlined packaging processes.",
            image: "/images/streamlined-packaging-processes.jpg",
          },
          {
            title: "Reduced Pilferage",
            description:
              "Enhanced security and monitoring systems to minimize product loss and ensure inventory accuracy.",
            image: "/images/Reduced-Pilferage.jpg",
          },
          {
            title: "Quality Assurance",
            description:
              "Maintain product quality through careful handling and packaging, delivering products in manufacturing condition.",
            image: "/images/Quality-Assurance.jpg",
          },
        ],
        images: [
          {
            src: "/images/Warehouse Solutions.jpg",
            alt: "Contract Packaging Operations",
          },
          {
            src: "/images/Unitisation-and-Bundling.jpg",
            alt: "Benefits of Contract Packaging",
          },
        ],
      },
      {
        title: "Additional Services",
        description: "Beyond basic packaging, we offer comprehensive support services:",
        features: [
          {
            title: "Process Optimization",
            description: "Continuous improvement of packaging processes to enhance efficiency and reduce costs.",
            image: "/images/Process-Optimization.jpg",
          },
          {
            title: "Equipment Management",
            description: "Complete management and maintenance of packaging equipment and infrastructure.",
            image: "/images/Equipment-Management.jpg",
          },
          {
            title: "Workforce Management",
            description: "Professional supervision and management of packaging personnel and operations.",
            image: "/images/Workforce-Management.jpg",
          },
        ],
      },
    ],
  },
  {
    slug: "consultancy",
    title: "Consultancy",
    subtitle: "Expert guidance for optimal packaging solutions",
    description:
      "Our packaging experts provide comprehensive consultancy services to help reduce packaging costs, minimize production damages, and optimize freight costs through innovative solutions and best practices.",
    href: "/solutions/consultancy",
    headerImage: "/images/aboutTeam.jpg",
    sections: [
      {
        title: "Comprehensive Consultancy Services",
        description:
          "Our packaging experts are highly competent to provide an extensive collection of consultancy services that helps in reduction in Packing Cost, Production damages, Freight cost etc.",
        features: [
          {
            title: "Design & Optimization",
            description: "Best & Optimum Packaging solutions tailored to your specific needs and requirements.",
            image: "/images/Design-Optimization.avif",
          },
          {
            title: "Application Development",
            description: "Custom application development to streamline and enhance your packaging processes.",
            image: "/images/Application-Development.avif",
          },
          {
            title: "Lifecycle Studies",
            description:
              "Comprehensive packaging life cycle studies to ensure optimal performance throughout the product journey.",
            image: "/images/Lifecycle-Studies.jpg",
          },
          {
            title: "Best Practices",
            description: "Regular updates and implementation of the best packaging practices in the industry.",
            image: "/images/Best-Practices.jpg",
          },
        ],
      },
      // {
      //   title: "Our Approach",
      //   description:
      //     "We take a comprehensive approach to packaging consultancy, ensuring all aspects of your packaging needs are addressed effectively.",
      //   features: [
      //     {
      //       title: "Cost Optimization",
      //       description: "Strategic analysis and solutions to reduce packaging costs while maintaining quality.",
      //       image: "/images/aboutTeam.jpg",
      //     },
      //     {
      //       title: "Damage Prevention",
      //       description: "Expert guidance on reducing product damage during packaging and transportation.",
      //       image: "/images/aboutTeam.jpg",
      //     },
      //     {
      //       title: "Freight Efficiency",
      //       description: "Optimization of packaging for improved freight efficiency and reduced transportation costs.",
      //       image: "/images/aboutTeam.jpg",
      //     },
      //   ],
      //   images: [
      //     {
      //       src: "/images/aboutTeam.jpg",
      //       alt: "Packaging Solutions Overview",
      //     },
      //     {
      //       src: "/images/aboutTeam.jpg",
      //       alt: "Packaging Services Workflow",
      //     },
      //     {
      //       src: "/images/aboutTeam.jpg",
      //       alt: "Warehouse Storage Solutions",
      //     },
      //   ],
      // },
    ],
  },
  {
    slug: "complete-automation-lines",
    title: "Complete Automation Lines",
    subtitle: "End-to-End Packaging Automation Solutions",
    description:
      "We offer Complete End of the Line Packaging Solution with world-class packaging expertise to deliver customized automation solutions.",
    href: "/solutions/complete-automation-lines",
    headerImage: "/images/aboutTeam.jpg",
    sections: [
      {
        title: "End of the Line Solutions",
        description:
          "Our packaging automation experience along with world-class packaging expertise to offer you a complete packaging solution. Our packing line solutions are designed to form, fill, close and palletize packaging and can be customized according to your needs",
        features: [
          {
            title: "Automated Packaging Lines",
            description:
              "Complete end-to-end automated packaging solutions featuring advanced machinery and control systems for efficient product handling.",
            image: "/images/Automated-Packaging-Lines.avif",
          },
          {
            title: "Conveyor Systems",
            description:
              "High-efficiency conveyor systems designed for seamless product movement and handling throughout the packaging process.",
            image: "/images/Conveyor-Systems.avif",
          },
        ],
      },
      {
        title: "Palletization",
        description:
          "Palletization is the logistics process consisting of placing goods together on top of a Pallet to consolidate the load, making it easier for the handling equipment to transport it.",
        features: [
          {
            title: "Automated Palletizing",
            description: "Robotic palletizing solutions for efficient and precise product stacking and organization.",
            image: "/images/Automated-Palletizing.avif",
          },
          {
            title: "Load Consolidation",
            description: "Advanced systems for optimal load consolidation and stability during transport.",
            image: "/images/Load-Consolidation.avif",
          },
        ],
      },
    ],
  },
  {
    slug: "packaging-optimization",
    title: "Packaging Optimization",
    subtitle: "Strategic Process & Cost Optimization",
    description: "Focus of our packaging study will be to identify all unused potential for process and cost optimisations. In order to capture all the crossing point we always adopt a structured approach, accessing existing packaging process, identify new application, develop & prove to reduce overall packing cost.",
    href: "/solutions/packaging-optimization",
    headerImage: "/images/aboutTeam.jpg",
    sections: [
      {
        title: "Process Optimization",
        description: "Our structured approach to packaging optimization ensures comprehensive improvement across all aspects of the process.",
        features: [
          {
            title: "Process Analysis",
            description: "Detailed analysis of existing packaging processes to identify potential improvements and cost savings.",
            image: "/images/Process-Analysis.avif",
          },
          {
            title: "Cost Reduction",
            description: "Strategic implementation of cost-saving measures while maintaining packaging quality and protection.",
            image: "/images/Cost Reduction.jpg",
          },
          {
            title: "Efficiency Enhancement",
            description: "Optimization of packaging processes to improve operational efficiency and reduce waste.",
            image: "/images/Efficiency-Enhancement.jpg",
          },
        ],
      },
      {
        title: "Implementation Methodology",
        description: "We follow a systematic approach to identify and implement packaging optimizations that deliver measurable results.",
        features: [
          {
            title: "Current Process Assessment",
            description: "Comprehensive evaluation of existing packaging methods and identification of improvement areas.",
            image: "/images/Current-Process-Assessment.jpg",
          },
          {
            title: "Solution Development",
            description: "Development of innovative solutions to address identified optimization opportunities.",
            image: "/images/Solution-Development.jpg",
          },
          {
            title: "Implementation & Validation",
            description: "Systematic implementation of optimized solutions with continuous monitoring and validation.",
            image: "/images/Implementation-Validation.jpg",
          },
        ],
      },
    ],
  },
]
