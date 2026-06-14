'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import AnnouncementTicker from '@/components/layout/AnnouncementTicker'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import StatsCounter from '@/components/home/StatsCounter'
import Pillars from '@/components/home/Pillars'
import FeaturedEvent from '@/components/home/FeaturedEvent'
import GalleryPreview from '@/components/home/GalleryPreview'
import LegacyTeaser from '@/components/home/LegacyTeaser'
import JoinCTA from '@/components/home/JoinCTA'

const LoadingScreen = dynamic(() => import('@/components/layout/LoadingScreen'), { ssr: false })

export default function HomeClient() {
  const [loaderDone, setLoaderDone] = useState(false)

  const handleLoaderComplete = () => {
    setLoaderDone(true)
  }

  return (
    <>
      {!loaderDone && (
        <LoadingScreen onComplete={handleLoaderComplete} />
      )}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: loaderDone ? 1 : 0, pointerEvents: loaderDone ? 'auto' : 'none' }}
      >
        <AnnouncementTicker />
        <Navbar />
        <main>
          <Hero />
          <StatsCounter />
          <Pillars />
          <FeaturedEvent />
          <GalleryPreview />
          <LegacyTeaser />
          <JoinCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
