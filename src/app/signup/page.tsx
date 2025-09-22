"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { AuthCard } from "@/components/AuthCard"
import { GoogleButton } from "@/components/GoogleButton"
import { doc, getDoc } from "firebase/firestore"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(cred.user, { displayName })
      }
      const snap = await getDoc(doc(db, "users", cred.user.uid))
      const enabled = Boolean(snap.get("totp.enabled"))
      router.push(enabled ? "/" : "/2fa")
    } catch (err: any) {
      setError(err?.message ?? "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  async function onGoogle() {
    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      const cred = await signInWithPopup(auth, provider)
      const snap = await getDoc(doc(db, "users", cred.user.uid))
      const enabled = Boolean(snap.get("totp.enabled"))
      router.push(enabled ? "/" : "/2fa")
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Create your account" subtitle="Join NukeX in minutes">
      <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm">Name</label>
            <input
              id="name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-white/15 p-2.5 outline-none focus:ring-2 focus:ring-purple-600/40"
            />
          </div>
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
            {loading ? "Creating..." : "Sign up"}
          </button>
      </form>
      <div className="py-3" />
      <GoogleButton onSuccess={() => router.push("/")} onError={setError} />
      <div className="flex items-center justify-between text-sm mt-4">
        <Link href="/login" className="underline">Already have an account?</Link>
      </div>
    </AuthCard>
  )
}


