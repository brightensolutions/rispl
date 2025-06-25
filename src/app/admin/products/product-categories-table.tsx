"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

// Define a Category interface to use with useState
interface Category {
  id: string
  title: string
  isActive: boolean
  [key: string]: any // For any other properties
}

interface ProductCategoriesTableProps {
  type: "equipment" | "consumables"
}

export default function ProductCategoriesTable({ type }: ProductCategoriesTableProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/admin/products/categories?type=${type}`)

        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        } else {
          console.error(`Failed to fetch ${type} categories`)
        }
      } catch (error) {
        console.error(`Error fetching ${type} categories:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [type])

  const toggleCategoryStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        setCategories(
          categories.map((category) => (category.id === id ? { ...category, isActive: !category.isActive } : category)),
        )
      }
    } catch (error) {
      console.error(`Error toggling ${type} category status:`, error)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/categories/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id))
      }
    } catch (error) {
      console.error(`Error deleting ${type} category:`, error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No {type} categories found. Create your first category.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.title}</TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer"
                      size="icon"
                      onClick={() => toggleCategoryStatus(category.id, category.isActive)}
                      title={category.isActive ? "Deactivate" : "Activate"}
                    >
                      {category.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Link href={`/admin/products/categories/edit/${category.id}`}>
                      <Button
                        className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer"
                        size="icon"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer"
                      size="icon"
                      onClick={() => deleteCategory(category.id)}
                      title="Delete"
                    >
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
  )
}

