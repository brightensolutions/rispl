import { notFound } from "next/navigation"
import ServiceDetail from "@/components/modern-service-layout"
import { servicesData } from "@/lib/services-data"

interface ServicePageProps {
  params: {
    category: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.category)

  if (!service) {
    notFound()
  }

  return <ServiceDetail service={service} />
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    category: service.slug,
  }))
}

