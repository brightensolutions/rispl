"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, admin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (admin) {
      router.push("/admin/sliders");
    }
  }, [admin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
    } else {
      // Redirect to dashboard on successful login
      router.push("/admin/dashboard");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin h-10 w-10 text-blue-dark mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (admin) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-gold p-8  shadow-lg shadow-gold/20 w-full max-w-md rounded-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-nunito text-blue-dark">
            RISPL Admin
          </h1>
          <p className="text-gray-600 font-roboto mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-roboto font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border font-poppins text-black border-gray-300 rounded-[5px] outline-none focus:outline-none focus:ring-2 focus:ring-blue-dark"
              placeholder="admin@gmail.com"
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-poppins font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border font-poppins text-black border-gray-300 rounded-[5px] outline-none focus:outline-none focus:ring-2 focus:ring-blue-dark"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue hover:bg-blue/85 rounded-[5px] text-white font-medium py-2 px-4  transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
