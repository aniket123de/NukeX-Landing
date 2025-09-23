import { NextRequest, NextResponse } from "next/server"
import { authenticator } from "otplib"
import QRCode from "qrcode"

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

    const body = await req.json().catch(() => ({})) as { deviceFingerprint?: string }

    const secret = authenticator.generateSecret()
    const otpauth = authenticator.keyuri(decoded.email ?? uid, "NukeX", secret)
    const qrDataUrl = await QRCode.toDataURL(otpauth)

    await adminDb.doc(`users/${uid}`).set(
      { totp: { secret, enabled: false, updatedAt: Date.now() } },
      { merge: true }
    )

    if (body.deviceFingerprint) {
      await adminDb
        .doc(`users/${uid}/devices/${body.deviceFingerprint}`)
        .set({ totpSecret: secret, updatedAt: Date.now() }, { merge: true })
    }

    return NextResponse.json({ qrDataUrl })
  } catch (e: any) {
    console.error("TOTP enrollment error:", e)
    return NextResponse.json({ error: e?.message ?? "enroll failed" }, { status: 400 })
  }
}


