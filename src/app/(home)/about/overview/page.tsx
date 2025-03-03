"use client"

import { ContactForm } from "@/components/contact-form"
import { PageTitle } from "@/components/other-page-title"
import PrinciplesSection from "@/components/principles"
import ValueServicesTimeline from "@/components/value-services-timeline"
import { motion } from "framer-motion"
import { Building2, PackageCheck, Globe2, Settings2 } from "lucide-react"

export default function AboutModern() {
  return (
    <div className="relative overflow-hidden">
      <PageTitle
        title="About Us"
        backgroundImage="/images/rispl-comapny.jpg"
        subtitle="Meet our experienced professionals dedicated to your success"
      />

      <div className="bg-gradient-gold h-[800px] w-[800px] shadow-2xl blur-2xl opacity-15 rounded-full absolute top-1/4 z-10 -left-[20%]"/>
      <div className="bg-gradient-blue h-[800px] w-[800px] shadow-2xl blur-2xl opacity-15 rounded-full absolute top-[50%] z-10 -right-[20%]"/>
      {/* Content Section with increased opacity for better readability */}
      <div className="relative bg-white/90">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 max-w-7xl mx-auto">
            {/* Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative z-10 grid md:grid-cols-[1fr,2fr] gap-8 items-center">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005281] to-[#0072a3] rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="w-20 h-20 text-[#005281] transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
                <div className="relative bg-gradient-gold rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#bda03b]/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#005281]/5 rounded-full blur-2xl" />
                  <h3 className="text-3xl font-bold font-poppins text-[#005281] mb-4">Who We Are</h3>
                  <p className="text-gray-600 font-roboto leading-relaxed relative z-10">
                    We are a group of technocrats with a wealth of experience and expertise behind us, with the Company
                    name as Imperial Pack Masterz (RISPL). We offer Customized Packaging solutions, with well supported
                    service support, to diverse customer segments with trusted Products & best practices.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Our Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative z-10 grid md:grid-cols-[2fr,1fr] gap-8 items-center">
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 order-2 md:order-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#bda03b]/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#005281]/5 rounded-full blur-2xl" />
                  <h3 className="text-3xl font-bold font-poppins text-[#005281] mb-4">Our Services</h3>
                  <p className="text-gray-600 font-roboto mb-6 relative z-10">
                  RISPL is one of well-known Industrial Packaging Solutions Providers, which Covers full range of
                    Secondarily packaging requirements.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Labeling",
                      "Wrapping",
                      "Strapping",
                      "Taping",
                      "Case packing",
                      "Shrink Packaging",
                      "Protective Packaging",
                      "Services",
                      "Consultancy",
                      "Consumables",
                      "Packaging Evaluations",
                      "Contract Packaging",
                    ].map((service) => (
                      <motion.div key={service} whileHover={{ x: 5 }} className="flex items-center gap-2 group/item">
                        <span className="w-2 h-2 rounded-full bg-[#bda03b] group-hover/item:w-3 transition-all duration-300" />
                        <span className="text-gray-600 text-sm">{service}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-square order-1 md:order-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#bda03b] to-[#EDC967] rounded-3xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PackageCheck className="w-20 h-20 text-[#bda03b] transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* International Partnerships */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative z-10 grid md:grid-cols-[1fr,2fr] gap-8 items-center">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005281] to-[#0072a3] rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe2 className="w-20 h-20 text-[#005281] transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
                <div className="relative bg-gradient-gold rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#bda03b]/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#005281]/5 rounded-full blur-2xl" />
                  <h3 className="text-3xl font-bold font-poppins text-[#005281] mb-4">International Partnerships</h3>
                  <p className="text-gray-600 font-roboto leading-relaxed relative z-10">
                    We are also representing Various International Brands (Automation Equipment Manufacturers) to handle
                    large and corporates business requirements for automation across India.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Technology & Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative z-10 grid md:grid-cols-[2fr,1fr] gap-8 items-center">
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 order-2 md:order-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#bda03b]/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#005281]/5 rounded-full blur-2xl" />
                  <h3 className="text-3xl font-bold font-poppins text-[#005281] mb-4">Technology & Innovation</h3>
                  <p className="text-gray-600 font-roboto mb-6 relative z-10">
                  We adopted new Palletizing Technology in the Logistic, Supply Chain &
                  Warehouse industry and follow 5&apos;Ps:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Pallet Stability",
                      "Pallet Replacement",
                      "Profitable",
                      "Product Protection",
                      "Product Efficiency",
                    ].map((tech) => (
                      <motion.div key={tech} whileHover={{ x: 5 }} className="flex items-center gap-2 group/item">
                        <span className="w-2 h-2 rounded-full bg-[#bda03b] group-hover/item:w-3 transition-all duration-300" />
                        <span className="text-gray-600 text-sm">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-square order-1 md:order-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#bda03b] to-[#EDC967] rounded-3xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Settings2 className="w-20 h-20 text-[#bda03b] transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <ValueServicesTimeline/>
        </div>

        <div className="pb-20">
          <PrinciplesSection/>
        </div>

        <div>
          <ContactForm/>
        </div>
      </div>

      <style jsx global>{`
        /* Add smooth animation to shadows */
        @keyframes shadowPulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.15; }
          100% { opacity: 0.1; }
        }

        .animate-shadow {
          animation: shadowPulse 8s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

