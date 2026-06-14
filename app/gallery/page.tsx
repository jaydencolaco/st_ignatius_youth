'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'
import Footer from '@/components/layout/Footer'
import { galleryImages } from '@/data/gallery'
import type { GalleryImage } from '@/data/gallery'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 12

/* ─── Lightbox ─── */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const image = images[index]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#111827] border border-[#1E2A45] flex items-center justify-center text-[#8B9BC0] hover:text-[#F0F4FF] transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111827] border border-[#1E2A45] flex items-center justify-center text-[#8B9BC0] hover:text-[#F7B731] transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111827] border border-[#1E2A45] flex items-center justify-center text-[#8B9BC0] hover:text-[#F7B731] transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={image.id}
        layoutId={`gallery-img-${image.id}`}
        className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-xl overflow-hidden border border-[#1E2A45]"
          style={{ maxHeight: '70vh' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
        {/* Caption */}
        <div className="text-center">
          {image.caption && (
            <p className="text-[#F0F4FF] font-sans text-sm mb-1">{image.caption}</p>
          )}
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#F7B731] text-xs font-semibold font-sans px-2 py-0.5 rounded-full bg-[#F7B731]/10 border border-[#F7B731]/20">
              {image.eventTag}
            </span>
            <span className="text-[#4A5568] text-xs font-sans">{image.yearTag}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Gallery Card ─── */
function GalleryCard({
  image,
  onClick,
}: {
  image: GalleryImage
  onClick: () => void
}) {
  return (
    <motion.button
      layoutId={`gallery-img-${image.id}`}
      onClick={onClick}
      className="group relative w-full rounded-xl overflow-hidden border border-[#1E2A45] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F7B731]"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      aria-label={`View ${image.alt}`}
    >
      <div className="aspect-square relative">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/90 via-[#07090F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="text-[#F7B731] text-xs font-semibold font-sans">{image.eventTag}</p>
        <p className="text-[#8B9BC0] text-xs font-sans">{image.yearTag}</p>
      </div>
      {/* Gold ring glow */}
      <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-1 group-hover:ring-[#F7B731]/50 transition-all duration-300 pointer-events-none" aria-hidden="true" />
    </motion.button>
  )
}

/* ─── Page ─── */
export default function GalleryPage() {
  const allYearTags = Array.from(new Set(galleryImages.map((i) => i.yearTag))).sort((a, b) => b.localeCompare(a))
  const allEventTags = Array.from(new Set(galleryImages.map((i) => i.eventTag))).sort()

  const [yearFilter, setYearFilter] = useState<string>('All')
  const [eventFilter, setEventFilter] = useState<string>('All')
  const [shown, setShown] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = galleryImages.filter((img) => {
    if (yearFilter !== 'All' && img.yearTag !== yearFilter) return false
    if (eventFilter !== 'All' && img.eventTag !== eventFilter) return false
    return true
  })

  const visible = filtered.slice(0, shown)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const nextImage = useCallback(() => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i)), [filtered.length])

  // Reset shown when filters change
  useEffect(() => { setShown(PAGE_SIZE) }, [yearFilter, eventFilter])

  return (
    <>
      <AnnouncementTicker />
      <Navbar />
      <main className="bg-[#07090F] pt-28">

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Visual Archive</p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-4 text-balance"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Gallery
          </h1>
          <p className="text-[#8B9BC0] font-sans text-base sm:text-lg max-w-xl leading-relaxed">
            Every photograph is a moment preserved. Every face is a story worth remembering.
          </p>
        </section>

        {/* Filter bar */}
        <div className="bg-[#0D1117] border-y border-[#1E2A45] px-4 py-4 sticky top-0 z-30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col gap-3">
            {/* Year filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-wrap">
              {['All', ...allYearTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setYearFilter(tag)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-colors duration-200 ${
                    yearFilter === tag
                      ? 'bg-[#F7B731] text-[#07090F]'
                      : 'border border-[#1E2A45] text-[#8B9BC0] hover:text-[#F0F4FF] hover:border-[#F7B731]/40'
                  }`}
                  aria-pressed={yearFilter === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* Event filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-wrap">
              {['All', ...allEventTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setEventFilter(tag)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium font-sans transition-colors duration-200 ${
                    eventFilter === tag
                      ? 'bg-[#FF6B35] text-white'
                      : 'border border-[#1E2A45] text-[#4A5568] hover:text-[#8B9BC0] hover:border-[#4A5568]'
                  }`}
                  aria-pressed={eventFilter === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {visible.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {visible.map((image, i) => (
                  <GalleryCard
                    key={image.id}
                    image={image}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </div>

              {shown < filtered.length && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setShown((s) => s + PAGE_SIZE)}
                    className="px-8 py-3 rounded-md border border-[#1E2A45] text-[#8B9BC0] font-semibold font-sans text-sm hover:text-[#F7B731] hover:border-[#F7B731]/50 transition-colors duration-200"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-[#4A5568] font-sans text-base">No images match the selected filters.</p>
            </div>
          )}
        </div>

      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={visible}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
