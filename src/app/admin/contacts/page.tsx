"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "../dashboard-layout"
import ContactList from "./contact-list"
export default function ContactsPage() {
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
      <div className="">
        <h1 className="text-2xl font-bold text-white font-nunito mb-6">Contact Inquiries</h1>
        <ContactList />
      </div>
    </DashboardLayout>
  )
}

