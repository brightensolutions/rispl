"use client"

import { ContactForm } from "@/components/contact-form"
import { MissionVision } from "@/components/mission-vision"
import { PageTitle } from "@/components/other-page-title"
import { motion } from "framer-motion"
import { Package, Clock, Users, Shield, Lightbulb, CheckCircle2 } from "lucide-react"

const cards = [
  {
    icon: Package,
    title: "Our Packaging Solution",
    description:
      "Our Packaging Solution protects your Product to scale up to Next Level. We have rich expertise with renowned experienced resources to derive the best solutions.",
    delay: 0.1,
    gradient: "from-[#012a54] to-[#005281]",
  },
  {
    icon: Clock,
    title: "Three Decades of Excellence",
    description:
      "People at RISPL has more than Three decades of Experience in Industrial automation & long-term Operational Contracts & are known for Improving load integrity.",
    delay: 0.2,
    gradient: "from-[#005281] to-[#0072a3]",
  },
  {
    icon: Lightbulb,
    title: "Innovation Commitment",
    description:
      "We are committed for innovation that has resulted in developing & marketing new products that continue to address the market's ever-changing supply chain needs.",
    delay: 0.3,
    gradient: "from-[#0072a3] to-[#bda03b]",
  },
]

// const features = [
//   {
//     icon: Package,
//     title: "Vast Industry Experience",
//     description: "Providing excellent solutions to improve customer process with decades of expertise.",
//   },
//   {
//     icon: Lightbulb,
//     title: "Customer Centric Approach",
//     description: "Out of the box thinking, with Customer Centric Approach to meet unique needs.",
//   },
//   {
//     icon: Users,
//     title: "Qualified Technocrats",
//     description: "Well Qualified and experienced technocrats with strong domain knowledge.",
//   },
//   {
//     icon: Shield,
//     title: "Quality Standards",
//     description: "Quality products and services with set of standards in meeting the Global Standard Methods.",
//   },
//   {
//     icon: CheckCircle2,
//     title: "Value Creation",
//     description: "Creating values for the Turnkey Packaging Line solutions with Streamline approach.",
//   },
// ]

const accomplishments = [
  "Received large scale appreciation by senior management including Executive Director for best housekeeping in POY plant of Reliance Industries Ltd.",
  "Recieved appreciation by Hindustan Coca Cola Beverages Pvt. Ltd. for exemplary performance in housekeeping/ Maintanance and quality related activities",
  "Effectively handled major labour crisis in Coca Cola during closure of their plant in Surat, without any litigation.",
  "Produced 730 kms. Length of HDPE pipe against established record of 540 kms.",
  "Recieved performance safety award in RIL complex level safety competition.",
  "Repairing of returnable plastic units from scrap & reusing the same without any change in the size/ dimension of the unit saving up to Rs. 8 to 10 Lacs approx.",
]

export default function PurposeVisionSection() {
  return (
    <div className=" overflow-hidden">
    <PageTitle
        title="Why Choose Us"
        backgroundImage="/images/rispl-why-choes-us.jpg"
        subtitle="Our Packaging Solution protects your Product to scale up to Next Level"
      />
    <section className="pt-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group h-full"
            >
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
                        <card.icon className="w-10 h-10 text-[#005281] transform group-hover:scale-110 transition-transform duration-500" />
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
          ))}
        </div>

        {/* Packaging Solution Section */}
        {/* <div className="max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#005281] mb-4 font-poppins">Our Packaging Solution</h2>
            <p className="text-xl text-[#bda03b] font-poppins">Protects your Product to scale up to Next Level</p>
            <div className="h-1 w-32 bg-gradient-to-r from-[#bda03b] to-[#EDC967] mx-auto mt-4" />
          </motion.div> */}

        {/* Experience Cards */}
        {/* <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#005281] to-[#0072a3] rounded-2xl p-8 text-white"
            >
              <div className="flex items-start gap-6">
                <Clock className="w-12 h-12 text-[#EDC967] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4 font-poppins">Three Decades of Excellence</h3>
                  <p className="font-roboto leading-relaxed">
                    People at IPM has more than Three decades of Experience in Industrial automation & long-term
                    Operational Contracts & are known for Improving load integrity and protection of product, while
                    maximizing cost-efficiency in streamlining the Operation Equipment efficiency.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#bda03b] to-[#EDC967] rounded-2xl p-8 text-white"
            >
              <div className="flex items-start gap-6">
                <Package className="w-12 h-12 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-4 font-poppins">Innovation & Expertise</h3>
                  <p className="font-roboto leading-relaxed">
                    We are committed for innovation that has resulted in developing & marketing new products that
                    continue to address the market's ever-changing supply chain needs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div> */}

        {/* Additional Information */}
        {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 mb-16"
          >
            <p className="text-gray-600 font-roboto leading-relaxed mb-6">
              We have rich expertise with renowned experienced resources to derive the best solutions to your packaging
              challenges with unbeaten, thus it can scale up in protecting the products during manufacturing,
              transporting, storage and distribution.
            </p>
            <p className="text-gray-600 font-roboto leading-relaxed">
              Our offered solution is consisting the key factors keeping in mind, as it must be competitive, reliable &
              long Sustainable with excellent workmanship quality.
            </p>
          </motion.div> */}

        {/* Features Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#005281] to-[#0072a3] p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-[#005281]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#005281] mb-2 font-poppins">{feature.title}</h3>
                      <p className="text-gray-600 font-roboto text-sm">{feature.description}</p>
                    </div>
                  </div> */}

        {/* Bottom Gradient Line */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bda03b] to-[#EDC967] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Previous accomplishments and trust badge sections remain same... */}
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
            {accomplishments.map((accomplishment, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                {accomplishment}
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
        <MissionVision/>
    </section>

    <section>
        <ContactForm/>
    </section>
    </div>
  )
}

