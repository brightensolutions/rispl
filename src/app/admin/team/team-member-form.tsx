"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"

interface SocialLinks {
  linkedin: string
  twitter: string
  email: string
}

interface TeamMemberFormData {
  _id?: string
  name: string
  role: string
  subRole: string
  image: string
  social: SocialLinks
  order: number
  active: boolean
}

interface TeamMemberFormProps {
  memberId?: string
}

export default function TeamMemberForm({ memberId }: TeamMemberFormProps) {
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    role: "",
    subRole: "",
    image: "",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:example@domain.com",
    },
    order: 0,
    active: true,
  })

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  // Set mounted state to true when component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (memberId) {
      setIsEdit(true)
      fetchTeamMember(memberId)
    }
  }, [memberId])

  const fetchTeamMember = async (id: string) => {
    try {
      setFetchLoading(true)
      const res = await fetch(`/api/admin/team-members/${id}`)
      const data = await res.json()

      if (data.success) {
        setFormData(data.data)
      } else {
        setError(data.message || "Failed to fetch team member")
      }
    } catch (error) {
      setError("An error occurred while fetching the team member")
      console.error(error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed")
      return
    }

    try {
      setIsUploading(true)
      setUploadProgress(0)
      setError("") // Clear any previous errors

      // Create form data
      const formData = new FormData()
      formData.append("file", file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 300)

      // Upload the file
      const res = await fetch("/api/admin/slider-upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Upload failed")
      }

      const data = await res.json()
      setUploadProgress(100)

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          image: data.url,
        }))
      } else {
        setError(data.message || "Failed to upload image")
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while uploading the image")
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.role || !formData.image) {
      setError("Name, role, and image are required")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const url = isEdit ? `/api/admin/team-members/${memberId}` : "/api/admin/team-members"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(isEdit ? "Team member updated successfully" : "Team member created successfully")

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/team")
        }, 1500)
      } else {
        setError(data.message || "Failed to save team member")
      }
    } catch (error) {
      setError("An error occurred while saving the team member")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Don't render until client-side hydration is complete
  if (!mounted) return null

  if (fetchLoading && isEdit) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-dark" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold font-poppins text-gray-800">{isEdit ? "Edit Team Member" : "Add New Team Member"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-md">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-500 rounded-md">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter member name"
              />
            </div>

            <div>
              <label htmlFor="role" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter member role"
              />
            </div>

            <div>
              <label htmlFor="subRole" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                Sub Role
              </label>
              <input
                type="text"
                id="subRole"
                name="subRole"
                value={formData.subRole}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter member sub role (optional)"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium font-poppins text-gray-700">Social Links</h3>

              <div>
                <label htmlFor="linkedin" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.social.linkedin}
                  onChange={handleSocialChange}
                  className="w-full px-4 py-2 text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label htmlFor="twitter" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                  Twitter URL
                </label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.social.twitter}
                  onChange={handleSocialChange}
                  className="w-full px-4 py-2  text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                  Email Link
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.social.email}
                  onChange={handleSocialChange}
                  className="w-full px-4 py-2 border text-black font-roboto border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="mailto:example@domain.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                className="h-4 w-4 text-blue-dark focus:ring-blue-dark border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 font-poppins block text-sm text-gray-700">
                Active
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium font-poppins text-gray-700 mb-1">Member Image</label>

            <div className="border-2 border-dashed w-fit border-gray-300 rounded-lg p-4">
              {formData.image ? (
                <div className="relative">
                  <div className="relative  w-fit rounded overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Member preview"
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="mt-2 block font-poppins text-sm font-medium text-blue-dark hover:text-blue-800">
                        Click to upload an image
                      </span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-dark h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="mt-2 text-xs font-poppins text-center text-gray-500">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/team")}
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gradient-gold font-nunito text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || isUploading}
            className="px-4 py-2 bg-gradient-gold  text-black rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Saving...
              </>
            ) : (
              "Save Member"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

