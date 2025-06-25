"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Edit, Plus, Eye, EyeOff, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import Image from "next/image"

interface Client {
  _id: string
  name: string
  image: string
  order: number
  active: boolean
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/clients")
      const data = await res.json()

      if (data.success) {
        setClients(data.data)
      } else {
        setError(data.message || "Failed to fetch clients")
      }
    } catch (error) {
      setError("An error occurred while fetching clients")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) {
      return
    }

    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Remove the deleted client from the state
        setClients(clients.filter((client) => client._id !== id))
      } else {
        setError(data.message || "Failed to delete client")
      }
    } catch (error) {
      setError("An error occurred while deleting the client")
      console.error(error)
    }
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: !currentActive }),
      })

      const data = await res.json()

      if (data.success) {
        // Update the client in the state
        setClients(clients.map((client) => (client._id === id ? { ...client, active: !currentActive } : client)))
      } else {
        setError(data.message || "Failed to update client")
      }
    } catch (error) {
      setError("An error occurred while updating the client")
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
        <h2 className="text-xl font-semibold text-gray-800">Client Logos</h2>
        <button
          onClick={() => router.push("/admin/clients/new")}
          className="flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-xl font-nunito font-semibold hover:bg-blue-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Client
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-500 border-b">{error}</div>}

      {clients.length === 0 ? (
        <div className="p-8 text-center text-gray-500 font-roboto">No clients found. Click "Add New Client" to create one.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-16 w-24 rounded overflow-hidden">
                      <Image
                        src={client.image || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {client.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                 
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(client._id, client.active)}
                        className="p-1 rounded text-gray-500 hover:bg-gray-100"
                        title={client.active ? "Deactivate" : "Activate"}
                      >
                        {client.active ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => router.push(`/admin/clients/edit/${client._id}`)}
                        className="p-1 rounded text-blue-500 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
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

