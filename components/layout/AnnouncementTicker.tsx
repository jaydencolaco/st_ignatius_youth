'use client'

import { announcements } from '@/data/announcements'
import { Radio } from 'lucide-react'

// Give each announcement a short category tag
const tagged = announcements.map((text, i) => {
  const tags = ['EVENT', 'NOTICE', 'EVENT', 'FEAST', 'COMMUNITY']
  return { text, tag: tags[i % tags.length] }
})

const tagColors: Record<string, string> = {
  EVENT:     'text-[#F7B731] border-[#F7B731]/40 bg-[#F7B731]/10',
  NOTICE:    'text-[#60A5FA] border-[#60A5FA]/40 bg-[#60A5FA]/10',
  FEAST:     'text-[#FF6B35] border-[#FF6B35]/40 bg-[#FF6B35]/10',
  COMMUNITY: 'text-[#34D399] border-[#34D399]/40 bg-[#34D399]/10',
}

export default function AnnouncementTicker() {
  const items = [...tagged, ...tagged] // doubled for seamless loop

  return (
    <div
      className="w-full fixed top-0 left-0 right-0 z-[60] overflow-hidden flex items-stretch"
      style={{
        background: 'rgba(7,9,15,0.96)',
        borderBottom: '1px solid rgba(30,42,69,0.8)',
        backdropFilter: 'blur(12px)',
        height: '44px',
      }}
      role="marquee"
      aria-label="Live announcements"
    >
      {/* Static badge */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 border-r border-[#1E2A45]/80 bg-[#111827]">
        <Radio className="w-3.5 h-3.5 text-[#F7B731] animate-pulse" aria-hidden="true" />
        <span className="text-[#F7B731] text-[11px] font-bold font-sans tracking-[0.2em] uppercase whitespace-nowrap">
          Updates
        </span>
      </div>

      {/* Scrolling strip */}
      <div className="relative flex-1 overflow-hidden flex items-center">
        <div className="ticker-inner flex items-center gap-0 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 px-5">
              <span
                className={`text-[10px] font-bold font-sans tracking-widest px-1.5 py-0.5 rounded border ${tagColors[item.tag] ?? tagColors.EVENT}`}
              >
                {item.tag}
              </span>
              <span className="text-[#C8D3E8] text-[13px] font-sans tracking-wide">
                {item.text}
              </span>
              <span className="text-[#2A3A5A] text-base select-none" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>

        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 w-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(7,9,15,0.96), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(7,9,15,0.96), transparent)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
