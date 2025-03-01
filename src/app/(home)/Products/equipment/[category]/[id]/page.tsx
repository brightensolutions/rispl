import { ProductDetail } from "@/components/product-detail"
import { getProduct } from "@/lib/equipment-data"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const product = getProduct(params.category, params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} type="equipment" />
}

