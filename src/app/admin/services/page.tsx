"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "../dashboard-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

// Define a simpler ServiceData interface for the component state
interface ServiceData {
  _id: string
  title: string
  slug: string
  isActive: boolean
  [key: string]: any // For any other properties
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([])
  const [loading, setLoading] = useState(true)
  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin) {
      const fetchServices = async () => {
        try {
          const response = await fetch("/api/admin/services")

          if (response.ok) {
            const data = await response.json()
            setServices(data)
          } else {
            console.error("Failed to fetch services")
          }
        } catch (error) {
          console.error("Error fetching services:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchServices()
    }
  }, [isLoading, admin, router])

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        setServices(
          services.map((service) => (service._id === id ? { ...service, isActive: !service.isActive } : service)),
        )
      }
    } catch (error) {
      console.error("Error toggling service status:", error)
    }
  }

  const deleteService = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setServices(services.filter((service) => service._id !== id))
      }
    } catch (error) {
      console.error("Error deleting service:", error)
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
          <h1 className="text-2xl font-bold font-nunito">Solutions & Services</h1>
          <Link href="/admin/services/new">
            <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No services found. Create your first service.
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.slug}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            service.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleServiceStatus(service._id, service.isActive)}
                            title={service.isActive ? "Deactivate" : "Activate"}
                            className="inline-flex items-center justify-center bg-gradient-gold text-black rounded-full cursor-pointer"
                          >
                            {service.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Link href={`/admin/services/edit/${service._id}`}>
                            <Button
                              className="inline-flex items-center justify-center bg-gradient-gold text-black rounded-full cursor-pointer"
                              variant="outline"
                              size="icon"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className="inline-flex items-center justify-center bg-gradient-gold text-black rounded-full cursor-pointer"
                            onClick={() => deleteService(service._id)}
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

