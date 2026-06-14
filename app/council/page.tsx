'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'
import Footer from '@/components/layout/Footer'
import { councils } from '../../data/councils'
import type { Council } from '../../data/councils'

// Sort newest first
const sortedCouncils = [...councils].sort((a, b) => b.year.localeCompare(a.year))

/* ─── Year Selector ─── */
function YearSelector({
  years,
  active,
  onChange,
}: {
  years: string[]
  active: string
  onChange: (y: string) => void
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
      role="tablist"
      aria-label="Select council year"
    >
      {years.map((year) => (
        <button
          key={year}
          role="tab"
          aria-selected={year === active}
          onClick={() => onChange(year)}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold font-sans transition-colors duration-200 ${
            year === active
              ? 'bg-[#F7B731] text-[#07090F]'
              : 'border border-[#1E2A45] text-[#8B9BC0] hover:text-[#F0F4FF] hover:border-[#F7B731]/50'
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

/* ─── Tilt Card ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / 15).toFixed(1)
    const ry = (-(e.clientX - cx) / 15).toFixed(1)
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`
    card.style.boxShadow = `0 0 24px rgba(247,183,49,0.15)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`
    card.style.boxShadow = `none`
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-[transform,box-shadow] duration-200 ${className}`}
    >
      {children}
    </div>
  )
}

/* ─── Member Avatar ─── */
function MemberAvatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-full aspect-square rounded-full overflow-hidden bg-[#1E2A45] ring-1 ring-[#1E2A45]">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => {}}
      />
    </div>
  )
}

/* ─── Council Display ─── */
function CouncilDisplay({ council }: { council: Council }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex flex-col gap-16">

      {/* President Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-[#111827] border border-[#1E2A45] rounded-2xl p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-12 items-start"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-2 ring-[#F7B731] ring-offset-2 ring-offset-[#111827] overflow-hidden bg-[#1E2A45] flex-shrink-0">
            <Image
              src={council.president.photoPath}
              alt={`Photo of ${council.president.name}`}
              fill
              className="object-cover"
              onError={() => {}}
            />
          </div>
          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold font-sans bg-[#F7B731] text-[#07090F]">
              {council.president.title}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <h3
            className="text-2xl sm:text-3xl font-bold text-[#F0F4FF]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            {council.president.name}
          </h3>
          <div className="relative">
            <span className="text-[#F7B731]/20 text-8xl font-bold leading-none absolute -top-4 -left-2 select-none" aria-hidden="true">&ldquo;</span>
            <p className="text-[#8B9BC0] font-sans text-sm sm:text-base leading-relaxed pt-6">
              {council.president.message}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Office Bearers */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-6"
        >
          Office Bearers
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {council.officeBearers.map((ob, i) => (
            <motion.div
              key={ob.role}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <TiltCard className="bg-[#111827] border border-[#1E2A45] rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:border-[#F7B731]/40 transition-colors duration-300">
                <div className="relative w-20 h-20 rounded-full ring-2 ring-[#F7B731]/50 ring-offset-2 ring-offset-[#111827] overflow-hidden bg-[#1E2A45]">
                  <Image
                    src={ob.photoPath}
                    alt={`Photo of ${ob.name}`}
                    fill
                    className="object-cover"
                    onError={() => {}}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[#F0F4FF] font-semibold font-sans text-sm">{ob.name}</h4>
                  <span className="text-[#F7B731] text-xs font-semibold font-sans">{ob.role}</span>
                  <span className="text-[#4A5568] text-xs font-sans">{ob.zone}</span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-6"
        >
          Council Members
        </motion.h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {council.members.map((member, i) => (
            <motion.div
              key={member.name + i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
            >
              <TiltCard className="bg-[#111827] border border-[#1E2A45] rounded-xl p-4 flex flex-col items-center gap-3 text-center hover:border-[#F7B731]/30 transition-colors duration-300">
                <div className="w-16 h-16">
                  <MemberAvatar src={member.photoPath} name={member.name} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[#F0F4FF] font-semibold font-sans text-sm">{member.name}</p>
                  <span className="text-[#F7B731] text-xs font-sans px-2 py-0.5 rounded-full bg-[#F7B731]/10 border border-[#F7B731]/20">
                    {member.zone}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
          {/* Vacant placeholder */}
          {Array.from({ length: Math.max(0, 9 - council.members.length) }).map((_, i) => (
            <motion.div
              key={`vacant-${i}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
              className="bg-transparent border border-dashed border-[#1E2A45] rounded-xl p-4 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#1E2A45] flex items-center justify-center">
                <span className="text-[#4A5568] text-lg font-bold">?</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[#4A5568] font-sans text-xs">Vacant</p>
                <span className="text-[#4A5568] text-xs font-sans">Zone {council.members.length + i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function CouncilPage() {
  const years = sortedCouncils.map((c) => c.year)
  const [activeYear, setActiveYear] = useState(years[0])
  const currentCouncil = sortedCouncils.find((c) => c.year === activeYear)!

  return (
    <>
      <AnnouncementTicker />
      <Navbar />
      <main className="bg-[#07090F] pt-28">

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Permanent Record</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-4 text-balance"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            The Council
          </h1>
          <p className="text-[#8B9BC0] font-sans text-base sm:text-lg max-w-xl leading-relaxed">
            Every council. Every member. Every name. Preserved here, permanently and with pride.
          </p>
        </section>

        {/* Year Selector */}
        <div className="bg-[#0D1117] border-y border-[#1E2A45] px-4 py-5 sticky top-0 z-30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <YearSelector years={years} active={activeYear} onChange={setActiveYear} />
          </div>
        </div>

        {/* Council Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CouncilDisplay council={currentCouncil} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <section className="bg-[#0D1117] border-t border-[#1E2A45] py-20 px-4 text-center">
          <p
            className="text-2xl sm:text-3xl font-bold text-[#F0F4FF] mb-3 text-balance"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Think you have what it takes?
          </p>
          <p className="text-[#8B9BC0] font-sans text-base mb-8">
            Stand for the council and write your name into this page.
          </p>
          <Link
            href="/join"
            className="inline-flex px-8 py-4 rounded-md font-bold font-sans text-[#07090F] bg-[#F7B731] hover:bg-[#FF6B35] transition-colors duration-200"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Stand for Office
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
