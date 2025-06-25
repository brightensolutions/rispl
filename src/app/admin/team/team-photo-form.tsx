"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"

interface TeamPhotoFormData {
  _id?: string
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
}

export default function TeamPhotoForm() {
  const [formData, setFormData] = useState<TeamPhotoFormData>({
    title: "",
    description: "",
    image: "",
    ctaText: "Learn more about our team",
    ctaLink: "#",
  })

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  // Set mounted state to true when component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetchTeamPhoto()
  }, [])

  const fetchTeamPhoto = async () => {
    try {
      setFetchLoading(true)
      const res = await fetch("/api/admin/team-photo")
      const data = await res.json()

      if (data.success) {
        setFormData(data.data)
      } else {
        setError(data.message || "Failed to fetch team photo")
      }
    } catch (error) {
      setError("An error occurred while fetching team photo")
      console.error(error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    if (!formData.title || !formData.description || !formData.image) {
      setError("Title, description, and image are required")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const res = await fetch("/api/admin/team-photo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess("Team photo updated successfully")

        // Refresh the data
        fetchTeamPhoto()
      } else {
        setError(data.message || "Failed to update team photo")
      }
    } catch (error) {
      setError("An error occurred while updating the team photo")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Don't render until client-side hydration is complete
  if (!mounted) return null

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-dark" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Edit Team Photo Section</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-md">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-500 rounded-md">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block font-roboto text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter section title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-roboto text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border text-black font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter section description"
              />
            </div>

            <div>
              <label htmlFor="ctaText" className="block font-roboto text-sm font-medium text-gray-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                id="ctaText"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter call-to-action text"
              />
            </div>

            <div>
              <label htmlFor="ctaLink" className="block font-roboto text-sm font-medium text-gray-700 mb-1">
                CTA Button Link
              </label>
              <input
                type="text"
                id="ctaLink"
                name="ctaLink"
                value={formData.ctaLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter call-to-action link"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {formData.image ? (
                <div className="relative">
                  <div className="relative h-64 w-full rounded overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Team photo preview"
                      fill
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
                      <span className="mt-2 block text-sm font-medium text-blue-dark hover:text-blue-800">
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
                  <p className="mt-2 text-xs text-center text-gray-500">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/team")}
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gradient-gold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || isUploading}
            className="px-4 py-2 bg-gradient-gold text-black font-nunito rounded-xl hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

