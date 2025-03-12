"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { LinkedinIcon, TwitterIcon, Mail, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { PageTitle } from "@/components/other-page-title"
import { Card, CardContent } from "@/components/ui/card"

interface SocialLinks {
  linkedin: string
  twitter: string
  email: string
}

interface TeamMember {
  name: string
  role: string
  subRole: string
  image: string
  social: SocialLinks
}

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

const teamMembers: TeamMember[] = [
  {
    name: "Adil Patel",
    role: "Chairman & Managing Director",
    subRole: ".",
    image: "/images/aadil.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:example@domain.com",
    },
  },
  {
    name: "Arzan Patel",
    role: "Director",
    subRole: "Commercial & Corporate Affairs",
    image: "/images/Adil Patel.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:example@domain.com",
    },
  },
  {
    name: "Rajinder Vakil",
    role: "Director ",
    subRole: "Strategic Business & Projects",
    image: "/images/Rajinder-Vakil.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:example@domain.com",
    },
  },
]

type TeamPhotoSectionProps = {}

export default function TeamSection(): React.ReactElement {
  return (
    <div className="overflow-hidden">
      <PageTitle
        title="Our Team"
        backgroundImage="/images/rispl-team.jpg"
        subtitle="Meet our experienced professionals dedicated to your success"
      />

      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#012a54] to-[#005281] bg-clip-text text-transparent">
              Our Leadership
            </h2>
            <div className="w-32 h-1.5 mx-auto rounded-full bg-gradient-to-r from-[#bda03b] to-[#EDC967]" />
          </div>

          {/* Leadership Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>

          {/* Team Photo Section */}
          <TeamPhotoSection />
        </div>
      </section>
    </div>
  )
}

function TeamMemberCard({ member, index }: TeamMemberCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg?height=600&width=600"}
                alt={member.name}
                fill
                className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Social Icons */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                {Object.entries(member.social).map(([platform, link]) => (
                  <motion.a
                    key={platform}
                    href={link}
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-[#EDC967] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {platform === "linkedin" && <LinkedinIcon className="w-5 h-5 text-[#005281]" />}
                    {platform === "twitter" && <TwitterIcon className="w-5 h-5 text-[#005281]" />}
                    {platform === "email" && <Mail className="w-5 h-5 text-[#005281]" />}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <motion.div
              className="absolute top-4 right-4 w-12 h-12"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="absolute inset-0 border-t-2 border-r-2 border-[#EDC967] rounded-tr-2xl" />
            </motion.div>
            <motion.div
              className="absolute top-4 left-4 w-12 h-12"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="absolute inset-0 border-t-2 border-l-2 border-[#EDC967] rounded-tl-2xl" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#012a54] to-[#005281] bg-clip-text text-transparent">
               {member.name.toUpperCase()}
              </h3>
              <p className="text-lg font-medium text-[#bda03b] mb-1">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.subRole}</p>
            </div>

            {/* Bottom Gradient Line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bda03b] to-[#EDC967] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TeamPhotoSection(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
          <Image
            src="/images/group-photo.avif"
            alt="Team - Adil Group Of Industries"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(1,42,84,0.85) 0%, rgba(1,42,84,0.7) 50%, rgba(1,42,84,0.3) 100%)",
            }}
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="p-8 md:p-12 lg:p-16 w-full md:max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-6"
              >
                {/* Title */}
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#EDC967]">
                    Team - Adil Group Of Industries
                  </h2>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "8rem" }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="h-0.5 bg-[#EDC967] mt-4"
                  />
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-white text-lg md:text-xl"
                >
                  Together we work towards excellence, innovation, and customer satisfaction.
                </motion.p>

                {/* Call to action button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <button className="mt-4 flex items-center gap-2 text-[#EDC967] hover:text-white transition-colors duration-300 group">
                    <span>Learn more about our team</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="absolute top-0 right-0 w-32 h-32"
          >
            <div className="absolute top-8 right-8 w-full h-full border-t border-r border-[#EDC967]/30" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="absolute bottom-0 left-0 w-32 h-32"
          >
            <div className="absolute bottom-8 left-8 w-full h-full border-b border-l border-[#EDC967]/30" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

