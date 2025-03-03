import { Package2, Box, Combine, Forklift, Settings, MoveHorizontal, Film, Layers, Shield, SquareStack } from "lucide-react"

export const equipmentData = {
  "shrink-wrapping": {
    id: "shrink-wrapping",
    title: "Shrink Wrapping",
    icon: Package2,
    description: "Complete range of shrink wrap machines and systems",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "shrink-bundler-1",
        name: "SHRINK BUNDLER WITH SEALING BAR",
        description:
          "We Offer a complete range of products which include Shrink Wrap Machines such as High speed Automatic Shrink Wrap Machines, Automatic Sleeve Inserting & Shrink Machines, L Sealer With Tunnel, Shrink Tunnel and many more items.",
          gallery: ["/images/SHRINK-BUNDLER.avif", "/images/SHRINK-BUNDLER2.jpg", "/images/SHRINK-BUNDLER3.jpg", "/images/SHRINK-BUNDLER4.jpg"],
      },
    ],
  },
  "stretch-wrapping": {
    id: "stretch-wrapping",
    title: "Stretch Wrapping Machines",
    icon: Box,
    description: "Advanced stretch wrapping solutions for palletized units",
    image: "/images/SHRINK-BUNDLER.avif",
    products: [
      {
        id: "stretch-wrapping",
        name: "PALLET WRAPPER SYSTEMS",
        description:
          "The pallet wrapper is a machine created for packaging palletised units with stretch film. The purpose is to protect and stabilize the product on the pallet to prepare it for warehouse storage or transportation.",
        gallery: [
          "/images/STRETCH-WRAPPING-MACHINES.jpg",
          "/images/STRETCH-WRAPPING-MACHINES2.jpg",
          "/images/STRETCH-WRAPPING-MACHINES3.jpg",
          "/images/STRETCH-WRAPPING-MACHINES4.jpg",
        ],
        features: [
          "Automatic Pallet Wrapping",
          "Rotary Ring Stretch Wrappers",
          "Turn Table Pallet Wrapping",
          "Pallet Wrapping Robot",
          "Rotating Arm Pallet Wrapper",
          "Horizontal Stretch Wrapping",
        ],
        specifications: [
          "Fully automated operation",
          "Multiple wrapping patterns",
          "Adjustable film tension",
          "Variable speed control",
        ],
      },
    ],
  },
  "case-packing": {
    id: "case-packing",
    title: "Carton Erector and Case Packing",
    icon: Combine,
    description: "Advanced case packing and carton erecting solutions",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "case-packing",
        name: "CASE PACKING SYSTEMS",
        description: "Case packing can come in many forms and can be performed in several concepts such as top-loading, side loading, bottom loading, and wrap-around case packing. Each machine is designed depends on the application pertaining to the product, speed, optimising the units per case, and protection of the product.",
        gallery: [
          "/images/CASE-CONVEYOR.jpg",
          "/images/CASE-PACKING-SYSTEMS.avif",
          "/images/CASE-PACKING-SYSTEMS2.avif",
          "/images/CASE-PACKING-SYSTEMS3avif.avif"
        ],
        features: [
          "Top-loading case packing",
          "Side loading systems",
          "Bottom loading capability",
          "Wrap-around case packing",
          "Optimized unit packaging",
          "Product protection focus"
        ],
        specifications: [
          "Multiple loading configurations",
          "Customizable speed settings",
          "Product-specific design",
          "Automated operation"
        ]
      },
      {
        id: "carton-erector-1",
        name: "CARTON ERECTOR SYSTEMS",
        description: "Carton forming is the first phase in packaging products. IPM offers different types of automatic carton forming machines to be used with or without an operator for different box formats.",
        gallery: [
          "/images/Consultancy Services.jpg",
          "/images/Contract Packaging.jpg",
          "/images/Contract Packaging.jpg",
          "/images/Contract Packaging.jpg"
        ],
        features: [
          "Automatic carton forming",
          "Multiple box format handling",
          "Operator optional systems",
          "High-speed operation",
          "Flexible configuration",
          "Easy maintenance"
        ],
        specifications: [
          "Automated box formation",
          "Multiple format capability",
          "Optional operator control",
          "High efficiency"
        ]
      }
    ],
  },
  "horizontal-flow-wrap": {
    id: "fhorizontal-flow-wrap",
    title: "Horizontal Flow Wrap Machines",
    icon: Package2,
    description: "Advanced horizontal flow wrap solutions",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "horizontal-flow-wrap",
        name: "HORIZONTAL FLOW WRAP MACHINES",
        description:
          "Our experts help in Design & Supply of entire range of Flow Wrap Machines in Horizontal Flow Wrap Machine, which have been proven versatile solutions, to be accepted by the Industries. The best part of these Flow Wrap Machines is that all of these can easily be customized according to the demands of the clients.",
        gallery: [
          "/images/Horizontal-Flow-Wrap-Machines.avif",
          "/images/Horizontal-Flow-Wrap-Machines2.avif.png",
          "/images/Horizontal-Flow-Wrap-Machines3.jpg",
          "/images/Horizontal-Flow-Wrap-Machines4.jpg",
        ],
        features: [
          "Customizable design",
          "Industry-proven solutions",
          "Horizontal flow wrapping",
          "Versatile applications",
          "Client-specific modifications",
          "Expert design support",
        ],
        specifications: [
          "Flexible configuration",
          "Multiple product compatibility",
          "Customizable speed",
          "Easy maintenance",
        ],
      },
    ],
  },
  "strapping": {
    id: "strapping",
    title: "STRAPPING EQUIPMENTS",
    icon: Box,
    description: "Complete range of strapping machines and tools",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "strapping",
        name: "AUTOMATIC STRAPPING MACHINES",
        description:
          "Automatic strapping machines are the most used type of machines currently on the market. Suitable for the automatic strapping of packages of any size. In our range we offer automatic strapping machines with tailor-made arches for even large-sized packages. These are highly performing machines, capable of guaranteeing high levels of reliability.",
        gallery: [
          "/images/Consultancy Services.jpg",
          "/images/Contract Packaging.jpg",
          "/images/Contract Packaging.jpg",
          "/images/Contract Packaging.jpg",
        ],
        features: [
          "Automatic operation",
          "Tailor-made arches",
          "Large package handling",
          "High performance",
          "Reliable operation",
          "Size flexibility",
        ],
        specifications: ["Fully automated system", "Custom arch sizes", "High reliability", "Multiple package sizes"],
      },
      {
        id: "strapping-tools",
        name: "STRAPPING TOOLS",
        description:
          "There are two types: battery-driven and pneumatic. Battery-driven tools are powered by batteries. They do everything in one go: tightening, sealing, and cutting the strap. They're light and easy to use, making strapping up to six times faster than doing it manually. They can handle more force, up to 4,500 N. Plus, they're mobile, don't need extra seals, and you can adjust how tight you want the strap. They work horizontally or vertically. Pneumatic tools use air pressure to do the job. They work like battery-driven tools but are powered by compressed air instead of batteries.",
        gallery: [
          "/images/Consultancy Services.jpg",
          "/images/Contract Packaging.jpg",
          "/images/Contract Packaging.jpg",
          "/images/Contract Packaging.jpg",
        ],
        features: [
          "Battery-driven option",
          "Pneumatic option",
          "Up to 4,500 N force",
          "One-step operation",
          "Mobile operation",
          "Adjustable tension",
        ],
        specifications: [
          "Battery/Pneumatic power",
          "4,500 N max force",
          "Horizontal/Vertical use",
          "Automatic sealing & cutting",
        ],
      },
    ],
  },
  "turnkey": {
    id: "turnkey",
    title: "TURNKEY LINES",
    icon: Settings,
    description: "Complete turnkey packaging solutions with end-to-end project management",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "turnkey",
        name: "TURNKEY PACKAGING SOLUTIONS",
        description:
          "IPM has proven capabilities to provide its customers with turnkey packaging solutions. Our team of project managers and engineers undertake all the activities right from concept to commissioning. A turnkey project typically begins with understanding your stated and unstated needs, detailed layout of the project followed by equipment support, complete integration, testing, personnel training and documentation, to conclude with successful running. Our aim is to execute projects at optimal cost to enhance ROI for our customers.",
        gallery: [
          "/images/turnkey-packaging-solutions.avif"
        ],
        features: [
          "Understanding Project Specifications",
          "Line Layout Design",
          "Electrical and Mechanical Integration",
          "Equipment Supply",
          "Factory Acceptance Tests",
          "Installation and Commissioning",
          "Training and Documentation",
          "Complete Project Management and Execution",
          "From concept to commissioning",
        ],
        specifications: [
          "End-to-end project management",
          "Custom layout design",
          "Full system integration",
          "Comprehensive documentation",
          "ROI optimization",
          "Personnel training included",
        ],
        benefits: [
          "Single point responsibility",
          "Optimized cost management",
          "Reduced implementation time",
          "Expert project handling",
          "Comprehensive support",
        ],
      },
    ],
  },
  "case-conveyor": {
    id: "case-conveyor",
    title: "CASE CONVEYOR",
    icon: MoveHorizontal,
    description: "Advanced conveyor systems for efficient material handling",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "case-conveyor",
        name: "CASE CONVEYOR SYSTEMS",
        description:
          "The Case Conveyor is a general transport conveyor with the capability of accumulating products with back pressure. Quiet operation, versatile design, easy installation and maintenance are standard features that make our conveyors a valuable component in operations requiring high performance with minimal downtime. Clearpack supplies an entire range of Case Conveyors for transporting cases, boxes, trays, pallets & many other things. Other types of conveyors are also available",
        gallery: [
          "/images/case-conveyor.avif"
        ],
        features: [
          "Frame can be stainless steel, painted steel, powdered-coated, etc, depending on requirements",
          "Various roller widths, roller diameters and conveyor lengths available",
          "Roller conveyors can be straight, inclined, declined or curved",
          "Both driven and non-driven conveyors available",
          "Heavy-duty conveyors for heavy-load applications are also available",
        ],
        specifications: [
          "Multiple frame material options",
          "Customizable roller dimensions",
          "Flexible configuration options",
          "Driven/Non-driven variants",
          "Heavy-duty capability",
        ],
        applications: [
          "Case transportation",
          "Box handling",
          "Tray movement",
          "Pallet conveying",
          "General material handling",
        ],
      },
    ],
  },
  "pallet-conveyor": {
    id: "pallet-conveyor",
    title: "PALLET CONVEYOR",
    icon: Forklift,
    description: "Heavy duty roller conveyors for pallet and drum handling",
    image: "/images/Consultancy Services.jpg",
    products: [
      {
        id: "pallet-conveyor",
        name: "PALLET HANDLING SYSTEMS",
        description: "As a part of the turnkey packaging solution, IPM supplies entire range of heavy duty roller conveyors suitable for pallets / drums. They include heavy duty straight, curved and tapered roller conveyors.",
        gallery: [
          "/images/pallet-conveyor.avif"
        ],
        features: [
          "Frame can be stainless steel, painted steel, powdered-coated, etc. depending on requirements",
          "Various belt widths and conveyor lengths available",
          "Different belt finishes available, depending on application",
          "Belt conveyors can be straight, inclined, declined or curved",
          "Heavy-duty conveyors for heavy-load applications are also available"
        ],
        specifications: [
          "Adjustable Floor Supports Available",
          "Capacity - Maximum load per liner foot of conveyor: 300 lbs. with supports on 10' centers; 1000 lbs. with supports on 5' centers",
          "Formed steel channel frame powder painted",
          "Center Drive",
          "Motor - 1 HP standard - 2 HP max"
        ],
        technical_details: {
          frame: "Formed steel channel, powder painted",
          capacity: {
            standard: "300 lbs per linear foot (10' centers)",
            heavy_duty: "1000 lbs per linear foot (5' centers)"
          },
          motor: {
            standard: "1 HP",
            maximum: "2 HP"
          },
          drive_type: "Center Drive",
          supports: "Adjustable floor supports"
        },
        applications: [
          "Pallet transportation",
          "Drum handling",
          "Heavy load movement",
          "Warehouse logistics",
          "Production line integration"
        ]
      }
    ],
  }
}

