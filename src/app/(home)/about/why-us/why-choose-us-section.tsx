"use client"

import { ContactForm } from "@/components/contact-form"
import { MissionVision } from "@/components/mission-vision"
import { PageTitle } from "@/components/other-page-title"
import { motion } from "framer-motion"
import {
  Package,
  Clock,
  Users,
  Shield,
  Lightbulb,
  CheckCircle2,
  Award,
  Briefcase,
  Target,
  Rocket,
  Heart,
  Star,
  Zap,
} from "lucide-react"

// Map of icon names to Lucide React components
const iconMap = {
  Package,
  Clock,
  Users,
  Shield,
  Lightbulb,
  CheckCircle2,
  Award,
  Briefcase,
  Target,
  Rocket,
  Heart,
  Star,
  Zap,
}

// Default content in case content prop is undefined
const defaultContent = {
  pageTitle: "Why Choose Us",
  pageSubtitle: "Our Packaging Solution protects your Product to scale up to Next Level",
  backgroundImage: "/images/rispl-why-choes-us.jpg",
  cards: [
    {
      title: "Our Packaging Solution",
      description:
        "Our Packaging Solution protects your Product to scale up to Next Level. We have rich expertise with renowned experienced resources to derive the best solutions.",
      icon: "Package",
      gradient: "from-[#012a54] to-[#005281]",
      delay: 0.1,
    },
    {
      title: "Three Decades of Excellence",
      description:
        "People at RISPL has more than Three decades of Experience in Industrial automation & long-term Operational Contracts & are known for Improving load integrity.",
      icon: "Clock",
      gradient: "from-[#005281] to-[#0072a3]",
      delay: 0.2,
    },
    {
      title: "Innovation Commitment",
      description:
        "We are committed for innovation that has resulted in developing & marketing new products that continue to address the market's ever-changing supply chain needs.",
      icon: "Lightbulb",
      gradient: "from-[#0072a3] to-[#bda03b]",
      delay: 0.3,
    },
  ],
  accomplishments: [
    {
      text: "Received large scale appreciation by senior management including Executive Director for high standard of performance in managing, executing with exceptional Quality of work in POY plant of Reliance Industries Ltd.",
    },
    {
      text: "Recieved appreciation by Hindustan Coca Cola Beverages Pvt. Ltd. for exemplary performance in Maintanance and quality related activities.",
    },
    {
      text: "Effectively handled major Manpower crisis in Coca Cola during closure of their plant in Surat, maintaining high compliances letigation.",
    },
    {
      text: "Produced 730 kms. Length of HDPE pipe against established record of 540 kms.",
    },
    {
      text: "Recieved performance safety award in RIL complex level safety competition.",
    },
    {
      text: "Innovation by managing repair of returnable plastic units from scrap & reuse the same without any dimensional change of the unit thus making substantial saving.",
    },
  ],
}

interface Card {
  title: string
  description: string
  icon: string
  gradient: string
  delay: number
}

interface Accomplishment {
  text: string
}

interface WhyChooseUsContent {
  pageTitle: string
  pageSubtitle: string
  backgroundImage: string
  cards: Card[]
  accomplishments: Accomplishment[]
}

interface WhyChooseUsSectionProps {
  content?: WhyChooseUsContent
}

export default function WhyChooseUsSection({ content }: WhyChooseUsSectionProps) {
  // Use provided content or fall back to default content
  const displayContent = content || defaultContent

  // Get icon component from icon name
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Package
  }

  return (
    <div className="overflow-hidden">
      <PageTitle
        title={displayContent.pageTitle}
        backgroundImage={displayContent.backgroundImage}
        subtitle={displayContent.pageSubtitle}
      />
      <section className="pt-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {displayContent.cards.map((card, index) => {
              const IconComponent = getIconComponent(card.icon)
              return (
                <div key={card.title} className="group h-full">
                  <div className="relative bg-white rounded-2xl h-[400px] shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: "radial-gradient(circle at 1px 1px, #bda03b 1px, transparent 0)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                    </div>

                    {/* Top Gradient Bar */}
                    <div className={`h-2 w-full bg-gradient-to-r ${card.gradient}`} />

                    <div className="p-8 flex flex-col h-full">
                      {/* Icon Container */}
                      <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-br from-[#bda03b] to-[#EDC967] rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                        <div
                          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} p-0.5 transform group-hover:rotate-12 transition-transform duration-500`}
                        >
                          <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center relative overflow-hidden">
                            <IconComponent className="w-10 h-10 text-[#005281] transform group-hover:scale-110 transition-transform duration-500" />
                            {/* Shine Effect */}
                            <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
                          </div>
                        </div>
                        {/* Decorative Corner */}
                        <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-lg bg-[#EDC967]/10 transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-[#005281] mb-4 font-poppins group-hover:text-[#bda03b] transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 font-roboto leading-relaxed flex-1">{card.description}</p>

                        {/* Learn More Link */}
                        <div className="mt-6">
                          <div className="inline-flex items-center text-[#005281] group/link">
                            <span className="relative font-medium">
                              Learn More
                              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#EDC967] transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
                            </span>
                            <svg
                              className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-gradient-to-br from-[#bda03b]/10 to-transparent transform translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:scale-150 transition-transform duration-500" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-[141%] h-[141%] bg-gradient-to-tl from-[#005281]/10 to-transparent transform -translate-x-1/2 translate-y-1/2 rotate-45 group-hover:scale-150 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Accomplishments section */}
          <div className="max-w-7xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#005281] mb-4 font-poppins">Our Accomplishments</h2>
              <p className="text-xl text-[#bda03b] font-poppins">Recognitions and Achievements</p>
              <div className="h-1 w-32 bg-gradient-to-r from-[#bda03b] to-[#EDC967] mx-auto mt-4" />
            </motion.div>

            <ul className="list-disc list-inside text-gray-600 font-roboto leading-relaxed">
              {displayContent.accomplishments.map((accomplishment, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  {accomplishment.text}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <style jsx global>{`
          @keyframes shine {
            100% {
              left: 125%;
            }
          }
          .animate-shine {
            animation: shine 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>
      </section>

      <section>
        <MissionVision />
      </section>

      <section>
        <ContactForm />
      </section>
    </div>
  )
}

