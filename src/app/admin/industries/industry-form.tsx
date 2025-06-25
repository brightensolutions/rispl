"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, Upload, ArrowRight } from "lucide-react"
import Image from "next/image"
import type { ServiceCard } from "@/lib/Models/industry"

interface IndustryFormProps {
  industryId?: string
}

export default function IndustryForm({ industryId }: IndustryFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  const [industry, setIndustry] = useState({
    title: "",
    slug: "",
    description: "", // SEO description
    shortDescription: "", // For menu
    headerImage: "",
    pageTitle: "",
    pageSubtitle: "",
    mainTitle: "",
    highlightedTitle: "",
    mainDescription: "",
    bottomDescription: "",
    buttonText: "Get Started",
    cards: [] as ServiceCard[],
    order: 0,
    isActive: true,
  })

  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin && industryId) {
      const fetchIndustry = async () => {
        setLoading(true)
        try {
          const response = await fetch(`/api/admin/industries/${industryId}`)

          if (response.ok) {
            const data = await response.json()
            setIndustry(data)
          } else {
            setError("Failed to fetch industry")
          }
        } catch (error) {
          setError("An error occurred while fetching the industry")
        } finally {
          setLoading(false)
        }
      }

      fetchIndustry()
    }
  }, [industryId, isLoading, admin, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setIndustry((prev) => ({ ...prev, [name]: value }))
  }

  // Auto-generate slug from title if slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setIndustry((prev) => ({
      ...prev,
      title: value,
      // Only auto-generate slug if it's empty or if it was auto-generated before
      slug:
        prev.slug === "" ||
        prev.slug ===
          prev.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
          ? value
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
          : prev.slug,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setIndustry((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setIndustry((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleCardChange = (index: number, field: keyof ServiceCard, value: string) => {
    setIndustry((prev) => {
      const updatedCards = [...prev.cards]
      updatedCards[index] = {
        ...updatedCards[index],
        [field]: value,
      }
      return { ...prev, cards: updatedCards }
    })
  }

  const addCard = () => {
    setIndustry((prev) => ({
      ...prev,
      cards: [...prev.cards, { image: "", title: "", description: "" }],
    }))
  }

  const removeCard = (index: number) => {
    if (!confirm("Are you sure you want to remove this card?")) return

    setIndustry((prev) => {
      const updatedCards = [...prev.cards]
      updatedCards.splice(index, 1)
      return { ...prev, cards: updatedCards }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, cardIndex?: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed")
      return
    }

    setUploadingImage(field)
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Upload image to blob storage
      const response = await fetch("/api/admin/industries-upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()

        if (cardIndex !== undefined) {
          handleCardChange(cardIndex, "image", data.url)
        } else {
          setIndustry((prev) => ({ ...prev, [field]: data.url }))
        }
      } else {
        setError("Failed to upload image")
      }
    } catch (error) {
      setError("An error occurred while uploading the image")
    } finally {
      setUploadingImage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)

    // Validate form
    if (!industry.title || !industry.slug || !industry.pageTitle || !industry.pageSubtitle) {
      setError("Please fill in all required fields")
      setSubmitting(false)
      return
    }

    if (!industry.headerImage) {
      setError("Header image is required")
      setSubmitting(false)
      return
    }

    if (industry.cards.length === 0) {
      setError("At least one service card is required")
      setSubmitting(false)
      return
    }

    for (const card of industry.cards) {
      if (!card.title || !card.description || !card.image) {
        setError("All card fields are required")
        setSubmitting(false)
        return
      }
    }

    try {
      const url = industryId ? `/api/admin/industries/${industryId}` : "/api/admin/industries"
      const method = industryId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(industry),
      })

      if (response.ok) {
        setSuccess(industryId ? "Industry updated successfully" : "Industry created successfully")

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/industries")
        }, 1500)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save industry")
      }
    } catch (error) {
      setError("An error occurred while saving the industry")
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || (loading && industryId)) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow">
      {error && <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>}
      {success && <div className="bg-green-50 text-green-500 p-4 rounded-md">{success}</div>}

      <div className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4 text-black font-poppins">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title" className="font-poppins text-black">Industry Title</Label>
            <Input
              id="title"
              name="title"
              value={industry.title}
              onChange={handleTitleChange}
              placeholder="e.g., FMCG Packaging Solutions"
              className="font-poppins text-black"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug" className="font-poppins text-black">Slug (URL-friendly name)</Label>
            <Input
              id="slug"
              name="slug"
              value={industry.slug}
              onChange={handleInputChange}
              placeholder="e.g., fmcg-packaging"
              required
              className="font-poppins text-black"
            />
            <p className="text-sm text-gray-500 mt-1">Used in the URL: /industries/[slug]</p>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="shortDescription" className="font-poppins text-black">Short Description (for menu)</Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            value={industry.shortDescription}
            onChange={handleInputChange}
            placeholder="Brief description for navigation menu"
             className="font-poppins text-black"
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="description"  className="font-poppins text-black">Full Description (SEO)</Label>
          <Textarea
            id="description"
            name="description"
            value={industry.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Detailed description for SEO purposes"
             className="font-poppins text-black"
            required
          />
        </div>

        <div className=" grid-cols-1 md:grid-cols-2 gap-6 mt-4 hidden">
          <div className="hidden">
            <Label htmlFor="order"  className="font-poppins text-black">Display Order</Label>
            <Input id="order" name="order" type="number"  className="font-poppins text-black" value={industry.order} onChange={handleNumberChange} />
          </div>

          <div className="flex items-center space-x-2 mt-8 ">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={industry.isActive}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isActive">Active (visible on website)</Label>
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h3  className="font-poppins text-black">Page Header</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="pageTitle" className="font-poppins text-black">Page Title</Label>
            <Input
              id="pageTitle"
              name="pageTitle"
              value={industry.pageTitle}
              onChange={handleInputChange}
              placeholder="e.g., FMCG Packaging Solutions"
              className="font-poppins text-black"
              required
            />
          </div>

          <div>
            <Label htmlFor="pageSubtitle" className="font-poppins text-black">Page Subtitle</Label>
            <Input
              id="pageSubtitle"
              name="pageSubtitle"
              value={industry.pageSubtitle}
              onChange={handleInputChange}
              placeholder="e.g., Innovative Solutions for Fast-Moving Consumer Goods"
              className="font-poppins text-black" 
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="headerImage" className="font-poppins text-black">Header Background Image</Label>
          <div className="flex items-center space-x-4">
            <Input
              id="headerImage"
              name="headerImage"
              value={industry.headerImage}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="font-poppins text-black"
              required
            />
            <div className="relative">
              <input
                type="file"
                id="headerImageUpload"
                className="sr-only"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "headerImage")}
              />
              <label
                htmlFor="headerImageUpload"
                className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer"
              >
                {uploadingImage === "headerImage" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Upload
              </label>
            </div>
          </div>
          {industry.headerImage && (
            <div className="mt-2">
              <div className="relative h-40 w-full rounded-md overflow-hidden">
                <Image
                  src={industry.headerImage || "/placeholder.svg"}
                  alt="Header preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4 text-black font-poppins">Content Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="mainTitle" className="font-poppins text-black">Main Title</Label>
            <Input
              id="mainTitle"
              name="mainTitle"
              value={industry.mainTitle}
              onChange={handleInputChange}
              placeholder="e.g., FMCG"
              required
              className="font-poppins text-black"
            />
            <p className="text-sm  mt-1 ont-poppins text-black">First part of the title (regular style)</p>
          </div>

          <div>
            <Label htmlFor="highlightedTitle">Highlighted Title</Label>
            <Input
              id="highlightedTitle"
              name="highlightedTitle"
              value={industry.highlightedTitle}
              onChange={handleInputChange}
              placeholder="e.g., Packaging Solutions"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Second part of the title (highlighted in gold)</p>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="mainDescription" className="font-poppins text-black">Main Description</Label>
          <Textarea
            id="mainDescription"
            name="mainDescription"
            value={industry.mainDescription}
            onChange={handleInputChange}
            rows={4}
            placeholder="Main description text that appears at the top of the content section"
            required
            className="font-poppins text-black"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="bottomDescription" className="font-poppins text-black">Bottom Description</Label>
          <Textarea
            id="bottomDescription"
            name="bottomDescription"
            value={industry.bottomDescription}
            onChange={handleInputChange}
            rows={4}
            placeholder="Description text that appears at the bottom of the content section"
            required
            className="font-poppins text-black"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="buttonText" className="font-poppins text-black">Button Text</Label>
          <Input
            id="buttonText"
            name="buttonText"
            value={industry.buttonText}
            onChange={handleInputChange}
            placeholder="e.g., Get Started"
            required
            className="font-poppins text-black"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Service Cards</h3>
          <Button className="font-poppins text-black bg-gradient-gold rounded-xl hover:text-black"  type="button" onClick={addCard} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Card
          </Button>
        </div>

        {/* Card Preview Section */}
        {industry.cards.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Preview of Service Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {industry.cards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                  {card.image && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={card.image || "/placeholder.svg"}
                        alt={card.title || `Card ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-blue-dark font-medium">{card.title || `Card ${index + 1}`}</h3>
                    <p className="text-gray-600 text-sm mt-1">{card.description || "Card description"}</p>
                    <div className="mt-3 flex items-center text-blue-dark">
                      <span className="text-sm font-medium">Let's Connect</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {industry.cards.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No cards added yet. Click "Add Card" to create one.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {industry.cards.map((card, index) => (
              <div key={index} className="border rounded-lg p-6 relative">
                <Button
                  type="button"
                  onClick={() => removeCard(index)}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <h4 className="font-medium mb-4 text-black font-poppins">Card {index + 1}</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-poppins text-black" htmlFor={`card-${index}-title`}>Title</Label>
                    <Input
                      id={`card-${index}-title`}
                      value={card.title}
                      onChange={(e) => handleCardChange(index, "title", e.target.value)}
                      placeholder="e.g., Personal Care Products"
                      required
                      className="font-poppins text-black"
                    />
                  </div>

                  <div>
                    <Label className="font-poppins text-black" htmlFor={`card-${index}-image`}>Image</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id={`card-${index}-image`}
                        value={card.image}
                        onChange={(e) => handleCardChange(index, "image", e.target.value)}
                        placeholder="Image URL"
                        required
                        readOnly
                        className="font-poppins text-black"
                      />
                      <div className="relative">
                        <input
                          type="file"
                          id={`card-${index}-image-upload`}
                          className="sr-only"
                          accept="image/*"
                         
                          onChange={(e) => handleImageUpload(e, `card-${index}-image`, index)}
                        />
                        <label
                          htmlFor={`card-${index}-image-upload`}
                         className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer"
                        >
                          {uploadingImage === `card-${index}-image` ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Upload className="h-4 w-4 mr-2" />
                          )}
                          Upload
                        </label>
                      </div>
                    </div>
                    {card.image && (
                      <div className="mt-2">
                        <div className="relative h-32 w-full rounded-md overflow-hidden">
                          <Image
                            src={card.image || "/placeholder.svg"}
                            alt={card.title || "Card preview"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor={`card-${index}-description`} className="font-poppins text-black">Description</Label>
                  <Textarea
                    id={`card-${index}-description`}
                    value={card.description}
                    onChange={(e) => handleCardChange(index, "description", e.target.value)}
                    rows={3}
                    placeholder="e.g., Premium packaging solutions for personal care items"
                    required
                    className="font-poppins text-black"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" variant="outline" onClick={() => router.push("/admin/industries")} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : industryId ? (
            "Update Industry"
          ) : (
            "Create Industry"
          )}
        </Button>
      </div>
    </form>
  )
}

