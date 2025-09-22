"use client"

import { useEffect, useState } from "react"
import LogoIcon from "@/assets/logo.svg"
import MenuIcon from "@/assets/icon-menu.svg"
import Link from "next/link"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export const Header = () => {
  const [userLabel, setUserLabel] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [totpEnabled, setTotpEnabled] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const label = user.displayName || user.email || "Account"
        setUserLabel(label)
        try {
          const snap = await getDoc(doc(db, "users", user.uid))
          const enabled = Boolean(snap.get("totp.enabled"))
          setTotpEnabled(enabled)
        } catch {
          setTotpEnabled(false)
        }
      } else {
        setUserLabel(null)
        setTotpEnabled(false)
      }
    })
    return () => unsub()
  }, [])

  async function handleSignOut() {
    try {
      await signOut(auth)
    } catch (e) {
      // no-op UI for now
    }
  }

  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 ">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border rounded-lg border-white/15  md:py-2.5 md:px-5 max-w-2xl mx-auto relative ">
          <div className="hidden md:block absolute inset-0 backdrop-blur -z-10 "></div>
          <div>
            {/* To make the border of the Logo inline-flex to make it in center aligfned with Logo */}
            <div className="border h-10 w-10 rounded-xl border-white/15 inline-flex justify-center items-center">
              <LogoIcon className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm ">
              <a
                className="text-white/70 hover:text-white hover:y-10 transition "
                href="#features"
              >
                Features
              </a>
              <a
                className="text-white/70 hover:text-white transition "
                href="#solution"
              >
                Solution
              </a>
              <a
                className="text-white/70 hover:text-white transition "
                href="#security"
              >
                Security
              </a>
              <a
                className="text-white/70 hover:text-white transition "
                href="#recycling"
              >
                Recycling
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            {userLabel ? (
              <div className="hidden md:flex items-center gap-2 border rounded-lg border-white/20 py-2 px-3 text-sm text-white/90">
                <Link
                  href="/2fa"
                  className={
                    "rounded-md px-2 py-1 text-xs transition " +
                    (totpEnabled
                      ? "bg-green-500/15 text-green-400 border border-green-400/30"
                      : "bg-white/10 hover:bg-white/20")
                  }
                >
                  2FA{totpEnabled ? " ✓" : ""}
                </Link>
                <span className="truncate max-w-[12rem]" title={userLabel}>{userLabel}</span>
                <button
                  onClick={handleSignOut}
                  className="ml-2 rounded-md px-2 py-1 text-xs bg-white/10 hover:bg-white/20 transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block border rounded-lg border-white/20 py-2 px-4 text-sm text-white/80 hover:text-white hover:border-white/40 transition"
              >
                Login
              </Link>
            )}
            <button className="relative py-2 px-4 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] hidden md:block">
              <div className="absolute inset-0">
                <div className="border rounded-lg border-white/20 absolute inset-0"></div>
              </div>
              <span>Download</span>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="md:hidden p-2 -mr-2"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden mt-3 max-w-2xl mx-auto border border-white/15 rounded-lg bg-black/80 backdrop-blur p-4">
            <nav className="flex flex-col gap-4 text-sm">
              <a href="#features" className="text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Features</a>
              <a href="#solution" className="text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Solution</a>
              <a href="#security" className="text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Security</a>
              <a href="#recycling" className="text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Recycling</a>
            </nav>
            <div className="h-3" />
            {userLabel ? (
              <div className="flex items-center justify-between border rounded-lg border-white/20 py-2 px-3 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Link
                    href="/2fa"
                    onClick={() => setMobileOpen(false)}
                    className={
                      "rounded-md px-2 py-1 text-xs transition " +
                      (totpEnabled
                        ? "bg-green-500/15 text-green-400 border border-green-400/30"
                        : "bg-white/10 hover:bg-white/20")
                    }
                  >
                    2FA{totpEnabled ? " ✓" : ""}
                  </Link>
                  <span className="truncate max-w-[12rem]" title={userLabel}>{userLabel}</span>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); void handleSignOut(); }}
                  className="ml-2 rounded-md px-3 py-1 text-xs bg-white/10 hover:bg-white/20 transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center border rounded-lg border-white/20 py-2 px-4 text-sm text-white/80 hover:text-white hover:border-white/40 transition"
              >
                Login
              </Link>
            )}
            <div className="h-3" />
            <button className="w-full relative py-2 px-4 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]">
              <div className="absolute inset-0">
                <div className="border rounded-lg border-white/20 absolute inset-0"></div>
              </div>
              <span>Download</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
