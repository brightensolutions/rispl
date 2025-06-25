import { ProductsGrid } from "@/components/product-grid"
import { PageTitle } from "@/components/other-page-title"

export default function ConsumablesPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <PageTitle
        title="consumables"
        subtitle="High-quality packaging materials for your business needs"
        backgroundImage="/images/consumables-bg.jpg"
      />
      <ProductsGrid type="consumables" />
    </div>
  )
}

