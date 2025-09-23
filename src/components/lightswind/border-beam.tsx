"use client"

import { CSSProperties, useId } from "react"

interface BorderBeamProps {
  colorFrom?: string
  colorTo?: string
  size?: number
  duration?: number
  borderThickness?: number
  glowIntensity?: number
}

export function BorderBeam({
  colorFrom = "#7400ff",
  colorTo = "#9b41ff",
  size = 64,
  duration = 6,
  borderThickness = 2,
  glowIntensity = 3
}: BorderBeamProps) {
  const id = useId().replace(/[:]/g, "")

  const gradientStyle: CSSProperties = {
    background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 120deg, transparent 180deg)`
  }

  return (
    <>
      <style
        // Keyframes are scoped with id to avoid collisions
        dangerouslySetInnerHTML={{
          __html: `
@keyframes rotate-${id} { to { transform: rotate(360deg); } }
@keyframes glow-${id} { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        `
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        {/* Outer glow */}
        <div
          className="absolute -inset-1 rounded-lg blur"
          style={{
            filter: `blur(${glowIntensity * 2}px)`,
            opacity: 0.8
          }}
        >
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              ...gradientStyle,
              animation: `rotate-${id} ${duration}s linear infinite, glow-${id} ${duration * 1.2}s ease-in-out infinite`
            }}
          />
        </div>

        {/* Border mask */}
        <div className="absolute inset-0 rounded-lg">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              ...gradientStyle,
              animation: `rotate-${id} ${duration}s linear infinite`,
              WebkitMask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: borderThickness,
              boxSizing: "border-box"
            } as CSSProperties}
          />
        </div>

        {/* Moving hotspot */}
        <div
          className="absolute rounded-full opacity-60"
          style={{
            width: size,
            height: size,
            left: `calc(50% - ${size / 2}px)`,
            top: `calc(50% - ${size / 2}px)`,
            background: `radial-gradient(${colorTo}, transparent 60%)`,
            animation: `rotate-${id} ${duration}s linear infinite`,
            transformOrigin: "-120% -120%"
          }}
        />
      </div>
    </>
  )
}

export default BorderBeam


