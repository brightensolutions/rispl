"use client"

import { use } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardLayout from "@/app/admin/dashboard-layout"
import IndustryForm from "../../industry-form"
import { Loader2 } from 'lucide-react'

// Define the interface with Promise-based params
interface EditIndustryPageProps {
  params: Promise<{ id: string }>
}

export default function EditIndustryPage({ params }: EditIndustryPageProps) {
  // Use the 'use' hook to consume the Promise
  const resolvedParams = use(params)
  
  const { admin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
    }
  }, [isLoading, admin, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Industry</h1>
        <IndustryForm industryId={resolvedParams.id} />
      </div>
    </DashboardLayout>
  )
}
