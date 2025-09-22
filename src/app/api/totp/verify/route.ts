import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebaseAdmin"
import { authenticator } from "otplib"
import { getAuth } from "firebase-admin/auth"

export async function POST(req: NextRequest) {
  try {
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
    return NextResponse.json({ error: e?.message ?? "verify failed" }, { status: 400 })
  }
}


