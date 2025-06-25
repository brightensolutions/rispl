"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "../dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus } from "lucide-react"
import Link from "next/link"
import ProductCategoriesTable from "./product-categories-table"

export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin) {
      setLoading(false)
    }
  }, [isLoading, admin, router])

  if (isLoading || loading) {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-nunito">Products Management</h1>
        </div>

        <Tabs defaultValue="equipment" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="consumables">Consumables</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Equipment Categories</h2>
              <Link href="/admin/products/categories/new?type=equipment">
                <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </Link>
            </div>
            <ProductCategoriesTable type="equipment" />
          </TabsContent>

          <TabsContent value="consumables">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Consumables Categories</h2>
              <Link href="/admin/products/categories/new?type=consumables">
                <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </Link>
            </div>
            <ProductCategoriesTable type="consumables" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

