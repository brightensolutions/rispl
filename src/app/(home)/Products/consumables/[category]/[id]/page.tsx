import { ProductDetail } from "@/components/product-detail"
import { consumablesgetProduct } from "@/lib/equipment-data"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const product = consumablesgetProduct(params.category, params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} type="consumables" />
}

