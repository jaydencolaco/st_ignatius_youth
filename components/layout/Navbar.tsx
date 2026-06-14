'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flame } from 'lucide-react'

const navLinks = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { href: '/council', label: 'The Council' },
  { href: '/events',  label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className="fixed top-[44px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          backgroundColor: scrolled ? 'rgba(7,9,15,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid #1E2A45' : '1px solid transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Youth Ignited Home">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Flame
                className="w-6 h-6 text-[#F7B731] group-hover:text-[#FF6B35] transition-colors duration-300"
                aria-hidden="true"
              />
            </div>
            <span
              className="text-lg font-bold text-[#F0F4FF] tracking-wide group-hover:text-[#F7B731] transition-colors duration-300"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Youth Ignited
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium font-sans rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-[#F7B731]'
                        : 'text-[#8B9BC0] hover:text-[#F0F4FF]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-px bg-[#F7B731]"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                href="/join"
                className="ml-2 px-4 py-2 text-sm font-semibold font-sans text-[#07090F] bg-[#F7B731] rounded-md hover:bg-[#FF6B35] transition-colors duration-200"
              >
                Join Us
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[#8B9BC0] hover:text-[#F0F4FF] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[#0D1117] border-l border-[#1E2A45] flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-[#F7B731] font-bold text-lg"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Youth Ignited
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-[#8B9BC0] hover:text-[#F0F4FF] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav>
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map((link) => {
                    const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 rounded-md text-base font-medium font-sans transition-colors duration-200 ${
                            isActive
                              ? 'text-[#F7B731] bg-[#111827]'
                              : 'text-[#8B9BC0] hover:text-[#F0F4FF] hover:bg-[#111827]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="mt-auto">
                <Link
                  href="/join"
                  className="block w-full text-center px-4 py-3 font-semibold font-sans text-[#07090F] bg-[#F7B731] rounded-md hover:bg-[#FF6B35] transition-colors duration-200"
                >
                  Join the Movement
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
