"use client"

import { motion } from "framer-motion"
import { Clock, Award, Users } from "lucide-react"
import Image from "next/image"

export function AboutUs() {
  return (
    <section className="relative bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Section Title */}
              <div className="inline-block">
                <h2 className="font-nunito text-blue text-4xl font-bold mb-2">About Us</h2>
                <motion.div
                  className="h-1 bg-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>

              {/* Main Content */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 text-gray-700 font-roboto text-lg leading-relaxed"
              >
                We at IPM are a group of technocrats with a wealth of experience and expertise in offering Customized
                Packaging solutions including Developing, Designing and Supplying products, and after sale services. We
                are also engaged in design, supply of high quality turnkey automation projects, with Modular Flexible
                Conveyors Solutions, Process equipments for various industry segments like Food, Pharmaceuticals, FMCG,
                Beverages, Automobile and Engineering industries.
              </motion.p>

              {/* Feature Cards */}
              <div className="grid gap-6 mt-10">
                {[
                  {
                    icon: Clock,
                    title: "35+ Years Experience",
                    description: "Decades of industry expertise",
                  },
                  {
                    icon: Award,
                    title: "ISO 9001:2015",
                    description: "Certified quality standards",
                  },
                  {
                    icon: Users,
                    title: "Expert Team",
                    description: "Skilled professionals",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="group relative overflow-hidden"
                  >
                    <div className="relative flex items-center gap-6 p-6 rounded-xl bg-gradient-gold transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex-shrink-0">
                        <feature.icon className="w-12 h-12 text-blue" />
                      </div>
                      <div>
                        <h3 className="font-poppins text-blue text-xl font-semibold mb-1">{feature.title}</h3>
                        <p className="font-roboto text-blue/90">{feature.description}</p>
                      </div>
                      {/* Black bottom border on hover */}
                      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" /> */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Image Section */}
          <div className="relative h-[600px]">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue/50 to-transparent z-10" />
              <Image
                src="/images/about-us.jpg"
                alt="Manufacturing Facility"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Top Left Stat */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: -100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-8 left-8 z-20 bg-white p-6 rounded-[5px] shadow-xl"
            >
              <div className="font-nunito text-4xl font-bold text-blue">500+</div>
              <div className="font-poppins text-sm text-gray-600">Projects Completed</div>
            </motion.div>

            {/* Bottom Right Stat */}
            <motion.div
              initial={{ opacity: 0, x: 100, y: 100 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-8 right-8 z-20 bg-white p-6 rounded-[5px] shadow-xl"
            >
              <div className="font-nunito text-4xl font-bold text-blue">98%</div>
              <div className="font-poppins text-sm text-gray-600">Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

