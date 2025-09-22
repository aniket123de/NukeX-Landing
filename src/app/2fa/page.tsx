"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import {
  onAuthStateChanged,
  type User,
} from "firebase/auth"

export default function TwoFAPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [totpQrUrl, setTotpQrUrl] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const isTotpEnabled = useMemo(() => enrolled, [enrolled])

  async function beginTotpEnrollment() {
    if (!user) return
    setError(null)
    setEnrolling(true)
    try {
      const token = await user.getIdToken()
      const fingerprint = `${navigator.vendor || ""}` // simple id to link device doc if available
      const res = await fetch("/api/totp/enroll", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ deviceFingerprint: fingerprint }),
      })
      if (!res.ok) throw new Error((await res.json()).error || "Failed to enroll")
      const data = await res.json()
      setTotpQrUrl(data.qrDataUrl ?? null)
    } catch (e: any) {
      setError(e?.message ?? "Failed to start TOTP enrollment")
    } finally {
      setEnrolling(false)
    }
  }

  async function finalizeTotpEnrollment(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setError(null)
    setEnrolling(true)
    try {
      const token = await user.getIdToken()
      const res = await fetch("/api/totp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: verificationCode }),
      })
      if (!res.ok) throw new Error((await res.json()).error || "Verification failed")
      setEnrolled(true)
      router.push("/")
    } catch (e: any) {
      setError(e?.message ?? "Failed to verify code")
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) return <div className="container py-10">Loading…</div>
  if (!user) return <div className="container py-10">Please log in to manage 2FA.</div>

  return (
    <div className="container py-10 max-w-xl">
      <h1 className="text-2xl font-semibold">Two‑Factor Authentication</h1>
      <p className="text-white/70 mt-2 text-sm">
        Protect your account by requiring a one‑time code from an authenticator app.
      </p>

      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

      <div className="mt-6 border border-white/15 rounded-lg p-4 bg-white/5">
        <h2 className="font-medium">Authenticator app (TOTP)</h2>
        {isTotpEnabled || enrolled ? (
          <p className="text-sm text-green-400 mt-2">Enabled</p>
        ) : (
          <div className="mt-3 space-y-4">
            {!totpQrUrl ? (
              <button
                onClick={beginTotpEnrollment}
                disabled={enrolling}
                className="rounded-md bg-white text-black py-2.5 px-4 text-sm disabled:opacity-60"
              >
                {enrolling ? "Preparing…" : "Set up with Authenticator"}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={totpQrUrl} alt="TOTP QR" className="w-40 h-40 bg-white p-2 rounded" />
                    <p className="text-xs text-white/60 mt-2">Scan this QR in your authenticator app</p>
                </div>
                <form onSubmit={finalizeTotpEnrollment} className="space-y-2">
                  <label htmlFor="code" className="block text-sm">Enter 6‑digit code</label>
                  <input
                    id="code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full rounded-md bg-black/40 border border-white/15 p-2.5 outline-none focus:ring-2 focus:ring-purple-600/40"
                  />
                  <button
                    type="submit"
                    disabled={enrolling || verificationCode.length < 6}
                    className="w-full rounded-md bg-white text-black py-2.5 font-medium disabled:opacity-60"
                  >
                    {enrolling ? "Verifying…" : "Verify and enable"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


