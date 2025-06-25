"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardLayout from "../../dashboard-layout"
import IndustryForm from "../industry-form"
import { Loader2 } from "lucide-react"

export default function NewIndustryPage() {
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
        <h1  className="text-2xl font-bold text-white font-nunito mb-6">Add New Industry</h1>        

        <IndustryForm />
      </div>
    </DashboardLayout>
  )
}

