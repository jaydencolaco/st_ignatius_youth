'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import EmberCanvas from '@/components/home/EmberCanvas'
import { councils } from '@/data/councils'

const legacyWords = [
  'A PLACE IN',
  'OUR STORY',
  'AWAITS YOU.',
]

export default function LegacyTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Gather a few names from past councils for the scrolling strip
  const pastNames = councils.flatMap((c) =>
    c.members.slice(0, 3).map((m) => ({ name: m.name, year: c.year }))
  )

  return (
    <section ref={ref} className="relative bg-[#07090F] overflow-hidden py-28 px-4">
      <EmberCanvas count={50} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#07090F]/70 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {legacyWords.map((word, i) => (
            <motion.p
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                i === 2 ? 'text-[#F7B731]' : 'text-[#F0F4FF]'
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {word}
            </motion.p>
          ))}
        </motion.div>

        {/* Scrolling Council Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden mb-12"
        >
          <div className="flex gap-4 ticker-inner">
            {[...pastNames, ...pastNames].map((item, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-28 sm:w-36 rounded-xl border p-3 sm:p-4 text-center ${
                  i === pastNames.length
                    ? 'border-[#F7B731] bg-[#F7B731]/10'
                    : 'border-[#1E2A45] bg-[#111827] opacity-60 blur-[1px]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#1E2A45] mx-auto mb-2 flex items-center justify-center">
                  <span className="text-[#4A5568] text-xs font-bold font-sans">
                    {i === pastNames.length ? '?' : item.name[0]}
                  </span>
                </div>
                <p className="text-[#F0F4FF] text-xs font-semibold font-sans truncate">
                  {i === pastNames.length ? 'Your Name Here' : item.name}
                </p>
                <p className="text-[#4A5568] text-[10px] font-sans mt-0.5">
                  {i === pastNames.length ? '2026-27' : item.year}
                </p>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#07090F] to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#07090F] to-transparent pointer-events-none" aria-hidden="true" />
        </motion.div>

        {/* Body Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#8B9BC0] font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Every person who has served on this council has their name and face gently kept here — a small, quiet way of saying thank you for showing up.{' '}
          <span className="text-[#F0F4FF]">These are real people, real years, real memories.</span>{' '}
          And if you ever feel called to be part of something like this, there may just be a place here for you too.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link
            href="/council"
            className="inline-flex px-8 py-4 rounded-md font-bold font-sans text-[#07090F] bg-[#F7B731] hover:bg-[#FF6B35] transition-colors duration-200"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            See Who&apos;s Served
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
