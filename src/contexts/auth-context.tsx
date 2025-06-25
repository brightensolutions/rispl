"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface Admin {
  id: string
  email: string
}

interface AuthContextType {
  admin: Admin | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verify token on initial load
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/admin/verify")
        const data = await res.json()

        if (data.success) {
          setAdmin(data.admin)
        } else {
          setAdmin(null)
        }
      } catch (error) {
        console.error("Token verification error:", error)
        setAdmin(null)
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        // Refresh admin data
        const verifyRes = await fetch("/api/admin/verify")
        const verifyData = await verifyRes.json()

        if (verifyData.success) {
          setAdmin(verifyData.admin)
          // No need to redirect here, the component will handle it
        }
      }

      return data
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await fetch("/api/admin/logout", {
        method: "POST",
      })
      setAdmin(null)
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ admin, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

