'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  drift: number
}

interface EmberCanvasProps {
  count?: number
  className?: string
}

export default function EmberCanvas({ count = 70, className = '' }: EmberCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#F7B731', '#FF6B35', '#F7B731', '#FFD700']

    const createParticle = (overrideY?: number): Particle => ({
      x: Math.random() * canvas.width,
      y: overrideY ?? Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.4,
    })

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      particlesRef.current = Array.from({ length: count }, () => createParticle())
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift
        p.opacity -= 0.0015

        if (p.y < -10 || p.opacity <= 0) {
          Object.assign(p, createParticle(canvas.height + 10))
          p.opacity = Math.random() * 0.6 + 0.4
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
