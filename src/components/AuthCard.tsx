"use client"

import type { PropsWithChildren } from "react"

type AuthCardProps = PropsWithChildren<{
  title: string
  subtitle?: string
}>

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black to-[#0b0318]">
      <div className="w-full max-w-md relative">
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600/40 to-fuchsia-500/40 blur-xl opacity-40 pointer-events-none" />
        <div className="relative rounded-2xl border border-white/15 bg-[#0e0b16]/80 backdrop-blur p-6 shadow-2xl">
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-white/60">{subtitle}</p>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}


