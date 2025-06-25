import { ProductDetailPage } from "@/components/product-detail"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Update the interface to use Promise for params
interface PageProps {
  params: Promise<{
    type: string
    id: string
  }>
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params

  // Validate type parameter
  if (resolvedParams.type !== "equipment" && resolvedParams.type !== "consumables") {
    notFound()
  }

  try {
    // Fetch product data from API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products/${resolvedParams.type}/${resolvedParams.id}`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      notFound()
    }

    const product = await response.json()

    // If the API returns a success property, handle that structure
    const productData = product.success ? product.data : product

    if (!productData) {
      notFound()
    }

    return <ProductDetailPage product={productData} type={resolvedParams.type} />
  } catch (error) {
    console.error("Error fetching product:", error)
    notFound()
  }
}

// Update generateMetadata to also await the params Promise
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await the params Promise
  const resolvedParams = await params

  // Validate type parameter
  if (resolvedParams.type !== "equipment" && resolvedParams.type !== "consumables") {
    return {
      title: "Product Not Found",
    }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products/${resolvedParams.type}/${resolvedParams.id}`,
    )

    if (!response.ok) {
      return {
        title: "Product Not Found",
      }
    }

    const product = await response.json()
    const productData = product.success ? product.data : product

    return {
      title: productData.title || productData.name,
      description: productData.description,
    }
  } catch (error) {
    return {
      title: "Product",
      description: "Product details",
    }
  }
}

