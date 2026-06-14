'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Cross, Users, BookOpen } from 'lucide-react'

const pillars = [
  {
    icon: Cross,
    title: 'Faith',
    description:
      'Everything we do is rooted in a living faith. We show up for Mass, for service, and for each other — because faith is not a Sunday word, it is a daily practice.',
  },
  {
    icon: Users,
    title: 'Fellowship',
    description:
      'From Zone 1 to Zone 9, every young person belongs here. This is a community built on inclusion, friendship, and the shared belief that we are stronger together.',
  },
  {
    icon: BookOpen,
    title: 'Formation',
    description:
      'We grow — as leaders, as Catholics, and as people. Through retreats, service, and events, every year on this council shapes who you become long after it ends.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
}

export default function Pillars() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#07090F] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Our Foundation</p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] text-balance"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            What We Stand For
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="bg-[#111827] border border-[#1E2A45] rounded-xl p-8 flex flex-col gap-4 hover:border-[#F7B731]/30 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F7B731]/10 flex items-center justify-center group-hover:bg-[#F7B731]/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#F7B731]" aria-hidden="true" />
                </div>
                <h3
                  className="text-[#F0F4FF] text-xl font-bold"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[#8B9BC0] font-sans text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
