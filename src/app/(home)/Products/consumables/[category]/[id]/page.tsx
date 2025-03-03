import { ProductDetail } from "@/components/product-detail"
import { consumablesgetProduct } from "@/lib/equipment-data"
import { notFound } from "next/navigation"

// Define props type without Promise
type Props = {
  params: {
    category: string
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
  // Get product directly without awaiting params
  const product = await consumablesgetProduct(params.category, params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} type="consumables" />
}

export async function generateMetadata({ params }: Props) {
  const product = await consumablesgetProduct(params.category, params.id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

