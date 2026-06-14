'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import EmberCanvas from '@/components/home/EmberCanvas'
import { ChevronDown } from 'lucide-react'

const heroTitle = ['Y','O','U','T','H']
const heroIgnited = ['I','G','N','I','T','E','D']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#07090F]">
      <EmberCanvas count={75} />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(247,183,49,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[108px] pb-20">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[#8B9BC0] text-[10px] sm:text-sm font-sans tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 flex items-center gap-2 sm:gap-3 flex-wrap"
        >
          <span className="w-6 h-px bg-[#F7B731]" aria-hidden="true" />
          St. Ignatius Church&nbsp;·&nbsp;Jacob Circle&nbsp;·&nbsp;Mumbai
        </motion.p>

        {/* YOUTH */}
        <div className="flex flex-wrap gap-0 mb-2" aria-hidden="true">
          {heroTitle.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-bold leading-none text-[#F0F4FF] select-none"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* IGNITED */}
        <div className="flex flex-wrap gap-0 mb-8" aria-hidden="true">
          {heroIgnited.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.05, ease: 'easeOut' }}
              className="shimmer-text text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-bold leading-none select-none"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Screen-reader headline */}
        <h1 className="sr-only">Youth Ignited — St. Ignatius Church, Jacob Circle, Mumbai</h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-xl sm:text-2xl md:text-3xl text-[#F0F4FF] font-sans italic mb-4 text-balance leading-snug"
        >
          &ldquo;Be part of something that outlasts you.&rdquo;
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-[#8B9BC0] text-base sm:text-lg font-sans leading-relaxed max-w-xl mb-10"
        >
          For years, people have been building something here. Events. Legacies. Memories. Community.
          And your name could be on this wall next.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1.1 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
        >
          <Link
            href="/join"
            className="relative btn-pulse px-7 py-3.5 rounded-md font-semibold font-sans text-[#07090F] bg-[#F7B731] hover:bg-[#FF6B35] transition-colors duration-200 text-sm sm:text-base text-center"
          >
            Join the Movement
          </Link>
          <Link
            href="/council"
            className="px-7 py-3.5 rounded-md font-semibold font-sans text-[#F0F4FF] border border-[#1E2A45] hover:border-[#F7B731] hover:text-[#F7B731] transition-colors duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            Explore Our Legacy
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bounce-scroll"
        aria-hidden="true"
      >
        <span className="text-[#4A5568] text-xs font-sans tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#4A5568]" />
      </motion.div>
    </section>
  )
}
