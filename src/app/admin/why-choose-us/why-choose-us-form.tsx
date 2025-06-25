"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

interface Card {
  title: string
  description: string
  icon: string
  gradient: string
  delay: number
}

interface Accomplishment {
  text: string
}

interface WhyChooseUsContent {
  _id?: string
  pageTitle: string
  pageSubtitle: string
  backgroundImage: string
  cards: Card[]
  accomplishments: Accomplishment[]
}

export default function WhyChooseUsForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [formData, setFormData] = useState<WhyChooseUsContent>({
    pageTitle: "",
    pageSubtitle: "",
    backgroundImage: "",
    cards: [],
    accomplishments: [],
  })

  // Available icons for cards
  const availableIcons = [
    "Package",
    "Clock",
    "Lightbulb",
    "Users",
    "Shield",
    "CheckCircle2",
    "Award",
    "Briefcase",
    "Target",
    "Rocket",
    "Heart",
    "Star",
    "Zap",
  ]

  // Available gradients
  const availableGradients = [
    "from-[#012a54] to-[#005281]",
    "from-[#005281] to-[#0072a3]",
    "from-[#0072a3] to-[#bda03b]",
    "from-[#bda03b] to-[#EDC967]",
    "from-[#EDC967] to-[#012a54]",
  ]

  useEffect(() => {
    fetchWhyChooseUsContent()
  }, [])

  const fetchWhyChooseUsContent = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/why-choose-us")
      const data = await res.json()

      if (data.success) {
        setFormData(data.data)
      } else {
        setError(data.message || "Failed to fetch why-choose-us content")
      }
    } catch (error) {
      console.error("Error fetching why-choose-us content:", error)
      setError("An error occurred while fetching why-choose-us content")
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

  const handleCardChange = (index: number, field: keyof Card, value: string | number) => {
    setFormData((prev) => {
      const updatedCards = [...prev.cards]
      updatedCards[index] = {
        ...updatedCards[index],
        [field]: value,
      }
      return {
        ...prev,
        cards: updatedCards,
      }
    })
  }

  const handleAccomplishmentChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedAccomplishments = [...prev.accomplishments]
      updatedAccomplishments[index] = {
        ...updatedAccomplishments[index],
        text: value,
      }
      return {
        ...prev,
        accomplishments: updatedAccomplishments,
      }
    })
  }

  const addCard = () => {
    setFormData((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          title: "New Card",
          description: "Card description goes here",
          icon: "Package",
          gradient: "from-[#012a54] to-[#005281]",
          delay: 0.1,
        },
      ],
    }))
  }

  const removeCard = (index: number) => {
    if (!confirm("Are you sure you want to remove this card?")) return

    setFormData((prev) => {
      const updatedCards = [...prev.cards]
      updatedCards.splice(index, 1)
      return {
        ...prev,
        cards: updatedCards,
      }
    })
  }

  const addAccomplishment = () => {
    setFormData((prev) => ({
      ...prev,
      accomplishments: [
        ...prev.accomplishments,
        {
          text: "New accomplishment",
        },
      ],
    }))
  }

  const removeAccomplishment = (index: number) => {
    if (!confirm("Are you sure you want to remove this accomplishment?")) return

    setFormData((prev) => {
      const updatedAccomplishments = [...prev.accomplishments]
      updatedAccomplishments.splice(index, 1)
      return {
        ...prev,
        accomplishments: updatedAccomplishments,
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

    if (formData.cards.length === 0) {
      setError("At least one card is required")
      return
    }

    for (const card of formData.cards) {
      if (!card.title || !card.description || !card.icon || !card.gradient) {
        setError("All card fields are required")
        return
      }
    }

    if (formData.accomplishments.length === 0) {
      setError("At least one accomplishment is required")
      return
    }

    for (const accomplishment of formData.accomplishments) {
      if (!accomplishment.text) {
        setError("All accomplishment fields are required")
        return
      }
    }

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const res = await fetch("/api/admin/why-choose-us", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess("Why Choose Us page content updated successfully")
        toast.success("Why Choose Us page content updated successfully")
      } else {
        setError(data.message || "Failed to update Why Choose Us page content")
        toast.error(data.message || "Failed to update Why Choose Us page content")
      }
    } catch (error) {
      console.error("Error updating Why Choose Us page content:", error)
      setError("An error occurred while updating Why Choose Us page content")
      toast.error("An error occurred while updating Why Choose Us page content")
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
        <h2 className="text-xl font-semibold text-gray-800">Edit Why Choose Us Page Content</h2>
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
                  className="w-full px-4 py-2 border text-black font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="Why Choose Us"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                <input
                  type="text"
                  name="pageSubtitle"
                  value={formData.pageSubtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-black font-poppins border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                  placeholder="Our Packaging Solution protects your Product to scale up to Next Level"
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

          {/* Cards Section */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Cards</h3>
              <button
                type="button"
                onClick={addCard}
                className="flex items-center gap-2 text-sm text-blue-dark hover:text-blue-800"
              >
                <Plus className="h-4 w-4" />
                Add Card
              </button>
            </div>

            {formData.cards.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No cards added yet. Click "Add Card" to create one.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {formData.cards.map(
                  (card, cardIndex) =>
                    (
                      <div key={cardIndex} className="border rounded-lg p-6 relative">
                    <button
                      type="button"
                      onClick={() => removeCard(cardIndex)}
                      className="absolute top-4 right-4 p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => handleCardChange(cardIndex, "title", e.target.value)}
                          className="w-full px-4 py-2 text-black font-poppins border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                          placeholder="Card Title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={card.icon}
                          onChange={(e) => handleCardChange(cardIndex, "icon", e.target.value)}
                          className="w-full text-black font-poppins px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => handleCardChange(cardIndex, "description", e.target.value)}
                        rows={4}
                        className="w-full px-4 text-black font-poppins py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                        placeholder="Card description"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gradient</label>
                        <select
                          value={card.gradient}
                          onChange={(e) => handleCardChange(cardIndex, "gradient", e.target.value)}
                          className="w-full px-4 text-black font-poppins py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                        >
                          {availableGradients.map((gradient) => (
                            <option key={gradient} value={gradient}>
                              {gradient}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Animation Delay</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="1"
                          value={card.delay}
                          onChange={(e) => handleCardChange(cardIndex, "delay", Number.parseFloat(e.target.value))}
                          className="w-full text-black font-poppins px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                        />
                      </div>
                    </div>
                  </div>
                    ),
                )}
              </div>
            )}
          </div>

          {/* Accomplishments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Accomplishments</h3>
              <button
                type="button"
                onClick={addAccomplishment}
                className="flex items-center gap-2 text-sm text-blue-dark hover:text-blue-800"
              >
                <Plus className="h-4 w-4" />
                Add Accomplishment
              </button>
            </div>

            {formData.accomplishments.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No accomplishments added yet. Click "Add Accomplishment" to create one.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.accomplishments.map((accomplishment, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <textarea
                      value={accomplishment.text}
                      onChange={(e) => handleAccomplishmentChange(index, e.target.value)}
                      rows={2}
                      className="flex-1 px-4 text-black font-poppins py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-dark"
                      placeholder="Accomplishment text"
                    />
                    <button
                      type="button"
                      onClick={() => removeAccomplishment(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
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
            className="px-6 py-2 bg-gradient-gold  text-black rounded-xl hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
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

