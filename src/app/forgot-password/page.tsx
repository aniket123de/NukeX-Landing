"use client"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { AuthCard } from "@/components/AuthCard"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
    } catch (err: any) {
      setError(err?.message ?? "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Reset your password" subtitle="We'll email you a reset link">
      <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-white/15 p-2.5 outline-none focus:ring-2 focus:ring-purple-600/40"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          {sent && (
            <p className="text-sm text-green-400">Check your email for reset instructions.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-white text-black py-2.5 font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset email"}
          </button>
      </form>
      <div className="flex items-center justify-between text-sm mt-4">
        <Link href="/login" className="underline">Back to login</Link>
      </div>
    </AuthCard>
  )
}


