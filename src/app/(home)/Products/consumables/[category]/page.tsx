import { PageTitle } from "@/components/other-page-title"
import { consumablesgetCategory } from "@/lib/equipment-data"
import { ProductGrid } from "@/components/product-grid"
import { notFound } from "next/navigation"

// Define the params type for Next.js 15
interface PageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CategoryPage({ params }: PageProps) {
  // Await the params
  const { category: categoryId } = await params

  // Get category data
  const category = consumablesgetCategory(categoryId)

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

// Add metadata generation
export async function generateMetadata({ params }: PageProps) {
  const { category: categoryId } = await params
  const category = consumablesgetCategory(categoryId)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: category.title,
    description: category.description,
  }
}

