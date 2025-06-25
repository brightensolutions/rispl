"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ChevronDown, Menu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Define the base menu items without industries, services, and products
const baseMenuItems = [
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
  // Industries will be added dynamically
  // Solutions & Services will be added dynamically
  // Products will be added dynamically
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const [menuItems, setMenuItems] = React.useState(baseMenuItems)
  const [loading, setLoading] = React.useState(true)

  // Fetch industries, services, and products from the API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch industries
        const industriesResponse = await fetch("/api/industries")
        let industries = []
        if (industriesResponse.ok) {
          industries = await industriesResponse.json()
        }

        // Fetch services
        const servicesResponse = await fetch("/api/services")
        let services = []
        if (servicesResponse.ok) {
          services = await servicesResponse.json()
        }

        // Fetch equipment categories
        const equipmentResponse = await fetch("/api/products?type=equipment")
        let equipmentCategories = []
        if (equipmentResponse.ok) {
          equipmentCategories = await equipmentResponse.json()
        }

        // Fetch consumables categories
        const consumablesResponse = await fetch("/api/products?type=consumables")
        let consumablesCategories = []
        if (consumablesResponse.ok) {
          consumablesCategories = await consumablesResponse.json()
        }

        // Create the industries menu item
        const industriesMenuItem = {
          title: "Industries",
          items: industries.map((industry: any) => ({
            title: industry.title,
            href: `/industries/${industry.slug}`,
            description: industry.shortDescription,
          })),
        }

        // Create the services menu item
        const servicesMenuItem = {
          title: "Solutions & Services",
          items: services.map((service: any) => ({
            title: service.title,
            href: `/solutions/${service.slug}`,
            description: service.description,
          })),
        }

        // Create the products menu item
        const productsMenuItem = {
          title: "Products",
          items: [
            {
              title: "Equipment",
              href: "/Products/equipment",
              description: "High-quality packaging equipment",
              // subItems: equipmentCategories.map((category: any) => ({
              //   title: category.title,
              //   href: `/Products/equipment/${category.id}`,
              //   description: category.description,
              // })),
            },
            {
              title: "Consumables",
              href: "/Products/consumables",
              description: "Essential packaging materials",
              // subItems: consumablesCategories.map((category: any) => ({
              //   title: category.title,
              //   href: `/Products/consumables/${category.id}`,
              //   description: category.description,
              // })),
            },
          ],
        }

        // Insert the menu items
        const updatedMenuItems = [...baseMenuItems]
        updatedMenuItems.splice(2, 0, industriesMenuItem) // Insert industries after Company
        updatedMenuItems.splice(3, 0, servicesMenuItem) // Insert services after Industries
        updatedMenuItems.splice(4, 0, productsMenuItem) // Insert products after Services

        setMenuItems(updatedMenuItems)
      } catch (error) {
        console.error("Error fetching menu data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
        isScrolled ? "bg-white shadow-md" : "bg-white",
      )}
    >
      <div className="2xl:max-w-[1440px] mx-auto px-4 md:py-4">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <Link href="/" className="relative ">
            <Image
              src="/images/logos/ris logoline.svg"
              alt="Logo"
              width={220}
              height={400}
              className="lg:w-[400px] w-[350px]"
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
                    <button className="flex items-center px-4 py-2 text-[18px] font-medium font-poppins text-blue-dark hover:text-gold transition-colors">
                      {item.title}
                      <ChevronDown
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.title && "rotate-180",
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
                          <div className="p-2 max-h-[70vh] overflow-y-auto">
                            {item.items.map((subItem) => (
                              <div key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className="group flex flex-col p-3 rounded-md hover:bg-blue-50 transition-all duration-200"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-blue-dark group-hover:text-gold transition-colors">
                                      {subItem.title}
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                  </div>
                                  <span className="text-sm text-gray-500 mt-0.5">{subItem.description}</span>
                                </Link>

                                {/* Sub-items for Products */}
                                {subItem.subItems && activeDropdown === "Products" && (
                                  <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-2">
                                    {subItem.subItems.map((subSubItem: any) => (
                                      <Link
                                        key={subSubItem.title}
                                        href={subSubItem.href}
                                        className="group flex flex-col p-2 rounded-md hover:bg-blue-50 transition-all duration-200"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium text-sm text-blue-dark group-hover:text-gold transition-colors">
                                            {subSubItem.title}
                                          </span>
                                          <ArrowRight className="h-3 w-3 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </div>
                                        <span className="text-xs text-gray-500 mt-0.5">{subSubItem.description}</span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
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
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-8 w-8 text-blue-dark" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-5 bg-white">
              <div className="flex flex-col py-2 overflow-y-auto max-h-[calc(100vh-100px)]">
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
                        onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                      >
                        <button className="flex items-center justify-between w-full text-[18px] font-medium font-poppins px-4 py-2 text-blue-dark hover:text-gold transition-colors">
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              activeDropdown === item.title && "rotate-180",
                            )}
                          />
                        </button>
                        {activeDropdown === item.title && (
                          <div className="pl-4 border-l border-gray-200 ml-4 bg-gray-50">
                            {item.items.map((subItem) => (
                              <div key={subItem.title}>
                                <Link
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
                                  <span className="text-sm text-gray-500 mt-0.5">{subItem.description}</span>
                                </Link>

                                {/* Sub-items for Products */}
                                {subItem.subItems && activeDropdown === "Products" && (
                                  <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-2">
                                    {subItem.subItems.map((subSubItem: any) => (
                                      <Link
                                        key={subSubItem.title}
                                        href={subSubItem.href}
                                        onClick={handleMobileItemClick}
                                        className="flex flex-col p-2 hover:bg-gray-100 transition-colors rounded-md group"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium text-sm text-blue-dark group-hover:text-gold">
                                            {subSubItem.title}
                                          </span>
                                          <ArrowRight className="h-3 w-3 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </div>
                                        <span className="text-xs text-gray-500 mt-0.5">{subSubItem.description}</span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 mt-auto">
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

