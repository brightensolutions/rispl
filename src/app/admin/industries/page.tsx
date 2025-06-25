"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "../dashboard-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import type { Industry } from "@/lib/Models/industry"

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)
  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin) {
      const fetchIndustries = async () => {
        try {
          const response = await fetch("/api/admin/industries")

          if (response.ok) {
            const data = await response.json()
            setIndustries(data)
          } else {
            console.error("Failed to fetch industries")
          }
        } catch (error) {
          console.error("Error fetching industries:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchIndustries()
    }
  }, [isLoading, admin, router])

  const toggleIndustryStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/industries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        // Fetch the updated data instead of manually updating the state
        const updatedIndustry = await response.json()

        // Create a new array with the updated industry
        setIndustries(
          industries.map((industry) =>
            industry._id === id ? ({ ...industry, isActive: !industry.isActive } as Industry) : industry,
          ),
        )
      }
    } catch (error) {
      console.error("Error toggling industry status:", error)
    }
  }

  const deleteIndustry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this industry?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/industries/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setIndustries(industries.filter((industry) => industry._id !== id))
      }
    } catch (error) {
      console.error("Error deleting industry:", error)
    }
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Industries</h1>
          <Link href="/admin/industries/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Industry
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {industries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No industries found. Create your first industry.
                    </TableCell>
                  </TableRow>
                ) : (
                  industries.map((industry) => (
                    <TableRow key={String(industry._id)}>
                      <TableCell>{industry.order}</TableCell>
                      <TableCell className="font-medium">{industry.title}</TableCell>
                      <TableCell>{industry.slug}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            industry.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {industry.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleIndustryStatus(String(industry._id), industry.isActive)}
                            title={industry.isActive ? "Deactivate" : "Activate"}
                          >
                            {industry.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Link href={`/admin/industries/edit/${industry._id}`}>
                            <Button variant="outline" size="icon" title="Edit">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteIndustry(String(industry._id))}
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
        )}
      </div>
    </DashboardLayout>
  )
}

