import { getApps, initializeApp, applicationDefault, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const app =
  getApps()[0] ||
  initializeApp(
    process.env.FIREBASE_PRIVATE_KEY
      ? {
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
          }),
        }
      : { credential: applicationDefault() }
  )

export const adminDb = getFirestore(app)


