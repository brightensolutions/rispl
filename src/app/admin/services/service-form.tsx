"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import type { ServiceFeature,ServiceImage, ServiceSection } from "@/lib/Models/service"

interface ServiceFormProps {
  serviceId?: string
}

export default function ServiceForm({ serviceId }: ServiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  const [service, setService] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    headerImage: "",
    order: 0,
    isActive: true,
    sections: [] as ServiceSection[],
  })

  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
      return
    }

    if (admin && serviceId) {
      const fetchService = async () => {
        setLoading(true)
        try {
          const response = await fetch(`/api/admin/services/${serviceId}`)

          if (response.ok) {
            const data = await response.json()
            setService(data)
          } else {
            setError("Failed to fetch service")
          }
        } catch (error) {
          setError("An error occurred while fetching the service")
        } finally {
          setLoading(false)
        }
      }

      fetchService()
    }
  }, [serviceId, isLoading, admin, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setService((prev) => ({ ...prev, [name]: value }))
  }

  // Auto-generate slug from title if slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setService((prev) => ({
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
    setService((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setService((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  // Section handlers
  const addSection = () => {
    setService((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "New Section",
          description: "Section description",
          features: [],
          images: [],
        },
      ],
    }))
  }

  const removeSection = (index: number) => {
    if (!confirm("Are you sure you want to remove this section?")) return

    setService((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections.splice(index, 1)
      return { ...prev, sections: updatedSections }
    })
  }

  const handleSectionChange = (index: number, field: keyof ServiceSection, value: string) => {
    setService((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value,
      }
      return { ...prev, sections: updatedSections }
    })
  }

  // Feature handlers
  const addFeature = (sectionIndex: number) => {
    setService((prev) => {
      const updatedSections = [...prev.sections]
      if (!updatedSections[sectionIndex].features) {
        updatedSections[sectionIndex].features = []
      }
      updatedSections[sectionIndex].features!.push({
        title: "New Feature",
        description: "Feature description",
        image: "",
      })
      return { ...prev, sections: updatedSections }
    })
  }

  const removeFeature = (sectionIndex: number, featureIndex: number) => {
    if (!confirm("Are you sure you want to remove this feature?")) return

    setService((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].features!.splice(featureIndex, 1)
      return { ...prev, sections: updatedSections }
    })
  }

  const handleFeatureChange = (
    sectionIndex: number,
    featureIndex: number,
    field: keyof ServiceFeature,
    value: string,
  ) => {
    setService((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].features![featureIndex] = {
        ...updatedSections[sectionIndex].features![featureIndex],
        [field]: value,
      }
      return { ...prev, sections: updatedSections }
    })
  }

  // Image handlers
  const addImage = (sectionIndex: number) => {
    setService((prev) => {
      const updatedSections = [...prev.sections]
      if (!updatedSections[sectionIndex].images) {
        updatedSections[sectionIndex].images = []
      }
      updatedSections[sectionIndex].images!.push({
        src: "",
        alt: "Image description",
      })
      return { ...prev, sections: updatedSections }
    })
  }

  const removeImage = (sectionIndex: number, imageIndex: number) => {
    if (!confirm("Are you sure you want to remove this image?")) return

    setService((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].images!.splice(imageIndex, 1)
      return { ...prev, sections: updatedSections }
    })
  }

  const handleImageChange = (sectionIndex: number, imageIndex: number, field: keyof ServiceImage, value: string) => {
    setService((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].images![imageIndex] = {
        ...updatedSections[sectionIndex].images![imageIndex],
        [field]: value,
      }
      return { ...prev, sections: updatedSections }
    })
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    sectionIndex?: number,
    featureIndex?: number,
    imageIndex?: number,
  ) => {
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

        if (sectionIndex !== undefined && featureIndex !== undefined) {
          // Feature image
          handleFeatureChange(sectionIndex, featureIndex, "image", data.url)
        } else if (sectionIndex !== undefined && imageIndex !== undefined) {
          // Section image
          handleImageChange(sectionIndex, imageIndex, "src", data.url)
        } else {
          // Header image
          setService((prev) => ({ ...prev, [field]: data.url }))
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
    if (!service.title || !service.slug || !service.subtitle || !service.description) {
      setError("Please fill in all required fields")
      setSubmitting(false)
      return
    }

    if (!service.headerImage) {
      setError("Header image is required")
      setSubmitting(false)
      return
    }

    if (service.sections.length === 0) {
      setError("At least one section is required")
      setSubmitting(false)
      return
    }

    for (const section of service.sections) {
      if (!section.title || !section.description) {
        setError("All section fields are required")
        setSubmitting(false)
        return
      }

      if (section.features && section.features.length > 0) {
        for (const feature of section.features) {
          if (!feature.title || !feature.description || !feature.image) {
            setError("All feature fields are required")
            setSubmitting(false)
            return
          }
        }
      }

      if (section.images && section.images.length > 0) {
        for (const image of section.images) {
          if (!image.src || !image.alt) {
            setError("All image fields are required")
            setSubmitting(false)
            return
          }
        }
      }
    }

    try {
      const url = serviceId ? `/api/admin/services/${serviceId}` : "/api/admin/services"
      const method = serviceId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      })

      if (response.ok) {
        setSuccess(serviceId ? "Service updated successfully" : "Service created successfully")

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/services")
        }, 1500)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save service")
      }
    } catch (error) {
      setError("An error occurred while saving the service")
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || (loading && serviceId)) {
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
        <h3 className="text-lg font-medium mb-4 text-black">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              name="title"
              value={service.title}
              onChange={handleTitleChange}
              placeholder="e.g., Warehouse Solutions"
              className="text-black font-poppins"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL-friendly name)</Label>
            <Input
              id="slug"
              name="slug"
              value={service.slug}
              onChange={handleInputChange}
              placeholder="e.g., warehouse-solutions"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Used in the URL: /solutions/[slug]</p>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={service.subtitle}
            onChange={handleInputChange}
            placeholder="e.g., Advanced storage and management systems"
            required
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={service.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Detailed description of the service"
            required
          />
        </div>

        <div className="hidden grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" name="order" type="number" value={service.order} onChange={handleNumberChange} />
          </div>

          <div className="flex items-center space-x-2 mt-8">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={service.isActive}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isActive">Active (visible on website)</Label>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="headerImage">Header Background Image</Label>
          <div className="flex items-center space-x-4">
            <Input
              id="headerImage"
              name="headerImage"
              value={service.headerImage}
              onChange={handleInputChange}
              placeholder="Image URL"
              readOnly
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
          {service.headerImage && (
            <div className="mt-2">
              <div className="relative h-40 w-full rounded-md overflow-hidden">
                <Image
                  src={service.headerImage || "/placeholder.svg"}
                  alt="Header preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sections */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Sections</h3>
          <Button  className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" type="button" onClick={addSection} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Section
          </Button>
        </div>

        {service.sections.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No sections added yet. Click "Add Section" to create one.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {service.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border rounded-lg p-6 relative">
                <Button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <h4 className="font-medium mb-4 text-black">Section {sectionIndex + 1}</h4>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor={`section-${sectionIndex}-title`}>Title</Label>
                    <Input
                      id={`section-${sectionIndex}-title`}
                      value={section.title}
                      onChange={(e) => handleSectionChange(sectionIndex, "title", e.target.value)}
                      placeholder="e.g., Our Warehouse Solutions"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`section-${sectionIndex}-description`}>Description</Label>
                    <Textarea
                      id={`section-${sectionIndex}-description`}
                      value={section.description}
                      onChange={(e) => handleSectionChange(sectionIndex, "description", e.target.value)}
                      rows={3}
                      placeholder="Section description"
                      required
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-medium text-black">Features</h5>
                    <Button
                      type="button"
                      onClick={() => addFeature(sectionIndex)}
                      variant="outline"
                      size="sm"
                    className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Feature
                    </Button>
                  </div>

                  {!section.features || section.features.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-sm">No features added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="border rounded-lg p-4 relative">
                          <Button
                            type="button"
                            onClick={() => removeFeature(sectionIndex, featureIndex)}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`feature-${sectionIndex}-${featureIndex}-title`} className="text-sm">
                                Title
                              </Label>
                              <Input
                                id={`feature-${sectionIndex}-${featureIndex}-title`}
                                value={feature.title}
                                onChange={(e) =>
                                  handleFeatureChange(sectionIndex, featureIndex, "title", e.target.value)
                                }
                                placeholder="Feature title"
                                className="text-sm"
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor={`feature-${sectionIndex}-${featureIndex}-image`} className="text-sm">
                                Image
                              </Label>
                              <div className="flex items-center space-x-2">
                                <Input
                                  id={`feature-${sectionIndex}-${featureIndex}-image`}
                                  value={feature.image}
                                  onChange={(e) =>
                                    handleFeatureChange(sectionIndex, featureIndex, "image", e.target.value)
                                  }
                                  placeholder="Image URL"
                                  className="text-sm"
                                  required
                                />
                                <div className="relative">
                                  <input
                                    type="file"
                                    id={`feature-${sectionIndex}-${featureIndex}-image-upload`}
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(
                                        e,
                                        `feature-${sectionIndex}-${featureIndex}-image`,
                                        sectionIndex,
                                        featureIndex,
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`feature-${sectionIndex}-${featureIndex}-image-upload`}
                                    className="inline-flex items-center justify-center h-8 px-3 py-1 bg-blue-dark text-white rounded-md cursor-pointer text-xs"
                                  >
                                    {uploadingImage === `feature-${sectionIndex}-${featureIndex}-image` ? (
                                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                    ) : (
                                      <Upload className="h-3 w-3 mr-1" />
                                    )}
                                    Upload
                                  </label>
                                </div>
                              </div>
                              {feature.image && (
                                <div className="mt-2">
                                  <div className="relative h-20 w-full rounded-md overflow-hidden">
                                    <Image
                                      src={feature.image || "/placeholder.svg"}
                                      alt={feature.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <Label htmlFor={`feature-${sectionIndex}-${featureIndex}-description`} className="text-sm">
                              Description
                            </Label>
                            <Textarea
                              id={`feature-${sectionIndex}-${featureIndex}-description`}
                              value={feature.description}
                              onChange={(e) =>
                                handleFeatureChange(sectionIndex, featureIndex, "description", e.target.value)
                              }
                              rows={2}
                              placeholder="Feature description"
                              className="text-sm"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Images */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-medium">Gallery Images</h5>
                    <Button
                      type="button"
                      onClick={() => addImage(sectionIndex)}
                      variant="outline"
                      size="sm"
                       className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" 
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Image
                    </Button>
                  </div>

                  {!section.images || section.images.length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-sm">No gallery images added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.images.map((image, imageIndex) => (
                        <div key={imageIndex} className="border rounded-lg p-4 relative">
                          <Button
                            type="button"
                            onClick={() => removeImage(sectionIndex, imageIndex)}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`image-${sectionIndex}-${imageIndex}-src`} className="text-sm">
                                Image URL
                              </Label>
                              <div className="flex items-center space-x-2">
                                <Input
                                  id={`image-${sectionIndex}-${imageIndex}-src`}
                                  value={image.src}
                                  onChange={(e) => handleImageChange(sectionIndex, imageIndex, "src", e.target.value)}
                                  placeholder="Image URL"
                                  className="text-sm"
                                  required
                                />
                                <div className="relative">
                                  <input
                                    type="file"
                                    id={`image-${sectionIndex}-${imageIndex}-upload`}
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(
                                        e,
                                        `image-${sectionIndex}-${imageIndex}-src`,
                                        sectionIndex,
                                        undefined,
                                        imageIndex,
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`image-${sectionIndex}-${imageIndex}-upload`}
                                    className="inline-flex items-center justify-center h-8 px-3 py-1 bg-blue-dark text-white rounded-md cursor-pointer text-xs"
                                  >
                                    {uploadingImage === `image-${sectionIndex}-${imageIndex}-src` ? (
                                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                    ) : (
                                      <Upload className="h-3 w-3 mr-1" />
                                    )}
                                    Upload
                                  </label>
                                </div>
                              </div>
                              {image.src && (
                                <div className="mt-2">
                                  <div className="relative h-20 w-full rounded-md overflow-hidden">
                                    <Image
                                      src={image.src || "/placeholder.svg"}
                                      alt={image.alt}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <Label htmlFor={`image-${sectionIndex}-${imageIndex}-alt`} className="text-sm">
                                Alt Text
                              </Label>
                              <Input
                                id={`image-${sectionIndex}-${imageIndex}-alt`}
                                value={image.alt}
                                onChange={(e) => handleImageChange(sectionIndex, imageIndex, "alt", e.target.value)}
                                placeholder="Image description"
                                className="text-sm"
                                required
                              />
                            </div>
                          </div>
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

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline"  className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" onClick={() => router.push("/admin/services")} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : serviceId ? (
            "Update Service"
          ) : (
            "Create Service"
          )}
        </Button>
      </div>
    </form>
  )
}

