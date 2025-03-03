"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ChevronDown, Menu, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Image from "next/image"

const menuItems = [
  { title: "Home", href: "/" },
  {
    title: "Company",
    items: [
      {
        title: "About Us",
        href: "/about/overview",
        description: "Learn about our vision and values",
      },
      {
        title: "Our Core Team",
        href: "/about/team",
        description: "Meet our expert team members",
      },
      {
        title: "Why Choose Us",
        href: "/about/why-us",
        description: "Discover what sets us apart",
      },
      {
        title: "Our Values",
        href: "/about/our-values",
        description: "Explore our guiding principles",
      },
    ],
  },
  {
    title: "Industries",
    items: [
      {
        title: "FMCG",
        href: "/services/one",
        description: "Fast-moving consumer goods solutions",
      },
      {
        title: "Foods & Beverages",
        href: "/services/two",
        description: "Packaging solutions for F&B industry",
      },
      {
        title: "Fibre & Textile",
        href: "/services/three",
        description: "Specialized textile industry solutions",
      },
      {
        title: "Logistics & WH Industries",
        href: "/services/four",
        description: "Warehouse and logistics optimization",
      },
      {
        title: "Automobile",
        href: "/services/five",
        description: "Automotive industry solutions",
      },
      {
        title: "General Manufacturing & Industries",
        href: "/services/six",
        description: "Comprehensive manufacturing solutions",
      },
    ],
  },
  {
    title: "Solutions & Services",
    items: [
      {
        title: "Unitization and Bundling",
        href: "/solutions/unitization-bundling",
        description: "Efficient bundling solutions",
      },
      {
        title: "WH Solutions",
        href: "/solutions/warehouse-solutions",
        description: "Warehouse management systems",
      },
      {
        title: "Contract packaging",
        href: "/solutions/contract-packaging",
        description: "Professional packaging services",
      },
      {
        title: "Consultancy",
        href: "/solutions/consultancy",
        description: "Expert guidance and support",
      },
      {
        title: "Customized Automation & Integration",
        href: "/solutions/complete-automation-lines",
        description: "Tailored automation solutions",
      },
      {
        title: "Packaging Optimization",
        href: "/solutions/packaging-optimization",
        description: "Improve packaging efficiency",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        title: "Equipment",
        href: "/Products/equipment",
        description: "High-quality packaging equipment",
      },
      {
        title: "Consumables",
        href: "/Products/consumables",
        description: "Essential packaging materials",
      },
    ],
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const handleMobileItemClick = () => {
    setIsOpen(false)
    setActiveDropdown(null)
  }

  return (
    <motion.header
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 py-3",
        isScrolled ? "bg-white shadow-md" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <Link href="/" className="relative ">
            <Image
              src="/images/logos/ris logo.svg"
              alt="Logo"
              width={250}
              height={250}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.items ? (
                  <>
                    <button
                      className="flex items-center px-4 py-2 text-[18px] font-medium font-poppins text-blue-dark hover:text-gold transition-colors"
                    >
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.title && "rotate-180"
                        )}
                      />
                    </button>
                    {activeDropdown === item.title && (
                      <div className="absolute top-full left-0 pt-4 w-[320px]">
                        <div className="relative bg-white rounded-lg shadow-lg">
                          {/* Triangle pointer */}
                          <div className="absolute -top-2 left-6 w-4 h-4 bg-gold rotate-45" />

                          {/* Dropdown header */}
                          <div className="px-4 py-3 bg-gold rounded-t-lg">
                            <h3 className="text-white text-[18px] font-medium font-poppins">{item.title}</h3>
                          </div>

                          {/* Dropdown items */}
                          <div className="p-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="group flex flex-col p-3 rounded-md hover:bg-blue-50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-blue-dark group-hover:text-gold transition-colors">
                                    {subItem.title}
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                </div>
                                <span className="text-sm text-gray-500 mt-0.5">
                                  {subItem.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="relative px-4 py-2 text-[18px] font-medium text-blue-dark hover:text-gold transition-colors group font-poppins"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                )}
              </div>
            ))}

            {/* Contact Button */}
            <Link
              href="/contact"
              className="ml-4 px-6 py-2 bg-gold text-white font-poppins text-[18px] rounded hover:bg-gold/90 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-8 w-8 text-blue-dark" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-5 bg-white">
              <div className="flex flex-col py-2">
                {menuItems.map((item) => (
                  <div key={item.title} className="flex flex-col">
                    {!item.items ? (
                      <Link
                        href={item.href!}
                        onClick={handleMobileItemClick}
                        className="px-4 py-2 text-blue-dark text-[18px] font-medium font-poppins hover:text-gold transition-colors"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <div
                        className="relative"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.title ? null : item.title
                          )
                        }
                      >
                        <button className="flex items-center justify-between w-full text-[18px] font-medium font-poppins px-4 py-2 text-blue-dark hover:text-gold transition-colors">
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              activeDropdown === item.title && "rotate-180"
                            )}
                          />
                        </button>
                        {activeDropdown === item.title && (
                          <div className="pl-4 border-l border-gray-200 ml-4 bg-gray-50">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                onClick={handleMobileItemClick}
                                className="flex flex-col p-3 hover:bg-gray-100 transition-colors rounded-md group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-blue-dark group-hover:text-gold">
                                    {subItem.title}
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                </div>
                                <span className="text-sm text-gray-500 mt-0.5">
                                  {subItem.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4  mt-auto">
                <Link
                  href="/contact"
                  onClick={handleMobileItemClick}
                  className="flex justify-center px-6 py-2 bg-gold font-medium font-poppins text-[18px] text-white rounded hover:bg-gold/90 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
