import { PageTitle } from "@/components/other-page-title"
import { getCategory } from "@/lib/equipment-data"
import { ProductGrid } from "@/components/product-grid"
import { notFound } from "next/navigation"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <PageTitle title={category.title} subtitle={category.description} backgroundImage={category.image} />
      <ProductGrid products={category.products} categoryId={category.id} />
    </div>
  )
}

