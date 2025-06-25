"use client"

import { use } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/app/admin/dashboard-layout"
import TeamMemberForm from "../../team-member-form"

// Define the interface with Promise-based params
interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>
}

export default function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  // Use the 'use' hook to consume the Promise
  const resolvedParams = use(params)
  const memberId = resolvedParams.id

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
        <h1 className="text-2xl font-bold text-white font-nunito mb-6">Edit Team Member</h1>

        <TeamMemberForm memberId={memberId} />
      </div>
    </DashboardLayout>
  )
}

