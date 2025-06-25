"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import DashboardLayout from "../dashboard-layout";
import WhyChooseUsForm from "./why-choose-us-form";

export default function WhyChooseUsPage() {
  const { admin, isLoading } = useAuth();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login");
    } else if (admin) {
      setPageLoading(false);
    }
  }, [admin, isLoading, router]);

  if (isLoading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-dark"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="">
        <h1 className="text-2xl font-bold text-white font-nunito mb-6">
          Manage Why Choose Us Page Content
        </h1>
        <WhyChooseUsForm />
      </div>
    </DashboardLayout>
  );
}
