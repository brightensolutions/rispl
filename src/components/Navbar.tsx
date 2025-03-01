"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  }
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 py-4",
        isScrolled ? "bg-white backdrop-blur-md shadow-md" : "bg-white"
      )}
    >
      <div className="container mx-auto ">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-nunito font-bold text-2xl text-blue">
            <Image src="/images/logos/ris logo_PNG.png" priority alt="rispl" width={130} height={150} />
          </Link>

          <nav className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.items ? (
                    <>
                      <button className={cn("flex items-center px-4 py-2 font-bold font-poppins  hover:text-gold transition-colors",
                         isScrolled ? "text-blue-dark" : "text-blue-dark"
                      )}>
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
                          <div className="relative bg-white rounded-[5px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]  ">
                            {/* Triangle pointer */}
                            <div className="absolute -top-1 left-6 w-4 h-4 bg-gold  -z-10 rotate-45 transform origin-bottom-right" />

                            {/* Dropdown header */}
                            <div className="px-4 py-3 bg-gold  rounded-t-[5px]">
                              <h3 className="font-poppins font-s text-white">
                                {item.title}
                              </h3>
                            </div>

                            {/* Dropdown items */}
                            <div className="p-2">
                              {item.items.map((subItem, index) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className="group flex flex-col p-3 rounded-md hover:bg-blue-50 transition-all duration-200"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-poppins font-medium text-blue-dark group-hover:text-gold transition-colors">
                                      {subItem.title}
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                  </div>
                                  <span className="text-sm font-roboto text-muted-foreground mt-0.5">
                                    {subItem?.description}
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
                      className={cn("relative px-4 py-2 font-poppins text-blue-dark font-bold hover:text-gold transition-colors group",
                         isScrolled ? "text-blue-dark" : "text-blue-dark"
                      )}
                    >
                      {item.title}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div>
            <Link href="/contact" className="relative ml-4 overflow-hidden group bg-gold hover:opacity-90 text-white font-poppins rounded-[5px] px-6 py-2 transition-all duration-300">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          <Sheet >
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 bg-white">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="font-nunito text-xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-2">
                {menuItems.map((item) => (
                  <div key={item.title} className="flex flex-col">
                    {!item.items ? (
                      <Link
                        href={item.href!}
                        className="px-4 py-2 font-poppins text-blue-dark hover:text-blue transition-colors"
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
                        <button className="flex items-center justify-between w-full px-4 py-2 font-poppins text-blue-dark hover:text-blue transition-colors">
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              activeDropdown === item.title && "rotate-180"
                            )}
                          />
                        </button>
                        {activeDropdown === item.title && (
                          <div className="pl-4 border-l border-border ml-4 bg-blue-50/50">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="flex flex-col p-3 hover:bg-blue-50 transition-colors rounded-md group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-poppins font-medium text-blue-dark group-hover:text-blue">
                                    {subItem.title}
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                </div>
                                <span className="text-sm font-roboto text-muted-foreground mt-0.5">
                                  {subItem?.description}
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
              <div className="p-4 border-t mt-auto">
              <Link href="/contact" className="relative ml-4 overflow-hidden group bg-gold hover:opacity-90 text-white font-poppins rounded-[5px] px-6 py-2 transition-all duration-300">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
