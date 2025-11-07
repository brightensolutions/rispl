"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SubSubMenuItem {
  title: string;
  href: string;
  description: string;
}

interface SubMenuItem {
  title: string;
  href: string;
  description: string;
  subItems?: SubSubMenuItem[];
}

interface MenuItem {
  title: string;
  href?: string;
  items?: SubMenuItem[];
}

const baseMenuItems: MenuItem[] = [{ title: "Home", href: "/" }];

const serializeData = (obj: any): any => {
  if (!obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => serializeData(item));
  }
  if (typeof obj === "object") {
    const serialized: any = {};
    for (const key in obj) {
      if (key === "_id" && obj[key]?.buffer) {
        // Skip MongoDB ObjectId with buffer
        continue;
      }
      serialized[key] = serializeData(obj[key]);
    }
    return serialized;
  }
  return obj;
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(baseMenuItems);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const industriesResponse = await fetch("/api/industries");
        let industries = [];
        if (industriesResponse.ok) {
          industries = serializeData(await industriesResponse.json());
        }

        const servicesResponse = await fetch("/api/services");
        let services = [];
        if (servicesResponse.ok) {
          services = serializeData(await servicesResponse.json());
        }

        const equipmentResponse = await fetch("/api/products?type=equipment");
        let equipmentCategories = [];
        if (equipmentResponse.ok) {
          equipmentCategories = serializeData(await equipmentResponse.json());
        }

        const consumablesResponse = await fetch(
          "/api/products?type=consumables"
        );
        let consumablesCategories = [];
        if (consumablesResponse.ok) {
          consumablesCategories = serializeData(
            await consumablesResponse.json()
          );
        }

        const solutionsMenuItem: MenuItem = {
          title: "Solutions & Services",
          items: [
            {
              title: "Operational Management",
              href: "/solutions/operational-management",
              description: "Enterprise management solutions",
              subItems: [
                {
                  title: "Yohan Enterprise",
                  href: "/solutions/operational-management/yohan-enterprise",
                  description: "Yohan Enterprise solution",
                },
                {
                  title: "Atash Enterprise",
                  href: "/solutions/operational-management/atash-enterprise",
                  description: "Atash Enterprise solution",
                },
                {
                  title: "Eagle Instrumentation",
                  href: "/solutions/operational-management/eagle-instrumentation",
                  description: "Eagle Instrumentation solution",
                },
              ],
            },
            {
              title: "Packaging & Automation",
              href: "#",
              description: "Packaging and automation services",
              subItems: [
                ...services.map((service: any) => ({
                  title: service.title,
                  href: `/solutions/${service.slug}`,
                  description: service.description,
                })),
                ...industries.map((industry: any) => ({
                  title: industry.title,
                  href: `/industries/${industry.slug}`,
                  description: industry.shortDescription,
                })),
              ],
            },
          ],
        };

        const productsMenuItem: MenuItem = {
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
        };

        const newsroomMenuItem: MenuItem = {
          title: "Newsroom",
          href: "/newsroom",
        };

        const updatedMenuItems = [...baseMenuItems];
        updatedMenuItems.push(solutionsMenuItem);
        updatedMenuItems.push(productsMenuItem);
        updatedMenuItems.push(newsroomMenuItem);

        setMenuItems(updatedMenuItems);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleMobileItemClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleGoogleTranslate = () => {
    if (typeof window !== "undefined") {
      // Create container if it doesn't exist
      let container = document.getElementById("google_translate_element");
      if (!container) {
        container = document.createElement("div");
        container.id = "google_translate_element";
        container.style.position = "fixed";
        container.style.top = "80px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        document.body.appendChild(container);
      }

      // Load Google Translate script if not already loaded
      if (!(window as any).google?.translate?.TranslateElement) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
        (window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr,de,zh-CN,pt,ar",
            },
            "google_translate_element"
          );
        };
      }
    }
  };

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
      <div className="2xl:max-w-[1440px] mx-auto px-4 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative">
            <Image
              src="/images/logos/ris logoline.svg"
              alt="Logo"
              width={220}
              height={400}
              className="lg:w-[400px] w-[350px]"
            />
          </Link>

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
                          activeDropdown === item.title && "rotate-180"
                        )}
                      />
                    </button>
                    {activeDropdown === item.title && (
                      <div className="absolute top-full left-0 pt-4 w-[320px]">
                        <div className="relative bg-white rounded-lg shadow-lg">
                          <div className="absolute -top-2 left-6 w-4 h-4 bg-gold rotate-45" />
                          <div className="px-4 py-3 bg-gold rounded-t-lg">
                            <h3 className="text-white text-[18px] font-medium font-poppins">
                              {item.title}
                            </h3>
                          </div>
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
                                  <span className="text-sm text-gray-500 mt-0.5">
                                    {subItem.description}
                                  </span>
                                </Link>

                                {subItem.subItems && (
                                  <div className="ml-4 mt-2 border-l-2 border-blue-100 pl-2">
                                    {subItem.subItems.map((subSubItem) => (
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
                                        <span className="text-xs text-gray-500 mt-0.5">
                                          {subSubItem.description}
                                        </span>
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

            <Link
              href="/contact"
              className="ml-4 px-6 py-2 bg-gold text-white font-poppins text-[18px] rounded hover:bg-gold/90 transition-colors"
            >
              Contact
            </Link>

            <button
              onClick={handleGoogleTranslate}
              className="ml-3 p-2 text-blue-dark hover:text-gold transition-colors rounded hover:bg-gray-100"
              title="Translate with Google"
            >
              <Globe className="h-6 w-6" />
            </button>
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-8 w-8 text-blue-dark" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-5 bg-white">
              <div className="flex flex-col py-2 overflow-y-auto max-h-[calc(100vh-200px)]">
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
                                  <span className="text-sm text-gray-500 mt-0.5">
                                    {subItem.description}
                                  </span>
                                </Link>

                                {subItem.subItems && (
                                  <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-2">
                                    {subItem.subItems.map((subSubItem) => (
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
                                        <span className="text-xs text-gray-500 mt-0.5">
                                          {subSubItem.description}
                                        </span>
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

              <div className="p-4 mt-auto border-t">
                <Link
                  href="/contact"
                  onClick={handleMobileItemClick}
                  className="flex justify-center px-6 py-2 bg-gold font-medium font-poppins text-[18px] text-white rounded hover:bg-gold/90 transition-colors"
                >
                  Contact
                </Link>

                <button
                  onClick={handleGoogleTranslate}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-6 py-2 text-blue-dark font-medium font-poppins text-[18px] border border-blue-dark rounded hover:bg-blue-50 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  Translate
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
