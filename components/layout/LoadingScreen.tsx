'use client'

import { useEffect, useRef, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const [phase, setPhase] = useState<'building' | 'sliding'>('building')
  const [visibleChars, setVisibleChars] = useState(0)
  const [showLine, setShowLine] = useState(false)

  const text = 'YOUTH IGNITED'

  useEffect(() => {
    // Ember canvas setup
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number; y: number; size: number; speed: number; opacity: number; color: string
    }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: Math.random() * 3 + 1.5,
        speed: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.5 ? '#F7B731' : '#FF6B35',
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.speed
        p.opacity -= 0.001
        if (p.y < -10 || p.opacity <= 0) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
          p.opacity = Math.random() * 0.8 + 0.2
        }
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Letter reveal sequence
    let charIndex = 0
    const charInterval = setInterval(() => {
      charIndex++
      setVisibleChars(charIndex)
      if (charIndex >= text.length) {
        clearInterval(charInterval)
        setTimeout(() => setShowLine(true), 200)
        setTimeout(() => {
          setPhase('sliding')
          setTimeout(onComplete, 700)
        }, 1200)
      }
    }, 60)

    return () => {
      clearInterval(charInterval)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090F] ${
        phase === 'sliding' ? 'loading-slide-up' : ''
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-[#8B9BC0] text-sm tracking-[0.3em] uppercase font-sans mb-2">
          St. Ignatius Church · Jacobs Circle · Mumbai
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold tracking-widest text-[#F0F4FF] select-none"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300"
              style={{
                opacity: i < visibleChars ? 1 : 0,
                transform: i < visibleChars ? 'translateY(0)' : 'translateY(-20px)',
                color: char === ' ' ? 'transparent' : i >= 6 ? '#F7B731' : '#F0F4FF',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <div
          className="h-px bg-[#F7B731] transition-all duration-700 ease-out"
          style={{ width: showLine ? '200px' : '0px', opacity: showLine ? 1 : 0 }}
        />
      </div>
    </div>
  )
}
