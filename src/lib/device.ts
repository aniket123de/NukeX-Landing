"use client"

import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

type DeviceFingerprint = {
  fingerprint: string
  userAgent: string
  platform: string
  language: string
  timezone: string
  screen: { width: number; height: number; pixelRatio: number }
  vendor: string
  hardwareConcurrency?: number
  deviceMemory?: number
  createdAt?: unknown
  lastSeenAt?: unknown
}

export function computeFingerprint(): DeviceFingerprint {
  if (typeof window === "undefined") {
    return {
      fingerprint: "server",
      userAgent: "",
      platform: "",
      language: "",
      timezone: "",
      screen: { width: 0, height: 0, pixelRatio: 1 },
      vendor: "",
    }
  }

  const navigatorInfo = window.navigator as Navigator & {
    deviceMemory?: number
    hardwareConcurrency?: number
  }

  const userAgent = navigatorInfo.userAgent || ""
  const platform = navigatorInfo.platform || ""
  const language = navigatorInfo.language || ""
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  const vendor = navigatorInfo.vendor || ""
  const screenWidth = window.screen?.width ?? 0
  const screenHeight = window.screen?.height ?? 0
  const pixelRatio = window.devicePixelRatio ?? 1
  const hardwareConcurrency = navigatorInfo.hardwareConcurrency
  const deviceMemory = (navigatorInfo as any).deviceMemory as number | undefined

  const raw = [
    userAgent,
    platform,
    language,
    timezone,
    vendor,
    `${screenWidth}x${screenHeight}@${pixelRatio}`,
    hardwareConcurrency?.toString() ?? "",
    deviceMemory?.toString() ?? "",
  ].join("|")

  // Simple stable hash (FNV-1a 32-bit)
  let hash = 0x811c9dc5
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  const fingerprint = hash.toString(16)

  return {
    fingerprint,
    userAgent,
    platform,
    language,
    timezone,
    screen: { width: screenWidth, height: screenHeight, pixelRatio },
    vendor,
    hardwareConcurrency,
    deviceMemory,
  }
}

export async function storeDeviceForUser(userId: string, extra?: Partial<DeviceFingerprint>) {
  const device = { ...computeFingerprint(), ...extra }
  const devicesCol = collection(db, "users", userId, "devices")
  const ref = doc(devicesCol, device.fingerprint)
  await setDoc(
    ref,
    {
      ...device,
      createdAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
    },
    { merge: true }
  )
  return device
}


