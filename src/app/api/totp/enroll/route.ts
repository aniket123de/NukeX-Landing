import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebaseAdmin"
import { authenticator } from "otplib"
import QRCode from "qrcode"
import { getAuth } from "firebase-admin/auth"

export async function POST(req: NextRequest) {
  try {
    const authz = req.headers.get("authorization") || ""
    const idToken = authz.startsWith("Bearer ") ? authz.slice(7) : ""
    if (!idToken) throw new Error("Missing token")
    const decoded = await getAuth().verifyIdToken(idToken)
    const uid = decoded.uid

    const secret = authenticator.generateSecret()
    const otpauth = authenticator.keyuri(decoded.email ?? uid, "NukeX", secret)
    const qrDataUrl = await QRCode.toDataURL(otpauth)

    await adminDb.doc(`users/${uid}`).set(
      { totp: { secret, enabled: false, updatedAt: Date.now() } },
      { merge: true }
    )

    return NextResponse.json({ qrDataUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "enroll failed" }, { status: 400 })
  }
}


