'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'
import Footer from '@/components/layout/Footer'
import EmberCanvas from '@/components/home/EmberCanvas'
import { siteContent } from '@/data/content'
import { Heart, Users, Star, CalendarDays } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Faith', description: 'Rooted in the life and example of St. Ignatius of Loyola — a man set ablaze by God. Our faith is active, personal, and lived out loud.' },
  { icon: Users, title: 'Community', description: 'Every zone, every background, every personality. We are one body, one group, one movement. Nobody is a stranger here.' },
  { icon: Star, title: 'Legacy', description: 'What we build today outlasts us. Every event, every council, every act of service adds to something greater than ourselves.' },
]

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const { story, ignitionPrayer, directorMessage, churchCalendar } = siteContent
  const prayerLines = ignitionPrayer.split('\n')

  return (
    <>
      <AnnouncementTicker />
      <Navbar />
      <main className="bg-[#07090F] pt-28">

        {/* Page Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal>
            <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Who We Are</p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0F4FF] text-balance"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              About Youth Ignited
            </h1>
          </ScrollReveal>
        </section>

        {/* Our Story */}
        <section className="bg-[#0D1117] border-y border-[#1E2A45] py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Our Beginning</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] mb-10 text-balance"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Our Story
              </h2>
              <div className="space-y-5">
                {story.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className={`font-sans text-base sm:text-lg leading-relaxed text-[#8B9BC0] ${
                      i === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Our Foundation</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] mb-12 text-balance"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                What We Believe
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((val, i) => {
                const Icon = val.icon
                return (
                  <ScrollReveal key={val.title} delay={i * 0.1}>
                    <div className="bg-[#111827] border border-[#1E2A45] rounded-xl p-8 flex flex-col gap-4 h-full hover:border-[#F7B731]/30 transition-colors duration-300 group">
                      <div className="w-12 h-12 rounded-lg bg-[#F7B731]/10 flex items-center justify-center group-hover:bg-[#F7B731]/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[#F7B731]" aria-hidden="true" />
                      </div>
                      <h3 className="text-[#F0F4FF] text-xl font-bold" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                        {val.title}
                      </h3>
                      <p className="text-[#8B9BC0] font-sans text-sm leading-relaxed">{val.description}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Ignition Prayer */}
        <section className="relative bg-[#0D1117] border-y border-[#1E2A45] py-24 px-4 overflow-hidden">
          <EmberCanvas count={40} />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-6">Our Prayer</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] mb-12 text-balance"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                The Ignition Prayer
              </h2>
              <div className="flex gap-6 items-start text-left">
                <div className="w-1 flex-shrink-0 self-stretch bg-[#F7B731] rounded-full" aria-hidden="true" />
                <div className="flex flex-col gap-3">
                  {prayerLines.map((line, i) => (
                    <p
                      key={i}
                      className={`font-sans text-lg sm:text-xl leading-loose ${
                        line === 'Amen.' ? 'text-[#F7B731] font-semibold' : 'text-[#F0F4FF]'
                      }`}
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      {line || <>&nbsp;</>}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Director Message */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Leadership</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] mb-12 text-balance"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                A Message from Our Spiritual Director
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-[#111827] border border-[#1E2A45] rounded-2xl p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-12 items-start">
                {/* Photo */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-2 ring-[#F7B731] ring-offset-2 ring-offset-[#111827] overflow-hidden bg-[#1E2A45] flex-shrink-0">
                    <Image
                      src={directorMessage.photoPath}
                      alt={`Photo of ${directorMessage.name}`}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[#F0F4FF] font-semibold font-sans text-sm">{directorMessage.name}</p>
                    <p className="text-[#8B9BC0] font-sans text-xs">{directorMessage.title}</p>
                  </div>
                </div>
                {/* Message */}
                <div className="relative">
                  <span className="text-[#F7B731]/20 text-8xl font-bold leading-none absolute -top-4 -left-2 select-none font-sans" aria-hidden="true">&ldquo;</span>
                  <div className="pt-8 space-y-4">
                    {directorMessage.message.split('\n\n').map((para, i) => (
                      <p key={i} className="text-[#8B9BC0] font-sans text-sm sm:text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Church Calendar */}
        <section className="bg-[#0D1117] border-t border-[#1E2A45] py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Liturgical Year</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] mb-12 text-balance"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Church Calendar
              </h2>
            </ScrollReveal>
            <div className="flex flex-col gap-4">
              {churchCalendar.map((feast, i) => (
                <ScrollReveal key={feast.name} delay={i * 0.07}>
                  <div className="flex gap-5 items-start bg-[#111827] border border-[#1E2A45] rounded-xl p-5 hover:border-[#F7B731]/30 transition-colors duration-300">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg bg-[#F7B731]/10 flex items-center justify-center">
                        <CalendarDays className="w-4 h-4 text-[#F7B731]" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-[#F0F4FF] font-semibold font-sans text-sm">{feast.name}</h3>
                        <span className="text-[#F7B731] text-xs font-semibold font-sans px-2 py-0.5 rounded-full bg-[#F7B731]/10 border border-[#F7B731]/20">
                          {feast.date}
                        </span>
                      </div>
                      {feast.description && (
                        <p className="text-[#8B9BC0] font-sans text-xs leading-relaxed">{feast.description}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
