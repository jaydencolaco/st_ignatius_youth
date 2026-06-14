'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function JoinCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#0D1117] border-y border-[#1E2A45] py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Gold accent line */}
          <div className="w-12 h-px bg-[#F7B731]" aria-hidden="true" />

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] leading-tight text-balance"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            The youth is not just an event.
            <span className="text-[#F7B731]"> It&apos;s an identity.</span>
          </h2>

          <p className="text-[#8B9BC0] font-sans text-base sm:text-lg leading-relaxed">
            Are you in, or are you watching from the outside?
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/join"
              className="relative btn-pulse px-7 py-3.5 rounded-md font-semibold font-sans text-[#07090F] bg-[#F7B731] hover:bg-[#FF6B35] transition-colors duration-200"
            >
              Join the Youth
            </Link>
            <Link
              href="/join#contact"
              className="px-7 py-3.5 rounded-md font-semibold font-sans text-[#F0F4FF] border border-[#1E2A45] hover:border-[#F7B731] hover:text-[#F7B731] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
