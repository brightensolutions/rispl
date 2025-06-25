"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProductCategoryFormProps {
  type: "equipment" | "consumables"
  categoryId?: string
  initialData?: any
}

export default function ProductCategoryForm({ type, categoryId, initialData }: ProductCategoryFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  const [category, setCategory] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    type: type,
    icon: type === "equipment" ? "Package2" : "Box",
    name: "",
    gallery: [] as string[],
    features: [] as string[],
    specifications: [] as { name: string; value: string }[],
    order: 0,
    isActive: true,
  })

  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      setCategory(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCategory((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
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

        if (field === "image") {
          setCategory((prev) => ({ ...prev, image: data.url }))
        } else if (field === "gallery" && index !== undefined) {
          setCategory((prev) => {
            const updatedGallery = [...prev.gallery]
            updatedGallery[index] = data.url
            return { ...prev, gallery: updatedGallery }
          })
        } else if (field === "gallery") {
          setCategory((prev) => ({ ...prev, gallery: [...prev.gallery, data.url] }))
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

  // Feature handlers
  const addFeature = () => {
    setCategory((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index: number) => {
    setCategory((prev) => {
      const updatedFeatures = [...prev.features]
      updatedFeatures.splice(index, 1)
      return { ...prev, features: updatedFeatures }
    })
  }

  const handleFeatureChange = (index: number, value: string) => {
    setCategory((prev) => {
      const updatedFeatures = [...prev.features]
      updatedFeatures[index] = value
      return { ...prev, features: updatedFeatures }
    })
  }

  // Specification handlers
  const addSpecification = () => {
    setCategory((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { name: "", value: "" }],
    }))
  }

  const removeSpecification = (index: number) => {
    setCategory((prev) => {
      const updatedSpecs = [...prev.specifications]
      updatedSpecs.splice(index, 1)
      return { ...prev, specifications: updatedSpecs }
    })
  }

  const handleSpecificationChange = (index: number, field: "name" | "value", value: string) => {
    setCategory((prev) => {
      const updatedSpecs = [...prev.specifications]
      updatedSpecs[index][field] = value
      return { ...prev, specifications: updatedSpecs }
    })
  }

  // Gallery handlers
  const addGalleryImage = () => {
    setCategory((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ""],
    }))
  }

  const removeGalleryImage = (index: number) => {
    setCategory((prev) => {
      const updatedGallery = [...prev.gallery]
      updatedGallery.splice(index, 1)
      return { ...prev, gallery: updatedGallery }
    })
  }

  const handleGalleryChange = (index: number, value: string) => {
    setCategory((prev) => {
      const updatedGallery = [...prev.gallery]
      updatedGallery[index] = value
      return { ...prev, gallery: updatedGallery }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)

    // Validate form
    if (
      !category.id ||
      !category.title ||
      !category.description ||
      !category.image ||
      !category.icon ||
      !category.name
    ) {
      setError("Please fill in all required fields")
      setSubmitting(false)
      return
    }

    if (category.gallery.length === 0) {
      setError("At least one gallery image is required")
      setSubmitting(false)
      return
    }

    try {
      const url = categoryId ? `/api/admin/products/categories/${categoryId}` : "/api/admin/products/categories"
      const method = categoryId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })

      if (response.ok) {
        setSuccess(categoryId ? "Category updated successfully" : "Category created successfully")

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/products")
        }, 1500)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save category")
      }
    } catch (error) {
      setError("An error occurred while saving the category")
    } finally {
      setSubmitting(false)
    }
  }

  const iconOptions =
    type === "equipment"
      ? ["Package2", "Box", "Combine", "Forklift", "Settings", "MoveHorizontal"]
      : ["Box", "Film", "Layers", "Shield", "SquareStack"]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow">
      {error && <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>}
      {success && <div className="bg-green-50 text-green-500 p-4 rounded-md">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="id">Category ID</Label>
          <Input
            id="id"
            name="id"
            value={category.id}
            onChange={handleInputChange}
            placeholder="e.g., pet-strap"
            disabled={!!categoryId}
            required
          />
          <p className="text-sm text-gray-500 mt-1">Used in URLs and as a unique identifier</p>
        </div>

        <div>
          <Label htmlFor="title">Category Title</Label>
          <Input
            id="title"
            name="title"
            value={category.title}
            onChange={handleInputChange}
            placeholder="e.g., PET Strap"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="name">Product Name (Full Name)</Label>
        <Input
          id="name"
          name="name"
          value={category.name}
          onChange={handleInputChange}
          placeholder="e.g., PET (Polyster Polyethylene Terephthalate) Strapping"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={category.description}
          onChange={handleInputChange}
          rows={5}
          placeholder="Detailed description of the product"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select  value={category.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
            <SelectTrigger className="text-black">
              <SelectValue className="text-black" placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden">
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" name="order" type="number" value={category.order} onChange={handleNumberChange} />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Category Image (Card Image)</Label>
        <div className="flex items-center space-x-4">
          <Input
            id="image"
            name="image"
            value={category.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            readOnly
            required
          />
          <div className="relative">
            <input
              type="file"
              id="imageUpload"
              className="sr-only"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "image")}
            />
            <label
              htmlFor="imageUpload"
              className="inline-flex items-center justify-center h-10 px-4 py-2 bg-blue-dark text-white rounded-md cursor-pointer"
            >
              {uploadingImage === "image" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Upload
            </label>
          </div>
        </div>
        {category.image && (
          <div className="mt-2">
            <div className="relative h-40 w-full rounded-md overflow-hidden">
              <Image src={category.image || "/placeholder.svg"} alt="Category preview" fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Gallery Images */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Gallery Images</Label>
          <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" type="button" onClick={addGalleryImage} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Image
          </Button>
        </div>

        {category.gallery.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No gallery images added yet. Add at least one image.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {category.gallery.map((image, index) => (
              <div key={index} className="flex items-start gap-4 border p-4 rounded-lg">
                <div className="flex-1">
                  <Label htmlFor={`gallery-${index}`}>Image URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`gallery-${index}`}
                      value={image}
                      onChange={(e) => handleGalleryChange(index, e.target.value)}
                      placeholder="Image URL"
                      required
                      readOnly
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id={`galleryUpload-${index}`}
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "gallery", index)}
                      />
                      <label
                        htmlFor={`galleryUpload-${index}`}
                        className="inline-flex items-center justify-center h-10 px-4 py-2 bg-blue-dark text-white rounded-md cursor-pointer"
                      >
                        {uploadingImage === `gallery-${index}` ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Upload className="h-4 w-4 mr-2" />
                        )}
                        Upload
                      </label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGalleryImage(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {image && (
                  <div className="w-24 h-24 relative rounded overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Features</Label>
          <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" type="button" onClick={addFeature} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Feature
          </Button>
        </div>

        {category.features.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No features added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {category.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Feature description"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specifications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Specifications</Label>
          <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" type="button" onClick={addSpecification} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Specification
          </Button>
        </div>

        {category.specifications.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No specifications added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {category.specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <Input
                    value={spec.name}
                    onChange={(e) => handleSpecificationChange(index, "name", e.target.value)}
                    placeholder="Specification name"
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                    placeholder="Specification value"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={category.isActive}
          onChange={handleCheckboxChange}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="isActive">Active (visible on website)</Label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" type="button" variant="outline" onClick={() => router.push("/admin/products")} disabled={submitting}>
          Cancel
        </Button>
        <Button className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-gold text-black rounded-xl cursor-pointer" type="submit" disabled={submitting} >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : categoryId ? (
            "Update Category"
          ) : (
            "Create Category"
          )}
        </Button>
      </div>
    </form>
  )
}

