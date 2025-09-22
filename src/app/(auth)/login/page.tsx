"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Link from "next/link"
import { auth } from "@/lib/firebase"
import { AuthCard } from "@/components/AuthCard"
import { GoogleButton } from "@/components/GoogleButton"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (err: any) {
      setError(err?.message ?? "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  async function onGoogle() {
    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/")
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Log in to your account">
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
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-white/15 p-2.5 outline-none focus:ring-2 focus:ring-purple-600/40"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-white text-black py-2.5 font-medium disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
      </form>
      <div className="py-3" />
      <GoogleButton onSuccess={() => router.push("/")} onError={setError} />
      <div className="flex items-center justify-between text-sm mt-4">
        <Link href="/signup" className="underline">Create account</Link>
        <Link href="/forgot-password" className="underline">Forgot password?</Link>
      </div>
    </AuthCard>
  )
}


