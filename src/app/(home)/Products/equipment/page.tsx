import { ProductsGrid } from "@/components/product-grid";
import { PageTitle } from "@/components/other-page-title";

export default function EquipmentPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <PageTitle
        title="Equipment"
        subtitle="High-quality packaging equipment for your business needs"
        backgroundImage="/images/equipment-bg.jpg"
      />
      <ProductsGrid type="equipment" />
    </div>
  );
}
