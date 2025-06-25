"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { url } from "inspector"

interface MissionVisionData {
  _id?: string
  mission: string
  vision: string
  chairmanMessage: string
  chairmanName: string
  chairmanTitle: string
  chairmanImage: string
  backgroundImage: string
  yearsExperience: number
}

export default function MissionVisionForm() {
  const [formData, setFormData] = useState<MissionVisionData>({
    mission: "",
    vision: "",
    chairmanMessage: "",
    chairmanName: "",
    chairmanTitle: "",
    chairmanImage: "",
    backgroundImage: "",
    yearsExperience: 25,
  })

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadType, setUploadType] = useState<"chairman" | "background" | null>(null)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()

  // Set mounted state to true when component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetchMissionVision()
  }, [])

  const fetchMissionVision = async () => {
    try {
      setFetchLoading(true)
      const res = await fetch("/api/admin/mission-vision")
      const data = await res.json()

      if (data.success) {
        setFormData(data.data)
      } else {
        setError(data.message || "Failed to fetch content")
      }
    } catch (error) {
      setError("An error occurred while fetching content")
      console.error(error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseInt(value) : value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "chairman" | "background") => {
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
      setUploadType(type)
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
          [type === "chairman" ? "chairmanImage" : "backgroundImage"]: data.url,
        }))
      } else {
        setError(data.message || "Failed to upload image")
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while uploading the image")
      console.error(error)
    } finally {
      setIsUploading(false)
      setUploadType(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.mission ||
      !formData.vision ||
      !formData.chairmanMessage ||
      !formData.chairmanName ||
      !formData.chairmanTitle ||
      !formData.chairmanImage ||
      !formData.backgroundImage
    ) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const res = await fetch("/api/admin/mission-vision", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess("Content updated successfully")

        // Refresh the data
        fetchMissionVision()
      } else {
        setError(data.message || "Failed to update content")
      }
    } catch (error) {
      setError("An error occurred while updating the content")
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
    <div className="bg-white rounded-xl shadow"
    style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(1, 42, 84, 0.90)), url(${formData.backgroundImage})`,

        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Edit Mission & Vision Content</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-md">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-500 rounded-md">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="mission" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                Our Mission
              </label>
              <textarea
                id="mission"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                rows={4}
                className="w-full text-black font-roboto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter mission statement"
              />
            </div>

            <div>
              <label htmlFor="vision" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                Our Vision
              </label>
              <textarea
                id="vision"
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                rows={4}
                className="w-full text-black font-roboto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter vision statement"
              />
            </div>

            <div>
              <label htmlFor="chairmanMessage" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                Chairman's Message
              </label>
              <textarea
                id="chairmanMessage"
                name="chairmanMessage"
                value={formData.chairmanMessage}
                onChange={handleChange}
                rows={3}
                className="w-full text-black font-roboto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                placeholder="Enter chairman's message"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="chairmanName" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                  Chairman's Name
                </label>
                <input
                  type="text"
                  id="chairmanName"
                  name="chairmanName"
                  value={formData.chairmanName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 font-roboto text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                />
              </div>
              <div>
                <label htmlFor="chairmanTitle" className="block font-poppins text-sm font-medium text-gray-700 mb-1">
                  Chairman's Title
                </label>
                <input
                  type="text"
                  id="chairmanTitle"
                  name="chairmanTitle"
                  value={formData.chairmanTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border font-roboto text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                />
              </div>
            </div>

            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-poppins font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsExperience"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                min="1"
                className="w-full px-4 font-roboto text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium font-poppins text-gray-700 mb-1">Chairman's Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.chairmanImage ? (
                  <div className="relative">
                    <div className="relative h-48 w-full rounded overflow-hidden">
                      <Image
                        src={formData.chairmanImage || "/placeholder.svg"}
                        alt="Chairman preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, chairmanImage: "" }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="chairman-image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-blue-dark hover:text-blue-800">
                          Click to upload chairman image
                        </span>
                        <input
                          id="chairman-image-upload"
                          name="chairman-image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageUpload(e, "chairman")}
                          disabled={isUploading}
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}

                {isUploading && uploadType === "chairman" && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-dark h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="mt-2 text-xs text-center text-gray-500">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block  font-poppins text-sm font-medium text-gray-700 mb-1">Background Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {formData.backgroundImage ? (
                  <div className="relative">
                    <div className="relative h-48 w-full rounded overflow-hidden">
                      <Image
                        src={formData.backgroundImage || "/placeholder.svg"}
                        alt="Background preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, backgroundImage: "" }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="background-image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-blue-dark hover:text-blue-800">
                          Click to upload background image
                        </span>
                        <input
                          id="background-image-upload"
                          name="background-image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageUpload(e, "background")}
                          disabled={isUploading}
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}

                {isUploading && uploadType === "background" && (
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
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gradient-gold font-nunito font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || isUploading}
            className="px-4 py-2 bg-gradient-gold  text-black font-nunito font-semibold  rounded-xl hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
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

