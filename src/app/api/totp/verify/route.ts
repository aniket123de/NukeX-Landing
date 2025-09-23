import { NextRequest, NextResponse } from "next/server"
import { authenticator } from "otplib"

// Lazy import Firebase Admin to avoid initialization issues during build
async function getFirebaseAdmin() {
  try {
    const { adminDb } = await import("@/lib/firebaseAdmin")
    const { getAuth } = await import("firebase-admin/auth")
    return { adminDb, getAuth }
  } catch (error) {
    console.error("Firebase Admin import error:", error)
    throw new Error("Firebase Admin not available")
  }
}

export async function POST(req: NextRequest) {
  try {
    const { adminDb, getAuth } = await getFirebaseAdmin()
    
    const authz = req.headers.get("authorization") || ""
    const idToken = authz.startsWith("Bearer ") ? authz.slice(7) : ""
    if (!idToken) throw new Error("Missing token")
    
    const decoded = await getAuth().verifyIdToken(idToken)
    const uid = decoded.uid

    const { code } = await req.json()
    if (!code) throw new Error("Missing code")

    const snap = await adminDb.doc(`users/${uid}`).get()
    const secret = snap.get("totp.secret") as string | undefined
    if (!secret) throw new Error("No TOTP secret")

    const ok = authenticator.verify({ token: code, secret })
    if (!ok) return NextResponse.json({ ok: false }, { status: 400 })

    await adminDb.doc(`users/${uid}`).set(
      { totp: { enabled: true, updatedAt: Date.now() } },
      { merge: true }
    )
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("TOTP verification error:", e)
    return NextResponse.json({ error: e?.message ?? "verify failed" }, { status: 400 })
  }
}


