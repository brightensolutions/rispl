"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Edit, Plus, Eye, EyeOff, ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import Image from "next/image"

interface SocialLinks {
  linkedin: string
  twitter: string
  email: string
}

interface TeamMember {
  _id: string
  name: string
  role: string
  subRole: string
  image: string
  social: SocialLinks
  order: number
  active: boolean
}

export default function TeamMemberList() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/team-members")
      const data = await res.json()

      if (data.success) {
        setTeamMembers(data.data)
      } else {
        setError(data.message || "Failed to fetch team members")
      }
    } catch (error) {
      setError("An error occurred while fetching team members")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) {
      return
    }

    try {
      const res = await fetch(`/api/admin/team-members/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        // Remove the deleted team member from the state
        setTeamMembers(teamMembers.filter((member) => member._id !== id))
      } else {
        setError(data.message || "Failed to delete team member")
      }
    } catch (error) {
      setError("An error occurred while deleting the team member")
      console.error(error)
    }
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/team-members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: !currentActive }),
      })

      const data = await res.json()

      if (data.success) {
        // Update the team member in the state
        setTeamMembers(
          teamMembers.map((member) => (member._id === id ? { ...member, active: !currentActive } : member)),
        )
      } else {
        setError(data.message || "Failed to update team member")
      }
    } catch (error) {
      setError("An error occurred while updating the team member")
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
        <h2 className="text-xl font-semibold font-poppins text-gray-800">Team Members</h2>
        <button
          onClick={() => router.push("/admin/team/new")}
          className="flex items-center gap-2 bg-gradient-gold font-bold rounded-xl  text-black px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Member
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-500 border-b">{error}</div>}

      {teamMembers.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No team members found. Click "Add New Member" to create one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-roboto text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 font-roboto text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 font-roboto text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 font-roboto text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 font-roboto text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-roboto font-medium text-gray-900">{member.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-roboto text-gray-900">{member.role}</div>
                    <div className="text-xs font-roboto text-gray-500">{member.subRole}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex font-roboto text-xs leading-5 font-semibold rounded-full ${
                        member.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                 
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(member._id, member.active)}
                        className="p-1 rounded text-gray-500 hover:bg-gray-100"
                        title={member.active ? "Deactivate" : "Activate"}
                      >
                        {member.active ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => router.push(`/admin/team/edit/${member._id}`)}
                        className="p-1 rounded text-blue-500 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
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

