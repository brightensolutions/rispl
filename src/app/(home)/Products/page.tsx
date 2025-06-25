import { redirect } from "next/navigation"

export default function ProductsPage() {
  // Redirect to equipment page by default
  redirect("/Products/equipment")
}

