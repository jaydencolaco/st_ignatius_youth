'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { events } from '@/data/events'
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react'

export default function FeaturedEvent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // First non-past event
  const featured = events.find((e) => !e.past)

  return (
    <section ref={ref} className="bg-[#0D1117] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-2">What&apos;s Coming</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] text-balance"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Featured Event
            </h2>
          </div>
          <Link
            href="/events"
            className="text-[#8B9BC0] hover:text-[#F7B731] text-sm font-sans transition-colors duration-200 flex items-center gap-1"
          >
            All Events <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        {featured ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#111827] border border-[#1E2A45] rounded-2xl overflow-hidden"
          >
            {/* Image */}
            {featured.imagePath && (
              <div className="relative aspect-video lg:aspect-auto min-h-64">
                <Image
                  src={featured.imagePath}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827]/40 lg:block hidden" aria-hidden="true" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold font-sans ${
                    featured.type === 'church'
                      ? 'bg-[#F7B731] text-[#07090F]'
                      : 'bg-[#FF6B35] text-white'
                  }`}>
                    {featured.type === 'church' ? 'Church Event' : 'Diocese Event'}
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center gap-5">
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#F0F4FF] text-balance"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {featured.title}
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#F7B731] text-sm font-sans">
                  <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B9BC0] text-sm font-sans">
                  <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{featured.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B9BC0] text-sm font-sans">
                  <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{featured.location}</span>
                </div>
              </div>

              <p className="text-[#8B9BC0] font-sans text-sm leading-relaxed">{featured.description}</p>

              {featured.bookingUrl && (
                <a
                  href={featured.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#F7B731] text-[#07090F] font-semibold font-sans text-sm hover:bg-[#FF6B35] transition-colors duration-200 self-start"
                >
                  Book Now <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center py-16 bg-[#111827] border border-[#1E2A45] rounded-2xl"
          >
            <p className="text-[#8B9BC0] font-sans text-lg">
              Something exciting is coming. Stay tuned.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
