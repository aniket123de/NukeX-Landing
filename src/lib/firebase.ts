"use client"

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVtzmHjYY13Y4Iqnu_Xc9l25S6z63lId4",
  authDomain: "nukex-8c186.firebaseapp.com",
  projectId: "nukex-8c186",
  storageBucket: "nukex-8c186.firebasestorage.app",
  messagingSenderId: "106871549639",
  appId: "1:106871549639:web:9b5754c59325353c84d8e2",
  measurementId: "G-81V66L3C7Q",
} as const

let app: FirebaseApp
let auth: Auth
let analytics: Analytics | undefined

if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

auth = getAuth(app)

// Analytics must only initialize in the browser and when supported
if (typeof window !== "undefined") {
  void isSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app)
    }
  })
}

export { app, auth, analytics }


