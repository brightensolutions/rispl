"use client";

import type React from "react";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  LogOut,
  Menu,
  X,
  Home,
  Package,
  Users,
  FileText,
  ImageIcon,
  Factory,
  ChevronDown,
  Building,
  Info,
  Award,
  Heart,
  Target,
} from "lucide-react";

interface MenuItem {
  icon: React.ElementType;
  title: string;
  href?: string;
  items?: MenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  active: boolean;
  level?: number;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  if (!admin) {
    return null;
  }

  // Reorganized menu items with dropdowns
  const menuItems: MenuItem[] = [
    {
      icon: Home,
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: ImageIcon,
      title: "Hero Sliders",
      href: "/admin/sliders",
    },
    {
      icon: Users,
      title: "Client Logos",
      href: "/admin/clients",
    },
    {
      icon: Building,
      title: "Company",
      items: [
        {
          icon: Info,
          title: "About Page",
          href: "/admin/about",
        },
        {
          icon: Users,
          title: "Team Members",
          href: "/admin/team",
        },
        {
          icon: Users,
          title: "Team Photo",
          href: "/admin/team/photo",
        },
        {
          icon: Target,
          title: "Mission & Vision",
          href: "/admin/mission-vision",
        },
        {
          icon: Award,
          title: "Why Choose Us",
          href: "/admin/why-choose-us",
        },
        {
          icon: Heart,
          title: "Our Values",
          href: "/admin/our-values",
        },
      ],
    },
    {
      icon: Package,
      title: "Products",
      href: "/admin/products",
    },
    {
      icon: Package,
      title: "Services",
      href: "/admin/services",
    },
    {
      icon: Factory,
      title: "Industries",
      href: "/admin/industries",
    },
    {
      icon: FileText,
      title: "Contact Inquiries",
      href: "/admin/contacts",
    },
  ];

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href) {
      if (item.href === "/admin/dashboard") {
        return pathname === item.href;
      }
      return pathname.startsWith(item.href);
    }

    if (item.items) {
      return item.items.some((subItem) => isItemActive(subItem));
    }

    return false;
  };

  const SidebarItem = ({ item, active, level = 0 }: SidebarItemProps) => {
    const Icon = item.icon;
    const isExpanded = expandedItems.includes(item.title);
    const hasSubItems = item.items && item.items.length > 0;
    const isActive = active || isItemActive(item);

    return (
      <div className="mb-1">
        {item.href ? (
          <Link href={item.href}>
            <div
              className={`flex items-center px-4 py-3 mb-2 text-white bg-white/15 backdrop-blur-2xl font-nunito font-semibold rounded-xl transition-colors ${
                isActive
                  ? "bg-gradient-gold !text-black"
                  : "hover:bg-gradient-gold hover:!text-black"
              }`}
              style={{ paddingLeft: `${level * 12 + 16}px` }}
            >
              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>{item.title}</span>
            </div>
          </Link>
        ) : (
          <div
            className={`flex items-center justify-between px-4 py-3 mb-2 text-white bg-white/15 backdrop-blur-2xl font-nunito font-semibold rounded-xl transition-colors cursor-pointer ${
              isActive
                ? "bg-gradient-gold !text-black"
                : "hover:bg-gradient-gold hover:!text-black"
            }`}
            onClick={() => toggleExpand(item.title)}
          >
            <div className="flex items-center">
              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>{item.title}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        )}

        {hasSubItems && isExpanded && (
          <div className="ml-4 pl-2 border-l border-white/20">
            {item.items?.map((subItem) => (
              <SidebarItem
                key={subItem.title}
                item={subItem}
                active={isItemActive(subItem)}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0070A1] backdrop-blur-3xl shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center border-white/15 justify-between px-4 py-5 border-b">
            <h2 className="text-xl font-bold text-gradient-gold font-nunito">
              RISPL Admin
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.title}
                item={item}
                active={isItemActive(item)}
              />
            ))}
          </nav>

          <div className="p-4 border-t bg-blue-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{admin.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 bg-white hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gradient-blue border-b border-white/15 shadow-sm z-10">
          <div className="px-4 py-6 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white font-poppins">
                Welcome back, Admin
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-[20px] md:px-[40px] bg-gradient-blue">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
