"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Edit, Plus, Eye, EyeOff, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import Image from "next/image"

interface Slider {
  _id: string
  title: string
  description: string
  highlight: string
  image: string
  order: number
  active: boolean
}

export default function SliderList() {
  const [sliders, setSliders] = useState<Slider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchSliders()
  }, [])

  const fetchSliders = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/sliders")
      const data = await res.json()

      if (data.success) {
        setSliders(data.data)
      } else {
        setError(data.message || "Failed to fetch sliders")
      }
    } catch (error) {
      setError("An error occurred while fetching sliders")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slider?")) {
      return
    }

    try {
      const res = await fetch(`/api/admin/sliders/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Remove the deleted slider from the state
        setSliders(sliders.filter((slider) => slider._id !== id))
      } else {
        setError(data.message || "Failed to delete slider")
      }
    } catch (error) {
      setError("An error occurred while deleting the slider")
      console.error(error)
    }
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: !currentActive }),
      })

      const data = await res.json()

      if (data.success) {
        // Update the slider in the state
        setSliders(sliders.map((slider) => (slider._id === id ? { ...slider, active: !currentActive } : slider)))
      } else {
        setError(data.message || "Failed to update slider")
      }
    } catch (error) {
      setError("An error occurred while updating the slider")
      console.error(error)
    }
  }

 

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-dark" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Hero Sliders</h2>
        <button
          onClick={() => router.push("/admin/sliders/new")}
          className="flex items-center gap-2 bg-gradient-gold text-black font-poppins  px-4 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Slider
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-500 border-b">{error}</div>}

      {sliders.length === 0 ? (
        <div className="p-8 text-center font-roboto text-gray-500">No sliders found. Click "Add New Slider" to create one.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 font-poppins py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 font-poppins py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 font-poppins py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 font-poppins py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sliders.map((slider) => (
                <tr key={slider._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-16 w-24 rounded overflow-hidden">
                      <Image
                        src={slider.image || "/placeholder.svg"}
                        alt={slider.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                  <div className="text-xl font-medium  text-gold font-nunito mb-3 w-fit  rounded-3xl "> {slider.highlight}</div>
                    <div className="text-sm font-medium font-roboto text-gray-900">{slider.title}</div>
                    <div className="text-sm text-gray-500 font-roboto line-clamp-2">{slider.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        slider.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {slider.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(slider._id, slider.active)}
                        className="p-1 rounded text-gray-500 hover:bg-gray-100"
                        title={slider.active ? "Deactivate" : "Activate"}
                      >
                        {slider.active ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => router.push(`/admin/sliders/edit/${slider._id}`)}
                        className="p-1 rounded text-blue-500 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(slider._id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

