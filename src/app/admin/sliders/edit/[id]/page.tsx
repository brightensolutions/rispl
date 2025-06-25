"use client"

import { use } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/app/admin/dashboard-layout"
import SliderForm from "../../slider-form"

// Define the interface with Promise-based params
interface EditSliderPageProps {
  params: Promise<{ id: string }>
}

export default function EditSliderPage({ params }: EditSliderPageProps) {
  // Use the 'use' hook to consume the Promise
  const resolvedParams = use(params)
  const sliderId = resolvedParams.id

  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, isLoading, router])

  if (isLoading || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-dark"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-white font-nunito mb-6">Edit Slider</h1>

        <SliderForm sliderId={sliderId} />
      </div>
    </DashboardLayout>
  )
}

