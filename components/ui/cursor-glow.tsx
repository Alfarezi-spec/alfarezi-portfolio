'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[99] w-80 h-80 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{
        backgroundColor: 'var(--glow-bg)',
        mixBlendMode: 'var(--glow-blend)' as any,
        opacity: 'var(--glow-opacity)' as any,
        filter: 'blur(80px)',
        boxShadow: 'var(--glow-shadow)',
      }}
    />
  )
}
