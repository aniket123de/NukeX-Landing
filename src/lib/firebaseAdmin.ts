import { getApps, initializeApp, applicationDefault, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

function initializeFirebaseAdmin() {
  // Check if app is already initialized
  const existingApp = getApps()[0]
  if (existingApp) {
    return existingApp
  }

  // Check if we have Firebase credentials
  const hasCredentials = process.env.FIREBASE_PROJECT_ID && 
                        process.env.FIREBASE_CLIENT_EMAIL && 
                        process.env.FIREBASE_PRIVATE_KEY

  if (hasCredentials) {
    try {
      // Clean up the private key - handle both escaped and unescaped newlines
      let privateKey = process.env.FIREBASE_PRIVATE_KEY!
      if (privateKey.includes('\\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n')
      }

      return initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey: privateKey,
        }),
      })
    } catch (error) {
      console.error("Firebase Admin initialization with credentials failed:", error)
      // Fall back to default credentials
    }
  }

  // Fallback to application default credentials
  try {
    return initializeApp({
      credential: applicationDefault()
    })
  } catch (error) {
    console.error("Firebase Admin fallback initialization failed:", error)
    throw new Error("Failed to initialize Firebase Admin SDK")
  }
}

// Initialize the app
const app = initializeFirebaseAdmin()

export const adminDb = getFirestore(app)


