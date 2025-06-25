import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isAdminPath = path.startsWith("/admin")
  const isLoginPath = path === "/admin/login"

  const token = request.cookies.get("admin_token")?.value

  // If trying to access protected route without token, redirect to login
  if (isAdminPath && !isLoginPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If trying to access login page with valid token, redirect to dashboard
  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: ["/admin/:path*"],
}

