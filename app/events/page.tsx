'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'
import Footer from '@/components/layout/Footer'
import { events } from '@/data/events'
import type { Month, YouthEvent } from '@/data/events'
import { MapPin, Clock, Calendar, CheckCircle2, ExternalLink } from 'lucide-react'

const MONTHS: { key: Month; label: string }[] = [
  { key: 'july',      label: 'Jul' },
  { key: 'august',    label: 'Aug' },
  { key: 'september', label: 'Sep' },
  { key: 'october',   label: 'Oct' },
  { key: 'november',  label: 'Nov' },
  { key: 'december',  label: 'Dec' },
  { key: 'january',   label: 'Jan' },
  { key: 'february',  label: 'Feb' },
  { key: 'march',     label: 'Mar' },
  { key: 'april',     label: 'Apr' },
  { key: 'may',       label: 'May' },
  { key: 'june',      label: 'Jun' },
]

/* ─── Event Card ─── */
function EventCard({ event }: { event: YouthEvent }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`bg-[#111827] border border-[#1E2A45] rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 hover:border-[#F7B731]/30 ${
        event.past ? 'opacity-60' : ''
      }`}
    >
      {/* Image */}
      {event.imagePath && (
        <div className="relative aspect-video">
          <Image
            src={event.imagePath}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" aria-hidden="true" />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold font-sans ${
                event.type === 'church' ? 'bg-[#F7B731] text-[#07090F]' : 'bg-[#FF6B35] text-white'
              }`}
            >
              {event.type === 'church' ? 'Church Event' : 'Diocese Event'}
            </span>
            {event.past && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold font-sans bg-emerald-900/80 text-emerald-400 flex items-center gap-1 border border-emerald-700/50">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Completed
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {!event.imagePath && (
          <div className="flex gap-2 flex-wrap mb-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold font-sans ${
                event.type === 'church' ? 'bg-[#F7B731] text-[#07090F]' : 'bg-[#FF6B35] text-white'
              }`}
            >
              {event.type === 'church' ? 'Church Event' : 'Diocese Event'}
            </span>
            {event.past && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold font-sans bg-emerald-900/80 text-emerald-400 flex items-center gap-1 border border-emerald-700/50">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Completed
              </span>
            )}
          </div>
        )}
        <h3
          className="text-[#F0F4FF] text-lg font-bold leading-snug"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {event.title}
        </h3>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#F7B731] text-xs font-sans">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#8B9BC0] text-xs font-sans">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-[#8B9BC0] text-xs font-sans">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <p className="text-[#8B9BC0] font-sans text-xs leading-relaxed line-clamp-3 flex-1">
          {event.description}
        </p>
        {event.bookingUrl && !event.past && (
          <a
            href={event.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 self-start px-4 py-2 rounded-md bg-[#F7B731] text-[#07090F] font-semibold font-sans text-xs hover:bg-[#FF6B35] transition-colors duration-200"
          >
            Book Now <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

/* ─── Page ─── */
export default function EventsPage() {
  // Get unique years
  const yearLabels = Array.from(new Set(events.map((e) => e.yearLabel))).sort((a, b) => b.localeCompare(a))
  const [activeYear, setActiveYear] = useState(yearLabels[0])
  const [activeTab, setActiveTab] = useState<'church' | 'dyc'>('church')
  const [activeMonth, setActiveMonth] = useState<Month>('july')

  const yearEvents = events.filter((e) => e.yearLabel === activeYear && e.type === activeTab)
  const monthEvents = yearEvents.filter((e) => e.month === activeMonth)

  // Which months have events
  const monthsWithEvents = new Set(yearEvents.map((e) => e.month))

  return (
    <>
      <AnnouncementTicker />
      <Navbar />
      <main className="bg-[#07090F] pt-28">

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Calendar</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-4 text-balance"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Events
          </h1>
          <p className="text-[#8B9BC0] font-sans text-base sm:text-lg max-w-xl leading-relaxed">
            From church gatherings to diocesan conventions — every moment we&apos;ve shared, documented.
          </p>
        </section>

        {/* Filters bar */}
        <div className="bg-[#0D1117] border-y border-[#1E2A45] px-4 py-4 sticky top-0 z-30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col gap-3">
            {/* Year + Tabs row */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Year */}
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="bg-[#111827] border border-[#1E2A45] text-[#F0F4FF] text-sm font-sans rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#F7B731]"
                aria-label="Select year"
              >
                {yearLabels.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              {/* Event type tabs */}
              <div className="flex rounded-md overflow-hidden border border-[#1E2A45]" role="tablist">
                {(['church', 'dyc'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-semibold font-sans transition-colors duration-200 ${
                      activeTab === tab
                        ? 'bg-[#F7B731] text-[#07090F]'
                        : 'bg-transparent text-[#8B9BC0] hover:text-[#F0F4FF]'
                    }`}
                  >
                    {tab === 'church' ? 'Our Events' : 'Around the Diocese'}
                  </button>
                ))}
              </div>
            </div>

            {/* Month tabs */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter by month">
              {MONTHS.map(({ key, label }) => {
                const hasEvents = monthsWithEvents.has(key)
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={activeMonth === key}
                    onClick={() => setActiveMonth(key)}
                    className={`relative flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-colors duration-200 ${
                      activeMonth === key
                        ? 'bg-[#F7B731] text-[#07090F]'
                        : hasEvents
                        ? 'text-[#F0F4FF] hover:bg-[#111827]'
                        : 'text-[#4A5568] hover:bg-[#111827]'
                    }`}
                  >
                    {label}
                    {hasEvents && activeMonth !== key && (
                      <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#F7B731]" aria-hidden="true" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeYear}-${activeTab}-${activeMonth}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {monthEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {monthEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-[#4A5568] font-sans text-base">
                    Nothing planned yet for {MONTHS.find((m) => m.key === activeMonth)?.label} — check back soon.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
      <Footer />
    </>
  )
}
