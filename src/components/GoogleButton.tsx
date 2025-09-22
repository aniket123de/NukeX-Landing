"use client"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { storeDeviceForUser } from "@/lib/device"

type Props = {
  onSuccess?: () => void
  onError?: (message: string) => void
  label?: string
  className?: string
}

export function GoogleButton({ onSuccess, onError, label = "Continue with Google", className }: Props) {
  async function onClick() {
    try {
      const provider = new GoogleAuthProvider()
      const cred = await signInWithPopup(auth, provider)
      await storeDeviceForUser(cred.user.uid)
      onSuccess?.()
    } catch (e: any) {
      onError?.(e?.message ?? "Google sign-in failed")
    }
  }

  return (
    <button
      onClick={onClick}
      className={
        "w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition py-2.5 text-sm " +
        (className ?? "")
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.558 31.658 29.197 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.155 7.961 3.039l5.657-5.657C34.046 5.053 29.268 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.155 7.961 3.039l5.657-5.657C34.046 5.053 29.268 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"/>
        <path fill="#4CAF50" d="M24 43c5.137 0 9.83-1.974 13.409-5.192l-6.191-5.238C29.197 35 24 35 24 35c-5.17 0-9.556-3.317-11.192-7.946l-6.54 5.036C9.57 39.556 16.227 43 24 43z"/>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.35 3.578-4.63 6.257-8.566 6.732l6.191 5.238C31.801 40.184 36 37 36 37c3.084-2.734 5.346-6.765 6.139-11.305.263-1.51.402-3.064.402-4.695 0-1.341-.138-2.651-.389-3.917z"/>
      </svg>
      <span>{label}</span>
    </button>
  )
}