export const consumablesData = {
  "pet-strap": {
    id: "pet-strap",
    title: "PET Strap",
    icon: Box,
    description: "High-quality PET strapping solutions with customizable options",
    image: "/images/pet-strap-2.jpg",
    products: [
      {
        id: "pet-strap",
        name: "PET (Polyster Polyethylene Terephthalate) Strapping",
        description:
          "Under the packaging solutions include products and service, we Supplies Polyster Polyethylene Terephthalate) Strapping (PET Straps), tools and accessories and are able to supply customize Size, Colour's strap both in Smooth & Embossing.",
        gallery: [
          "/images/pet-strap1.avif"
        ],
        features: [
          "Customizable sizes",
          "Multiple color options",
          "Smooth finish available",
          "Embossed finish available",
          "High tensile strength",
          "Eco-friendly material",
        ],
        specifications: [
          "Material: Polyster Polyethylene Terephthalate",
          "Finish Types: Smooth & Embossed",
          "Custom sizes available",
          "Various colors available",
          "Professional grade quality",
        ],
        applications: [
          "Industrial packaging",
          "Pallet securing",
          "Bundle packaging",
          "Heavy-duty strapping",
          "General purpose binding",
        ],
      },
    ],
  },
  "pp-strap": {
    id: "pp-strap",
    title: "PP STRAP",
    icon: Box,
    description: "High-quality Polypropylene strapping for various packaging applications",
    image: "/images/pet-strap-2.jpg",
    products: [
      {
        id: "pp-strap",
        name: "Polypropylene (PP) Strapping",
        description:
          'Polypropylene (PP) strapping is one of the most common types of strapping and comes in a variety of tensile strengths, widths, and core sizes depending on your application, Polypropylene strapping is a good choice for light and medium-duty applications, including palletizing, unitizing, bundling, carton closure and reinforcement. It resists splitting and has a smooth, uniform surface so it performs reliably in power strapping machines and hand tools. The product has "elastic memory" which absorbs shock and keeps strapping tight during handling and shipping.',
        gallery: [
          "/images/Contrax-pp.jpg",
        ],
        features: [
          "Various tensile strengths",
          "Multiple width options",
          "Different core sizes",
          "Smooth, uniform surface",
          "Elastic memory property",
          "Split resistant",
        ],
        specifications: [
          "Material: Polypropylene",
          "Application: Light to medium-duty",
          "Surface: Smooth and uniform",
          "Machine compatibility: Power strapping machines and hand tools",
        ],
        applications: ["Palletizing", "Unitizing", "Bundling", "Carton closure", "Reinforcement"],
        benefits: [
          {
            title: "Elastic Memory",
            description: "Absorbs shock and maintains tension during handling",
          },
          {
            title: "Versatile Usage",
            description: "Suitable for both machine and manual application",
          },
          {
            title: "Cost-Effective",
            description: "Ideal for light to medium-duty applications",
          },
          {
            title: "Reliable Performance",
            description: "Consistent tension and secure holding",
          },
        ],
      },
    ],
  },
  "stretch-film": {
    id: "stretch-film",
    title: "Stretch Film",
    icon: Film,
    description: "High-quality stretch film for secure packaging and protection",
    image: "/images/pet-strap-2.jpg",
    products: [
      {
        id: "stretch-film",
        name: "Industrial Stretch Film",
        description:
          "Film that can be stretched and applied on any pack to hold on to the load and unitize /protect during its journey to its destination.",
        gallery: [
          "/images/stretch-film.jpg"
        ],
        features: [
          "Stretchable material",
          "Universal application",
          "Load securing capability",
          "Journey protection",
          "Unitizing function",
          "Clear visibility",
        ],
        specifications: [
          "Material: High-quality stretch film",
          "Application: Universal packing",
          "Finish: Clear and transparent",
          "Multiple sizes available",
        ],
        applications: [
          "Pallet wrapping",
          "Bundle securing",
          "Load stabilization",
          "Transit protection",
          "Product unitizing",
        ],
        benefits: [
          {
            title: "Versatile Usage",
            description: "Can be applied to any pack type",
          },
          {
            title: "Secure Hold",
            description: "Maintains grip on load during transit",
          },
          {
            title: "Protection",
            description: "Shields products during transportation",
          },
          {
            title: "Load Unity",
            description: "Keeps multiple items together as one unit",
          },
        ],
        variants: [
          {
            name: "Standard Stretch Film",
            features: ["Regular strength", "Standard stretch ratio", "General purpose use"],
          },
          {
            name: "Heavy Duty Stretch Film",
            features: ["Enhanced strength", "Higher stretch ratio", "Industrial applications"],
          },
        ],
      },
    ],
  },
  "pof-film": {
    id: "pof-film",
    title: "POF Film",
    icon: Layers,
    description: "High-quality polyolefin shrink film for versatile packaging applications",
    image: "/images/pet-strap-2.jpg",
    products: [
      {
        id: "pof-film",
        name: "POF Shrink Film",
        description: "POF is a strong, bi-axially oriented, heat shrinkable polyolefin film, very cost effective packaging choice that has excellent clarity and strength. This soft, flexible film does not become brittle in low temperatures after shrinkage & is very popular in the wrapping of foods and non food applications. The available thicknesses are 12, 15, 19, 25, 30 & 40 micron.",
        gallery: [
          "/images/POF-Shrink-Film.avif",
        ],
        features: [
          "Bi-axially oriented",
          "Heat shrinkable",
          "Excellent clarity",
          "High strength",
          "Soft and flexible",
          "Temperature resistant"
        ],
        specifications: [
          "Material: Polyolefin",
          "Type: Heat shrinkable film",
          "Available thicknesses: 12, 15, 19, 25, 30 & 40 micron",
          "Properties: Non-brittle at low temperatures"
        ],
        applications: [
          "Food packaging",
          "Non-food packaging",
          "Heat shrink wrapping",
          "Product protection",
          "Retail packaging"
        ],
        benefits: [
          {
            title: "Cost Effective",
            description: "Economical packaging solution"
          },
          {
            title: "Versatile Usage",
            description: "Suitable for both food and non-food applications"
          },
          {
            title: "Temperature Stable",
            description: "Maintains flexibility in low temperatures"
          },
          {
            title: "Superior Clarity",
            description: "Excellent product visibility"
          }
        ],
        variants: [
          {
            name: "Standard POF Film",
            thicknesses: [12, 15, 19],
            description: "For general packaging needs"
          },
          {
            name: "Heavy Duty POF Film",
            thicknesses: [25, 30, 40],
            description: "For demanding applications"
          }
        ]
      }
    ],
  },
 "bubble-guard-sheet": {
    id: "bubble-guard-sheet",
    title: "Bubble Guard Packaging",
    icon: Shield,
    description: "Advanced protective packaging with unique honeycomb structure",
    image: "/images/pet-strap-2.jpg",
    products: [
      {
        id: "bubble-guard-sheet",
        name: "Bubble Guard Sheet & Board",
        description:
          "Bubble Guard Sheet & Board is a hollow tripled layered composite & bubbled structure, made from Polypropylene (PP) based Raw Material, with a unique circular honeycomb structure core. The air – lock technology creates a cushioning effect to ensure protection with light weight. These Bubble Guard are available in variants ranging from 200 GSM up to 3500 GSM, extending from thin and flexible to strong and rigid.",
        gallery: [
          "/images/Bubble-Guard-Sheet-Board.avif",
          "/images/bubble-guard-2.jpg",
          "/images/bubble-guard-3.jpg",
          "/images/bubble-guard-4.jpg",
        ],
        features: [
          "Triple layered composite structure",
          "Unique honeycomb core design",
          "Air-lock cushioning technology",
          "GSM range: 200-3500",
          "Flexible to rigid variants",
          "PP-based material",
        ],
        specifications: [
          "Material: Polypropylene (PP)",
          "Structure: Triple layered composite",
          "GSM Range: 200-3500 GSM",
          "Core: Honeycomb structure",
        ],
        applications: [
          "Product protection",
          "Packaging solutions",
          "Protective shipping",
          "Industrial packaging",
          "Delicate item protection",
        ],
        benefits: [
          {
            title: "Strong & Stiff",
            description: "Adequate strength and stiffness for protection",
          },
          {
            title: "Eco-Friendly",
            description: "100% recyclable material",
          },
          {
            title: "Water Resistant",
            description: "Water proof protection",
          },
          {
            title: "Lightweight",
            description: "Lighter in weight compared to alternatives",
          },
          {
            title: "Easy Handling",
            description: "Too light as product for convenient use",
          },
        ],
        variants: [
          {
            name: "Light Duty Bubble Guard",
            gsm: "200-1000 GSM",
            description: "Thin and flexible variant",
          },
          {
            name: "Medium Duty Bubble Guard",
            gsm: "1000-2500 GSM",
            description: "Balanced protection and flexibility",
          },
          {
            name: "Heavy Duty Bubble Guard",
            gsm: "2500-3500 GSM",
            description: "Strong and rigid variant",
          },
        ],
      },
    ],
  },
  "edge-protector": {
    id: "edge-protector",
    title: "Edge and Angle Protector",
    icon: SquareStack,
    description: "High-strength laminated paperboard edge protection solutions",
    image: "/images/pet-strap-2.jpg",
    products: [
      {
        id: "edge-protector",
        name: "Edge and Angle Protector",
        description:
          "Made from multiple plies of Laminated Paper-Board that are Glued, Treated and Formed into right angles of exceptional strength. We hold expertise in supplying a qualitative range of Edge Protectors",
        gallery: [
          "/images/angel-board1.jpg"
        ],
        features: [
          "Multiple ply construction",
          "Laminated paperboard material",
          "Right angle formation",
          "High strength design",
          "Professional grade quality",
          "Custom sizing available",
        ],
        specifications: [
          "Material: Laminated Paper-Board",
          "Structure: Multi-ply construction",
          "Angle: 90 degrees (right angle)",
          "Treatment: Glued and specially treated",
        ],
        applications: [
          "Edge protection",
          "Corner protection",
          "Shipping protection",
          "Product stacking",
          "Load securing",
        ],
        benefits: [
          {
            title: "Superior Strength",
            description: "Exceptional strength for reliable protection",
          },
          {
            title: "Professional Quality",
            description: "Expertly manufactured for consistent performance",
          },
          {
            title: "Versatile Protection",
            description: "Suitable for various edge protection needs",
          },
          {
            title: "Easy Application",
            description: "Simple to install and use",
          },
        ],
        variants: [
          {
            name: "Standard Edge Protector",
            description: "Regular duty protection for common applications",
          },
          {
            name: "Heavy Duty Edge Protector",
            description: "Enhanced strength for demanding applications",
          },
          {
            name: "Custom Edge Protector",
            description: "Tailored sizes and specifications available",
          },
        ],
      },
    ],
  },
}

export type Category = keyof typeof equipmentData
export type Product = (typeof equipmentData)[Category]["products"][number]

export function getCategory(id: string) {
  return equipmentData[id as Category]
}

export function getProduct(categoryId: string, productId: string) {
  const category = getCategory(categoryId)
  const product = category?.products.find((p) => p.id === productId)
  return product
}



export type consumablesCategory = keyof typeof consumablesData
export type consumablesProduct = (typeof consumablesData)[consumablesCategory]["products"][number]

export function consumablesgetCategory(id: string) {
  return consumablesData[id as consumablesCategory]
}

export async function consumablesgetProduct(categoryId: string, productId: string) {
  const category = consumablesgetCategory(categoryId)
  const product = category?.products.find((p) => p.id === productId)
  return Promise.resolve(product)
}