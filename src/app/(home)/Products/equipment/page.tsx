"use client";

import Image from "next/image";
import { PageTitle } from "@/components/other-page-title";

export default function EquipmentPage() {
  const products = [
    {
      id: 1,
      name: "Delta Robots",
      image: "/images/operations/delta-robots.jpg",
    },
    {
      id: 2,
      name: "Single Arm Robots",
      image: "/images/operations/single-coloumn.jpg",
    },
    {
      id: 3,
      name: "AMRs",
      image: "/images/operations/amrs.webp",
    },
    {
      id: 4,
      name: "ASRS",
      image: "/images/operations/asrs.webp",
    },
    {
      id: 5,
      name: "Gantry Robots",
      image: "/images/operations/gantrys.png",
    },
    {
      id: 6,
      name: "Six Axis Robots",
      image: "/images/operations/six-axis-robot.jpg",
    },
    {
      id: 7,
      name: "Carton / Tote Handling Solutions",
      image: "/images/operations/totes-slider.jpg",
    },
    {
      id: 8,
      name: "Conveyors",
      image: "/images/operations/conveyors.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Page Header */}
      <PageTitle
        title="Equipment"
        subtitle="High-quality automation and packaging equipment for modern industries"
        backgroundImage="/images/equipment-bg.jpg"
      />

      {/* Static Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Equipment
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
