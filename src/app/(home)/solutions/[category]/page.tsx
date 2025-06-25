import { notFound } from "next/navigation"
import ServiceDetail from "@/components/modern-service-layout"
import connectDb from "@/lib/db/db"
import Service from "@/lib/Models/service"
import type { Metadata } from "next"

// Update the interface to use Promise for params
interface ServicePageProps {
  params: Promise<{ category: string }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params

  await connectDb()

  // Decode the URL slug to handle spaces and special characters
  const decodedSlug = decodeURIComponent(resolvedParams.category)

  try {
    // Try to find the service by slug (exact match)
    let service = await Service.findOne({
      slug: decodedSlug,
      isActive: true,
    })

    // If not found, try a case-insensitive search
    if (!service) {
      service = await Service.findOne({
        slug: { $regex: new RegExp(`^${decodedSlug}$`, "i") },
        isActive: true,
      })
    }

    if (!service) {
      console.log(`Service not found for slug: ${decodedSlug}`)
      notFound()
    }

    // Convert Mongoose document to plain object to avoid hydration issues
    const serviceData = JSON.parse(JSON.stringify(service.toObject ? service.toObject() : service))

    return <ServiceDetail service={serviceData} />
  } catch (error) {
    console.error("Error fetching service:", error)
    notFound()
  }
}

// Update generateMetadata to also await the params Promise
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  // Await the params Promise
  const resolvedParams = await params

  try {
    await connectDb()
    const decodedSlug = decodeURIComponent(resolvedParams.category)

    const service = await Service.findOne({
      slug: decodedSlug,
      isActive: true,
    })

    if (!service) {
      return {
        title: "Service Not Found",
      }
    }

    return {
      title: service.title,
      description: service.description,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Service",
      description: "Service details",
    }
  }
}

// Static params generation remains the same
export async function generateStaticParams() {
  try {
    await connectDb()
    const services = await Service.find({ isActive: true }).select("slug")

    return services.map((service) => ({
      category: service.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

