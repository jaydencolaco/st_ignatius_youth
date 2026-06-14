'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteContent } from '@/data/content'

function useCountUp(target: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOut cubic
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, trigger])

  return count
}

function StatItem({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, 2000, inView)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (count === value && value > 0) setPulse(true)
  }, [count, value])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <span
        className={`text-5xl sm:text-6xl font-bold transition-colors duration-300 ${
          pulse ? 'text-[#F7B731]' : 'text-[#F0F4FF]'
        }`}
        style={{ fontFamily: "'Clash Display', sans-serif" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[#8B9BC0] text-sm font-sans tracking-wide uppercase">{label}</span>
    </div>
  )
}

export default function StatsCounter() {
  const { stats } = siteContent
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#0D1117] border-y border-[#1E2A45] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-[#8B9BC0] text-xs font-sans tracking-[0.3em] uppercase mb-12"
        >
          The numbers speak for themselves.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16"
        >
          <StatItem label="Years Active"      value={stats.yearsActive}     suffix="+" />
          <StatItem label="Councils Served"   value={stats.councilsServed}        />
          <StatItem label="Events Held"       value={stats.eventsHeld}      suffix="+" />
          <StatItem label="Members Strong"    value={stats.membersStrong}   suffix="+" />
        </motion.div>
      </div>
    </section>
  )
}
