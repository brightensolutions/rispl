"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import DashboardLayout from "@/app/admin/dashboard-layout"
import ProductCategoryForm from "../../product-category-form"
import { Loader2 } from "lucide-react"

export default function NewProductCategoryPage() {
  const { admin, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = (searchParams.get("type") as "equipment" | "consumables") || "equipment"

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
    }
  }, [isLoading, admin, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Add New {type === "equipment" ? "Equipment" : "Consumables"} Category
        </h1>
        <ProductCategoryForm type={type} />
      </div>
    </DashboardLayout>
  )
}

