import { PageTitle } from "@/components/other-page-title";
import { ProductsGrid } from "@/components/product-grid";

const EQUIPMENT_PRODUCTS = [
  {
    id: 1,
    name: "Industrial Packaging Machine",
    image: "/industrial-packaging-machine-equipment.jpg",
    category: "Packaging",
  },
  {
    id: 2,
    name: "Automated Labeling System",
    image: "/automated-labeling-system.jpg",
    category: "Labeling",
  },
  {
    id: 3,
    name: "High-Speed Sealing Unit",
    image: "/high-speed-sealing-equipment.jpg",
    category: "Sealing",
  },
  {
    id: 4,
    name: "Quality Control Scanner",
    image: "/quality-control-scanner-equipment.jpg",
    category: "Inspection",
  },
];

export default function EquipmentPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PageTitle
        title="Equipment"
        subtitle="High-quality packaging equipment for your business needs"
        backgroundImage="/images/equipment-bg.jpg"
      />
      <ProductsGrid products={EQUIPMENT_PRODUCTS} />
    </div>
  );
}
