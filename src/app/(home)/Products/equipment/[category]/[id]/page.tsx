import { ProductDetail } from "@/components/product-detail"
import { getProduct } from "@/lib/equipment-data"
import { notFound } from "next/navigation"

// Define the params type for Next.js 15
interface PageProps {
  params: Promise<{
    category: string
    id: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params
  const { category, id } = await params

  // Get product data
  const product = await Promise.resolve(getProduct(category, id))

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} type="equipment" />
}

// Add metadata generation
export async function generateMetadata({ params }: PageProps) {
  const { category, id } = await params
  const product = await Promise.resolve(getProduct(category, id))

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

