"use client"

import { ContactForm } from "@/components/contact-form"
import { PageTitle } from "@/components/other-page-title"
import { motion } from "framer-motion"
import {
  Users,
  Lightbulb,
  Shield,
  Leaf,
  Heart,
  TrendingUp,
  Users2,
  Shuffle,
  HardHat,
  HandHeart,
  Award,
  Briefcase,
  Target,
  Rocket,
  Star,
  Zap,
} from "lucide-react"

// Map of icon names to Lucide React components
const iconMap = {
  Users,
  Lightbulb,
  Shield,
  Leaf,
  Heart,
  TrendingUp,
  Users2,
  Shuffle,
  HardHat,
  HandHeart,
  Award,
  Briefcase,
  Target,
  Rocket,
  Star,
  Zap,
}

// Default values in case content prop is undefined
const defaultContent = {
  pageTitle: "Our Values",
  pageSubtitle: "Our Packaging Solution protects your Product to scale up to Next Level",
  backgroundImage: "/images/rispl-ourValue.jpg",
  values: [
    {
      icon: "Users",
      title: "Customer-Centric Approach",
      description:
        "RISPL places customers at the forefront of everything we do. We are dedicated to understanding our customers' needs, preferences, and challenges to provide tailored packaging solutions.",
      gradient: "from-[#012a54] to-[#005281]",
      category: "Foundation",
    },
    {
      icon: "Shield",
      title: "Quality Excellence",
      description:
        "We maintain an unwavering commitment to quality. Our products and services are designed and delivered with the highest standards in mind.",
      gradient: "from-[#005281] to-[#0072a3]",
      category: "Core Values",
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      description:
        "Innovation is at the heart of our company. We continuously seek out new technologies, materials, and design approaches to develop cutting-edge packaging solutions.",
      gradient: "from-[#0072a3] to-[#bda03b]",
      category: "Growth",
    },
    {
      icon: "Heart",
      title: "Integrity and Ethics",
      description:
        "We conduct business with the utmost integrity and ethics. Our relationships with customers, partners, and employees are built on trust, honesty, and transparency.",
      gradient: "from-[#bda03b] to-[#ecdc77]",
      category: "Core Values",
    },
    {
      icon: "Leaf",
      title: "Environmental Responsibility",
      description:
        "RISPL recognizes the importance of sustainability. We actively work to reduce environmental impact by offering eco-friendly materials and promoting sustainable practices.",
      gradient: "from-[#ecdc77] to-[#EDC967]",
      category: "Responsibility",
    },
    {
      icon: "TrendingUp",
      title: "Continuous Improvement",
      description:
        "RISPL believes in the power of continuous improvement. We are dedicated to refining our processes and enhancing our offerings.",
      gradient: "from-[#012a54] to-[#005281]",
      category: "Growth",
    },
    {
      icon: "Users2",
      title: "Team Collaboration",
      description:
        "Our success is driven by the collective effort of our talented and diverse team. We foster a collaborative work environment.",
      gradient: "from-[#005281] to-[#0072a3]",
      category: "People",
    },
    {
      icon: "Shuffle",
      title: "Adaptability",
      description:
        "RISPL understands the ever-changing business landscape. We remain adaptable and agile, ready to respond to new challenges and opportunities.",
      gradient: "from-[#0072a3] to-[#bda03b]",
      category: "Growth",
    },
    {
      icon: "HardHat",
      title: "Safety",
      description:
        "Safety is paramount in our operations. We prioritize the well-being of our employees, customers, and partners by adhering to strict safety protocols.",
      gradient: "from-[#bda03b] to-[#ecdc77]",
      category: "Responsibility",
    },
    {
      icon: "HandHeart",
      title: "Community Engagement",
      description:
        "We believe in giving back to the communities where we operate. RISPL actively engages in philanthropic initiatives and supports community development efforts.",
      gradient: "from-[#ecdc77] to-[#EDC967]",
      category: "Responsibility",
    },
  ],
}

interface Value {
  icon: string
  title: string
  description: string
  gradient: string
  category: string
}

interface OurValuesContent {
  pageTitle: string
  pageSubtitle: string
  backgroundImage: string
  values: Value[]
}

interface OurValuesTimelineProps {
  content?: OurValuesContent
}

function OurValuesTimeline({ content }: OurValuesTimelineProps) {
  // Use provided content or fall back to default content
  const displayContent = content || defaultContent

  // Get icon component from icon name
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Users
  }

  return (
    <div className="overflow-hidden">
      <PageTitle
        title={displayContent.pageTitle}
        backgroundImage={displayContent.backgroundImage}
        subtitle={displayContent.pageSubtitle}
      />

      <section className="pt-20 -mt-[80px] z-10 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Hexagonal Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fillRule='evenodd' stroke='%23005281' fill='none' /%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#005281] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#bda03b] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#EDC967] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000" />

        <div className="container mx-auto px-4 relative">
          {/* 3D Hexagonal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-20 relative">
            {displayContent.values.map((value, index) => {
              const IconComponent = getIconComponent(value.icon)
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50, rotateX: -15, rotateY: -15 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.4,
                      duration: 1,
                      delay: index * 0.2,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                  viewport={{ once: true }}
                  className="relative group perspective"
                >
                  {/* Hexagonal Card */}
                  <div className="relative">
                    {/* 3D Shadow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#005281] to-[#EDC967] rounded-2xl opacity-20 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-500" />

                    {/* Main Content */}
                    <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform-gpu transition-transform duration-500 group-hover:translate-z-10">
                      {/* Floating Category Tag */}
                      <div className="absolute -top-3 right-4 px-4 py-1 bg-gradient-to-r from-[#005281] to-[#EDC967] rounded-full shadow-lg">
                        <span className="text-white text-sm font-medium">{value.category}</span>
                      </div>

                      {/* Icon with 3D Effect */}
                      <div className="relative mb-6 group-hover:transform group-hover:translate-z-8 transition-transform duration-500">
                        <div className="relative w-16 h-16">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#005281] to-[#EDC967] rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                            <IconComponent className="w-8 h-8 text-[#005281] group-hover:text-[#bda03b] transition-colors duration-500" />
                          </div>
                        </div>
                      </div>

                      {/* Content with Depth */}
                      <div className="space-y-4 relative z-10">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#005281] to-[#bda03b] bg-clip-text text-transparent">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                      </div>

                      {/* Interactive Decorative Elements */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        {/* Top Left Corner */}
                        <div className="absolute top-0 left-0 w-16 h-16">
                          <div className="absolute w-full h-full border-t-2 border-l-2 border-[#005281]/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                        </div>
                        {/* Bottom Right Corner */}
                        <div className="absolute bottom-0 right-0 w-16 h-16">
                          <div className="absolute w-full h-full border-b-2 border-r-2 border-[#EDC967]/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#005281]/20 to-[#EDC967]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  {index !== displayContent.values.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="absolute -right-8 top-1/2 w-16 h-0.5 hidden lg:block"
                    >
                      <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-[#EDC967] -translate-y-1/2 animate-ping" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              background: Math.random() > 0.5 ? "#005281" : "#EDC967",
              filter: "blur(1px)",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() * 0.5 + 1, 1],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="mt-20">
          <ContactForm />
        </div>

        <style jsx global>{`
          .perspective {
            perspective: 2000px;
          }
          
          .translate-z-8 {
            transform: translateZ(8px);
          }
          
          .translate-z-10 {
            transform: translateZ(10px);
          }
          
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>
    </div>
  )
}

export default OurValuesTimeline

