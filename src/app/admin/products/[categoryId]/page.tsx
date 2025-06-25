"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "../../dashboard-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Define a Product interface to use with useState
interface Product {
  id: string
  name: string
  order: number
  isActive: boolean
  [key: string]: any // For any other properties
}

// Define the interface with Promise-based params
interface ProductsListPageProps {
  params: Promise<{ categoryId: string }>
}

export default function ProductsListPage({ params }: ProductsListPageProps) {
  // Use the 'use' hook to consume the Promise
  const resolvedParams = use(params)
  const categoryId = resolvedParams.categoryId

  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin) {
      const fetchData = async () => {
        try {
          // Fetch category
          const categoryResponse = await fetch(`/api/admin/products/categories/${categoryId}`)
          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json()
            setCategory(categoryData)
          } else {
            console.error("Failed to fetch category")
          }

          // Fetch products
          const productsResponse = await fetch(`/api/admin/products?categoryId=${categoryId}`)
          if (productsResponse.ok) {
            const productsData = await productsResponse.json()
            setProducts(productsData)
          } else {
            console.error("Failed to fetch products")
          }
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [isLoading, admin, router, categoryId])

  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        setProducts(
          products.map((product) => (product.id === id ? { ...product, isActive: !product.isActive } : product)),
        )
      }
    } catch (error) {
      console.error("Error toggling product status:", error)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id))
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

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
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{category.title} Products</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">
              Category Type: <span className="font-medium">{category.type}</span>
            </p>
          </div>
          <Link href={`/admin/products/${categoryId}/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No products found. Create your first product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.order}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleProductStatus(product.id, product.isActive)}
                          title={product.isActive ? "Deactivate" : "Activate"}
                        >
                          {product.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Link href={`/admin/products/${categoryId}/edit/${product.id}`}>
                          <Button variant="outline" size="icon" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="icon" onClick={() => deleteProduct(product.id)} title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}

