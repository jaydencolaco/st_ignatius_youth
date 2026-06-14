'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/data/gallery'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function GalleryPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const preview = galleryImages.slice(0, 6)

  return (
    <section ref={ref} className="bg-[#07090F] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-2">Memories</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#F0F4FF] text-balance"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Captured Moments
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-[#8B9BC0] hover:text-[#F7B731] text-sm font-sans transition-colors duration-200 flex items-center gap-1"
          >
            See the Full Gallery <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {preview.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative aspect-square rounded-xl overflow-hidden border border-[#1E2A45] cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[#F7B731] text-xs font-semibold font-sans tracking-wide uppercase">
                  {image.eventTag}
                </span>
              </div>
              {/* Gold border glow on hover */}
              <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-1 group-hover:ring-[#F7B731]/50 transition-all duration-300 pointer-events-none" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
