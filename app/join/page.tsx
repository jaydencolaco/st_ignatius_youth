'use client'

import { Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'
import Footer from '@/components/layout/Footer'
import { CheckCircle2 } from 'lucide-react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

function JoinFormSection({ success }: { success: boolean }) {
  return (
    <ScrollReveal>
      <div className="bg-[#111827] border border-[#1E2A45] rounded-2xl p-8">
        <h2
          className="text-2xl font-bold text-[#F0F4FF] mb-2"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Become a Member
        </h2>
        <p className="text-[#8B9BC0] font-sans text-sm mb-8 leading-relaxed">
          Fill in the form below and we&apos;ll reach out to you ahead of the next council year.
        </p>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#F7B731]" aria-hidden="true" />
            <p
              className="text-xl font-bold text-[#F0F4FF]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              You&apos;re in.
            </p>
            <p className="text-[#8B9BC0] font-sans text-sm">
              We&apos;ve received your form. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="flex flex-col gap-5"
          >
            <input type="hidden" name="_next" value="?success=true" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="join-name">
                  Full Name *
                </label>
                <input
                  id="join-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="join-age">
                  Age *
                </label>
                <input
                  id="join-age"
                  type="number"
                  name="age"
                  required
                  min={13}
                  max={35}
                  placeholder="Your age"
                  className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="join-phone">
                  Phone *
                </label>
                <input
                  id="join-phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="join-email">
                  Email *
                </label>
                <input
                  id="join-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="join-zone">
                Zone *
              </label>
              <select
                id="join-zone"
                name="zone"
                required
                className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
              >
                <option value="" disabled>Select your zone</option>
                {Array.from({ length: 9 }, (_, i) => (
                  <option key={i + 1} value={`Zone ${i + 1}`}>Zone {i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="join-why">
                Why do you want to join? *
              </label>
              <textarea
                id="join-why"
                name="message"
                required
                rows={4}
                placeholder="Tell us what drives you to be part of Youth Ignited..."
                className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="relative btn-pulse w-full py-3.5 rounded-md font-bold font-sans text-[#07090F] bg-[#F7B731] hover:bg-[#FF6B35] transition-colors duration-200"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Join the Movement
            </button>
          </form>
        )}
      </div>
    </ScrollReveal>
  )
}

function ContactFormSection() {
  return (
    <ScrollReveal delay={0.1}>
      <div id="contact" className="bg-[#111827] border border-[#1E2A45] rounded-2xl p-8">
        <h2
          className="text-2xl font-bold text-[#F0F4FF] mb-2"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Contact Us
        </h2>
        <p className="text-[#8B9BC0] font-sans text-sm mb-8 leading-relaxed">
          Have a question? Want to reach Fr. Sean? Send us a message.
        </p>

        <form
          action="https://formspree.io/f/YOUR_CONTACT_FORM_ID"
          method="POST"
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="contact-name">
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="contact-email">
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="contact-subject">
              Subject *
            </label>
            <select
              id="contact-subject"
              name="subject"
              required
              className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200"
            >
              <option value="" disabled>Select a subject</option>
              <option value="General Query">General Query</option>
              <option value="Reach Fr. Sean">Reach Fr. Sean</option>
              <option value="Event Enquiry">Event Enquiry</option>
              <option value="Grievance">Grievance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#8B9BC0] text-xs font-semibold font-sans uppercase tracking-wide" htmlFor="contact-message">
              Message *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              className="bg-[#0D1117] border border-[#1E2A45] rounded-md px-4 py-3 text-[#F0F4FF] font-sans text-sm placeholder:text-[#4A5568] focus:outline-none focus:ring-1 focus:ring-[#F7B731] transition-colors duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-md font-bold font-sans text-[#07090F] bg-[#F7B731] hover:bg-[#FF6B35] transition-colors duration-200"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Send Message
          </button>
        </form>

        {/* Social Row */}
        <div className="mt-8 pt-8 border-t border-[#1E2A45]">
          <p className="text-[#8B9BC0] text-xs font-sans uppercase tracking-widest mb-4">Find us on</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8B9BC0] hover:text-[#F7B731] transition-colors duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="font-sans text-sm group-hover:text-[#F7B731]">@youthignited</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8B9BC0] hover:text-[#F7B731] transition-colors duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-sans text-sm group-hover:text-[#F7B731]">Youth Ignited</span>
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8B9BC0] hover:text-[#F7B731] transition-colors duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="font-sans text-sm group-hover:text-[#F7B731]">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

// Separated into its own component so useSearchParams() is inside a Suspense boundary
function JoinPageContent() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success') === 'true'

  return (
    <>
      <AnnouncementTicker />
      <Navbar />
      <main className="bg-[#07090F] pt-28">

        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal>
            <p className="text-[#F7B731] text-xs font-sans tracking-[0.3em] uppercase mb-3">Be Part of It</p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-4 text-balance"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Join Us
            </h1>
            <p className="text-[#8B9BC0] font-sans text-base sm:text-lg max-w-xl leading-relaxed">
              The youth is not just an event. It&apos;s an identity. Are you in, or are you watching from the outside?
            </p>
          </ScrollReveal>
        </section>

        {/* Forms */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JoinFormSection success={success} />
            <ContactFormSection />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default function JoinPage() {
  return (
    <Suspense>
      <JoinPageContent />
    </Suspense>
  )
}