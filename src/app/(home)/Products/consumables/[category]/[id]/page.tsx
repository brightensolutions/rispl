import { ProductDetail } from "@/components/product-detail"
import { consumablesgetProduct } from "@/lib/equipment-data"
import { notFound } from "next/navigation"

// Define the params type for Next.js 15
interface PageProps {
  params: Promise<{ category: string; id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params
  const { category, id } = await params

  // Get product data
  const product = await consumablesgetProduct(category, id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} type="consumables" />
}

// Add metadata generation
export async function generateMetadata({ params }: PageProps) {
  const { category, id } = await params
  const product = await consumablesgetProduct(category, id)

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

