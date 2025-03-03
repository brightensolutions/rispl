import { notFound } from "next/navigation"
import ServiceDetail from "@/components/modern-service-layout"
import { servicesData } from "@/lib/services-data"

// Define the params type for Next.js 15
interface ServicePageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Await the params
  const { category } = await params

  // Find service data
  const service = servicesData.find((s) => s.slug === category)

  if (!service) {
    notFound()
  }

  return <ServiceDetail service={service} />
}

// Add metadata generation
export async function generateMetadata({ params }: ServicePageProps) {
  const { category } = await params
  const service = servicesData.find((s) => s.slug === category)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

// Static params generation remains the same
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    category: service.slug,
  }))
}

