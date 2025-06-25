"use client"

import { use } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DashboardLayout from "@/app/admin/dashboard-layout"
import ProductCategoryForm from "../../../product-category-form"
import { Loader2 } from "lucide-react"

// Define the interface with Promise-based params
interface EditProductCategoryPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductCategoryPage({ params }: EditProductCategoryPageProps) {
  // Use the 'use' hook to consume the Promise
  const resolvedParams = use(params)
  const categoryId = resolvedParams.id

  const { admin, isLoading } = useAuth()
  const router = useRouter()
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/admin/products/categories/${categoryId}`)
          if (response.ok) {
            const data = await response.json()
            setCategory(data)
          } else {
            console.error("Failed to fetch category")
          }
        } catch (error) {
          console.error("Error fetching category:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchCategory()
    }
  }, [isLoading, admin, router, categoryId])

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!admin || !category) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Edit {category.type === "equipment" ? "Equipment" : "Consumables"} Category
        </h1>
        <ProductCategoryForm categoryId={categoryId} type={category.type} initialData={category} />
      </div>
    </DashboardLayout>
  )
}

