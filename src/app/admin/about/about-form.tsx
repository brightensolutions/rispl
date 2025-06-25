"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

interface Section {
  title: string
  content: string
  icon: string
  items: string[]
}

interface AboutContent {
  _id?: string
  pageTitle: string
  pageSubtitle: string
  backgroundImage: string
  sections: Section[]
}

export default function AboutForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [formData, setFormData] = useState<AboutContent>({
    pageTitle: "",
    pageSubtitle: "",
    backgroundImage: "",
    sections: [],
  })

  // Available icons for sections
  const availableIcons = [
    "Building2",
    "PackageCheck",
    "Globe2",
    "Settings2",
    "Users",
    "Award",
    "Briefcase",
    "Target",
    "Lightbulb",
    "Shield",
    "Rocket",
    "Heart",
    "Star",
    "Zap",
  ]

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/about")
      const data = await res.json()

      if (data.success) {
        setFormData(data.data)
      } else {
        setError(data.message || "Failed to fetch about content")
      }
    } catch (error) {
      console.error("Error fetching about content:", error)
      setError("An error occurred while fetching about content")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSectionChange = (index: number, field: keyof Section, value: string) => {
    setFormData((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value,
      }
      return {
        ...prev,
        sections: updatedSections,
      }
    })
  }

  const handleItemChange = (sectionIndex: number, itemIndex: number, value: string) => {
    setFormData((prev) => {
      const updatedSections = [...prev.sections]
      const updatedItems = [...updatedSections[sectionIndex].items]
      updatedItems[itemIndex] = value
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        items: updatedItems,
      }
      return {
        ...prev,
        sections: updatedSections,
      }
    })
  }

  const addItem = (sectionIndex: number) => {
    setFormData((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        items: [...updatedSections[sectionIndex].items, ""],
      }
      return {
        ...prev,
        sections: updatedSections,
      }
    })
  }

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      const updatedSections = [...prev.sections]
      const updatedItems = [...updatedSections[sectionIndex].items]
      updatedItems.splice(itemIndex, 1)
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        items: updatedItems,
      }
      return {
        ...prev,
        sections: updatedSections,
      }
    })
  }

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "New Section",
          content: "Section content goes here",
          icon: "Building2",
          items: [],
        },
      ],
    }))
  }

  const removeSection = (index: number) => {
    if (!confirm("Are you sure you want to remove this section?")) return

    setFormData((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections.splice(index, 1)
      return {
        ...prev,
        sections: updatedSections,
      }
    })
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
          backgroundImage: data.url,
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
    if (!formData.pageTitle || !formData.pageSubtitle || !formData.backgroundImage) {
      setError("Page title, subtitle, and background image are required")
      return
    }

    if (formData.sections.length === 0) {
      setError("At least one section is required")
      return
    }

    for (const section of formData.sections) {
      if (!section.title || !section.content || !section.icon) {
        setError("All section fields are required")
        return
      }
    }

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess("About page content updated successfully")
        toast.success("About page content updated successfully")
      } else {
        setError(data.message || "Failed to update about page content")
        toast.error(data.message || "Failed to update about page content")
      }
    } catch (error) {
      console.error("Error updating about page content:", error)
      setError("An error occurred while updating about page content")
      toast.error("An error occurred while updating about page content")
    } finally {
      setSaving(false)
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
      <div className="p-6 border-b">
        <h2 className="text-xl font-poppins font-semibold text-gray-800">Edit About Page Content</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-md">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-500 rounded-md">{success}</div>}

        <div className="space-y-8">
          {/* Page Header Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Page Header</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-black font-roboto border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="About Us"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                <input
                  type="text"
                  name="pageSubtitle"
                  value={formData.pageSubtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 text-black font-roboto rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="Meet our experienced professionals dedicated to your success"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
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

          {/* Sections */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Content Sections</h3>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 text-sm text-blue-dark hover:text-blue-800"
              >
                <Plus className="h-4 w-4" />
                Add Section
              </button>
            </div>

            {formData.sections.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No sections added yet. Click "Add Section" to create one.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {formData.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-lg p-6 relative">
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => handleSectionChange(sectionIndex, "title", e.target.value)}
                          className="w-full px-4 py-2 border text-black font-roboto border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                          placeholder="Section Title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={section.icon}
                          onChange={(e) => handleSectionChange(sectionIndex, "icon", e.target.value)}
                          className="w-full px-4 py-2 text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                        >
                          {availableIcons.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(sectionIndex, "content", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 text-black font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                        placeholder="Section content"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Items List (Optional)</label>
                        <button
                          type="button"
                          onClick={() => addItem(sectionIndex)}
                          className="flex items-center gap-1 text-xs text-blue-dark hover:text-blue-800"
                        >
                          <Plus className="h-3 w-3" />
                          Add Item
                        </button>
                      </div>

                      {section.items.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No items added</p>
                      ) : (
                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleItemChange(sectionIndex, itemIndex, e.target.value)}
                                className="flex-1 text-black font-roboto px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-dark"
                                placeholder="Item text"
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(sectionIndex, itemIndex)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-dark text-white rounded-md hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
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

